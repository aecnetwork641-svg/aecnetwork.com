import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  sendEmail,
  generateAdminContactEmailTemplate,
} from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional().default(""),
  subject: z.string().optional().default("General Inquiry"),
  message: z.string().min(3, "Message must be at least 3 characters"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form details", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;

    // 1. Send Email Alert to Admin (aecnetwork641@gmail.com)
    try {
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "aecnetwork641@gmail.com";
      const adminHtml = generateAdminContactEmailTemplate({
        name,
        email,
        phone,
        subject,
        message,
      });

      await sendEmail({
        to: adminEmail,
        subject: `✉️ New Contact Inquiry: ${name} (${subject})`,
        html: adminHtml,
      });
    } catch (emailErr) {
      console.error("[CONTACT_EMAIL_WARN]", emailErr);
    }

    // 2. Safely try database save (so DB latency never drops the inquiry)
    try {
      await prisma.lead.create({
        data: {
          fullName: name,
          email,
          phone: phone || null,
          notes: `[Contact Form - ${subject}]: ${message}`,
          source: "website_contact_form",
          status: "new",
        },
      });

      const adminUsers = await prisma.user.findMany({
        where: {
          role: { in: ["SUPER_ADMIN", "ADMIN", "CONTENT_EDITOR"] },
          isActive: true,
        },
        select: { id: true },
        take: 5,
      });

      for (const admin of adminUsers) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            title: `✉️ New Inquiry: ${name}`,
            body: `${name} sent a message regarding "${subject}".`,
            type: "new_message",
            channel: "in_app",
          },
        });
      }
    } catch (dbErr) {
      console.warn("[CONTACT_DB_WARN] Could not persist lead record:", dbErr);
    }

    // 3. Generate WhatsApp Link
    const adminWhatsAppNumber = process.env.ADMIN_WHATSAPP_NUMBER || "923435999397";
    const waMessage = encodeURIComponent(
      `Assalam-o-Alaikum! I have submitted a contact message on AEC Network.\n\n👤 Name: ${name}\n📌 Subject: ${subject}\n✉️ Email: ${email}\n💬 Message: ${message}`
    );
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
