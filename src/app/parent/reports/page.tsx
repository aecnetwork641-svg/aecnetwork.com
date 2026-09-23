"use client";

import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_PARENT } from "@/lib/parent-demo-data";
import { DEMO_RESULTS } from "@/lib/student-demo-data";

export default function ParentReportsPage() {
  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Academic Progress Reports & Evaluations">
      <div className="space-y-6">
        {DEMO_PARENT.children.map((child) => (
          <div key={child.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Term 2 Progress Card</span>
                <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">{child.name}</h3>
                <p className="text-xs text-slate-500">ID: {child.code} • Program: {child.enrolledProgram}</p>
              </div>

              <button
                onClick={() => {}}
                className="btn-primary text-xs px-4 py-2 self-start sm:self-auto"
              >
                Download Official Report PDF
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 mb-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Attendance:</span>
                <span className="font-bold text-slate-900 block text-sm mt-0.5">{child.attendanceRate}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Evaluation Grade:</span>
                <span className="font-bold text-emerald-600 block text-sm mt-0.5">{child.overallGrade} (Distinction)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">GPA Score:</span>
                <span className="font-bold text-slate-900 block text-sm mt-0.5">{child.gpa} / 4.0</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-800">
              <p className="font-bold text-amber-900 mb-1">Academic Head Remarks:</p>
              <p className="leading-relaxed italic">
                &ldquo;{child.name} exhibits exemplary focus, regular attendance, and rapid comprehension in recitation and language exercises. Recommended for advanced level in the upcoming academic cycle.&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
