import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function HRAttendancePage() {
  const records = await prisma.staffAttendance.findMany({
    take: 50,
    orderBy: { date: "desc" },
    include: {
      employee: {
        include: { user: true, department: true }
      }
    }
  });

  const presentCount = records.filter((r) => r.status === "present").length;
  const absentCount = records.filter((r) => r.status === "absent").length;
  const lateCount = records.filter((r) => r.status === "late").length;
  const leaveCount = records.filter((r) => r.status === "leave").length;

  return (
    <PortalShell role="HR Management Portal" navItems={HR_NAV} title="Staff & Faculty Attendance">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Present Logs</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{presentCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Absences</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">{absentCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Late Check-ins</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{lateCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">On Approved Leave</p>
          <p className="mt-1 text-2xl font-bold text-aec-blue">{leaveCount}</p>
        </div>
      </div>

      <div className="card mt-6">
        <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
          Daily Staff Attendance Log
        </h3>
        {records.length === 0 ? (
          <p className="py-8 text-center text-xs text-aec-navy/50">No staff attendance records logged yet.</p>
        ) : (
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-aec-navy/10 text-aec-navy/50 uppercase">
                  <th className="py-2.5 px-2">Date</th>
                  <th className="py-2.5 px-2">Staff Member</th>
                  <th className="py-2.5 px-2">Department</th>
                  <th className="py-2.5 px-2">Check In</th>
                  <th className="py-2.5 px-2">Check Out</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {records.map((r) => (
                  <tr key={r.id}>
                    <td className="py-2 px-2 text-aec-navy/70">{r.date.toLocaleDateString()}</td>
                    <td className="py-2 px-2 font-medium text-aec-navy">{r.employee.user.name}</td>
                    <td className="py-2 px-2 text-aec-navy/60">{r.employee.department?.name || "General"}</td>
                    <td className="py-2 px-2 text-aec-navy/70">{r.checkIn || "09:00"}</td>
                    <td className="py-2 px-2 text-aec-navy/70">{r.checkOut || "17:00"}</td>
                    <td className="py-2 px-2">
                      <span
                        className={`rounded px-2 py-0.5 font-semibold capitalize text-[11px] ${
                          r.status === "present"
                            ? "bg-emerald-50 text-emerald-700"
                            : r.status === "absent"
                            ? "bg-rose-50 text-rose-700"
                            : r.status === "late"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-aec-navy/50 italic">{r.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
