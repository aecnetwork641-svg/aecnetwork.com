import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "../_nav";

export default function HREmployeesPage() {
  const staff = [
    { code: "AEC-TCH-009", name: "Ustadh Muhammad Qasim", role: "Senior Quran & Tajweed Faculty", dept: "Quranic Sciences", hired: "Jan 2024", status: "Active" },
    { code: "AEC-TCH-012", name: "Ustadh Tariq Al-Mansoor", role: "Arabic Language Instructor", dept: "Arabic Department", hired: "Mar 2024", status: "Active" },
    { code: "AEC-TCH-015", name: "Ustaza Maryam Bint Bilal", role: "Noorani Qaida Specialist", dept: "Early Learning", hired: "Jun 2024", status: "Active" },
    { code: "AEC-TCH-018", name: "Sister Amina Siddiqui", role: "English & Composition Lead", dept: "Languages", hired: "Aug 2024", status: "Active" },
    { code: "AEC-ADM-002", name: "Farooq Ahmed", role: "Senior Academic Counselor", dept: "Admissions & Counseling", hired: "Feb 2024", status: "Active" },
  ];

  return (
    <PortalShell role="HR & Payroll" navItems={HR_NAV} title="Faculty & Staff Directory">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Faculty & Personnel Roster ({staff.length})</h3>
          <button onClick={() => {}} className="btn-primary text-xs px-3 py-1.5">
            + Onboard New Faculty
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Employee Code</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Designation / Role</th>
                <th className="p-3">Department</th>
                <th className="p-3">Hired Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {staff.map((s) => (
                <tr key={s.code} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-aec-navy">{s.code}</td>
                  <td className="p-3 font-bold text-slate-900">{s.name}</td>
                  <td className="p-3 text-slate-700 font-medium">{s.role}</td>
                  <td className="p-3 text-slate-500">{s.dept}</td>
                  <td className="p-3 text-slate-500">{s.hired}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {s.status}
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
