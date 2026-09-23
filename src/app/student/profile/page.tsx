import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_STUDENT } from "@/lib/student-demo-data";

export default function StudentProfilePage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Student Profile & Enrollment Details">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-100 pb-6 mb-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold text-3xl font-black shadow-md">
            {DEMO_STUDENT.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">{DEMO_STUDENT.fullName}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Registration Code: <span className="font-mono font-bold text-aec-navy">{DEMO_STUDENT.studentCode}</span>
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Program: <strong>{DEMO_STUDENT.primaryProgram}</strong> • Enrolled: {DEMO_STUDENT.enrolledSince}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid gap-6 sm:grid-cols-2 text-xs">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-1">Personal & Contact Info</h3>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Email Address</span>
              <span className="font-medium text-slate-800 text-sm">{DEMO_STUDENT.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">WhatsApp / Phone</span>
              <span className="font-medium text-slate-800 text-sm">{DEMO_STUDENT.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Country of Residence</span>
              <span className="font-medium text-slate-800 text-sm">{DEMO_STUDENT.country}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-1">Parent / Guardian Information</h3>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Guardian Name</span>
              <span className="font-medium text-slate-800 text-sm">{DEMO_STUDENT.guardianName}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Guardian Phone</span>
              <span className="font-medium text-slate-800 text-sm">{DEMO_STUDENT.guardianPhone}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-semibold text-[10px]">Emergency Notification Email</span>
              <span className="font-medium text-slate-800 text-sm">{DEMO_STUDENT.guardianEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
