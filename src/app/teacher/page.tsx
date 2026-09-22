import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "./_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TeacherDashboard() {
  const scope = await getCurrentTeacherScope();

  // Scoped queries: strictly restricted to this teacher's assigned classes
  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        include: {
          course: true,
          enrollments: { include: { student: { include: { user: true } } } },
          timetableSlots: true
        }
      })
    : [];

  const classIds = classes.map((c) => c.id);
  const courseIds = classes.map((c) => c.courseId);

  // Total assigned unique students
  const studentIds = Array.from(
    new Set(classes.flatMap((c) => c.enrollments.map((e) => e.studentId)))
  );

  // Pending assignments count
  const pendingAssignments = scope
    ? await prisma.assignment.count({
        where: { courseId: { in: courseIds } }
      })
    : 0;

  // Recent announcements targeted to teachers or all
  const announcements = await prisma.announcement.findMany({
    where: {
      isPublished: true,
      OR: [
        { targetRoles: { has: "TEACHER" } },
        { targetRoles: { isEmpty: true } }
      ]
    },
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  // Recent notifications
  const notifications = scope
    ? await prisma.notification.findMany({
        where: { userId: scope.userId },
        take: 4,
        orderBy: { createdAt: "desc" }
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teacher Dashboard">
      {!scope && (
        <div className="mb-6 rounded-md bg-amber-50 p-4 border border-amber-200">
          <p className="text-sm font-medium text-amber-800">
            Demo / Viewing Mode: Sign in as an assigned Teacher to view personalized live class records.
          </p>
        </div>
      )}

      {/* Top metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">My Classes</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{classes.length}</p>
          <ScopedDataNote text="Only classes assigned to your teacher account." />
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Assigned Students</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{studentIds.length}</p>
          <ScopedDataNote text="Rostered in your active class cohorts." />
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Assignments</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{pendingAssignments}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Active course assignments</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Attendance Pending</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">{classes.length > 0 ? "Up to date" : "0"}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Mark daily from class view</p>
        </div>
      </div>

      {/* Today's & Upcoming Classes */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
            <h2 className="text-base font-semibold text-aec-navy">Today's & Upcoming Classes</h2>
            <Link href="/teacher/classes" className="text-xs font-medium text-aec-blue hover:underline">
              View All &rarr;
            </Link>
          </div>

          {classes.length === 0 ? (
            <div className="py-8 text-center text-sm text-aec-navy/50">
              No classes currently scheduled for this teacher account.
            </div>
          ) : (
            <div className="mt-4 divide-y divide-aec-navy/5">
              {classes.slice(0, 5).map((c) => (
                <div key={c.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-aec-navy">{c.name}</p>
                    <p className="text-xs text-aec-navy/60">
                      {c.course.title} &bull; {c.enrollments.length} Students enrolled
                    </p>
                    {c.timetableSlots[0] && (
                      <p className="mt-0.5 text-xs text-aec-teal">
                        Schedule: Day {c.timetableSlots[0].dayOfWeek} at {c.timetableSlots[0].startTime} ({c.timetableSlots[0].timezone})
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/teacher/attendance?classId=${c.id}`}
                      className="rounded bg-aec-blue/10 px-3 py-1.5 text-xs font-medium text-aec-blue hover:bg-aec-blue/20"
                    >
                      Mark Attendance
                    </Link>
                    {c.meetingLink && (
                      <a
                        href={c.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded bg-aec-navy px-3 py-1.5 text-xs font-medium text-white hover:bg-aec-navy/90"
                      >
                        Start Session
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tasks & Announcements */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-base font-semibold text-aec-navy border-b border-aec-navy/10 pb-3">
              Announcements
            </h2>
            {announcements.length === 0 ? (
              <p className="mt-3 text-xs text-aec-navy/50">No new announcements at this time.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {announcements.map((a) => (
                  <div key={a.id} className="rounded bg-aec-navy/5 p-3">
                    <p className="text-xs font-semibold text-aec-navy">{a.title}</p>
                    <p className="mt-1 text-xs text-aec-navy/70 line-clamp-2">{a.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="text-base font-semibold text-aec-navy border-b border-aec-navy/10 pb-3">
              Recent Alerts
            </h2>
            {notifications.length === 0 ? (
              <p className="mt-3 text-xs text-aec-navy/50">No unread notifications.</p>
            ) : (
              <div className="mt-3 space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="text-xs border-l-2 border-aec-blue pl-2 py-1">
                    <p className="font-medium text-aec-navy">{n.title}</p>
                    <p className="text-aec-navy/60">{n.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
