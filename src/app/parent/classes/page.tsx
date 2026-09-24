import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_PARENT } from "@/lib/parent-demo-data";

export default function ParentClassesPage() {
  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Live Class Sessions & Parent Observer Links">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Today&apos;s Scheduled Classes for Your Children</h2>
        <p className="text-xs text-slate-500">
          Parents are welcome to observe lessons or check on child class participation at any time.
        </p>

        <div className="mt-6 space-y-4">
          {DEMO_PARENT.children.map((child) => (
            <div key={child.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2.5 py-0.5 rounded-full">
                  {child.name} ({child.grade})
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 mt-2">{child.nextClass}</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Instructor: <strong>{child.primaryTeacher}</strong> • Time: <span className="font-semibold text-emerald-700">{child.nextClassTime}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={child.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-4 py-2"
                >
                  Join / Observe Session
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
