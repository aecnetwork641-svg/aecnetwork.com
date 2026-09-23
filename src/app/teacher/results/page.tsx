"use client";

import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { DEMO_TEACHER_STUDENTS } from "@/lib/teacher-demo-data";

export default function TeacherResultsPage() {
  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Student Grades & Marksheet Roster">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Official Term Gradebook</h3>
          <span className="text-xs text-slate-500">Term 2 Results Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Program</th>
                <th className="p-3">Attendance %</th>
                <th className="p-3">Score / Grade</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DEMO_TEACHER_STUDENTS.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">{st.name}</td>
                  <td className="p-3 text-aec-navy">{st.program}</td>
                  <td className="p-3 font-bold text-emerald-600">{st.attendance}</td>
                  <td className="p-3 font-black text-slate-900">{st.grade}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Passed (Distinction)
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => {}} className="text-aec-navy font-bold hover:underline">
                      Edit Marks
                    </button>
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
