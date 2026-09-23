"use client";

import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";

export default function TeacherResourcesPage() {
  const materials = [
    {
      id: "res-1",
      title: "Al-Jazariyyah Tajweed Reference Guide & Diagrams",
      type: "PDF Document (4.2 MB)",
      subject: "Quran & Tajweed",
      downloads: 142,
    },
    {
      id: "res-2",
      title: "Noorani Qaida Animated Interactive Flipbook",
      type: "Interactive PPTX (18 MB)",
      subject: "Noorani Qaida",
      downloads: 320,
    },
    {
      id: "res-3",
      title: "Spoken Arabic Dialogue Flashcards & Audio Set",
      type: "Audio / ZIP (24 MB)",
      subject: "Arabic Language",
      downloads: 88,
    },
  ];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teaching Materials & Lesson Plans">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Faculty Resource Library</h2>
            <p className="text-xs text-slate-500">Official syllabus slide decks, audio pronunciation guides, and lesson plans.</p>
          </div>
          <button onClick={() => {}} className="btn-primary text-xs px-4 py-2 self-start sm:self-auto">
            + Upload Teaching Material
          </button>
        </div>

        <div className="space-y-3">
          {materials.map((m) => (
            <div key={m.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-aec-navy text-white text-sm font-bold">
                  📚
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                  <p className="text-[11px] text-slate-500">{m.subject} • {m.type}</p>
                </div>
              </div>

              <button onClick={() => {}} className="btn-primary text-xs px-4 py-2 self-start sm:self-auto">
                Download Resource
              </button>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
