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
  let students: any[] = [];

  if (process.env.DATABASE_URL) {
    try {
      students = await prisma.student.findMany({
        include: {
          user: true,
          guardian: { include: { user: true } },
          enrollments: { include: { course: true, class: true } },
          invoices: true
        },
        orderBy: { enrolledAt: "desc" }
      });
    } catch (err) {
      console.warn("[ADMIN_STUDENTS_DB_FALLBACK]", err);
    }
  }

  // Fallback demo students if database is empty or unconfigured
  const displayStudents = students.length > 0 ? students.map(s => ({
    id: s.id,
    name: s.user?.name || "Enrolled Student",
    email: s.user?.email || "student@aecnetwork.com",
    studentCode: s.studentCode || "AEC-STD-001",
    guardianName: s.guardian?.user?.name || "Guardian on Record",
    courses: s.enrollments?.map((e: any) => e.course?.title || "Enrolled Course") || ["Quran & Tajweed"],
    enrolledAt: s.enrolledAt ? new Date(s.enrolledAt).toLocaleDateString() : "Jan 15, 2026",
    unpaidCount: s.invoices?.filter((i: any) => i.status === "unpaid").length || 0
  })) : [
    { id: "s-1", name: "Abdullah Akbar", email: "sohailakbar560@gmail.com", studentCode: "AEC-STD-1001", guardianName: "Sohail Akbar", courses: ["Advanced Tajweed Mastery", "Hifz Circle"], enrolledAt: "Jan 15, 2026", unpaidCount: 0 },
    { id: "s-2", name: "Fatima Akbar", email: "sohailakbar560@gmail.com", studentCode: "AEC-STD-1002", guardianName: "Sohail Akbar", courses: ["Noorani Qaida for Kids"], enrolledAt: "Jan 18, 2026", unpaidCount: 0 },
    { id: "s-3", name: "Zaid Bin Tariq", email: "tariq.fam@gmail.com", studentCode: "AEC-STD-1003", guardianName: "Tariq Mehmood", courses: ["English Composition & Grammar"], enrolledAt: "Feb 02, 2026", unpaidCount: 0 },
    { id: "s-4", name: "Hamza Farooq", email: "farooq.h@yahoo.com", studentCode: "AEC-STD-1004", guardianName: "Farooq Ahmed", courses: ["Spoken Arabic Conversational"], enrolledAt: "Feb 10, 2026", unpaidCount: 0 },
    { id: "s-5", name: "Ibrahim Malik (UK)", email: "malik.uk@outlook.com", studentCode: "AEC-STD-1005", guardianName: "Dr. Usman Malik", courses: ["Islamic Jurisprudence (Fiqh)"], enrolledAt: "Mar 01, 2026", unpaidCount: 0 },
  ];

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Student Directory & Roster">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Enrolled students, guardian links, assigned courses, and tuition account status.
        </p>
      </div>

      <div className="card mt-6">
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
              {displayStudents.map((s) => (
                <tr key={s.id} className="hover:bg-aec-navy/[0.02]">
                  <td className="py-3 px-2">
                    <p className="font-semibold text-aec-navy">{s.name}</p>
                    <p className="text-xs text-aec-navy/50">{s.email}</p>
                  </td>
                  <td className="py-3 px-2 font-mono text-xs text-aec-navy/70">
                    {s.studentCode}
                  </td>
                  <td className="py-3 px-2 text-xs text-aec-navy/70">
                    {s.guardianName}
                  </td>
                  <td className="py-3 px-2 text-xs">
                    {s.courses.map((c: string, idx: number) => (
                      <span key={idx} className="block font-medium text-aec-navy">
                        {c}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-2 text-xs text-aec-navy/60">
                    {s.enrolledAt}
                  </td>
                  <td className="py-3 px-2 text-xs">
                    {s.unpaidCount === 0 ? (
                      <span className="rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                        Current
                      </span>
                    ) : (
                      <span className="rounded bg-amber-50 px-2 py-0.5 font-semibold text-amber-700">
                        {s.unpaidCount} Dues Pending
                      </span>
                    )}
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
