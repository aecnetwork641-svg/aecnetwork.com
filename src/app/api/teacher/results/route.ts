import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession, createAuditLog } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { notify } from "@/lib/notifications";

const recordResultSchema = z.object({
  examId: z.string(),
  studentId: z.string(),
  score: z.number().min(0),
  grade: z.string().optional(),
  remarks: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["TEACHER", "ADMIN", "SUPER_ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = recordResultSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid result payload", details: parsed.error.format() }, { status: 400 });
    }

    const { examId, studentId, score, grade, remarks } = parsed.data;

    const result = await prisma.result.create({
      data: {
        examId,
        studentId,
        score,
        grade: grade || (score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : "F"),
        remarks: remarks || null
      },
      include: {
        student: { include: { user: true, guardian: { include: { user: true } } } },
        exam: { include: { course: true } }
      }
    });

    // Notify Student
    await notify({
      userId: result.student.user.id,
      type: "result",
      title: `Exam Result Published: ${result.exam.title}`,
      body: `You scored ${score}/${result.exam.maxScore} (Grade: ${result.grade}). Remarks: ${remarks || "Keep up the great work!"}`,
      entityType: "exam",
      entityId: result.id
    });

    // Notify Parent
    if (result.student.guardian?.user) {
      await notify({
        userId: result.student.guardian.user.id,
        type: "result",
        title: `Exam Result for ${result.student.user.name}`,
        body: `${result.student.user.name} scored ${score}/${result.exam.maxScore} (Grade: ${result.grade}) in "${result.exam.title}".`,
        entityType: "exam",
        entityId: result.id
      });
    }

    await createAuditLog({
      actorId: userId,
      action: "ENTER_RESULT",
      entity: "Result",
      entityId: result.id,
      metadata: { examId, studentId, score }
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("[RECORD_RESULT_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to record result" }, { status: 500 });
  }
}
