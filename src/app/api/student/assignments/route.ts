import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentStudentScope } from "@/lib/scoped-queries";

const studentSubmitSchema = z.object({
  assignmentId: z.string(),
  fileUrl: z.string().optional(),
  notes: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const studentScope = await getCurrentStudentScope();
    if (!studentScope?.studentId) {
      return NextResponse.json({ error: "Unauthorized access: Must be a logged-in student" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = studentSubmitSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid submission data", details: parsed.error.format() }, { status: 400 });
    }

    const { assignmentId, fileUrl, notes } = parsed.data;

    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        studentId: studentScope.studentId,
        fileUrl: fileUrl || notes || "Uploaded assignment document",
        submittedAt: new Date()
      }
    });

    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    console.error("[STUDENT_SUBMIT_ASSIGNMENT_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to submit assignment" }, { status: 500 });
  }
}
