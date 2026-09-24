"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface PendingGradingItem {
  id: string; // submissionId
  assignmentTitle: string;
  courseTitle: string;
  studentName: string;
  studentCode: string;
  submittedDate: string;
  fileUrl: string | null;
  maxScore: number;
  currentScore?: number | null;
  currentFeedback?: string | null;
}

export default function TeacherAssignmentsClient({
  submissions
}: {
  submissions: PendingGradingItem[];
}) {
  const router = useRouter();
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);
  const [score, setScore] = useState<string>("48");
  const [remarks, setRemarks] = useState<string>("MashaAllah excellent work with solid recitation.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleGradeSubmit = async (submissionId: string) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/teacher/assignments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          score: parseInt(score, 10),
          feedback: remarks
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to grade submission");
      }

      setStatusMessage({
        type: "success",
        text: "Student evaluation and marks have been recorded and sent to student & parent!"
      });
      setEvaluatingId(null);
      router.refresh();
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "An error occurred while saving marks"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {statusMessage && (
        <div
          className={`mb-6 rounded-xl p-4 text-xs font-semibold flex items-center gap-2 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <span>{statusMessage.type === "success" ? "✅" : "⚠️"} {statusMessage.text}</span>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">
          Homework Submissions Waiting for Evaluation
        </h2>
        <p className="text-xs text-slate-500">
          Review student submissions, assign scores, and provide actionable feedback.
        </p>

        {submissions.length === 0 ? (
          <div className="mt-6 p-8 text-center text-slate-400 text-xs rounded-xl border border-slate-100 bg-slate-50">
            No homework submissions currently awaiting grading.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {submissions.map((item) => (
              <div key={item.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2.5 py-0.5 rounded-full">
                      {item.courseTitle}
                    </span>
                    <h3 className="font-display text-sm font-bold text-slate-900 mt-2">
                      {item.assignmentTitle}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Student: <strong>{item.studentName}</strong> ({item.studentCode})
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Submitted: {item.submittedDate}</p>
                    {item.fileUrl && (
                      <p className="text-[11px] text-aec-navy font-semibold mt-1">
                        📎 File / Note: {item.fileUrl}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEvaluatingId(item.id);
                        if (item.currentScore) setScore(String(item.currentScore));
                        if (item.currentFeedback) setRemarks(item.currentFeedback);
                      }}
                      className="btn-primary text-xs px-4 py-2"
                    >
                      {item.currentScore !== null && item.currentScore !== undefined
                        ? "Edit Marks & Feedback"
                        : "Grade & Add Feedback"}
                    </button>
                  </div>
                </div>

                {/* Grading Form Drawer */}
                {evaluatingId === item.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 bg-white p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">
                      Grading for {item.studentName} — Max Score: {item.maxScore}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Score (Out of {item.maxScore}):
                        </label>
                        <input
                          type="number"
                          max={item.maxScore}
                          min="0"
                          value={score}
                          onChange={(e) => setScore(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Teacher Feedback / Remarks:
                      </label>
                      <textarea
                        rows={3}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleGradeSubmit(item.id)}
                        disabled={isSubmitting}
                        className="btn-primary text-xs px-4 py-2 disabled:opacity-50"
                      >
                        {isSubmitting ? "Saving..." : "Submit Marks & Feedback"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEvaluatingId(null)}
                        className="text-xs text-slate-500 hover:text-slate-800 px-3 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
