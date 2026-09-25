import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";

export default async function TeacherProfilePage() {
  const scope = await getCurrentTeacherScope();
  if (!scope?.teacher) {
    redirect("/login");
  }

  const { teacher } = scope;

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teacher Faculty Profile">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-100 pb-6 mb-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold text-3xl font-bold shadow-md">
            {(teacher.user?.name || "T").charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">{teacher.user?.name || "Faculty Member"}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Faculty Code: <span className="font-mono font-bold text-aec-navy">{teacher.teacherCode || "AEC-FACULTY"}</span>
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Active Instructor • Appointed:{" "}
              {teacher.hiredAt ? new Date(teacher.hiredAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
              }) : "Recently"}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 text-xs">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-1">Faculty Credentials</h3>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Email Address</span>
              <span className="font-medium text-slate-800 text-sm">{teacher.user?.email || ""}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Account Status</span>
              <span className="font-medium text-emerald-700 text-sm">{teacher.user?.isActive ? "ACTIVE FACULTY" : "INACTIVE"}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Portal Role</span>
              <span className="font-medium text-slate-800 text-sm">{teacher.user?.role || "TEACHER"}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-1">Specializations & Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.specialties && teacher.specialties.length > 0 ? (
                (teacher.specialties as string[]).map((sp: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-aec-navy/10 text-aec-navy px-3 py-1 rounded-full font-semibold text-xs"
                  >
                    {sp}
                  </span>
                ))
              ) : (
                <span className="bg-aec-navy/10 text-aec-navy px-3 py-1 rounded-full font-semibold text-xs">
                  Tajweed & Qira&apos;at Specialist
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
