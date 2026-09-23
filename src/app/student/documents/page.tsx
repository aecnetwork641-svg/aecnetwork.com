import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";

export default function StudentDocumentsPage() {
  const documents = [
    {
      id: "doc-1",
      title: "Official Admission Confirmation Letter",
      type: "PDF Document",
      size: "245 KB",
      date: "January 15, 2026",
    },
    {
      id: "doc-2",
      title: "Student Identification Card (Digital Copy)",
      type: "ID Card / PDF",
      size: "512 KB",
      date: "January 18, 2026",
    },
    {
      id: "doc-3",
      title: "Term 2 Comprehensive Evaluation Scorecard",
      type: "Academic Report",
      size: "380 KB",
      date: "August 20, 2026",
    },
  ];

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Student Documents & Files">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Official Student Records</h2>
        <p className="text-xs text-slate-500">
          Access your verified admission paperwork, identification credentials, and official grade sheets.
        </p>

        <div className="mt-6 space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-aec-navy text-white text-xs font-bold">
                  📄
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                  <p className="text-[11px] text-slate-500">{doc.type} • {doc.size} • Issued: {doc.date}</p>
                </div>
              </div>

              <button
                onClick={() => {}}
                className="btn-primary text-xs px-4 py-2 self-start sm:self-auto"
              >
                Download File
              </button>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
