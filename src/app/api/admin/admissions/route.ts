import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession, createAuditLog } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { emitStudentClassAssigned } from "@/lib/events";

const updateLeadSchema = z.object({
  leadId: z.string(),
  status: z.enum(["new", "contacted", "counseling", "trial_scheduled", "trial_completed", "admission_pending", "enrolled", "active_student", "lost"]),
  notes: z.string().optional(),
  assignedCounselor: z.string().optional(),
  followUpDate: z.string().optional(),
  convertToStudent: z.boolean().optional(),
  courseId: z.string().optional(),
  classId: z.string().optional(),
  initialFee: z.number().optional()
});

export async function GET(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ADMISSIONS", "ADMISSIONS_OFFICER", "COUNSELOR", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const [leads, applications, trials] = await Promise.all([
      prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.admissionApplication.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.trialBooking.findMany({ orderBy: { createdAt: "desc" } })
    ]);

    return NextResponse.json({ success: true, leads, applications, trials });
  } catch (error) {
    console.error("[GET_ADMISSIONS_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch admissions pipeline" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId: actorId, role } = await getCurrentUserSession();
    if (!actorId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ADMISSIONS", "ADMISSIONS_OFFICER", "COUNSELOR"])) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = updateLeadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;
    const lead = await prisma.lead.findUnique({ where: { id: data.leadId } });
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Handle full conversion pipeline to Student if requested
    let createdStudentId: string | null = null;
    if (data.convertToStudent && !lead.convertedStudentId) {
      const studentCode = `AEC-STU-${Math.floor(1000 + Math.random() * 9000)}`;
      const passwordHash = await bcrypt.hash("Student@12345", 10);

      // 1. Transaction to create user, student, enrollment, invoice
      const conversion = await prisma.$transaction(async (tx) => {
        let user = await tx.user.findUnique({ where: { email: lead.email.toLowerCase().trim() } });
        if (!user) {
          user = await tx.user.create({
            data: {
              email: lead.email.toLowerCase().trim(),
              name: lead.fullName,
              role: "STUDENT",
              hashedPassword: passwordHash
            }
          });
        }

        const student = await tx.student.create({
          data: {
            userId: user.id,
            studentCode,
            country: lead.country || "Pakistan"
          }
        });

        // Link Course & Class if provided
        if (data.courseId) {
          await tx.enrollment.create({
            data: {
              studentId: student.id,
              courseId: data.courseId,
              classId: data.classId || undefined,
              status: "active"
            }
          });
        }

        // Generate initial tuition invoice if specified
        if (data.initialFee && data.initialFee > 0) {
          await tx.invoice.create({
            data: {
              studentId: student.id,
              amount: data.initialFee,
              currency: "USD",
              dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
              status: "unpaid"
            }
          });
        }

        await tx.lead.update({
          where: { id: lead.id },
          data: {
            status: "enrolled",
            convertedStudentId: student.id,
            reviewedById: actorId,
            notes: data.notes || lead.notes
          }
        });

        return student;
      });

      createdStudentId = conversion.id;

      // If assigned to a class, emit schedule notifications
      if (data.classId && data.courseId && createdStudentId) {
        try {
          await emitStudentClassAssigned({
            studentId: createdStudentId,
            classId: data.classId,
            courseId: data.courseId
          });
        } catch (eventErr) {
          console.error("[EVENT_EMIT_ERR]", eventErr);
        }
      }
    } else {
      // Standard lead status update
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          status: data.status,
          notes: data.notes !== undefined ? data.notes : lead.notes,
          assignedCounselor: data.assignedCounselor !== undefined ? data.assignedCounselor : lead.assignedCounselor,
          followUpDate: data.followUpDate ? new Date(data.followUpDate) : lead.followUpDate,
          reviewedById: actorId
        }
      });
    }

    await createAuditLog({
      actorId,
      action: "UPDATE_STATUS",
      entity: "Lead",
      entityId: lead.id,
      metadata: { newStatus: data.status, converted: data.convertToStudent }
    });

    return NextResponse.json({ success: true, convertedStudentId: createdStudentId });
  } catch (error: any) {
    console.error("[UPDATE_LEAD_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to update lead status" }, { status: 500 });
  }
}
