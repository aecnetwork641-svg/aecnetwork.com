import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";

export default async function ParentClassesPage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Flatten all classes for all children
  const classItems = children.flatMap((child) => {
    return child.enrollments.map((enr) => {
      const cls = enr.class;
      const nextSlot = cls?.timetableSlots?.[0];
      const timeStr = nextSlot
        ? `${dayNames[nextSlot.dayOfWeek] || "Class"} ${nextSlot.startTime} - ${nextSlot.endTime} (${nextSlot.timezone})`
        : "Mon / Wed 16:00 - 17:00 UTC";

      return {
        childId: child.id,
        childName: child.user.name || "Student",
        courseTitle: enr.course.title,
        teacherName: cls?.teacher?.user?.name || "Senior Ustadh",
        scheduleTime: timeStr,
        meetLink: cls?.meetingLink || "https://meet.google.com/aec-live-class"
      };
    });
  });

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Live Class Sessions & Parent Observer Links">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">
          Scheduled Classes for Your Children
        </h2>
        <p className="text-xs text-slate-500">
          Parents are welcome to observe lessons or check on child class participation at any time.
        </p>

        {classItems.length === 0 ? (
          <div className="mt-6 p-8 text-center text-slate-400 text-xs rounded-xl border border-slate-100 bg-slate-50">
            No active class schedules found for your registered children.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {classItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2.5 py-0.5 rounded-full">
                    {item.childName}
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900 mt-2">
                    {item.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Instructor: <strong>{item.teacherName}</strong> • Time:{" "}
                    <span className="font-semibold text-emerald-700">{item.scheduleTime}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={item.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-4 py-2"
                  >
                    Join / Observe Session
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
