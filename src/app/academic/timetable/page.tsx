import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function AcademicMasterTimetablePage() {
  const slots = await prisma.timetableSlot.findMany({
    include: {
      class: {
        include: {
          teacher: { include: { user: true } },
          course: true
        }
      }
    }
  });

  const slotsByDay: Record<number, typeof slots> = {};
  for (let i = 0; i < 7; i++) slotsByDay[i] = [];
  slots.forEach((s) => slotsByDay[s.dayOfWeek]?.push(s));

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Master Timetable">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Institution-wide weekly schedule grid across all classes and teaching faculty.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-7">
        {DAYS.map((dayName, idx) => {
          const daySlots = slotsByDay[idx] || [];
          return (
            <div key={dayName} className="card p-3">
              <div className="border-b border-aec-navy/10 pb-2 text-center">
                <p className="text-xs font-bold uppercase text-aec-navy">{dayName}</p>
                <p className="text-[10px] text-aec-navy/50">{daySlots.length} sessions</p>
              </div>

              <div className="mt-3 space-y-2">
                {daySlots.length === 0 ? (
                  <p className="py-4 text-center text-xs text-aec-navy/30 italic">Clear</p>
                ) : (
                  daySlots.map((s) => (
                    <div
                      key={s.id}
                      className="rounded border border-aec-blue/20 bg-aec-blue/5 p-2 text-xs"
                    >
                      <p className="font-semibold text-aec-navy">{s.startTime} - {s.endTime}</p>
                      <p className="font-medium text-aec-blue truncate">{s.class.name}</p>
                      <p className="text-[10px] text-aec-navy/60 truncate">{s.class.teacher.user.name}</p>
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
