import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "../_nav";

export default function HRAttendancePage() {
  const staffAttendance = [
    { name: "Ustadh Muhammad Qasim", checkIn: "08:50 AM", checkOut: "— (Active)", sessionsToday: "4 Classes", status: "On Duty" },
    { name: "Ustadh Tariq Al-Mansoor", checkIn: "09:00 AM", checkOut: "— (Active)", sessionsToday: "3 Classes", status: "On Duty" },
    { name: "Ustaza Maryam Bint Bilal", checkIn: "08:55 AM", checkOut: "— (Active)", sessionsToday: "3 Classes", status: "On Duty" },
    { name: "Sister Amina Siddiqui", checkIn: "09:10 AM", checkOut: "— (Active)", sessionsToday: "2 Classes", status: "On Duty" },
  ];

  return (
    <PortalShell role="HR & Payroll" navItems={HR_NAV} title="Staff & Faculty Attendance Roster">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Today&apos;s Faculty Clock-In Status</h3>
          <span className="text-xs text-slate-500">Live Synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Clock-In Time</th>
                <th className="p-3">Clock-Out Time</th>
                <th className="p-3">Live Sessions</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {staffAttendance.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{row.name}</td>
                  <td className="p-3 font-mono text-slate-700">{row.checkIn}</td>
                  <td className="p-3 text-slate-400">{row.checkOut}</td>
                  <td className="p-3 text-aec-navy font-semibold">{row.sessionsToday}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {row.status}
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
