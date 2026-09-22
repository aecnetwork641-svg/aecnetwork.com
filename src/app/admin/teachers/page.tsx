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

export default async function AdminTeachersPage() {
  const teachers = await prisma.teacher.findMany({
    include: {
      user: true,
      classes: { include: { course: true, enrollments: true } }
    },
    orderBy: { hiredAt: "desc" }
  });

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Teacher Faculty Directory">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Faculty instructors, instructional specialties, course loads, and student allocations.
        </p>
      </div>

      <div className="card mt-6">
        {teachers.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No instructors registered in the database.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Teacher Name</th>
                  <th className="py-3 px-2">Faculty ID</th>
                  <th className="py-3 px-2">Specialties</th>
                  <th className="py-3 px-2">Assigned Classes</th>
                  <th className="py-3 px-2">Total Students</th>
                  <th className="py-3 px-2">Hired Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {teachers.map((t) => {
                  const studentCount = t.classes.reduce(
                    (sum, c) => sum + c.enrollments.length,
                    0
                  );
                  return (
                    <tr key={t.id} className="hover:bg-aec-navy/[0.02]">
                      <td className="py-3 px-2">
                        <p className="font-semibold text-aec-navy">{t.user.name}</p>
                        <p className="text-xs text-aec-navy/50">{t.user.email}</p>
                      </td>
                      <td className="py-3 px-2 font-mono text-xs text-aec-navy/70">
                        {t.teacherCode}
                      </td>
                      <td className="py-3 px-2 text-xs">
                        <div className="flex flex-wrap gap-1">
                          {(t.specialties.length > 0 ? t.specialties : ["Instructor"]).map((s) => (
                            <span
                              key={s}
                              className="rounded bg-aec-navy/5 px-2 py-0.5 text-[11px] font-medium text-aec-navy"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-xs">
                        <span className="font-semibold text-aec-navy">{t.classes.length}</span> classes
                      </td>
                      <td className="py-3 px-2 text-xs font-semibold text-aec-blue">
                        {studentCount} learners
                      </td>
                      <td className="py-3 px-2 text-xs text-aec-navy/60">
                        {t.hiredAt.toLocaleDateString()}
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
