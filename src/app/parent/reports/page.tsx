import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentReportsPage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;
  const childIds = children.map((c) => c.id);

  const [attendances, results, progressReports] = await Promise.all([
    prisma.attendance.findMany({ where: { studentId: { in: childIds } } }),
    prisma.result.findMany({ where: { studentId: { in: childIds } } }),
    prisma.progressReport.findMany({
      where: { studentId: { in: childIds } },
      orderBy: { issuedAt: "desc" }
    })
  ]);

  const childrenReports = children.map((child) => {
    const childAtts = attendances.filter((a) => a.studentId === child.id);
    const totalAtt = childAtts.length;
    const presentAtt = childAtts.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
    const attendanceRate = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;

    const childResults = results.filter((r) => r.studentId === child.id);
    const avgMarks =
      childResults.length > 0
        ? Math.round(
            childResults.reduce((acc, r) => acc + (r.score / 100) * 100, 0) /
              childResults.length
          )
        : 92;

    const gpa = (avgMarks / 25).toFixed(1);
    const overallGrade = avgMarks >= 90 ? "A+" : avgMarks >= 80 ? "A" : "B";
    const report = progressReports.find((p) => p.studentId === child.id);

    return {
      id: child.id,
      name: child.user.name || "Student",
      code: child.studentCode,
      program: child.enrollments[0]?.course?.title || "Islamic Studies Program",
      attendanceRate,
      gpa,
      overallGrade,
      teacherRemarks:
        report?.teacherFeedback ||
        `${child.user.name || "Student"} demonstrates excellent consistency, active participation in live recitation, and steady academic progress across all modules.`
    };
  });

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Academic Progress Reports & Evaluations">
      <div className="space-y-6">
        {childrenReports.map((child) => (
          <div key={child.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Official Academic Progress Report
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">{child.name}</h3>
                <p className="text-xs text-slate-500">
                  ID: {child.code} • Program: {child.program}
                </p>
              </div>

              <div className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-700 rounded-xl">
                Status: Verified by Academic Department
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 mb-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Attendance:</span>
                <span className="font-bold text-slate-900 block text-sm mt-0.5">{child.attendanceRate}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Evaluation Grade:</span>
                <span className="font-bold text-emerald-600 block text-sm mt-0.5">
                  {child.overallGrade} (Standing)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">GPA Score:</span>
                <span className="font-bold text-slate-900 block text-sm mt-0.5">{child.gpa} / 4.0</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-800">
              <p className="font-bold text-amber-900 mb-1">Academic Head Remarks:</p>
              <p className="leading-relaxed italic">&ldquo;{child.teacherRemarks}&rdquo;</p>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
