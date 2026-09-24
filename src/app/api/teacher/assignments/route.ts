import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession, createAuditLog } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { notify } from "@/lib/notifications";

const createAssignmentSchema = z.object({
  courseId: z.string(),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  dueDate: z.string(),
  maxScore: z.number().default(100)
});

const gradeSubmissionSchema = z.object({
  submissionId: z.string(),
  score: z.number().min(0),
  feedback: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["TEACHER", "ADMIN", "SUPER_ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = createAssignmentSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid assignment details", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;
    const assignment = await prisma.assignment.create({
      data: {
        courseId: data.courseId,
        title: data.title,
        description: data.description,
        dueDate: new Date(data.dueDate),
        maxScore: data.maxScore
      }
    });

    // Notify all enrolled students in the course
    const enrollments = await prisma.enrollment.findMany({
      where: { courseId: data.courseId, status: "active" },
      include: { student: { include: { user: true } } }
    });

    for (const enr of enrollments) {
      await notify({
        userId: enr.student.user.id,
        type: "assignment",
        title: `New Assignment: ${data.title}`,
        body: `A new assignment has been posted for your course. Due date: ${new Date(data.dueDate).toLocaleDateString()}.`,
        entityType: "student",
        entityId: assignment.id
      });
    }

    await createAuditLog({
      actorId: userId,
      action: "CREATE",
      entity: "Assignment",
      entityId: assignment.id,
      metadata: { title: data.title, courseId: data.courseId }
    });

    return NextResponse.json({ success: true, assignment }, { status: 201 });
  } catch (error: any) {
    console.error("[CREATE_ASSIGNMENT_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to create assignment" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["TEACHER", "ADMIN", "SUPER_ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = gradeSubmissionSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid grading payload", details: parsed.error.format() }, { status: 400 });
    }

    const { submissionId, score, feedback } = parsed.data;
    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        score,
        feedback: feedback || null
      },
      include: {
        student: { include: { user: true, guardian: { include: { user: true } } } },
        assignment: true
      }
    });

    // Notify Student
    await notify({
      userId: submission.student.user.id,
      type: "assignment",
      title: `Assignment Graded: ${submission.assignment.title}`,
      body: `Your submission scored ${score}/${submission.assignment.maxScore}.${feedback ? ` Feedback: ${feedback}` : ""}`,
      entityType: "student",
      entityId: submission.id
    });

    // Notify Parent
    if (submission.student.guardian?.user) {
      await notify({
        userId: submission.student.guardian.user.id,
        type: "assignment",
        title: `Assignment Graded for ${submission.student.user.name}`,
        body: `${submission.student.user.name} scored ${score}/${submission.assignment.maxScore} on "${submission.assignment.title}".`,
        entityType: "student",
        entityId: submission.id
      });
    }

    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    console.error("[GRADE_SUBMISSION_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to grade submission" }, { status: 500 });
  }
}
