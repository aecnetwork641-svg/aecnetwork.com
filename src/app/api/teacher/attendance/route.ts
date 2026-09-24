import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession, createAuditLog } from "@/lib/scoped-queries";
import { isOneOf, canTeacherManageClass } from "@/lib/permissions";
import { emitAttendanceMarked } from "@/lib/events";

const markAttendanceSchema = z.object({
  classId: z.string(),
  date: z.string(),
  records: z.array(
    z.object({
      studentId: z.string(),
      status: z.enum(["present", "absent", "late", "excused"]),
      note: z.string().optional()
    })
  )
});

export async function POST(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["TEACHER", "ADMIN", "SUPER_ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = markAttendanceSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid attendance data", details: parsed.error.format() }, { status: 400 });
    }

    const { classId, date, records } = parsed.data;
    const targetDate = new Date(date);

    const klass = await prisma.class.findUnique({
      where: { id: classId },
      include: { teacher: true }
    });
    if (!klass) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    // Teacher authorization: ensure teacher is assigned to this class (or is Admin)
    let currentTeacherId: string | null = null;
    if (role === "TEACHER") {
      const teacher = await prisma.teacher.findUnique({ where: { userId } });
      currentTeacherId = teacher?.id || null;
      if (!canTeacherManageClass(role, currentTeacherId, klass.teacherId)) {
        return NextResponse.json({ error: "You are not assigned to manage attendance for this class" }, { status: 403 });
      }
    }

    // Upsert attendance records
    const attendanceResults = await prisma.$transaction(
      records.map((r) =>
        prisma.attendance.upsert({
          where: {
            classId_studentId_date: {
              classId,
              studentId: r.studentId,
              date: targetDate
            }
          },
          update: {
            status: r.status,
            note: r.note || null
          },
          create: {
            classId,
            studentId: r.studentId,
            date: targetDate,
            status: r.status,
            note: r.note || null
          }
        })
      )
    );

    // Trigger absence notifications to parents for absent students
    for (const r of records) {
      if (r.status === "absent") {
        try {
          await emitAttendanceMarked({
            studentId: r.studentId,
            classId,
            status: "absent",
            date: targetDate,
            note: r.note
          });
        } catch (eventErr) {
          console.error("[ATTENDANCE_EVENT_ERR]", eventErr);
        }
      }
    }

    // Record audit log
    await createAuditLog({
      actorId: userId,
      action: "MARK_ATTENDANCE",
      entity: "Attendance",
      entityId: classId,
      metadata: { date: targetDate.toISOString(), count: records.length }
    });

    return NextResponse.json({ success: true, count: attendanceResults.length });
  } catch (error: any) {
    console.error("[MARK_ATTENDANCE_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to mark attendance" }, { status: 500 });
  }
}
