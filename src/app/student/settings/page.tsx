"use client";

import { useState } from "react";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";

export default function StudentSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Account Settings & Preferences">
      {saved && (
        <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
          ✅ Your account preferences and notification settings have been updated successfully!
        </div>
      )}

      <div className="space-y-6 max-w-2xl">
        {/* Notification preferences */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-sm font-bold text-slate-900 mb-3">Notification Preferences</h3>
          <div className="space-y-3 text-xs text-slate-700">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-aec-navy focus:ring-aec-navy" />
              <span>Email notification 1 hour before scheduled live class</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-aec-navy focus:ring-aec-navy" />
              <span>WhatsApp class reminder and homework grading alerts</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-aec-navy focus:ring-aec-navy" />
              <span>Monthly tuition fee invoice alerts</span>
            </label>
          </div>
        </div>

        {/* Password update form */}
        <form onSubmit={handleSave} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-display text-sm font-bold text-slate-900 mb-1">Update Security Password</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs" />
          </div>
          <button type="submit" className="btn-primary text-xs px-5 py-2.5">
            Save Preferences
          </button>
        </form>
      </div>
    </PortalShell>
  );
}
