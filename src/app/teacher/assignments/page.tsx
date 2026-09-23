"use client";

import { useState } from "react";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { DEMO_PENDING_GRADING } from "@/lib/teacher-demo-data";

export default function TeacherAssignmentsPage() {
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);
  const [score, setScore] = useState<string>("48");
  const [remarks, setRemarks] = useState<string>("MashaAllah excellent recitation with clear Tajweed rules.");
  const [success, setSuccess] = useState(false);

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvaluatingId(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Student Homework Submissions & Grading Deck">
      {success && (
        <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
          ✅ Student marks and evaluation remarks have been recorded and sent to student/parent notifications!
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Homework Submissions Waiting for Evaluation</h2>
        <p className="text-xs text-slate-500">
          Review audio recordings, essays, and worksheets. Provide constructive feedback.
        </p>

        <div className="mt-6 space-y-4">
          {DEMO_PENDING_GRADING.map((item) => (
            <div key={item.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2.5 py-0.5 rounded-full">
                    {item.course}
                  </span>
                  <h3 className="font-display text-sm font-bold text-slate-900 mt-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">Student: <strong>{item.student}</strong> • {item.type}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Submitted: {item.submittedDate}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEvaluatingId(item.id)}
                    className="btn-primary text-xs px-4 py-2"
                  >
                    Grade & Add Feedback
                  </button>
                </div>
              </div>

              {/* Grading Form Drawer */}
              {evaluatingId === item.id && (
                <form onSubmit={handleGradeSubmit} className="mt-4 pt-4 border-t border-slate-200 bg-white p-4 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">Grading for {item.student}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Score (Out of 50):</label>
                      <input
                        type="number"
                        max="50"
                        min="0"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Teacher Feedback / Remarks:</label>
                    <textarea
                      rows={3}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn-primary text-xs px-4 py-2">
                      Submit Marks & Feedback
                    </button>
                    <button type="button" onClick={() => setEvaluatingId(null)} className="text-xs text-slate-500 hover:text-slate-800 px-3 py-2">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
