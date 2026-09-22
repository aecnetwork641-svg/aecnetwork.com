import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherProfilePage() {
  const scope = await getCurrentTeacherScope();

  const teacher = scope
    ? await prisma.teacher.findUnique({
        where: { id: scope.teacherId },
        include: {
          user: true,
          classes: { include: { course: true } },
          coursesTaught: true
        }
      })
    : null;

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="My Profile">
      <div className="card max-w-4xl">
        <div className="flex items-start gap-6 border-b border-aec-navy/10 pb-6">
          <div className="h-20 w-20 rounded-full bg-aec-navy/10 flex items-center justify-center text-aec-navy font-bold text-2xl">
            {teacher?.user.name ? teacher.user.name[0] : "T"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-aec-navy">
              {teacher?.user.name ?? "Teacher Profile"}
            </h2>
            <p className="text-sm text-aec-navy/60">
              Teacher Code: {teacher?.teacherCode ?? "DEMO-T01"}
            </p>
            <p className="text-xs text-aec-navy/40">
              Email: {teacher?.user.email ?? "teacher@example.com"}
            </p>
            <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              Active Instructor
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-aec-navy/50">
              Academic Specialties & Subjects
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(teacher?.specialties && teacher.specialties.length > 0
                ? teacher.specialties
                : ["Quran Recitation", "Tajweed", "Arabic Language", "Islamic Studies"]
              ).map((s) => (
                <span key={s} className="rounded bg-aec-blue/10 px-2.5 py-1 text-xs font-medium text-aec-navy">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-aec-navy/50">
              Teaching Mode & Availability
            </h3>
            <div className="mt-2 space-y-1 text-xs text-aec-navy/80">
              <p><span className="font-semibold text-aec-navy">Delivery Mode:</span> One-to-one & Cohort Group Sessions</p>
              <p><span className="font-semibold text-aec-navy">Weekly Schedule:</span> Flexible morning & evening slots</p>
              <p><span className="font-semibold text-aec-navy">Timezone:</span> UTC / Local</p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-aec-navy/10 pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-aec-navy/50">
            Professional Bio & Qualifications
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-aec-navy/80">
            {teacher?.bio ??
              "Qualified instructor dedicated to structured and supportive learning at AEC Network. Background in classical Arabic pedagogy, Tajweed methodologies, and student-centered curriculum delivery."}
          </p>
        </div>

        <div className="mt-6 border-t border-aec-navy/10 pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-aec-navy/50">
            Assigned Courses
          </h3>
          <div className="mt-3 divide-y divide-aec-navy/5">
            {teacher?.classes && teacher.classes.length > 0 ? (
              teacher.classes.map((c) => (
                <div key={c.id} className="py-2 text-sm flex justify-between">
                  <span className="font-medium text-aec-navy">{c.name}</span>
                  <span className="text-xs text-aec-navy/60">{c.course.title}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-aec-navy/50">No classes currently assigned.</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <ScopedDataNote text="Teacher qualifications and credentials are authenticated and managed by Academic Administration." />
        </div>
      </div>
    </PortalShell>
  );
}
