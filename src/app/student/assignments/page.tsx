"use client";

import { useState } from "react";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_ASSIGNMENTS } from "@/lib/student-demo-data";

export default function StudentAssignmentsPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "submitted" | "graded">("pending");
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filtered = DEMO_ASSIGNMENTS.filter((a) => a.status === activeTab);

  const handleMockSubmit = (id: string) => {
    setSubmittingId(null);
    setSuccessMessage("Your homework file has been uploaded and submitted for teacher review!");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Assignments & Homework">
      {successMessage && (
        <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <span>✅ {successMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 border-b-2 transition ${
            activeTab === "pending"
              ? "border-aec-navy text-aec-navy font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Pending Submission ({DEMO_ASSIGNMENTS.filter((a) => a.status === "pending").length})
        </button>
        <button
          onClick={() => setActiveTab("submitted")}
          className={`pb-3 border-b-2 transition ${
            activeTab === "submitted"
              ? "border-aec-navy text-aec-navy font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Under Review ({DEMO_ASSIGNMENTS.filter((a) => a.status === "submitted").length})
        </button>
        <button
          onClick={() => setActiveTab("graded")}
          className={`pb-3 border-b-2 transition ${
            activeTab === "graded"
              ? "border-aec-navy text-aec-navy font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Graded & Completed ({DEMO_ASSIGNMENTS.filter((a) => a.status === "graded").length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2.5 py-0.5 rounded-full">
                  {item.course}
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 mt-2">{item.title}</h3>
                {item.instructions && (
                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                    <strong>Instructions:</strong> {item.instructions}
                  </p>
                )}
                {item.feedback && (
                  <div className="mt-3 bg-emerald-50/70 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-900">
                    <p className="font-bold">Ustadh Remarks:</p>
                    <p className="mt-0.5 italic">&ldquo;{item.feedback}&rdquo;</p>
                  </div>
                )}
              </div>

              <div className="sm:text-right shrink-0">
                {item.status === "pending" && (
                  <div>
                    <span className="text-xs font-bold text-amber-700 block">Due: {item.dueDate}</span>
                    <button
                      onClick={() => setSubmittingId(item.id)}
                      className="mt-3 btn-primary text-xs px-4 py-2"
                    >
                      Upload & Submit
                    </button>
                  </div>
                )}

                {item.status === "submitted" && (
                  <span className="inline-block rounded-full bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1">
                    Submitted for Review
                  </span>
                )}

                {item.status === "graded" && (
                  <div>
                    <span className="text-lg font-black text-emerald-600 block">
                      {item.score} / {item.maxMarks} ({item.grade})
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Graded with Distinction</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submission Drawer / Modal Form */}
            {submittingId === item.id && (
              <div className="mt-4 pt-4 border-t border-slate-200 bg-slate-50/60 p-4 rounded-xl space-y-3">
                <p className="text-xs font-bold text-slate-900">Submit Homework for: {item.title}</p>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Select File (PDF, Audio MP3, Doc):</label>
                  <input type="file" className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-aec-navy file:text-white hover:file:bg-aec-navy/90" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Student Notes (Optional):</label>
                  <textarea rows={2} placeholder="Any message for your teacher..." className="w-full text-xs p-2 rounded-lg border border-slate-200" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleMockSubmit(item.id)} className="btn-primary text-xs px-4 py-2">
                    Confirm Submission
                  </button>
                  <button onClick={() => setSubmittingId(null)} className="text-xs text-slate-500 hover:text-slate-800 px-3 py-2">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
