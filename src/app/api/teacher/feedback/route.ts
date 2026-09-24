import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession, createAuditLog } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { notify } from "@/lib/notifications";

const feedbackSchema = z.object({
  studentId: z.string(),
  courseId: z.string().optional(),
  body: z.string().min(3, "Feedback message is required")
});

export async function POST(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["TEACHER", "ADMIN", "SUPER_ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const teacher = await prisma.teacher.findUnique({ where: { userId } });
    if (!teacher && role === "TEACHER") {
      return NextResponse.json({ error: "Teacher profile not found" }, { status: 404 });
    }

    const json = await req.json();
    const parsed = feedbackSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid feedback payload", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;
    const student = await prisma.student.findUnique({
      where: { id: data.studentId },
      include: { user: true, guardian: { include: { user: true } } }
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const feedback = await prisma.teacherFeedback.create({
      data: {
        studentId: student.id,
        teacherId: teacher?.id || "admin-teacher",
        courseId: data.courseId || undefined,
        body: data.body
      }
    });

    // Notify student
    await notify({
      userId: student.user.id,
      type: "announcement",
      title: "New Teacher Observation / Feedback",
      body: data.body,
      entityType: "student",
      entityId: student.id
    });

    // Notify parent
    if (student.guardian?.user) {
      await notify({
        userId: student.guardian.user.id,
        type: "announcement",
        title: `Teacher Observation for ${student.user.name}`,
        body: data.body,
        entityType: "student",
        entityId: student.id
      });
    }

    return NextResponse.json({ success: true, feedback });
  } catch (error: any) {
    console.error("[TEACHER_FEEDBACK_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to submit teacher feedback" }, { status: 500 });
  }
}
