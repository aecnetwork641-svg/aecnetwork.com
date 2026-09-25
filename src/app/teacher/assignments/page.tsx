import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";
import TeacherAssignmentsClient, { PendingGradingItem } from "./TeacherAssignmentsClient";

export default async function TeacherAssignmentsPage() {
  const scope = await getCurrentTeacherScope();
  if (!scope?.teacher) {
    redirect("/login");
  }

  const { teacher } = scope;
  const teacherClassIds = (teacher.classes || []).map((c: any) => c.id);

  // Find courses taught by this teacher
  const classes = await prisma.class.findMany({
    where: { id: { in: teacherClassIds } },
    select: { courseId: true }
  });
  const courseIds = classes.map((c) => c.courseId);

  // Find submissions for assignments in these courses
  const submissions = await prisma.submission.findMany({
    where: {
      assignment: {
        courseId: { in: courseIds }
      }
    },
    include: {
      assignment: { include: { course: true } },
      student: { include: { user: true } }
    },
    orderBy: { submittedAt: "desc" }
  });

  const formattedSubmissions: PendingGradingItem[] = submissions.map((sub) => ({
    id: sub.id,
    assignmentTitle: sub.assignment.title,
    courseTitle: sub.assignment.course.title,
    studentName: sub.student.user.name || "Student",
    studentCode: sub.student.studentCode,
    submittedDate: new Date(sub.submittedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }),
    fileUrl: sub.fileUrl,
    maxScore: sub.assignment.maxScore,
    currentScore: sub.score,
    currentFeedback: sub.feedback
  }));

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Student Homework Submissions & Grading Deck">
      <TeacherAssignmentsClient submissions={formattedSubmissions} />
    </PortalShell>
  );
}
