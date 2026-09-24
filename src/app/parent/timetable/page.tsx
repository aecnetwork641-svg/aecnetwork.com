import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentTimetablePage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;
  const childIds = children.map((c) => c.id);

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: { in: childIds } },
    include: {
      student: { include: { user: true } },
      course: true,
      class: {
        include: {
          teacher: { include: { user: true } },
          timetableSlots: true
        }
      }
    }
  });

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const displayDays = [1, 2, 3, 4, 5, 6, 0];

  // Collect all timetable slots with child context
  const allSlots = enrollments.flatMap((enr) => {
    const slots = enr.class?.timetableSlots || [];
    return slots.map((s) => ({
      dayIdx: s.dayOfWeek,
      time: `${s.startTime} - ${s.endTime} (${s.timezone})`,
      course: enr.course.title,
      childName: enr.student.user.name || "Child",
      teacher: enr.class?.teacher?.user?.name || "Teacher",
      platform: enr.class?.meetingPlatform || "Online Live"
    }));
  });

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Family Academic Timetable">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">
          Weekly Household Class Schedule
        </h2>
        <p className="text-xs text-slate-500">
          Consolidated live timetable for all enrolled children.
        </p>

        <div className="mt-6 space-y-4">
          {displayDays.map((dayIdx) => {
            const dayName = dayNames[dayIdx];
            const daySlots = allSlots.filter((t) => t.dayIdx === dayIdx);
            return (
              <div key={dayIdx} className="rounded-xl border border-slate-200/80 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-aec-navy">{dayName}</span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {daySlots.length > 0
                      ? `${daySlots.length} Session${daySlots.length > 1 ? "s" : ""}`
                      : "Free Day"}
                  </span>
                </div>

                <div className="p-4 bg-white">
                  {daySlots.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {daySlots.map((s, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900">{s.course}</span>
                            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                              {s.childName}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">Teacher: {s.teacher}</p>
                          <p className="text-xs font-semibold text-aec-navy mt-1.5">
                            ⏰ {s.time} • {s.platform}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No classes scheduled</p>
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
