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

    // 1. Save in Supabase database: TrialBooking
    const booking = await prisma.trialBooking.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        programSlug,
        status: "requested",
      },
    });

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

    // 3. Create In-App Notification in DB for Admins
    const adminUsers = await prisma.user.findMany({
      where: {
        role: { in: ["SUPER_ADMIN", "ADMIN", "ADMISSIONS_OFFICER", "COUNSELOR"] },
        isActive: true,
      },
      select: { id: true },
      take: 10,
    });

    for (const admin of adminUsers) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          title: `🎓 New Free Trial Request: ${fullName}`,
          body: `${fullName} has booked a Free Trial for "${programSlug}". Phone: ${phone || "N/A"}, Email: ${email}`,
          type: "system",
          channel: "in_app",
        },
      });
    }

    // 4. Send Email Notification to Admin (aecnetwork641@gmail.com)
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "aecnetwork641@gmail.com";
    const adminHtml = generateAdminTrialEmailTemplate({
      fullName,
      email,
      phone,
      programSlug,
      preferredTime,
      notes,
      bookingId: booking.id,
    });

    await sendEmail({
      to: adminEmail,
      subject: `🎓 New Free Trial Booking: ${fullName} (${programSlug})`,
      html: adminHtml,
    });

    // 5. Send Confirmation Email to the Applicant
    if (email) {
      const studentHtml = generateStudentConfirmationEmail({
        fullName,
        programSlug,
      });

      await sendEmail({
        to: email,
        subject: `Welcome to AEC Network - Free Trial Confirmation for ${programSlug}`,
        html: studentHtml,
      });
    }

    // 6. Generate Direct WhatsApp Link for immediate connection
    const adminWhatsAppNumber = process.env.ADMIN_WHATSAPP_NUMBER || "923435999397";
    const waMessage = encodeURIComponent(
      `Assalam-o-Alaikum! I have submitted a Free Trial Booking on AEC Network.\n\n👤 Name: ${fullName}\n📚 Program: ${programSlug}\n📞 Phone: ${phone || "N/A"}\n⏰ Preferred Time: ${preferredTime || "Flexible"}\n\nPlease let me know the trial schedule.`
    );
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`;

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
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
