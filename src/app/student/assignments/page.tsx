import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";
import StudentAssignmentsClient, { AssignmentItem } from "./AssignmentsClient";

export default async function StudentAssignmentsPage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.student) {
    redirect("/login");
  }

  const { student } = scope;

  // Find all enrollments for this student to get courses
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: student.id },
    include: { course: true }
  });

  const courseIds = enrollments.map((e) => e.courseId);

  // Find assignments for enrolled courses
  const assignments = await prisma.assignment.findMany({
    where: {
      courseId: { in: courseIds }
    },
    include: {
      course: true,
      submissions: {
        where: { studentId: student.id }
      }
    },
    orderBy: { dueDate: "asc" }
  });

  const formattedAssignments: AssignmentItem[] = assignments.map((a) => {
    const submission = a.submissions[0];
    let status: "pending" | "submitted" | "graded" = "pending";
    if (submission) {
      if (submission.score !== null && submission.score !== undefined) {
        status = "graded";
      } else {
        status = "submitted";
      }
    }

    return {
      id: a.id,
      courseTitle: a.course.title,
      title: a.title,
      description: a.description,
      dueDate: new Date(a.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      maxScore: a.maxScore,
      status,
      score: submission?.score,
      feedback: submission?.feedback,
      submittedAt: submission?.submittedAt
        ? new Date(submission.submittedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          })
        : null
    };
  });

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Assignments & Homework">
      <StudentAssignmentsClient assignments={formattedAssignments} />
    </PortalShell>
  );
}
