import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_CERTIFICATES } from "@/lib/student-demo-data";

export default function StudentCertificatesPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Earned Certificates & Digital Credentials">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Official AEC Network Credentials</h2>
        <p className="text-xs text-slate-500">
          Certificates are cryptographically verifiable online and shareable with educational institutions worldwide.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {DEMO_CERTIFICATES.map((cert) => (
          <div key={cert.id} className="rounded-2xl border-2 border-aec-gold/40 bg-gradient-to-br from-amber-50/40 via-white to-white p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-aec-gold/20 text-aec-navy font-black text-xs border border-aec-gold/30">
                  AEC
                </span>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5">
                  Verified Credential
                </span>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Certificate of Completion</span>
              <h3 className="font-display text-base font-bold text-aec-navy mt-1">{cert.title}</h3>
              
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <p><strong>Issued To:</strong> {cert.recipient}</p>
                <p><strong>Instructor:</strong> {cert.instructor}</p>
                <p><strong>Grade Achieved:</strong> <span className="font-semibold text-emerald-700">{cert.grade}</span></p>
                <p><strong>Credential ID:</strong> <span className="font-mono text-slate-800">{cert.credentialId}</span></p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                href={cert.verifyUrl as never}
                className="btn-primary flex-1 py-2 text-xs font-semibold text-center"
              >
                Verify Certificate
              </Link>
              <button
                onClick={() => {}}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
