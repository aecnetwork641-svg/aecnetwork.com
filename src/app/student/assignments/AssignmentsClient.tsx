"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface AssignmentItem {
  id: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  status: "pending" | "submitted" | "graded";
  score?: number | null;
  feedback?: string | null;
  submittedAt?: string | null;
}

export default function StudentAssignmentsClient({
  assignments
}: {
  assignments: AssignmentItem[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"pending" | "submitted" | "graded">("pending");
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const pendingList = assignments.filter((a) => a.status === "pending");
  const submittedList = assignments.filter((a) => a.status === "submitted");
  const gradedList = assignments.filter((a) => a.status === "graded");

  const filtered =
    activeTab === "pending"
      ? pendingList
      : activeTab === "submitted"
      ? submittedList
      : gradedList;

  const handleSubmit = async (assignmentId: string) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/student/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          fileUrl: fileUrl || "student_homework_attachment.pdf",
          notes
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit assignment");
      }

      setStatusMessage({
        type: "success",
        text: "Your assignment has been submitted successfully for instructor review!"
      });
      setSubmittingId(null);
      setNotes("");
      setFileUrl("");
      router.refresh();
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "An error occurred during submission"
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
          Pending Submission ({pendingList.length})
        </button>
        <button
          onClick={() => setActiveTab("submitted")}
          className={`pb-3 border-b-2 transition ${
            activeTab === "submitted"
              ? "border-aec-navy text-aec-navy font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Under Review ({submittedList.length})
        </button>
        <button
          onClick={() => setActiveTab("graded")}
          className={`pb-3 border-b-2 transition ${
            activeTab === "graded"
              ? "border-aec-navy text-aec-navy font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Graded & Completed ({gradedList.length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-400 text-xs">
            No {activeTab} assignments found in your record.
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2.5 py-0.5 rounded-full">
                    {item.courseTitle}
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900 mt-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                      <strong>Instructions:</strong> {item.description}
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
                    <div>
                      <span className="inline-block rounded-full bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1">
                        Submitted for Review
                      </span>
                      {item.submittedAt && (
                        <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                          {item.submittedAt}
                        </span>
                      )}
                    </div>
                  )}

                  {item.status === "graded" && (
                    <div>
                      <span className="text-lg font-black text-emerald-600 block">
                        {item.score} / {item.maxScore}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Evaluated</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submission Form */}
              {submittingId === item.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 bg-slate-50/60 p-4 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-slate-900">Submit Homework for: {item.title}</p>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      File Reference / URL or Document Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. assignment_tajweed_part1.pdf"
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Student Notes / Answers (Optional):
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any message or written response for your teacher..."
                      className="w-full text-xs p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubmit(item.id)}
                      disabled={isSubmitting}
                      className="btn-primary text-xs px-4 py-2 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Confirm Submission"}
                    </button>
                    <button
                      onClick={() => setSubmittingId(null)}
                      className="text-xs text-slate-500 hover:text-slate-800 px-3 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
