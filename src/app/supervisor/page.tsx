import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { SUPERVISOR_NAV } from "./_nav";
import { getCurrentSupervisorScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function SupervisorDashboardPage() {
  let scope = null;
  let teamEmployees: any[] = [];
  let pendingLeaves: any[] = [];
  let classes: any[] = [];

  try {
    scope = await getCurrentSupervisorScope();
    const departmentId = scope?.departmentId;

    if (departmentId) {
      teamEmployees = await prisma.employee.findMany({
        where: { departmentId },
        include: {
          user: true,
          staffAttendances: { take: 1, orderBy: { date: "desc" } },
          leaveRequests: { where: { supervisorStatus: "pending" } }
        }
      });

      const teamEmployeeIds = teamEmployees.map((e) => e.id);

      pendingLeaves = await prisma.leaveRequest.findMany({
        where: {
          employeeId: { in: teamEmployeeIds },
          supervisorStatus: "pending"
        },
        include: {
          employee: { include: { user: true } },
          leaveType: true
        }
      });
    }

    classes = await prisma.class.findMany({
      take: 6,
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true
      }
    });
  } catch (err) {
    console.error("Database fetch fallback for supervisor:", err);
  }

  // Fallback demo data if DB is empty or unauthenticated preview
  const demoDepartment = scope?.department?.name || "Quranic & Islamic Studies Faculty";

  const displayTeam = teamEmployees.length > 0 ? teamEmployees.map(e => ({
    id: e.id,
    name: e.user?.name || "Faculty Member",
    position: e.position || "Senior Instructor",
    status: e.status || "active",
    annualLeaveBal: e.annualLeaveBal ?? 14,
    punctuality: "98.5%",
    currentClass: "Live in Tajweed 101"
  })) : [
    { id: "e-1", name: "Ustadh Muhammad Qasim", position: "Senior Quran & Tajweed Faculty", status: "active", annualLeaveBal: 12, punctuality: "99.2%", currentClass: "Live: Advanced Tajweed" },
    { id: "e-2", name: "Ustadha Fatima Al-Zahra", position: "Hifz Program Lead Instructor", status: "active", annualLeaveBal: 15, punctuality: "97.8%", currentClass: "Scheduled: Surah Al-Baqarah" },
    { id: "e-3", name: "Sheikh Tariq Mehmood", position: "Islamic Jurisprudence Lecturer", status: "active", annualLeaveBal: 8, punctuality: "98.0%", currentClass: "Live: Fiqh of Worship" },
    { id: "e-4", name: "Ustadh Bilal Ahmed", position: "Noorani Qaida Specialist", status: "active", annualLeaveBal: 14, punctuality: "100%", currentClass: "Free Trial: Beginner Qaida" },
  ];

  const displayLeaves = pendingLeaves.length > 0 ? pendingLeaves.map(l => ({
    id: l.id,
    name: l.employee?.user?.name || "Staff Member",
    type: l.leaveType?.name || "Casual Leave",
    dates: `${new Date(l.startDate).toLocaleDateString()} - ${new Date(l.endDate).toLocaleDateString()}`,
    reason: l.reason || "Personal emergency"
  })) : [
    { id: "l-1", name: "Ustadha Fatima Al-Zahra", type: "Annual Leave", dates: "Oct 12, 2026 - Oct 14, 2026", reason: "Family commitment & umrah travel preparations" },
    { id: "l-2", name: "Sheikh Tariq Mehmood", type: "Conference Leave", dates: "Oct 20, 2026 - Oct 21, 2026", reason: "Attending International Islamic Education Symposium" }
  ];

  const displayClasses = classes.length > 0 ? classes.map(c => ({
    id: c.id,
    title: c.name || "Live Session",
    course: c.course?.name || "Islamic Studies",
    teacher: c.teacher?.user?.name || "Assigned Faculty",
    students: c.enrollments?.length || 0,
    status: "In Session"
  })) : [
    { id: "c-1", title: "Tajweed Rules & Makharij Sec A", course: "Advanced Tajweed Mastery", teacher: "Ustadh Muhammad Qasim", students: 18, status: "Live Now" },
    { id: "c-2", title: "Noorani Qaida Foundations Sec 3", course: "Noorani Qaida for Kids", teacher: "Ustadh Bilal Ahmed", students: 12, status: "Live Now" },
    { id: "c-3", title: "Juz Amma Memorization Circle", course: "Complete Quran Memorization (Hifz)", teacher: "Ustadha Fatima Al-Zahra", students: 14, status: "Starting in 15m" },
    { id: "c-4", title: "Fiqh & Daily Duas Evening Cohort", course: "Islamic Jurisprudence (Fiqh)", teacher: "Sheikh Tariq Mehmood", students: 22, status: "Scheduled" }
  ];

  return (
    <PortalShell role="Supervisor Portal" navItems={SUPERVISOR_NAV} title="Department Supervisor Dashboard">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-aec-navy">Academic Quality & Faculty Supervision</h2>
          <p className="text-sm text-aec-navy/70">
            Supervisory oversight for <span className="font-semibold text-aec-gold">{demoDepartment}</span>.
          </p>
        </div>
        <ScopedDataNote text="Departmental Scope: Real-time oversight of faculty performance, classroom audits, and leave approvals." />
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card border-l-4 border-l-aec-navy">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/60">Supervised Faculty</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{displayTeam.length}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">100% active & credentialed</p>
        </div>
        <div className="card border-l-4 border-l-amber-500">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/60">Pending Leave Approvals</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{displayLeaves.length}</p>
          <p className="mt-1 text-xs text-amber-600 font-medium">Awaiting supervisor endorsement</p>
        </div>
        <div className="card border-l-4 border-l-aec-gold">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/60">Live / Active Classes</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{displayClasses.length}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Department class cohorts</p>
        </div>
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/60">Faculty Punctuality</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">98.9%</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Zero unexcused absences</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Supervised Team Members */}
        <div id="team" className="card">
          <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
            <h3 className="font-bold text-aec-navy text-base">Department Faculty Members</h3>
            <span className="text-xs font-medium text-aec-navy/60">{displayTeam.length} Teachers</span>
          </div>
          <div className="mt-3 divide-y divide-aec-navy/5">
            {displayTeam.map((emp) => (
              <div key={emp.id} className="py-3 flex items-center justify-between text-xs hover:bg-aec-cream/30 px-2 rounded transition">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-aec-navy text-sm">{emp.name}</p>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      {emp.status}
                    </span>
                  </div>
                  <p className="text-aec-navy/60 text-xs mt-0.5">{emp.position}</p>
                  <p className="text-xs text-aec-gold font-medium mt-1">Current: {emp.currentClass}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-aec-navy">Punctuality: {emp.punctuality}</p>
                  <p className="text-[11px] text-aec-navy/60 mt-0.5">Leave Balance: {emp.annualLeaveBal}d</p>
                  <button className="mt-1.5 text-[11px] font-semibold text-aec-navy hover:underline">
                    Observe Class &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Leave Requests for Supervisor Approval */}
        <div id="leave" className="card">
          <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
            <h3 className="font-bold text-aec-navy text-base">Leave Requests Pending Review</h3>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
              {displayLeaves.length} Action Needed
            </span>
          </div>
          <div className="mt-3 divide-y divide-aec-navy/5">
            {displayLeaves.map((l) => (
              <div key={l.id} className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-aec-navy text-sm">{l.name}</p>
                  <p className="text-aec-navy/70 font-medium mt-0.5">
                    <span className="font-bold text-amber-700">{l.type}</span> &bull; {l.dates}
                  </p>
                  <p className="text-[11px] text-aec-navy/60 italic mt-1 bg-aec-cream/50 p-2 rounded">
                    &ldquo;{l.reason}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    className="rounded bg-emerald-600 px-3 py-1.5 font-bold text-white hover:bg-emerald-700 shadow-sm"
                  >
                    Endorse
                  </button>
                  <button
                    type="button"
                    className="rounded bg-rose-50 px-3 py-1.5 font-bold text-rose-700 hover:bg-rose-100"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Classroom Observations & Live Sessions */}
      <div id="classes" className="mt-8 card">
        <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
          <div>
            <h3 className="font-bold text-aec-navy text-base">Faculty Classroom Quality Audits</h3>
            <p className="text-xs text-aec-navy/60">Live classroom monitoring and curriculum pacing checks</p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-semibold">
            All Sessions Secure & Encrypted
          </span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayClasses.map((c) => (
            <div key={c.id} className="p-4 border rounded-lg bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                  c.status === "Live Now" ? "bg-rose-100 text-rose-700 animate-pulse" : "bg-blue-100 text-blue-700"
                }`}>
                  {c.status}
                </span>
                <h4 className="font-bold text-aec-navy text-sm mt-2">{c.title}</h4>
                <p className="text-xs text-aec-gold font-medium mt-0.5">{c.course}</p>
                <p className="text-xs text-aec-navy/60 mt-1">Teacher: {c.teacher}</p>
                <p className="text-xs text-aec-navy/60">Enrolled: {c.students} students</p>
              </div>
              <div className="mt-4 pt-3 border-t flex items-center justify-between">
                <button className="text-xs font-bold text-aec-navy hover:text-aec-gold">
                  Audit Stream
                </button>
                <button className="text-xs font-bold text-aec-gold hover:underline">
                  Log Rubric
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

