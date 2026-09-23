import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_RESULTS } from "@/lib/student-demo-data";

export default function ParentResultsPage() {
  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Exam Results & Marksheets">
      <div className="space-y-4">
        {DEMO_RESULTS.map((res) => (
          <div key={res.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  {res.term} • Abdullah Akbar
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 mt-1">{res.course}</h3>
                <p className="text-xs text-slate-500">{res.examTitle}</p>
              </div>

              <div className="sm:text-right">
                <span className="text-2xl font-black text-emerald-600">{res.score}%</span>
                <span className="block text-xs font-bold text-slate-700">Grade {res.grade}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Instructor Evaluation: </span>
              <span className="italic">{res.remarks}</span>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
