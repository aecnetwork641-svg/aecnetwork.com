import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function HREmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      user: true,
      department: true,
      leaveRequests: true,
      salaryComponents: true
    },
    orderBy: { hiredAt: "desc" }
  });

  return (
    <PortalShell role="HR Management Portal" navItems={HR_NAV} title="Employee Directory">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Faculty, administrative staff, emergency contacts, and active employment records.
        </p>
      </div>

      <div className="card mt-6">
        {employees.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No employees registered in the database.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Employee Name</th>
                  <th className="py-3 px-2">Code</th>
                  <th className="py-3 px-2">Department</th>
                  <th className="py-3 px-2">Position / Designation</th>
                  <th className="py-3 px-2">Hired Date</th>
                  <th className="py-3 px-2">Leave Balances</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-3 px-2">
                      <p className="font-semibold text-aec-navy">{emp.user.name}</p>
                      <p className="text-xs text-aec-navy/50">{emp.user.email}</p>
                    </td>
                    <td className="py-3 px-2 font-mono text-xs text-aec-navy/70">
                      {emp.employeeCode}
                    </td>
                    <td className="py-3 px-2 text-xs font-medium text-aec-navy">
                      {emp.department?.name || "General Faculty"}
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-navy/70">
                      {emp.position}
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-navy/60">
                      {emp.hiredAt.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 text-xs">
                      <span className="font-semibold text-aec-navy">AL: {emp.annualLeaveBal}d</span>
                      <span className="text-aec-navy/50 ml-1.5">SL: {emp.sickLeaveBal}d</span>
                    </td>
                    <td className="py-3 px-2 text-xs">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold capitalize text-emerald-700">
                        {emp.status}
                      </span>
                    </td>
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
