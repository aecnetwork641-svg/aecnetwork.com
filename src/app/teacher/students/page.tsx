import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface Props {
  searchParams: { classId?: string };
}

export default async function TeacherStudentsPage({ searchParams }: Props) {
  const scope = await getCurrentTeacherScope();

  // Find all classes assigned to this teacher
  const teacherClasses = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        select: { id: true, name: true }
      })
    : [];

  const allowedClassIds = teacherClasses.map((c) => c.id);

  // If classId specified, filter by it but ensure it is in allowedClassIds
  const filterClassId =
    searchParams.classId && allowedClassIds.includes(searchParams.classId)
      ? searchParams.classId
      : undefined;

  const enrollments = scope
    ? await prisma.enrollment.findMany({
        where: {
          classId: filterClassId ? filterClassId : { in: allowedClassIds }
        },
        include: {
          student: {
            include: {
              user: true,
              attendances: true
            }
          },
          course: true,
          class: true
        }
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="My Students">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-aec-navy/70">
          Showing students actively assigned to your classes.
        </p>
        <ScopedDataNote text="Strict Scoped Access: Students outside your assigned classes cannot be viewed." />
      </div>

      {/* Class filter tabs */}
      {teacherClasses.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-b border-aec-navy/10 pb-3">
          <Link
            href="/teacher/students"
            className={`rounded px-3 py-1.5 text-xs font-medium ${
              !filterClassId
                ? "bg-aec-navy text-white"
                : "bg-aec-navy/5 text-aec-navy hover:bg-aec-navy/10"
            }`}
          >
            All Classes ({enrollments.length})
          </Link>
          {teacherClasses.map((c) => (
            <Link
              key={c.id}
              href={`/teacher/students?classId=${c.id}`}
              className={`rounded px-3 py-1.5 text-xs font-medium ${
                filterClassId === c.id
                  ? "bg-aec-navy text-white"
                  : "bg-aec-navy/5 text-aec-navy hover:bg-aec-navy/10"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      <div className="card mt-6">
        {enrollments.length === 0 ? (
          <p className="py-8 text-center text-sm text-aec-navy/50">
            No students found in the selected cohort.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Student Name</th>
                  <th className="py-3 px-2">Code</th>
                  <th className="py-3 px-2">Course & Class</th>
                  <th className="py-3 px-2">Attendance</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {enrollments.map((e) => {
                  const totalAtt = e.student.attendances.length;
                  const presentAtt = e.student.attendances.filter(
                    (a) => a.status === "present"
                  ).length;
                  const attRate =
                    totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : null;

                  return (
                    <tr key={e.id} className="hover:bg-aec-navy/[0.02]">
                      <td className="py-3 px-2 font-semibold text-aec-navy">
                        {e.student.user.name}
                      </td>
                      <td className="py-3 px-2 text-xs font-mono text-aec-navy/60">
                        {e.student.studentCode}
                      </td>
                      <td className="py-3 px-2">
                        <p className="text-xs font-medium text-aec-navy">
                          {e.course.title}
                        </p>
                        <p className="text-xs text-aec-navy/50">{e.class?.name}</p>
                      </td>
                      <td className="py-3 px-2 text-xs">
                        {attRate !== null ? (
                          <span
                            className={`font-semibold ${
                              attRate >= 80 ? "text-emerald-600" : "text-amber-600"
                            }`}
                          >
                            {attRate}% ({presentAtt}/{totalAtt})
                          </span>
                        ) : (
                          <span className="text-aec-navy/40">—</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-xs capitalize text-aec-navy/70">
                        {e.status}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="inline-flex gap-2">
                          <Link
                            href={`/teacher/progress?studentId=${e.studentId}`}
                            className="rounded bg-aec-navy/5 px-2.5 py-1 text-xs font-medium text-aec-navy hover:bg-aec-navy/10"
                          >
                            Progress
                          </Link>
                          <Link
                            href={`/teacher/messages?to=${e.student.user.id}`}
                            className="rounded bg-aec-blue/10 px-2.5 py-1 text-xs font-medium text-aec-blue hover:bg-aec-blue/20"
                          >
                            Message
                          </Link>
                        </div>
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
