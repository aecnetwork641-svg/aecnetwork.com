import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherResourcesPage() {
  const scope = await getCurrentTeacherScope();

  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        select: { courseId: true }
      })
    : [];

  const courseIds = classes.map((c) => c.courseId);

  const resources = await prisma.resource.findMany({
    where: {
      OR: [
        { isPublic: true },
        { courseId: { in: courseIds } }
      ]
    },
    include: { course: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teaching & Academic Resources">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Syllabi, course guides, worksheets, and instructional materials.
        </p>
        <ScopedDataNote text="Showing public academy assets and resources for your assigned courses." />
      </div>

      <div className="card mt-6">
        {resources.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No instructional resources currently uploaded.
          </p>
        ) : (
          <div className="divide-y divide-aec-navy/5">
            {resources.map((r) => (
              <div key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-xs text-aec-navy">{r.title}</p>
                    <span className="rounded bg-aec-navy/10 px-2 py-0.5 text-[10px] font-medium uppercase text-aec-navy">
                      {r.type}
                    </span>
                  </div>
                  {r.course && (
                    <p className="text-xs text-aec-navy/50">{r.course.title}</p>
                  )}
                </div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded bg-aec-navy px-3 py-1.5 text-xs font-medium text-white hover:bg-aec-navy/90"
                >
                  View Material
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
