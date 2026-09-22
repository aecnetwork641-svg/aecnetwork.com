"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { emitAttendanceMarked } from "@/lib/events";

export interface AttendanceEntry {
  studentId: string;
  status: "present" | "absent" | "late" | "excused";
  note?: string;
}

export async function submitClassAttendance(
  classId: string,
  dateStr: string,
  entries: AttendanceEntry[]
) {
  const scope = await getCurrentTeacherScope();
  if (!scope) {
    throw new Error("Unauthorized: Only signed-in teachers can mark attendance.");
  }

  // Verify this class is assigned to this teacher
  const klass = await prisma.class.findFirst({
    where: { id: classId, teacherId: scope.teacherId }
  });

  if (!klass) {
    throw new Error("Forbidden: You can only record attendance for your own classes.");
  }

  const attendanceDate = new Date(dateStr);

  for (const entry of entries) {
    const record = await prisma.attendance.upsert({
      where: {
        classId_studentId_date: {
          classId,
          studentId: entry.studentId,
          date: attendanceDate
        }
      },
      update: {
        status: entry.status,
        note: entry.note
      },
      create: {
        classId,
        studentId: entry.studentId,
        date: attendanceDate,
        status: entry.status,
        note: entry.note
      }
    });

    // If marked absent, trigger event notification for parent (Section 14)
    if (entry.status === "absent") {
      await emitAttendanceMarked({
        studentId: entry.studentId,
        classId,
        status: "absent",
        date: attendanceDate,
        note: entry.note
      });
    }
  }

  revalidatePath("/teacher/attendance");
  revalidatePath(`/teacher/attendance?classId=${classId}`);
  return { success: true, count: entries.length };
}
