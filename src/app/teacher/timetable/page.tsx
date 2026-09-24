import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherTimetablePage() {
  const scope = await getCurrentTeacherScope();
  if (!scope?.teacher) {
    redirect("/login");
  }

  const { teacher } = scope;
  const teacherClassIds = teacher.classes.map((c) => c.id);

  const slots = await prisma.timetableSlot.findMany({
    where: { classId: { in: teacherClassIds } },
    include: {
      class: {
        include: {
          course: true,
          enrollments: { include: { student: { include: { user: true } } } }
        }
      }
    }
  });

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const displayDays = [1, 2, 3, 4, 5, 6, 0]; // Monday to Sunday

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teacher Weekly Duty Timetable">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">
          {teacher.user.name} — Weekly Faculty Roster
        </h2>
        <p className="text-xs text-slate-500">
          Live synchronized scheduled class sessions and 1-on-1 teaching slots.
        </p>

        <div className="mt-6 space-y-4">
          {displayDays.map((dayIdx) => {
            const dayName = dayNames[dayIdx];
            const daySlots = slots.filter((s) => s.dayOfWeek === dayIdx);
            return (
              <div key={dayIdx} className="rounded-xl border border-slate-200/80 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-aec-navy">{dayName}</span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {daySlots.length > 0
                      ? `${daySlots.length} Session${daySlots.length > 1 ? "s" : ""}`
                      : "No classes assigned"}
                  </span>
                </div>

                <div className="p-4 bg-white">
                  {daySlots.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {daySlots.map((s) => {
                        const studentNames =
                          s.class.enrollments.map((e) => e.student.user.name).join(", ") || "Enrolled Group";
                        return (
                          <div key={s.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-900">{s.class.course.title}</span>
                              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                                {s.class.meetingPlatform || "Online"}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1">Student(s): {studentNames}</p>
                            <p className="text-xs font-semibold text-aec-navy mt-1.5">
                              ⏰ {s.startTime} - {s.endTime} ({s.timezone})
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No assigned sessions</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalShell>
  );
}
