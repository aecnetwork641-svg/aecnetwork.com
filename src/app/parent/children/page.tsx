import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentChildrenPage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;

  // Enhance each child with attendance and exam statistics
  const childrenData = await Promise.all(
    children.map(async (child) => {
      const [attendances, results] = await Promise.all([
        prisma.attendance.findMany({ where: { studentId: child.id } }),
        prisma.result.findMany({ where: { studentId: child.id } })
      ]);

      const totalAtt = attendances.length;
      const presentAtt = attendances.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
      const attendanceRate = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;

      const avgMarks =
        results.length > 0
          ? Math.round(
              results.reduce((acc, r) => acc + (r.score / 100) * 100, 0) /
                results.length
            )
          : 90;

      const primaryEnrollment = child.enrollments[0];
      const program = primaryEnrollment?.course?.title || "Islamic Studies & Quran Program";
      const teacherName =
        primaryEnrollment?.class?.teacher?.user?.name || "Senior Faculty Specialist";

      return {
        id: child.id,
        name: child.user.name || "Student",
        code: child.studentCode,
        country: child.country || "Global",
        enrolledProgram: program,
        primaryTeacher: teacherName,
        attendanceRate,
        gpa: (avgMarks / 25).toFixed(1),
        overallGrade: avgMarks >= 90 ? "A+" : avgMarks >= 80 ? "A" : "B"
      };
    })
  );

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Enrolled Children Profiles">
      {childrenData.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          No linked student records found under this parent account.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {childrenData.map((child) => (
            <div
              key={child.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold text-2xl font-bold">
                    {child.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">{child.name}</h3>
                    <p className="text-xs text-slate-500">
                      Student Code: <span className="font-mono font-bold text-slate-800">{child.code}</span>
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">Location: {child.country}</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Enrolled Program:</span>
                    <span className="font-semibold text-slate-900 text-right">{child.enrolledProgram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Educator:</span>
                    <span className="font-semibold text-slate-900">{child.primaryTeacher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Attendance Rate:</span>
                    <span className="font-semibold text-emerald-600">{child.attendanceRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Academic Standing:</span>
                    <span className="font-semibold text-slate-900">
                      GPA {child.gpa} ({child.overallGrade})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <Link
                  href={`/parent/progress?childId=${child.id}` as any}
                  className="btn-primary flex-1 py-2 text-xs font-semibold text-center"
                >
                  Track Learning Progress
                </Link>
                <Link
                  href={`/parent/reports?childId=${child.id}` as any}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Report Card
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
