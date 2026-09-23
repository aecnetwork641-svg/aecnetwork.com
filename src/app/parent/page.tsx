"use client";

import { useState } from "react";
import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "./_nav";
import { DEMO_PARENT, DEMO_PARENT_FEEDBACK } from "@/lib/parent-demo-data";

export default function ParentDashboard() {
  const initialChild = DEMO_PARENT.children[0]!;
  const [selectedChildId, setSelectedChildId] = useState<string>(initialChild.id);
  const activeChild = DEMO_PARENT.children.find((c) => c.id === selectedChildId) ?? initialChild;

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title={`Parent Guardian Dashboard`}>
      {/* 1. Parent Welcome & Child Selector */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-aec-gold uppercase tracking-wider">Guardian Account</span>
            <h2 className="font-display text-xl sm:text-2xl font-bold mt-0.5">Welcome, {DEMO_PARENT.fullName}</h2>
            <p className="text-xs text-white/70 mt-1">
              Monitoring {DEMO_PARENT.children.length} Enrolled Children • Registered Email: {DEMO_PARENT.email}
            </p>
          </div>

          {/* Child Switcher Pills */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
            <span className="text-xs font-semibold text-white/70 px-2 hidden sm:inline">Viewing:</span>
            {DEMO_PARENT.children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-2 ${
                  selectedChildId === child.id
                    ? "bg-aec-gold text-aec-navy shadow"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <span>{child.name.split(" ")[0]}</span>
                <span className="text-[10px] opacity-75">({child.overallGrade})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Active Child Summary Card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold text-xl font-bold">
              {activeChild.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-slate-900">{activeChild.name}</h3>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                  {activeChild.grade}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                ID: <span className="font-mono text-slate-800 font-semibold">{activeChild.code}</span> • Instructor: <strong>{activeChild.primaryTeacher}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/parent/classes"
              className="rounded-xl bg-emerald-600 text-white font-bold text-xs px-4 py-2 hover:bg-emerald-700 transition shadow-sm"
            >
              Live Class Schedule
            </Link>
            <Link
              href="/parent/reports"
              className="rounded-xl bg-aec-navy text-white font-bold text-xs px-4 py-2 hover:bg-aec-navy/90 transition shadow-sm"
            >
              View Full Report
            </Link>
          </div>
        </div>

        {/* Metric Cards for Selected Child */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 text-xs font-semibold uppercase">Attendance</span>
            <p className="text-xl font-bold text-emerald-600 mt-1">{activeChild.attendanceRate}%</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Punctual & regular</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 text-xs font-semibold uppercase">Course Progress</span>
            <p className="text-xl font-bold text-slate-900 mt-1">{activeChild.completedLessons}/{activeChild.totalLessons} Lessons</p>
            <p className="text-[11px] text-slate-500 mt-0.5">78% syllabus completed</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 text-xs font-semibold uppercase">Cumulative GPA</span>
            <p className="text-xl font-bold text-slate-900 mt-1">{activeChild.gpa} ({activeChild.overallGrade})</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Distinction</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 text-xs font-semibold uppercase">Tuition Status</span>
            <p className="text-xl font-bold text-emerald-600 mt-1">Paid (Cleared)</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Next cycle: Oct 01, 2026</p>
          </div>
        </div>
      </div>

      {/* 3. Next Class & Teacher Feedback */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Next class banner */}
        <div className="lg:col-span-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-bold uppercase text-emerald-800">Upcoming Live Session for {activeChild.name}</span>
            </div>
            <h4 className="font-display text-base font-bold text-slate-900 mt-2">{activeChild.nextClass}</h4>
            <p className="text-xs text-slate-600 mt-1">
              Instructor: <strong>{activeChild.primaryTeacher}</strong> • Time: <span className="font-semibold text-emerald-700">{activeChild.nextClassTime}</span>
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={activeChild.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-4 py-2"
            >
              Open Class Link
            </a>
            <Link
              href="/parent/timetable"
              className="text-xs font-semibold text-slate-600 hover:text-aec-navy"
            >
              Full Timetable &rarr;
            </Link>
          </div>
        </div>

        {/* Teacher Feedback */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display text-sm font-bold text-slate-900">Latest Teacher Observations</h4>
            <Link href="/parent/feedback" className="text-xs font-semibold text-aec-navy hover:underline">
              All Feedback &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {DEMO_PARENT_FEEDBACK.filter((f) => f.childName === activeChild.name).map((f) => (
              <div key={f.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{f.teacher}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{f.date}</span>
                </div>
                <p className="text-slate-600 mt-1.5 italic">&ldquo;{f.comment}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
