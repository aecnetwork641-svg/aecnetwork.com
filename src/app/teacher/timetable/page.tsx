import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function TeacherTimetablePage() {
  const scope = await getCurrentTeacherScope();

  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        include: {
          course: true,
          timetableSlots: true
        }
      })
    : [];

  // Group slots by day
  const slotsByDay: Record<number, { class: typeof classes[0]; slot: typeof classes[0]["timetableSlots"][0] }[]> = {};
  for (let i = 0; i < 7; i++) {
    slotsByDay[i] = [];
  }

  classes.forEach((c) => {
    c.timetableSlots.forEach((slot) => {
      slotsByDay[slot.dayOfWeek]?.push({ class: c, slot });
    });
  });

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teaching Timetable">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Your scheduled weekly instructional timetable.
        </p>
        <ScopedDataNote text="Filtered strictly to classes assigned to your teacher account." />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-7">
        {DAYS.map((dayName, dayIndex) => {
          const daySlots = slotsByDay[dayIndex] || [];
          return (
            <div key={dayName} className="card p-3">
              <div className="border-b border-aec-navy/10 pb-2 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-aec-navy">{dayName}</p>
                <p className="text-[10px] text-aec-navy/50">{daySlots.length} sessions</p>
              </div>

              <div className="mt-3 space-y-2">
                {daySlots.length === 0 ? (
                  <p className="py-4 text-center text-xs text-aec-navy/30 italic">No classes</p>
                ) : (
                  daySlots.map(({ class: c, slot }) => (
                    <div
                      key={slot.id}
                      className="rounded border border-aec-blue/20 bg-aec-blue/5 p-2 text-xs"
                    >
                      <p className="font-semibold text-aec-navy">{slot.startTime} - {slot.endTime}</p>
                      <p className="font-medium text-aec-blue truncate">{c.name}</p>
                      <p className="text-[10px] text-aec-navy/60 truncate">{c.course.title}</p>
                      {c.meetingLink && (
                        <a
                          href={c.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-[10px] text-aec-navy font-semibold underline hover:text-aec-blue"
                        >
                          Join Class
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PortalShell>
  );
}
