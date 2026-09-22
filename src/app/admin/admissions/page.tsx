import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Students", href: "/admin/students" },
  { label: "Teachers", href: "/admin/teachers" },
  { label: "Academics", href: "/admin/academics" },
  { label: "Admissions", href: "/admin/admissions" },
  { label: "Finance", href: "/admin/finance" },
  { label: "HR", href: "/admin/hr" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Communication", href: "/admin/communication" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Audit Logs", href: "/admin/audit-logs" }
];

const PIPELINE_STAGES = [
  { key: "new", title: "New Lead" },
  { key: "contacted", title: "Contacted" },
  { key: "counseling", title: "Counseling" },
  { key: "trial_scheduled", title: "Trial Scheduled" },
  { key: "trial_completed", title: "Trial Completed" },
  { key: "admission_pending", title: "Admission Pending" },
  { key: "enrolled", title: "Enrolled" },
  { key: "active_student", title: "Active Student" },
  { key: "lost", title: "Closed / Lost" }
];

export default async function AdminAdmissionsCRMPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  const leadsByStage: Record<string, typeof leads> = {};
  PIPELINE_STAGES.forEach((s) => {
    leadsByStage[s.key] = [];
  });

  leads.forEach((lead) => {
    const stage = lead.status.toLowerCase();
    if (leadsByStage[stage]) {
      leadsByStage[stage].push(lead);
    } else {
      leadsByStage["new"]?.push(lead);
    }
  });

  return (
    <PortalShell role="Admissions CRM" navItems={ADMIN_NAV} title="Admissions & Lead Pipeline">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Visual 9-stage pipeline from new prospect inquiries to active enrollment and trial classes.
        </p>
        <span className="rounded bg-aec-blue/10 px-3 py-1 text-xs font-bold text-aec-blue">
          Total Leads: {leads.length}
        </span>
      </div>

      {/* 9-Stage Kanban Pipeline Grid */}
      <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = leadsByStage[stage.key] || [];
          return (
            <div
              key={stage.key}
              className="min-w-[240px] max-w-[280px] flex-shrink-0 rounded-lg border border-aec-navy/10 bg-aec-navy/[0.02] p-3"
            >
              <div className="flex items-center justify-between border-b border-aec-navy/10 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-aec-navy">
                  {stage.title}
                </span>
                <span className="rounded-full bg-aec-navy/10 px-2 py-0.5 text-[10px] font-bold text-aec-navy">
                  {stageLeads.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageLeads.length === 0 ? (
                  <p className="py-6 text-center text-xs text-aec-navy/30 italic">No leads</p>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="rounded bg-white p-3 shadow-sm border border-aec-navy/5 hover:border-aec-blue transition-colors text-xs space-y-1.5"
                    >
                      <div className="flex items-start justify-between">
                        <p className="font-bold text-aec-navy">{lead.fullName}</p>
                        {lead.source && (
                          <span className="rounded bg-aec-navy/5 px-1.5 py-0.5 text-[9px] uppercase font-semibold text-aec-navy/60">
                            {lead.source}
                          </span>
                        )}
                      </div>

                      <p className="text-aec-navy/60 text-[11px] truncate">{lead.email}</p>
                      {lead.phone && (
                        <p className="text-aec-navy/50 text-[10px]">{lead.phone}</p>
                      )}

                      {lead.subjectInterest && (
                        <p className="text-aec-teal font-medium text-[11px] truncate">
                          Interest: {lead.subjectInterest}
                        </p>
                      )}

                      {lead.assignedCounselor && (
                        <p className="text-[10px] text-aec-navy/60">
                          Counselor: <span className="font-medium">{lead.assignedCounselor}</span>
                        </p>
                      )}

                      {lead.notes && (
                        <p className="rounded bg-aec-navy/[0.03] p-1.5 text-[10px] text-aec-navy/70 italic line-clamp-2">
                          &quot;{lead.notes}&quot;
                        </p>
                      )}

                      <div className="flex justify-between items-center text-[9px] text-aec-navy/40 pt-1 border-t border-aec-navy/5">
                        <span>{lead.createdAt.toLocaleDateString()}</span>
                        {lead.country && <span>{lead.country}</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PortalShell>
  );
}
