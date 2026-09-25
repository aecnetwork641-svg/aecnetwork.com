import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "./_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentDashboard({
  searchParams
}: {
  searchParams?: { child?: string };
}) {
  const scope = await getCurrentParentScope(searchParams?.child);
  if (!scope?.parent) {
    redirect("/login?error=AccessDenied");
  }

  const { parent, children, selectedChild } = scope;

  // Real Database queries for the selected child (strictly scoped to this parent's child)
  let childAttendances: any[] = [];
  let childFeedbacks: any[] = [];
  let childInvoices: any[] = [];
  let childResults: any[] = [];

  if (selectedChild) {
    [childAttendances, childFeedbacks, childInvoices, childResults] = await Promise.all([
      prisma.attendance.findMany({
        where: { studentId: selectedChild.id },
        orderBy: { date: "desc" },
        take: 20
      }),
      prisma.teacherFeedback.findMany({
        where: { studentId: selectedChild.id },
        include: { teacher: { include: { user: true } } },
        orderBy: { createdAt: "desc" },
        take: 4
      }),
      prisma.invoice.findMany({
        where: { studentId: selectedChild.id },
        orderBy: { issuedAt: "desc" }
      }),
      prisma.result.findMany({
        where: { studentId: selectedChild.id },
        include: { exam: true },
        orderBy: { exam: { date: "desc" } }
      })
    ]);
  }

  const totalAtt = childAttendances.length;
  const presentAtt = childAttendances.filter((a) => a.status === "present").length;
  const attendanceRate = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;

  const unpaidInvoices = childInvoices.filter((i) => i.status === "unpaid");
  const billingStatus = unpaidInvoices.length === 0 ? "Paid (Cleared)" : `${unpaidInvoices.length} Due(s) Pending`;

  const avgScore = childResults.length > 0 ? Math.round(childResults.reduce((s, r) => s + r.score, 0) / childResults.length) : null;
  const overallGrade = avgScore ? (avgScore >= 90 ? "A+" : avgScore >= 80 ? "A" : avgScore >= 70 ? "B" : "C") : "N/A";

  const enrolledCourseTitles = selectedChild?.enrollments?.map((e) => e.course.title) || [];
  const primaryCourse = enrolledCourseTitles[0] || "Enrolled in Academy";
  const activeClass = selectedChild?.enrollments?.find((e) => e.class)?.class;

  const parentName = parent.user?.name || "Guardian";
  const parentEmail = parent.user?.email || "";

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Parent Guardian Dashboard">
      {/* 1. Parent Welcome & Child Selector */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-aec-gold uppercase tracking-wider">Guardian Account</span>
            <h2 className="font-display text-xl sm:text-2xl font-bold mt-0.5">Welcome, {parentName}</h2>
            <p className="text-xs text-white/70 mt-1">
              Registered Email: {parentEmail} • Monitoring {children.length} Registered Child(ren)
            </p>
          </div>

          {/* Child Switcher Pills */}
          {children.length > 1 && (
            <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
              <span className="text-xs font-semibold text-white/70 px-2 hidden sm:inline">Viewing:</span>
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={`/parent?child=${child.id}`}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-2 ${
                    selectedChild?.id === child.id
                      ? "bg-aec-gold text-aec-navy shadow"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  <span>{child.user?.name || "Child"}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {children.length === 0 ? (
        <div className="mt-8 card text-center py-12">
          <p className="text-sm font-bold text-slate-800">No linked children records found</p>
          <p className="text-xs text-slate-500 mt-1">
            If you recently enrolled your child, the admissions office will link their student profile shortly.
          </p>
          <Link href="/admissions/apply" className="mt-4 btn-primary inline-block text-xs">
            Submit New Admission
          </Link>
        </div>
      ) : (
        <>
          {/* 2. Active Child Summary Card */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold text-xl font-bold">
                  {(selectedChild?.user?.name || "C").charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-slate-900">{selectedChild?.user?.name || "Student"}</h3>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                      {overallGrade} Standing
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Student ID: <span className="font-mono text-slate-800 font-semibold">{selectedChild?.studentCode || "AEC-STUDENT"}</span> • Program: <strong>{primaryCourse}</strong>
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
                <span className="text-slate-500 text-xs font-semibold uppercase">Attendance Rate</span>
                <p className="text-xl font-bold text-emerald-600 mt-1">{attendanceRate}%</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{presentAtt} of {totalAtt} recorded classes</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-xs font-semibold uppercase">Active Enrollments</span>
                <p className="text-xl font-bold text-slate-900 mt-1">{selectedChild?.enrollments?.length || 0} Courses</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{primaryCourse}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-xs font-semibold uppercase">Average Performance</span>
                <p className="text-xl font-bold text-slate-900 mt-1">{avgScore ? `${avgScore}%` : "Pending"}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">{childResults.length} Result(s) Published</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-xs font-semibold uppercase">Tuition Status</span>
                <p className={`text-xl font-bold mt-1 ${unpaidInvoices.length === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                  {billingStatus}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{childInvoices.length} Total Invoices</p>
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
                  <span className="text-xs font-bold uppercase text-emerald-800">Assigned Cohort for {selectedChild?.user.name}</span>
                </div>
                {activeClass ? (
                  <>
                    <h4 className="font-display text-base font-bold text-slate-900 mt-2">{activeClass.name}</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Instructor: <strong>{activeClass.teacher.user.name}</strong> • Platform: <span className="font-semibold text-emerald-700">{activeClass.meetingPlatform}</span>
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-600 mt-2">Class timetable allocation in progress by academic department.</p>
                )}
              </div>

              {activeClass?.meetingLink && (
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={activeClass.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-4 py-2"
                  >
                    Open Live Session Link
                  </a>
                  <Link
                    href="/parent/timetable"
                    className="text-xs font-semibold text-slate-600 hover:text-aec-navy"
                  >
                    Full Timetable &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Teacher Feedback */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-bold text-slate-900">Teacher Observations</h4>
                <Link href="/parent/feedback" className="text-xs font-semibold text-aec-navy hover:underline">
                  All Feedback &rarr;
                </Link>
              </div>

              {childFeedbacks.length === 0 ? (
                <p className="text-xs text-slate-500 py-3">No teacher feedback recorded yet for {selectedChild?.user.name}.</p>
              ) : (
                <div className="space-y-3">
                  {childFeedbacks.map((f) => (
                    <div key={f.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{f.teacher.user.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{new Date(f.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-600 mt-1.5 italic">&ldquo;{f.body}&rdquo;</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </PortalShell>
  );
}
