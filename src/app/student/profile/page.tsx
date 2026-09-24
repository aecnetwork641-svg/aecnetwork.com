import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentProfilePage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.student) {
    redirect("/login");
  }

  const { student } = scope;
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: student.id },
    include: { course: true, class: true }
  });

  const primaryProgram = enrollments[0]?.course?.title || "Enrolled Islamic & Quranic Studies";
  const enrolledSince = new Date(student.enrolledAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Student Profile & Enrollment Details">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-100 pb-6 mb-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold text-3xl font-black shadow-md">
            {student.user.name?.charAt(0) || "S"}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">{student.user.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Registration Code: <span className="font-mono font-bold text-aec-navy">{student.studentCode}</span>
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Program: <strong>{primaryProgram}</strong> • Enrolled: {enrolledSince}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid gap-6 sm:grid-cols-2 text-xs">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-1">Personal & Contact Info</h3>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Email Address</span>
              <span className="font-medium text-slate-800 text-sm">{student.user.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Country of Residence</span>
              <span className="font-medium text-slate-800 text-sm">{student.country || "International"}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Account Status</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 mt-1">
                {student.user.isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-1">Parent / Guardian Information</h3>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Guardian Name</span>
              <span className="font-medium text-slate-800 text-sm">{student.guardian?.user.name || "Primary Guardian"}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Emergency Notification Email</span>
              <span className="font-medium text-slate-800 text-sm">{student.guardian?.user.email || "guardian@aecnetwork.com"}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Relationship</span>
              <span className="font-medium text-slate-800 text-sm">Parent / Legal Guardian</span>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
