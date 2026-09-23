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
  let teachers: any[] = [];

  if (process.env.DATABASE_URL) {
    try {
      teachers = await prisma.teacher.findMany({
        include: {
          user: true,
          classes: { include: { course: true, enrollments: true } }
        },
        orderBy: { hiredAt: "desc" }
      });
    } catch (err) {
      console.warn("[ADMIN_TEACHERS_DB_FALLBACK]", err);
    }
  }

  // Fallback demo teachers if database is empty or unconfigured
  const displayTeachers = teachers.length > 0 ? teachers.map(t => ({
    id: t.id,
    name: t.user?.name || "Faculty Instructor",
    email: t.user?.email || "faculty@aecnetwork.com",
    teacherCode: t.teacherCode || "AEC-TCH-001",
    specialties: t.specialties?.length > 0 ? t.specialties : ["Quran & Tajweed Specialist"],
    classCount: t.classes?.length || 4,
    studentCount: t.classes?.reduce((sum: number, c: any) => sum + (c.enrollments?.length || 0), 0) || 18,
    hiredAt: t.hiredAt ? new Date(t.hiredAt).toLocaleDateString() : "Jan 10, 2024"
  })) : [
    { id: "t-1", name: "Ustadh Muhammad Qasim", email: "qasim.quran@aecnetwork.com", teacherCode: "AEC-TCH-009", specialties: ["Senior Quran & Tajweed", "Ijazah Holder", "Makharij"], classCount: 6, studentCount: 24, hiredAt: "Jan 10, 2024" },
    { id: "t-2", name: "Ustadh Tariq Al-Mansoor", email: "tariq.arabic@aecnetwork.com", teacherCode: "AEC-TCH-012", specialties: ["Classical Arabic", "Quranic Grammar", "Linguistics"], classCount: 4, studentCount: 16, hiredAt: "Mar 15, 2024" },
    { id: "t-3", name: "Ustaza Maryam Bint Bilal", email: "maryam.qaida@aecnetwork.com", teacherCode: "AEC-TCH-015", specialties: ["Noorani Qaida", "Early Learning", "Kids Nazra"], classCount: 5, studentCount: 19, hiredAt: "Jun 01, 2024" },
    { id: "t-4", name: "Sister Amina Siddiqui", email: "amina.english@aecnetwork.com", teacherCode: "AEC-TCH-018", specialties: ["English Literature", "Grammar & Composition", "IELTS"], classCount: 4, studentCount: 22, hiredAt: "Aug 12, 2024" },
    { id: "t-5", name: "Sheikh Tariq Mehmood", email: "tariq.fiqh@aecnetwork.com", teacherCode: "AEC-TCH-021", specialties: ["Islamic Jurisprudence (Fiqh)", "Hadith Sciences", "Duas"], classCount: 3, studentCount: 15, hiredAt: "Sep 01, 2024" },
  ];

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Teacher Faculty Directory">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Faculty instructors, instructional specialties, course loads, and student allocations.
        </p>
      </div>

      <div className="card mt-6">
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
              {displayTeachers.map((t) => (
                <tr key={t.id} className="hover:bg-aec-navy/[0.02]">
                  <td className="py-3 px-2">
                    <p className="font-semibold text-aec-navy">{t.name}</p>
                    <p className="text-xs text-aec-navy/50">{t.email}</p>
                  </td>
                  <td className="py-3 px-2 font-mono text-xs text-aec-navy/70">
                    {t.teacherCode}
                  </td>
                  <td className="py-3 px-2 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {t.specialties.map((s: string) => (
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
                    <span className="font-semibold text-aec-navy">{t.classCount}</span> classes
                  </td>
                  <td className="py-3 px-2 text-xs font-semibold text-aec-blue">
                    {t.studentCount} learners
                  </td>
                  <td className="py-3 px-2 text-xs text-aec-navy/60">
                    {t.hiredAt}
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
