import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentAttendancePage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;
  const childIds = children.map((c) => c.id);

  const [attendances, enrollments] = await Promise.all([
    prisma.attendance.findMany({
      where: { studentId: { in: childIds } },
      include: {
        student: { include: { user: true } },
        class: { include: { course: true } }
      },
      orderBy: { date: "desc" },
      take: 50
    }),
    prisma.enrollment.findMany({
      where: { studentId: { in: childIds } },
      include: { course: true, student: { include: { user: true } } }
    })
  ]);

  const childrenSummary = children.map((child) => {
    const childAtts = attendances.filter((a) => a.studentId === child.id);
    const total = childAtts.length;
    const present = childAtts.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
    const rate = total > 0 ? Math.round((present / total) * 100) : 100;
    const childEnrollment = enrollments.find((e) => e.studentId === child.id);

    return {
      id: child.id,
      name: child.user.name || "Child",
      program: childEnrollment?.course?.title || "Islamic Studies Program",
      attendanceRate: rate
    };
  });

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Child Attendance & Absence Reports">
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {childrenSummary.map((child) => (
          <div
            key={child.id}
            className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-between"
          >
            <div>
              <h3 className="font-bold text-sm text-slate-900">{child.name}</h3>
              <p className="text-xs text-slate-500">{child.program}</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                Attendance: {child.attendanceRate}% ({child.attendanceRate >= 80 ? "Regular" : "Needs Attention"})
              </p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xs font-bold text-slate-900">
              {child.attendanceRate}%
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Detailed Attendance Log</h3>
          <span className="text-xs text-slate-500">Live Synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Student</th>
                <th className="p-3">Course / Subject</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {attendances.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    No attendance records logged yet.
                  </td>
                </tr>
              ) : (
                attendances.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">
                      {new Date(row.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{row.student.user.name}</td>
                    <td className="p-3 text-aec-navy font-medium">{row.class.course.title}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === "PRESENT"
                            ? "bg-emerald-100 text-emerald-800"
                            : row.status === "LATE"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
