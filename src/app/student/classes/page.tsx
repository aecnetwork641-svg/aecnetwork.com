import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentClassesPage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.studentId) {
    redirect("/login?error=AccessDenied");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: scope.studentId, status: "active" },
    include: {
      course: true,
      class: {
        include: {
          teacher: { include: { user: true } },
          timetableSlots: true
        }
      }
    }
  });

  const enrolledClasses = enrollments.filter((e) => e.class).map((e) => e.class!);

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="My Live Classes & Sessions">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">Enrolled Live Cohorts</h2>
            <p className="text-xs text-slate-600 mt-1">
              Join your 1-on-1 personalized sessions at scheduled times. Ensure microphone and camera readiness.
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1">
            {enrolledClasses.length} Active Classes
          </span>
        </div>

        {enrolledClasses.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm font-bold text-slate-800">No active class cohorts assigned yet</p>
            <p className="text-xs text-slate-500 mt-1">You will receive an automated notification when your tutor assigns your class schedule.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {enrolledClasses.map((cls) => {
              const scheduleSummary = cls.timetableSlots
                .map((s) => {
                  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                  return `${dayNames[s.dayOfWeek]} ${s.startTime}-${s.endTime}`;
                })
                .join(" • ") || "Schedule pending";

              return (
                <div
                  key={cls.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 transition hover:bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2 py-0.5 rounded-md">
                        {cls.name}
                      </span>
                      <span className="text-xs text-slate-500">Platform: {cls.meetingPlatform}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 mt-1.5">{cls.name}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Instructor: <strong className="text-slate-800">{cls.teacher.user.name}</strong>
                    </p>
                    <p className="text-xs font-semibold text-emerald-800 mt-1 flex items-center gap-1.5">
                      <span>⏰ Weekly Timetable: {scheduleSummary}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {cls.meetingLink ? (
                      <a
                        href={cls.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                      >
                        Join Live Class
                      </a>
                    ) : (
                      <span className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs text-slate-600 font-medium">
                        Meeting Link Pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
