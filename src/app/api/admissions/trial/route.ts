import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  sendEmail,
  generateAdminTrialEmailTemplate,
  generateStudentConfirmationEmail,
} from "@/lib/email";

const trialBookingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional().default(""),
  programSlug: z.string().min(1, "Program is required"),
  preferredTime: z.string().optional().default(""),
  notes: z.string().optional().default(""),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = trialBookingSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form inputs", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { fullName, email, phone, programSlug, preferredTime, notes } = parsed.data;
    let bookingId = `TR-${Date.now().toString().slice(-6)}`;

    // 1. Save in Supabase database: TrialBooking & Lead (Safe try/catch)
    try {
      const booking = await prisma.trialBooking.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          programSlug,
          status: "requested",
        },
      });
      bookingId = booking.id;

      // 2. Also register as Lead in CRM for staff follow-up
      await prisma.lead.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          subjectInterest: programSlug,
          program: programSlug,
          preferredSchedule: preferredTime || null,
          notes: notes ? `Free Trial Request (${preferredTime}): ${notes}` : `Free Trial Request (${preferredTime})`,
          source: "website_free_trial",
          status: "trial_scheduled",
        },
      });

      // 3. Create 1 single In-App Notification in DB for Admin Center
      const superAdmin = await prisma.user.findFirst({
        where: {
          role: { in: ["SUPER_ADMIN", "ADMIN"] },
          isActive: true,
        },
        select: { id: true },
      });

      if (superAdmin) {
        await prisma.notification.create({
          data: {
            userId: superAdmin.id,
            title: `🎓 New Free Trial Request: ${fullName}`,
            body: `${fullName} has booked a Free Trial for "${programSlug}". Phone: ${phone || "N/A"}, Email: ${email}`,
            type: "trial",
            entityType: "trial_booking",
            entityId: bookingId,
            channel: "in_app",
          },
        });
      }
    } catch (dbErr) {
      console.error("[TRIAL_BOOKING_DB_NON_BLOCKING_ERROR]", dbErr);
    }

    // 4. Send Email Notification to Admin (aecnetwork641@gmail.com)
    try {
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "aecnetwork641@gmail.com";
      const adminHtml = generateAdminTrialEmailTemplate({
        fullName,
        email,
        phone,
        programSlug,
        preferredTime,
        notes,
        bookingId,
      });

      await sendEmail({
        to: adminEmail,
        subject: `🎓 New Free Trial Booking: ${fullName} (${programSlug})`,
        html: adminHtml,
      });
    } catch (adminEmailErr) {
      console.error("[ADMIN_EMAIL_SEND_ERROR]", adminEmailErr);
    }

    // 5. Send Confirmation Email to the Applicant (Resend test tier will safely catch if not verified)
    if (email) {
      try {
        const studentHtml = generateStudentConfirmationEmail({
          fullName,
          programSlug,
        });

        await sendEmail({
          to: email,
          subject: `Welcome to AEC Network - Free Trial Confirmation for ${programSlug}`,
          html: studentHtml,
        });
      } catch (studentEmailErr) {
        console.error("[STUDENT_EMAIL_SEND_NON_BLOCKING_ERROR]", studentEmailErr);
      }
    }

    // 6. Generate Direct WhatsApp Link for immediate connection
    const adminWhatsAppNumber = process.env.ADMIN_WHATSAPP_NUMBER || "923435999397";
    const waMessage = encodeURIComponent(
      `Assalam-o-Alaikum! I have submitted a Free Trial Booking on AEC Network.\n\n👤 Name: ${fullName}\n📚 Program: ${programSlug}\n📞 Phone: ${phone || "N/A"}\n⏰ Preferred Time: ${preferredTime || "Flexible"}\n\nPlease let me know the trial schedule.`
    );
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`;

    return NextResponse.json({
      success: true,
      bookingId,
      whatsappUrl,
      message: "Trial booking submitted successfully",
    });
  } catch (error) {
    console.error("[TRIAL_BOOKING_ERROR]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your booking." },
      { status: 500 }
    );
  }
}
