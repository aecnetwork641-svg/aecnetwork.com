import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  sendEmail,
  generateAdminAdmissionEmailTemplate,
  generateStudentConfirmationEmail,
} from "@/lib/email";

const admissionSchema = z.object({
  applicantName: z.string().min(2, "Applicant name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional().default(""),
  programSlug: z.string().min(1, "Program is required"),
  dateOfBirth: z.string().optional().default(""),
  country: z.string().optional().default(""),
  guardianName: z.string().optional().default(""),
  notes: z.string().optional().default(""),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = admissionSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid application details", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { applicantName, email, phone, programSlug, dateOfBirth, country, guardianName, notes } = parsed.data;

    // 1. Send Email Alert to Admin (aecnetwork641@gmail.com)
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "aecnetwork641@gmail.com";
    const adminHtml = generateAdminAdmissionEmailTemplate({
      applicantName,
      email,
      phone,
      programSlug,
      dateOfBirth,
      country,
      guardianName,
      notes,
    });

    await sendEmail({
      to: adminEmail,
      subject: `📋 New Admission Application: ${applicantName} (${programSlug})`,
      html: adminHtml,
    });

    // 2. Send Confirmation Email to Applicant
    if (email) {
      const studentHtml = generateStudentConfirmationEmail({
        fullName: applicantName,
        programSlug,
      });

      await sendEmail({
        to: email,
        subject: `Admission Application Received - AEC Network (${programSlug})`,
        html: studentHtml,
      });
    }

    // 3. Database Persistence
    let applicationId = "app-" + Date.now();
    try {
      const application = await prisma.admissionApplication.create({
        data: {
          applicantName,
          email,
          phone: phone || null,
          programSlug,
          status: "submitted",
          documents: [],
        },
      });
      applicationId = application.id;

      await prisma.lead.create({
        data: {
          fullName: applicantName,
          parentName: guardianName || null,
          email,
          phone: phone || null,
          country: country || null,
          subjectInterest: programSlug,
          program: programSlug,
          notes: notes ? `Formal Admission Application: ${notes}` : `Formal Admission Application submitted`,
          source: "website_admission_form",
          status: "admission_pending",
        },
      });

      const adminUsers = await prisma.user.findMany({
        where: {
          role: { in: ["SUPER_ADMIN", "ADMIN", "ADMISSIONS_OFFICER"] },
          isActive: true,
        },
        select: { id: true },
        take: 5,
      });

      for (const admin of adminUsers) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            title: `📋 New Admission Application: ${applicantName}`,
            body: `${applicantName} submitted an application for "${programSlug}". Phone: ${phone || "N/A"}`,
            type: "system",
            channel: "in_app",
          },
        });
      }
    } catch (dbErr) {
      console.warn("[ADMISSION_DB_WARN] Could not persist to DB:", dbErr);
    }

    // 4. WhatsApp Direct Link
    const adminWhatsAppNumber = process.env.ADMIN_WHATSAPP_NUMBER || "923435999397";
    const waMessage = encodeURIComponent(
      `Assalam-o-Alaikum! I have submitted an Admission Application on AEC Network.\n\n👤 Applicant: ${applicantName}\n📚 Program: ${programSlug}\n📞 Contact: ${phone || "N/A"}\n🌍 Country: ${country || "N/A"}\n\nPlease review my application.`
    );
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`;

    return NextResponse.json({
      success: true,
      applicationId,
      whatsappUrl,
      message: "Admission application submitted successfully",
    });
  } catch (error) {
    console.error("[ADMISSION_APPLY_ERROR]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your admission." },
      { status: 500 }
    );
  }
}
