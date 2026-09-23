import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_PARENT_FEEDBACK } from "@/lib/parent-demo-data";

export default function ParentFeedbackPage() {
  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Teacher Feedback & Instructor Notes">
      <div className="space-y-4">
        {DEMO_PARENT_FEEDBACK.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2 py-0.5 rounded-full">
                  {item.childName} • {item.subject}
                </span>
                <h3 className="font-display text-sm font-bold text-slate-900 mt-1">
                  Instructor: {item.teacher}
                </h3>
              </div>
              <span className="text-xs text-slate-400">{item.date}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
              &ldquo;{item.comment}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
