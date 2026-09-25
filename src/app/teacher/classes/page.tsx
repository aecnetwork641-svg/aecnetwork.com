import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherClassesPage() {
  const scope = await getCurrentTeacherScope();
  if (!scope?.teacher) {
    redirect("/login");
  }

  const { teacher } = scope;
  const teacherClassIds = (teacher.classes || []).map((c: any) => c.id);

  const classes = await prisma.class.findMany({
    where: { id: { in: teacherClassIds } },
    include: {
      course: true,
      enrollments: {
        include: {
          student: { include: { user: true } }
        }
      },
      timetableSlots: true
    }
  });

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teacher Live Classes & Launch Deck">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">
          Assigned Live Teaching Sessions
        </h2>
        <p className="text-xs text-slate-500">
          Click &ldquo;Start Session&rdquo; to launch Google Meet / Zoom with student audio-video.
        </p>

        {classes.length === 0 ? (
          <div className="mt-6 p-8 text-center text-slate-400 text-xs rounded-xl border border-slate-100 bg-slate-50">
            No live classes assigned to your faculty profile currently.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {classes.map((cls) => {
              const studentNames =
                cls.enrollments.map((e) => e.student.user.name).join(", ") || "Enrolled Cohort";
              const firstStudent = cls.enrollments[0]?.student;
              const slot = cls.timetableSlots[0];
              const timeStr = slot
                ? `${dayNames[slot.dayOfWeek] || "Class"} ${slot.startTime} - ${slot.endTime} (${slot.timezone})`
                : "Active Teaching Schedule";

              return (
                <div
                  key={cls.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 transition hover:border-slate-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{studentNames}</span>
                        {firstStudent && (
                          <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                            {firstStudent.studentCode}
                          </span>
                        )}
                        <span className="text-xs text-slate-500">({cls.meetingPlatform || "Online"})</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-aec-navy mt-1">
                        {cls.course.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        <strong>Class Name:</strong> {cls.name}
                      </p>
                      <p className="text-xs font-semibold text-emerald-800 mt-1">
                        ⏰ Scheduled: {timeStr}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={cls.meetingLink || "https://meet.google.com/aec-live-class"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700"
                      >
                        Start Session
                      </a>
                    </div>
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
