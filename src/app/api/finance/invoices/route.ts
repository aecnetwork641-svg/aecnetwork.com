import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession, createAuditLog } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { notify } from "@/lib/notifications";

const createInvoiceSchema = z.object({
  studentId: z.string(),
  amount: z.number().min(1, "Amount must be positive"),
  currency: z.string().default("USD"),
  dueDate: z.string()
});

const recordPaymentSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().min(1),
  method: z.enum(["card", "bank_transfer", "cash", "other"]).default("card"),
  reference: z.string().optional()
});

export async function GET(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "FINANCE", "FINANCE_MANAGER", "DIRECTOR"])) {
      return NextResponse.json({ error: "Unauthorized access to finance records" }, { status: 403 });
    }

    const [invoices, payments, expenses, feePlans] = await Promise.all([
      prisma.invoice.findMany({
        include: {
          student: { include: { user: true, guardian: { include: { user: true } } } },
          payments: true
        },
        orderBy: { issuedAt: "desc" }
      }),
      prisma.payment.findMany({
        include: { invoice: { include: { student: { include: { user: true } } } } },
        orderBy: { paidAt: "desc" }
      }),
      prisma.expense.findMany({ orderBy: { date: "desc" } }),
      prisma.feePlan.findMany()
    ]);

    return NextResponse.json({ success: true, invoices, payments, expenses, feePlans });
  } catch (error) {
    console.error("[GET_FINANCE_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch financial data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId: actorId, role } = await getCurrentUserSession();
    if (!actorId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "FINANCE", "FINANCE_MANAGER"])) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = createInvoiceSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid invoice data", details: parsed.error.format() }, { status: 400 });
    }

    const { studentId, amount, currency, dueDate } = parsed.data;
    const targetDueDate = new Date(dueDate);

    const invoice = await prisma.invoice.create({
      data: {
        studentId,
        amount,
        currency,
        dueDate: targetDueDate,
        status: "unpaid"
      },
      include: {
        student: { include: { user: true, guardian: { include: { user: true } } } }
      }
    });

    // Notify Student
    await notify({
      userId: invoice.student.user.id,
      type: "fee_due",
      title: "New Tuition Invoice Issued",
      body: `An invoice of ${currency} ${amount} has been issued. Due date: ${targetDueDate.toLocaleDateString()}.`,
      entityType: "invoice",
      entityId: invoice.id
    });

    // Notify Parent
    if (invoice.student.guardian?.user) {
      await notify({
        userId: invoice.student.guardian.user.id,
        type: "fee_due",
        title: `Tuition Invoice for ${invoice.student.user.name}`,
        body: `A fee invoice of ${currency} ${amount} has been issued for ${invoice.student.user.name}. Due: ${targetDueDate.toLocaleDateString()}.`,
        entityType: "invoice",
        entityId: invoice.id
      });
    }

    await createAuditLog({
      actorId,
      action: "CREATE",
      entity: "Invoice",
      entityId: invoice.id,
      metadata: { studentId, amount, currency }
    });

    return NextResponse.json({ success: true, invoice }, { status: 201 });
  } catch (error: any) {
    console.error("[CREATE_INVOICE_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to create invoice" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId: actorId, role } = await getCurrentUserSession();
    if (!actorId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "FINANCE", "FINANCE_MANAGER"])) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = recordPaymentSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payment data", details: parsed.error.format() }, { status: 400 });
    }

    const { invoiceId, amount, method, reference } = parsed.data;

    const result = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          invoiceId,
          amount,
          method,
          reference: reference || null
        }
      });

      const invoice = await tx.invoice.findUniqueOrThrow({
        where: { id: invoiceId },
        include: { payments: true, student: { include: { user: true, guardian: { include: { user: true } } } } }
      });

      const totalPaid = invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0);
      const isPaidInFull = totalPaid >= Number(invoice.amount);

      const updatedInvoice = await tx.invoice.update({
        where: { id: invoiceId },
        data: {
          status: isPaidInFull ? "paid" : "unpaid"
        }
      });

      return { payment, invoice: updatedInvoice, student: invoice.student };
    });

    // Notify student and parent
    await notify({
      userId: result.student.user.id,
      type: "payment_received",
      title: "Payment Received & Confirmed",
      body: `Payment of $${amount} recorded for your invoice #${invoiceId.slice(-6)}. Status: ${result.invoice.status.toUpperCase()}.`,
      entityType: "invoice",
      entityId: result.invoice.id
    });

    if (result.student.guardian?.user) {
      await notify({
        userId: result.student.guardian.user.id,
        type: "payment_received",
        title: `Payment Received for ${result.student.user.name}`,
        body: `Payment of $${amount} received for tuition invoice #${invoiceId.slice(-6)}.`,
        entityType: "invoice",
        entityId: result.invoice.id
      });
    }

    await createAuditLog({
      actorId,
      action: "RECORD_PAYMENT",
      entity: "Payment",
      entityId: result.payment.id,
      metadata: { invoiceId, amount, method }
    });

    return NextResponse.json({ success: true, payment: result.payment, invoice: result.invoice });
  } catch (error: any) {
    console.error("[RECORD_PAYMENT_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to record payment" }, { status: 500 });
  }
}
