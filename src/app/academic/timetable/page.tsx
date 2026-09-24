import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export default async function AcademicTimetablePage() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["ACADEMIC_ADMIN", "ACADEMIC_HEAD", "ADMIN", "SUPER_ADMIN", "SUPERVISOR"])) {
    redirect("/login");
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const slots = await prisma.timetableSlot.findMany({
    include: {
      class: {
        include: {
          course: true,
          teacher: { include: { user: true } },
          enrollments: { include: { student: { include: { user: true } } } }
        }
      }
    },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }]
  });

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Master Institutional Timetable">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Global Live Schedule Roster</h2>
        <p className="text-xs text-slate-500 mb-4">
          Complete schedule across all faculty instructors and enrolled student groups.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Day</th>
                <th className="p-3">Time Slot</th>
                <th className="p-3">Course / Program</th>
                <th className="p-3">Faculty Instructor</th>
                <th className="p-3">Platform</th>
                <th className="p-3">Enrolled Students</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {slots.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No timetable slots configured in master institutional schedule.
                  </td>
                </tr>
              ) : (
                slots.map((slot) => {
                  const studentCount = slot.class.enrollments.length;
                  const dayName = dayNames[slot.dayOfWeek] || "Mon";
                  return (
                    <tr key={slot.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-aec-navy">{dayName}</td>
                      <td className="p-3 font-mono text-slate-800">
                        {slot.startTime} - {slot.endTime} ({slot.timezone})
                      </td>
                      <td className="p-3 font-semibold text-slate-900">{slot.class.course.title}</td>
                      <td className="p-3 text-slate-700">{slot.class.teacher?.user.name || "Unassigned"}</td>
                      <td className="p-3">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {slot.class.meetingPlatform || "Online"}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">
                        {studentCount} {studentCount === 1 ? "student" : "students"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
