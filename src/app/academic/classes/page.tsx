import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function AcademicClassesPage() {
  const classes = await prisma.class.findMany({
    include: {
      course: true,
      teacher: { include: { user: true } },
      enrollments: true,
      timetableSlots: true,
      sections: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Classes & Cohorts">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Monitor class sections, instructor allocations, student caps, and delivery platforms.
        </p>
      </div>

      <div className="card mt-6">
        {classes.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No class cohorts registered in the database.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Class Name</th>
                  <th className="py-3 px-2">Course</th>
                  <th className="py-3 px-2">Teacher</th>
                  <th className="py-3 px-2">Platform</th>
                  <th className="py-3 px-2">Enrollment</th>
                  <th className="py-3 px-2">Schedule</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {classes.map((c) => (
                  <tr key={c.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-3 px-2 font-semibold text-aec-navy">{c.name}</td>
                    <td className="py-3 px-2 text-xs text-aec-navy/70">{c.course.title}</td>
                    <td className="py-3 px-2 text-xs font-medium text-aec-navy">{c.teacher.user.name}</td>
                    <td className="py-3 px-2 text-xs font-mono text-aec-navy/60">{c.meetingPlatform}</td>
                    <td className="py-3 px-2 text-xs">
                      <span className="font-semibold text-aec-navy">{c.enrollments.length}</span>
                      <span className="text-aec-navy/40"> / {c.capacity} cap</span>
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-blue">
                      {c.timetableSlots[0]
  ? `Day ${c.timetableSlots[0].dayOfWeek} (${c.timetableSlots[0].startTime})`
  : "Unscheduled"}
                    </td>
                    <td className="py-3 px-2 text-xs">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
