"use client";

import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_RESULTS, DEMO_STUDENT } from "@/lib/student-demo-data";

export default function StudentResultsPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Academic Results & Marksheets">
      {/* GPA Summary Card */}
      <div className="rounded-2xl bg-aec-navy p-6 text-white shadow-md mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-aec-gold uppercase tracking-wider">Overall Academic Record</span>
          <h2 className="font-display text-2xl font-bold mt-1">Cumulative GPA: {DEMO_STUDENT.gpa} / 4.0</h2>
          <p className="text-xs text-white/70 mt-1">Grade: <strong className="text-white">{DEMO_STUDENT.overallGrade}</strong> • Status: <span className="text-emerald-400 font-semibold">Distinction Pass</span></p>
        </div>
        <button
          onClick={() => {}}
          className="rounded-xl bg-aec-gold text-aec-navy font-bold text-xs px-5 py-2.5 hover:bg-aec-gold/90 transition shadow"
        >
          Download PDF Marksheet
        </button>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {DEMO_RESULTS.map((res) => (
          <div key={res.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  {res.term}
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 mt-1">{res.course}</h3>
                <p className="text-xs text-slate-500">{res.examTitle} • Date: {res.date}</p>
              </div>

              <div className="sm:text-right">
                <span className="text-2xl font-black text-emerald-600">{res.score}%</span>
                <span className="block text-xs font-bold text-slate-700">Grade {res.grade}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Evaluator Remarks: </span>
              <span className="italic">{res.remarks}</span>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
