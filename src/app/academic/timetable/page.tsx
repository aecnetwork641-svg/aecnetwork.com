import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";
import { DEMO_TIMETABLE } from "@/lib/student-demo-data";

export default function AcademicTimetablePage() {
  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Master Institutional Timetable">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Global Live Schedule Roster</h2>
        <p className="text-xs text-slate-500 mb-4">Complete schedule across all teachers and student enrollments.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Day</th>
                <th className="p-3">Time Slot</th>
                <th className="p-3">Course / Program</th>
                <th className="p-3">Faculty Instructor</th>
                <th className="p-3">Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DEMO_TIMETABLE.map((slot, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-aec-navy">{slot.day}</td>
                  <td className="p-3 font-mono text-slate-800">{slot.time}</td>
                  <td className="p-3 font-semibold text-slate-900">{slot.course}</td>
                  <td className="p-3 text-slate-700">{slot.teacher}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {slot.platform}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
