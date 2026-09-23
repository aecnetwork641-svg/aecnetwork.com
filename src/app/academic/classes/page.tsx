"use client";

import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";

export default function AcademicClassesPage() {
  const classes = [
    { name: "Quran Recitation 1-on-1", teacher: "Ustadh Muhammad Qasim", student: "Abdullah Akbar", time: "5:00 PM - 5:45 PM", platform: "Google Meet", status: "Active" },
    { name: "Spoken Arabic Cohort A", teacher: "Ustadh Tariq Al-Mansoor", student: "Ibrahim Malik & Cohort", time: "6:30 PM - 7:15 PM", platform: "Zoom", status: "Active" },
    { name: "Noorani Qaida & Nazra", teacher: "Ustaza Maryam Bint Bilal", student: "Fatima Akbar", time: "4:30 PM - 5:15 PM", platform: "Zoom", status: "Active" },
    { name: "English Composition & Grammar", teacher: "Sister Amina Siddiqui", student: "Zaid Bin Tariq", time: "5:00 PM - 5:45 PM", platform: "Google Meet", status: "Active" },
  ];

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Class Allocations & Room Management">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Active Live Virtual Classrooms</h3>
          <button onClick={() => {}} className="btn-primary text-xs px-3 py-1.5">
            + Allocate New Class
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Class / Subject</th>
                <th className="p-3">Assigned Faculty</th>
                <th className="p-3">Student / Cohort</th>
                <th className="p-3">Schedule</th>
                <th className="p-3">Platform</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {classes.map((cls, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{cls.name}</td>
                  <td className="p-3 text-aec-navy font-semibold">{cls.teacher}</td>
                  <td className="p-3">{cls.student}</td>
                  <td className="p-3">{cls.time}</td>
                  <td className="p-3 font-medium">{cls.platform}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {cls.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
