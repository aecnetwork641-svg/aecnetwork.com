import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function AcademicReportsPage() {
  const [reports, teachers] = await Promise.all([
    prisma.progressReport.findMany({
      include: {
        student: { include: { user: true } },
        course: true,
        term: true
      },
      orderBy: { issuedAt: "desc" },
      take: 30
    }),
    prisma.teacher.findMany({
      include: {
        user: true,
        classes: { include: { enrollments: true } }
      }
    })
  ]);

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Academic Reports & Faculty Workload">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Progress Reports */}
        <div className="card">
          <h3 className="font-bold text-aec-navy text-base border-b border-aec-navy/10 pb-3">
            Issued Term Progress Reports
          </h3>
          {reports.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">
              No formal progress reports generated for the current term yet.
            </p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {reports.map((r) => (
                <div key={r.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-aec-navy">{r.student.user.name}</p>
                    <p className="text-aec-navy/50">{r.course.title} {r.term ? `• ${r.term.name}` : ""}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">
                      {r.academicGrade || "Good Standing"}
                    </span>
                    <p className="text-[10px] text-aec-navy/40 mt-0.5">{r.issuedAt.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Faculty Workload Analysis */}
        <div className="card">
          <h3 className="font-bold text-aec-navy text-base border-b border-aec-navy/10 pb-3">
            Teacher Workload Distribution
          </h3>
          {teachers.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">No instructors registered.</p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {teachers.map((t) => {
                const totalStudents = t.classes.reduce((sum, c) => sum + c.enrollments.length, 0);
                return (
                  <div key={t.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-aec-navy">{t.user.name}</p>
                      <p className="text-aec-navy/50">{t.specialties.join(", ") || "General Instructor"}</p>
                    </div>
                    <div className="text-right space-y-0.5">
                      <p className="font-semibold text-aec-navy">{t.classes.length} Classes</p>
                      <p className="text-[11px] text-aec-blue">{totalStudents} Total Students</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  );
}
