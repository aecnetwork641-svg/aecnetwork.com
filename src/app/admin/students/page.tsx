import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Students", href: "/admin/students" },
  { label: "Teachers", href: "/admin/teachers" },
  { label: "Academics", href: "/admin/academics" },
  { label: "Admissions", href: "/admin/admissions" },
  { label: "Finance", href: "/admin/finance" },
  { label: "HR", href: "/admin/hr" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Communication", href: "/admin/communication" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Audit Logs", href: "/admin/audit-logs" }
];

export default async function AdminStudentsPage() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      guardian: { include: { user: true } },
      enrollments: { include: { course: true, class: true } },
      invoices: true
    },
    orderBy: { enrolledAt: "desc" }
  });

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Student Directory & Roster">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Enrolled students, guardian links, assigned courses, and tuition account status.
        </p>
      </div>

      <div className="card mt-6">
        {students.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No students registered in the database.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Student</th>
                  <th className="py-3 px-2">Student ID</th>
                  <th className="py-3 px-2">Guardian / Parent</th>
                  <th className="py-3 px-2">Enrolled Courses</th>
                  <th className="py-3 px-2">Enrolled Since</th>
                  <th className="py-3 px-2">Billing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {students.map((s) => {
                  const unpaidCount = s.invoices.filter((i) => i.status === "unpaid").length;
                  return (
                    <tr key={s.id} className="hover:bg-aec-navy/[0.02]">
                      <td className="py-3 px-2">
                        <p className="font-semibold text-aec-navy">{s.user.name}</p>
                        <p className="text-xs text-aec-navy/50">{s.user.email}</p>
                      </td>
                      <td className="py-3 px-2 font-mono text-xs text-aec-navy/70">
                        {s.studentCode}
                      </td>
                      <td className="py-3 px-2 text-xs text-aec-navy/70">
                        {s.guardian?.user.name || "None on file"}
                      </td>
                      <td className="py-3 px-2 text-xs">
                        {s.enrollments.map((e) => (
                          <span key={e.id} className="block font-medium text-aec-navy">
                            {e.course.title}
                          </span>
                        ))}
                      </td>
                      <td className="py-3 px-2 text-xs text-aec-navy/60">
                        {s.enrolledAt.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2 text-xs">
                        {unpaidCount === 0 ? (
                          <span className="rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                            Current
                          </span>
                        ) : (
                          <span className="rounded bg-amber-50 px-2 py-0.5 font-semibold text-amber-700">
                            {unpaidCount} Dues Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
