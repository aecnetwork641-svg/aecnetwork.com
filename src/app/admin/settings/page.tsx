import PortalShell from "@/components/PortalShell";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { redirect } from "next/navigation";
import { isOneOf } from "@/lib/permissions";

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

export default async function AdminSettingsPage() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  const isDemo = process.env.DEMO_MODE !== "false";

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Academy Configuration & Settings">
      <div className="space-y-6 max-w-4xl">
        {/* Environment & Demo Mode Switch */}
        <div className="card">
          <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
            System Operational Mode
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-aec-navy">DEMO_MODE Configuration</p>
              <p className="text-xs text-aec-navy/60">
                Controls whether mock/sample demonstration datasets are visually flagged and isolated from production.
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                isDemo
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "bg-emerald-100 text-emerald-900 border border-emerald-300"
              }`}
            >
              {isDemo ? "DEMO_MODE=true" : "PRODUCTION"}
            </span>
          </div>
        </div>

        {/* Organization Info */}
        <div className="card">
          <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
            Organization Identity
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="font-semibold text-aec-navy">Institution Name</label>
              <input
                type="text"
                readOnly
                value={process.env.NEXT_PUBLIC_ORG_NAME || "AEC Network"}
                className="mt-1 w-full rounded border border-aec-navy/20 bg-aec-navy/[0.02] px-3 py-2 text-aec-navy"
              />
            </div>
            <div>
              <label className="font-semibold text-aec-navy">Contact Email</label>
              <input
                type="text"
                readOnly
                value={process.env.NEXT_PUBLIC_ORG_EMAIL || "info@aecnetwork.local"}
                className="mt-1 w-full rounded border border-aec-navy/20 bg-aec-navy/[0.02] px-3 py-2 text-aec-navy"
              />
            </div>
          </div>
        </div>

        {/* Notification Gateways & Channel Status */}
        <div className="card">
          <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
            Notification Gateway Status (Modular Interfaces)
          </h3>
          <div className="mt-4 divide-y divide-aec-navy/5 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-aec-navy">In-App Notifications</p>
                <p className="text-aec-navy/60">Real-time portal toasts and message bells</p>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">Active</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-aec-navy">Transactional Email (SMTP)</p>
                <p className="text-aec-navy/60">Configured in .env (EMAIL_SERVER_*)</p>
              </div>
              <span className="rounded bg-amber-50 px-2 py-0.5 font-bold text-amber-700">Safe Standby</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-aec-navy">WhatsApp Business Gateway</p>
                <p className="text-aec-navy/60">Configured in .env (WHATSAPP_API_TOKEN)</p>
              </div>
              <span className="rounded bg-amber-50 px-2 py-0.5 font-bold text-amber-700">Safe Standby</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-aec-navy">SMS Delivery Gateway</p>
                <p className="text-aec-navy/60">Twilio / regional SMS provider interface</p>
              </div>
              <span className="rounded bg-amber-50 px-2 py-0.5 font-bold text-amber-700">Safe Standby</span>
            </div>
          </div>
        </div>

        {/* AI & Security Settings */}
        <div className="card">
          <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
            Security & AI Guardrails
          </h3>
          <div className="mt-3 space-y-2 text-xs text-aec-navy/80">
            <p>&bull; <span className="font-semibold text-aec-navy">AI API Keys:</span> Server-side only (never leaked to browser)</p>
            <p>&bull; <span className="font-semibold text-aec-navy">Rate Limiting:</span> Active on admissions and AI Counselor endpoints</p>
            <p>&bull; <span className="font-semibold text-aec-navy">RBAC Enforcement:</span> Evaluated on every server query and portal route</p>
            <p>&bull; <span className="font-semibold text-aec-navy">Audit Logging:</span> Enabled for student, grading, fee, and salary modifications</p>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
