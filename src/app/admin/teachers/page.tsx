import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { redirect } from "next/navigation";
import { isOneOf } from "@/lib/permissions";

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
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "HR", "HR_MANAGER", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  const teachers = await prisma.teacher.findMany({
    include: {
      user: true,
      classes: { include: { course: true, enrollments: true } }
    },
    orderBy: { hiredAt: "desc" }
  });

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Teacher Faculty Directory">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          Faculty instructors, instructional specialties, course loads, and student allocations.
        </p>
      </div>

      <div className="card mt-6">
        {teachers.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm font-bold text-slate-700">No teachers registered yet</p>
            <p className="text-xs text-slate-500 mt-1">Register faculty instructors to allocate courses and classes.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-3 px-3">Teacher Name</th>
                  <th className="py-3 px-3">Faculty ID</th>
                  <th className="py-3 px-3">Specialties</th>
                  <th className="py-3 px-3">Assigned Classes</th>
                  <th className="py-3 px-3">Total Students</th>
                  <th className="py-3 px-3">Hired Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teachers.map((t) => {
                  const studentCount = t.classes.reduce((sum, c) => sum + c.enrollments.length, 0);
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-slate-900">{t.user.name}</p>
                        <p className="text-xs text-slate-500">{t.user.email}</p>
                      </td>
                      <td className="py-3 px-3 font-mono text-xs font-bold text-aec-navy">
                        {t.teacherCode}
                      </td>
                      <td className="py-3 px-3 text-xs">
                        <div className="flex flex-wrap gap-1">
                          {t.specialties.length === 0 ? (
                            <span className="text-slate-400 italic">General Faculty</span>
                          ) : (
                            t.specialties.map((s) => (
                              <span
                                key={s}
                                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                              >
                                {s}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-xs">
                        <span className="font-semibold text-slate-800">{t.classes.length}</span> classes
                      </td>
                      <td className="py-3 px-3 text-xs font-bold text-emerald-700">
                        {studentCount} learners
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-600">
                        {new Date(t.hiredAt).toLocaleDateString()}
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
