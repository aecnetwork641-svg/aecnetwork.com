import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";
import AttendanceMarker from "./AttendanceMarker";
import Link from "next/link";

interface Props {
  searchParams: { classId?: string; date?: string };
}

export default async function TeacherAttendancePage({ searchParams }: Props) {
  const scope = await getCurrentTeacherScope();

  // Find classes assigned to this teacher
  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        include: {
          course: true,
          enrollments: {
            include: {
              student: {
                include: {
                  user: true,
                  attendances: true
                }
              }
            }
          }
        }
      })
    : [];

  const selectedClass =
    (searchParams.classId && classes.find((c) => c.id === searchParams.classId)) ||
    classes[0] ||
    null;

  const todayStr: string = new Date().toISOString().split("T")[0] ?? "2026-09-22";
  const queryDate: Date = searchParams.date ? new Date(searchParams.date) : new Date(todayStr);

  // Existing attendance records for selected class and date
  const existingAttendance = selectedClass
    ? await prisma.attendance.findMany({
        where: {
          classId: selectedClass.id,
          date: queryDate
        }
      })
    : [];

  const existingMap = new Map(existingAttendance.map((a) => [a.studentId, a]));

  const studentList = selectedClass
    ? selectedClass.enrollments.map((e) => {
        const existing = existingMap.get(e.studentId);
        return {
          id: e.student.id,
          name: e.student.user.name,
          code: e.student.studentCode,
          currentStatus: existing?.status,
          note: existing?.note || undefined
        };
      })
    : [];

  // Recent attendance history for selected class
  const recentHistory = selectedClass
    ? await prisma.attendance.findMany({
        where: { classId: selectedClass.id },
        orderBy: { date: "desc" },
        take: 25,
        include: { student: { include: { user: true } } }
      })
    : [];

  const totalHistory = recentHistory.length;
  const presentHistory = recentHistory.filter((h) => h.status === "present").length;
  const classAttPercentage =
    totalHistory > 0 ? Math.round((presentHistory / totalHistory) * 100) : null;

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Class Attendance">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-aec-navy/70">
          Mark daily attendance for each class cohort and track attendance percentages.
        </p>
        <ScopedDataNote text="Strict scoping: Only students and classes assigned to you are displayed." />
      </div>

      {/* Class Switcher */}
      {classes.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-aec-navy/10 pb-3">
          <span className="text-xs font-semibold text-aec-navy">Select Class:</span>
          {classes.map((c) => (
            <Link
              key={c.id}
              href={`/teacher/attendance?classId=${c.id}`}
              className={`rounded px-3 py-1.5 text-xs font-medium ${
                selectedClass?.id === c.id
                  ? "bg-aec-navy text-white"
                  : "bg-aec-navy/5 text-aec-navy hover:bg-aec-navy/10"
              }`}
            >
              {c.name} ({c.enrollments.length})
            </Link>
          ))}
        </div>
      )}

      {selectedClass ? (
        <div className="mt-6 space-y-6">
          {/* Summary metrics for selected class */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card">
              <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Cohort Rate</p>
              <p className="mt-1 text-2xl font-bold text-aec-navy">
                {classAttPercentage !== null ? `${classAttPercentage}%` : "—"}
              </p>
              <p className="text-xs text-aec-navy/60">Historical average across records</p>
            </div>
            <div className="card">
              <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Active Students</p>
              <p className="mt-1 text-2xl font-bold text-aec-navy">{studentList.length}</p>
              <p className="text-xs text-aec-navy/60">Rostered in {selectedClass.name}</p>
            </div>
            <div className="card">
              <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Absence Policy</p>
              <p className="mt-1 text-sm font-medium text-emerald-700">Auto Parent Alert</p>
              <p className="text-xs text-aec-navy/60">Triggered on &apos;Absent&apos; submit</p>
            </div>
          </div>

          {/* Interactive marker */}
          <AttendanceMarker
            classId={selectedClass.id}
            className={selectedClass.name}
            initialDate={todayStr}
            students={studentList}
          />

          {/* Recent class attendance records */}
          <div className="card">
            <h3 className="font-bold text-aec-navy text-base border-b border-aec-navy/10 pb-3">
              Recent Attendance Log — {selectedClass.name}
            </h3>
            {recentHistory.length === 0 ? (
              <p className="py-6 text-center text-xs text-aec-navy/50">
                No past attendance records found for this cohort.
              </p>
            ) : (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-aec-navy/10 text-aec-navy/50 uppercase">
                      <th className="py-2 px-2">Date</th>
                      <th className="py-2 px-2">Student</th>
                      <th className="py-2 px-2">Status</th>
                      <th className="py-2 px-2">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-aec-navy/5">
                    {recentHistory.map((h) => (
                      <tr key={h.id}>
                        <td className="py-2 px-2 text-aec-navy/70">{h.date.toDateString()}</td>
                        <td className="py-2 px-2 font-medium text-aec-navy">{h.student.user.name}</td>
                        <td className="py-2 px-2">
                          <span
                            className={`inline-block rounded px-2 py-0.5 font-medium capitalize ${
                              h.status === "present"
                                ? "bg-emerald-50 text-emerald-700"
                                : h.status === "absent"
                                ? "bg-rose-50 text-rose-700"
                                : h.status === "late"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {h.status}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-aec-navy/60">{h.note || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card mt-6 py-12 text-center text-sm text-aec-navy/50">
          No classes assigned to this account.
        </div>
      )}
    </PortalShell>
  );
}
