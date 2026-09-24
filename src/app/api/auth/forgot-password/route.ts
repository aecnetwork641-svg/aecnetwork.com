import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendEmail, generatePasswordResetEmailTemplate } from "@/lib/email";

const forgotPasswordSchema = z.object({
  email: z.string().email("Valid email address is required")
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't leak whether user exists for security, return positive message
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email address, a password reset link has been sent."
      });
    }

    // Generate secure reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour expiration

    // Upsert PasswordResetToken
    await prisma.passwordResetToken.deleteMany({
      where: { email }
    });

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      }
    });

    // Determine Base URL
    const appUrl =
      process.env.NEXTAUTH_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const resetUrl = `${appUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    // Send email notification
    const emailHtml = generatePasswordResetEmailTemplate({
      name: user.name || "AEC Portal User",
      resetUrl
    });

    await sendEmail({
      to: email,
      subject: "🔐 Password Reset Request — AEC Network Portal",
      html: emailHtml
    });

    return NextResponse.json({
      success: true,
      message: "Password reset link has been sent to your email address."
    });
  } catch (error: any) {
    console.error("[FORGOT_PASSWORD_ERROR]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while requesting password reset." },
      { status: 500 }
    );
  }
}
