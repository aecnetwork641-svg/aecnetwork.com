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

export default async function AdminStudentsPage() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "ADMISSIONS", "ADMISSIONS_OFFICER", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          Enrolled students, guardian links, assigned courses, and tuition account status.
        </p>
        <Link
          href="/admin/admissions"
          className="btn-primary text-xs px-4 py-2 self-start sm:self-auto"
        >
          + Enroll From Admissions
        </Link>
      </div>

      <div className="card mt-6">
        {students.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm font-bold text-slate-700">No students enrolled yet</p>
            <p className="text-xs text-slate-500 mt-1">Review admissions applications to convert leads into enrolled students.</p>
            <Link href="/admin/admissions" className="mt-4 btn-secondary inline-block text-xs">
              Go to Admissions CRM
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-3 px-3">Student</th>
                  <th className="py-3 px-3">Student ID</th>
                  <th className="py-3 px-3">Guardian / Parent</th>
                  <th className="py-3 px-3">Enrolled Courses</th>
                  <th className="py-3 px-3">Enrolled Date</th>
                  <th className="py-3 px-3">Billing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => {
                  const unpaidCount = s.invoices.filter((i) => i.status === "unpaid").length;
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-slate-900">{s.user.name}</p>
                        <p className="text-xs text-slate-500">{s.user.email}</p>
                      </td>
                      <td className="py-3 px-3 font-mono text-xs font-bold text-aec-navy">
                        {s.studentCode}
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-700">
                        {s.guardian?.user.name ? (
                          <>
                            <span className="font-medium block">{s.guardian.user.name}</span>
                            <span className="text-[11px] text-slate-400">{s.guardian.user.email}</span>
                          </>
                        ) : (
                          <span className="text-slate-400 italic">Self / Unlinked</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-xs">
                        {s.enrollments.length === 0 ? (
                          <span className="text-slate-400 italic">None</span>
                        ) : (
                          s.enrollments.map((e) => (
                            <span key={e.id} className="block font-medium text-slate-800">
                              {e.course.title}
                            </span>
                          ))
                        )}
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-600">
                        {new Date(s.enrolledAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-xs">
                        {unpaidCount === 0 ? (
                          <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 font-bold text-[11px]">
                            Cleared
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 font-bold text-[11px]">
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
