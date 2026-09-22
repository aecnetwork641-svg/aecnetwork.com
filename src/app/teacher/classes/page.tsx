import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TeacherClassesPage() {
  const scope = await getCurrentTeacherScope();

  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        include: {
          course: true,
          enrollments: { include: { student: { include: { user: true } } } },
          timetableSlots: true,
          sections: true
        }
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="My Classes">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-aec-navy/70">
            All active class cohorts assigned to you.
          </p>
        </div>
        <ScopedDataNote text="Strictly scoped: You can only view classes assigned to your teacher account." />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {classes.length === 0 ? (
          <div className="card col-span-2 py-12 text-center text-sm text-aec-navy/50">
            No classes assigned. Contact your Academic Head to enroll students or allocate a new class cohort.
          </div>
        ) : (
          classes.map((c) => (
            <div key={c.id} className="card flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-aec-navy">{c.name}</h3>
                    <p className="text-xs font-medium text-aec-blue">{c.course.title}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {c.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-aec-navy/80">
                  <p>
                    <span className="font-semibold text-aec-navy">Enrolled Cohort:</span> {c.enrollments.length} Students (Capacity: {c.capacity})
                  </p>
                  <p>
                    <span className="font-semibold text-aec-navy">Platform:</span> {c.meetingPlatform}
                  </p>
                  <p>
                    <span className="font-semibold text-aec-navy">Timezone:</span> {c.timezone}
                  </p>
                  {c.timetableSlots.length > 0 && (
                    <div className="mt-2 rounded bg-aec-navy/5 p-2 text-xs">
                      <p className="font-semibold text-aec-navy">Scheduled Timetable:</p>
                      {c.timetableSlots.map((s) => (
                        <p key={s.id} className="text-aec-navy/70">
                          Day {s.dayOfWeek}: {s.startTime} - {s.endTime}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-aec-navy/10 pt-4">
                <Link
                  href={`/teacher/attendance?classId=${c.id}`}
                  className="rounded bg-aec-blue px-3 py-1.5 text-xs font-medium text-white hover:bg-aec-blue/90"
                >
                  Mark Attendance
                </Link>
                <Link
                  href={`/teacher/students?classId=${c.id}`}
                  className="rounded bg-aec-navy/10 px-3 py-1.5 text-xs font-medium text-aec-navy hover:bg-aec-navy/20"
                >
                  View Students ({c.enrollments.length})
                </Link>
                {c.meetingLink && (
                  <a
                    href={c.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-aec-navy/20 px-3 py-1.5 text-xs font-medium text-aec-navy hover:bg-aec-navy/5"
                  >
                    Open Meeting Link
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
