import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentTimetablePage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.studentId) {
    redirect("/login?error=AccessDenied");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: scope.studentId, status: "active", classId: { not: null } },
    include: {
      class: {
        include: {
          teacher: { include: { user: true } },
          course: true,
          timetableSlots: true
        }
      }
    }
  });

  const allSlots: any[] = [];
  enrollments.forEach((e) => {
    if (e.class) {
      e.class.timetableSlots.forEach((slot) => {
        allSlots.push({
          ...slot,
          className: e.class!.name,
          courseName: e.class!.course.title,
          teacherName: e.class!.teacher.user.name,
          platform: e.class!.meetingPlatform,
          link: e.class!.meetingLink
        });
      });
    }
  });

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Weekly Academic Timetable">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Current Academic Schedule</h2>
            <p className="text-xs text-slate-500">Scheduled 1-on-1 and interactive group cohort sessions.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-aec-navy/10 text-aec-navy">
            {allSlots.length} Weekly Sessions
          </span>
        </div>

        {/* Timetable Days Accordion/Grid */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 0].map((dayIndex) => {
            const dayName = dayNames[dayIndex];
            const slotsForDay = allSlots.filter((s) => s.dayOfWeek === dayIndex);

            return (
              <div key={dayIndex} className="rounded-xl border border-slate-200/80 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-aec-navy">{dayName}</span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {slotsForDay.length > 0 ? `${slotsForDay.length} Class${slotsForDay.length > 1 ? "es" : ""}` : "No classes scheduled"}
                  </span>
                </div>

                <div className="p-4 bg-white">
                  {slotsForDay.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {slotsForDay.map((s, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-900">{s.courseName}</span>
                              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                                {s.platform}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1">Class: {s.className} &bull; Instructor: {s.teacherName}</p>
                          </div>
                          <p className="text-xs font-semibold text-aec-navy mt-2 flex items-center gap-1.5">
                            <span>⏰ {s.startTime} - {s.endTime} ({s.timezone})</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Self-study & revision</p>
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
