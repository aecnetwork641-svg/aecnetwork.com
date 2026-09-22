import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function AcademicProgramsPage() {
  const programs = await prisma.program.findMany({
    include: {
      courses: {
        include: {
          classes: true,
          enrollments: true,
          modules: true
        }
      }
    }
  });

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Programs & Courses">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Manage degree, diploma, and modular learning programs and course curricula.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {programs.length === 0 ? (
          <div className="card py-12 text-center text-sm text-aec-navy/50">
            No academic programs defined yet.
          </div>
        ) : (
          programs.map((prog) => (
            <div key={prog.id} className="card">
              <div className="flex items-start justify-between border-b border-aec-navy/10 pb-3">
                <div>
                  <h3 className="font-bold text-aec-navy text-base">{prog.title}</h3>
                  <p className="text-xs text-aec-navy/60">{prog.category} &bull; {prog.description}</p>
                </div>
                <span className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {prog.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-aec-navy/50 mb-2">
                  Courses in this Program ({prog.courses.length})
                </p>
                <div className="divide-y divide-aec-navy/5">
                  {prog.courses.map((course) => (
                    <div key={course.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-aec-navy">{course.title}</p>
                        <p className="text-aec-navy/50">
                          {course.deliveryMode} &bull; {course.durationWeeks ? `${course.durationWeeks} weeks` : "Self-paced"} &bull; {course.modules.length} Modules
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-aec-navy/5 px-2 py-0.5 font-medium text-aec-navy">
                          {course.classes.length} Classes
                        </span>
                        <span className="rounded bg-aec-blue/10 px-2 py-0.5 font-medium text-aec-blue">
                          {course.enrollments.length} Enrolled
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
