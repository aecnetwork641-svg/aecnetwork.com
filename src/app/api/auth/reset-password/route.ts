import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const resetPasswordSchema = z.object({
  email: z.string().email("Valid email address is required"),
  token: z.string().min(10, "Invalid reset token"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }

    const { email, token, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    // Verify token
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetRecord || resetRecord.email.toLowerCase() !== normalizedEmail) {
      return NextResponse.json(
        { error: "Invalid or expired password reset link. Please request a new link." },
        { status: 400 }
      );
    }

    // Check expiration
    if (new Date() > resetRecord.expires) {
      await prisma.passwordResetToken.delete({
        where: { id: resetRecord.id }
      });
      return NextResponse.json(
        { error: "This password reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: { hashedPassword }
    });

    // Clean up reset token
    await prisma.passwordResetToken.delete({
      where: { id: resetRecord.id }
    });

    return NextResponse.json({
      success: true,
      message: "Your password has been successfully reset. You can now log in with your new password."
    });
  } catch (error: any) {
    console.error("[RESET_PASSWORD_ERROR]", error);
    return NextResponse.json(
      { error: "An error occurred while resetting your password. Please try again." },
      { status: 500 }
    );
  }
}
