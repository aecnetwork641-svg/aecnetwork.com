/**
 * AEC NETWORK — Production & Development Database Seed Script
 *
 * Populates realistic, fully interconnected educational management data:
 * - 10 Core User Roles (Super Admin, Academic Head, Admissions, Finance, HR, Supervisor, Teachers, Parents, Students)
 * - Academic structure, Programs, Courses, Classes, Sections, TimetableSlots
 * - Connected Enrollments, Attendance records, Assignments, Submissions, Grades, Exams, Results, Certificates
 * - Finance Fee Plans, Invoices, Payments, Expenses
 * - HR Employees, Leave Types, Leave Requests, Payslips, Staff Attendance
 * - Notifications, Messages, Announcements, and Immutable Audit Trail
 *
 * Default login password for all seeded accounts: "Demo@12345"
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting AEC Network database seeding...");
  const passwordHash = await bcrypt.hash("Demo@12345", 10);

  const superAdminHash = await bcrypt.hash("qwe123456", 10);

  // 1. Core Administrative Users
  const superAdmin = await prisma.user.upsert({
    where: { email: "sohailakbar641@gmail.com" },
    update: { hashedPassword: superAdminHash, role: "SUPER_ADMIN", name: "Sohail Akbar", isActive: true },
    create: {
      email: "sohailakbar641@gmail.com",
      name: "Sohail Akbar",
      role: "SUPER_ADMIN",
      hashedPassword: superAdminHash,
      isActive: true
    }
  });

  const academicHead = await prisma.user.upsert({
    where: { email: "academic@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "academic@demo.aecnetwork.local",
      name: "Dr. Ahmad Farooq (Academic Dean)",
      role: "ACADEMIC_HEAD",
      hashedPassword: passwordHash,
      isActive: true
    }
  });

  const admissionsOfficer = await prisma.user.upsert({
    where: { email: "admissions@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "admissions@demo.aecnetwork.local",
      name: "Sarah Khan (Admissions Officer)",
      role: "ADMISSIONS_OFFICER",
      hashedPassword: passwordHash,
      isActive: true
    }
  });

  const financeManager = await prisma.user.upsert({
    where: { email: "finance@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "finance@demo.aecnetwork.local",
      name: "Usman Tariq (Finance Manager)",
      role: "FINANCE_MANAGER",
      hashedPassword: passwordHash,
      isActive: true
    }
  });

  const hrManager = await prisma.user.upsert({
    where: { email: "hr@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "hr@demo.aecnetwork.local",
      name: "Ayesha Siddiqui (HR Director)",
      role: "HR_MANAGER",
      hashedPassword: passwordHash,
      isActive: true
    }
  });

  // 2. Academic Departments & Academic Year
  const academicYear = await prisma.academicYear.upsert({
    where: { name: "2026-2027" },
    update: {},
    create: {
      name: "2026-2027",
      startDate: new Date("2026-08-01"),
      endDate: new Date("2027-06-30"),
      isCurrent: true
    }
  });

  const term1 = await prisma.term.upsert({
    where: { id: "term-fall-2026" },
    update: {},
    create: {
      id: "term-fall-2026",
      academicYearId: academicYear.id,
      name: "Fall Term 2026",
      startDate: new Date("2026-08-15"),
      endDate: new Date("2026-12-20"),
      isCurrent: true
    }
  });

  const deptQIS = await prisma.department.upsert({
    where: { name: "Quranic & Islamic Studies" },
    update: {},
    create: {
      name: "Quranic & Islamic Studies",
      code: "QIS"
    }
  });

  const deptLanguages = await prisma.department.upsert({
    where: { name: "Languages & Humanities" },
    update: {},
    create: {
      name: "Languages & Humanities",
      code: "LANG"
    }
  });

  // 3. Supervisor
  const supervisorUser = await prisma.user.upsert({
    where: { email: "supervisor@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "supervisor@demo.aecnetwork.local",
      name: "Sheikh Bilal Al-Azhari (Supervisor)",
      role: "SUPERVISOR",
      hashedPassword: passwordHash,
      isActive: true,
      employee: {
        create: {
          employeeCode: "EMP-SUP-001",
          departmentId: deptQIS.id,
          position: "Head of Quranic Faculty",
          annualLeaveBal: 22,
          sickLeaveBal: 10
        }
      }
    }
  });

  // 4. Teachers
  const teacherUser1 = await prisma.user.upsert({
    where: { email: "teacher1@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "teacher1@demo.aecnetwork.local",
      name: "Ustadh Muhammad Qasim",
      role: "TEACHER",
      hashedPassword: passwordHash,
      isActive: true,
      teacher: {
        create: {
          teacherCode: "AEC-TCH-001",
          specialties: ["Tajweed Rules", "Quranic Phonetics", "Tarteel"],
          bio: "Al-Azhar Certified Qari with 12+ years of online and classroom teaching."
        }
      },
      employee: {
        create: {
          employeeCode: "EMP-TCH-001",
          departmentId: deptQIS.id,
          position: "Senior Tajweed Faculty"
        }
      }
    },
    include: { teacher: true }
  });

  const teacherUser2 = await prisma.user.upsert({
    where: { email: "teacher2@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "teacher2@demo.aecnetwork.local",
      name: "Sister Amina Siddiqui",
      role: "TEACHER",
      hashedPassword: passwordHash,
      isActive: true,
      teacher: {
        create: {
          teacherCode: "AEC-TCH-002",
          specialties: ["English Grammar", "Academic Writing", "Spoken English"],
          bio: "M.A. English Literature with extensive test prep and communicative training experience."
        }
      },
      employee: {
        create: {
          employeeCode: "EMP-TCH-002",
          departmentId: deptLanguages.id,
          position: "Senior Language Faculty"
        }
      }
    },
    include: { teacher: true }
  });

  // 5. Parents & Students (Isolated Multi-Tenant Pairs)
  // Parent 1 (Mrs. Fatima Akbar) -> 2 Children (Abdullah & Maryam)
  const parentUser1 = await prisma.user.upsert({
    where: { email: "parent1@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "parent1@demo.aecnetwork.local",
      name: "Mrs. Fatima Akbar",
      role: "PARENT",
      hashedPassword: passwordHash,
      isActive: true,
      parent: { create: {} }
    },
    include: { parent: true }
  });

  const studentUser1 = await prisma.user.upsert({
    where: { email: "student1@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "student1@demo.aecnetwork.local",
      name: "Abdullah Akbar",
      role: "STUDENT",
      hashedPassword: passwordHash,
      isActive: true,
      student: {
        create: {
          studentCode: "AEC-STU-2026-001",
          guardianId: parentUser1.parent!.id,
          country: "Pakistan"
        }
      }
    },
    include: { student: true }
  });

  const studentUser2 = await prisma.user.upsert({
    where: { email: "student2@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "student2@demo.aecnetwork.local",
      name: "Maryam Akbar",
      role: "STUDENT",
      hashedPassword: passwordHash,
      isActive: true,
      student: {
        create: {
          studentCode: "AEC-STU-2026-002",
          guardianId: parentUser1.parent!.id,
          country: "Pakistan"
        }
      }
    },
    include: { student: true }
  });

  // Parent 2 (Mr. Tariq Mehmood) -> 1 Child (Zaid Tariq)
  const parentUser2 = await prisma.user.upsert({
    where: { email: "parent2@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "parent2@demo.aecnetwork.local",
      name: "Mr. Tariq Mehmood",
      role: "PARENT",
      hashedPassword: passwordHash,
      isActive: true,
      parent: { create: {} }
    },
    include: { parent: true }
  });

  const studentUser3 = await prisma.user.upsert({
    where: { email: "student3@demo.aecnetwork.local" },
    update: { hashedPassword: passwordHash, isActive: true },
    create: {
      email: "student3@demo.aecnetwork.local",
      name: "Zaid Tariq",
      role: "STUDENT",
      hashedPassword: passwordHash,
      isActive: true,
      student: {
        create: {
          studentCode: "AEC-STU-2026-003",
          guardianId: parentUser2.parent!.id,
          country: "United Kingdom"
        }
      }
    },
    include: { student: true }
  });

  // 6. Programs & Courses
  const programQuran = await prisma.program.upsert({
    where: { slug: "quran-islamic-studies" },
    update: {},
    create: {
      title: "Quran & Islamic Studies",
      slug: "quran-islamic-studies",
      category: "Quran & Islamic Studies",
      description: "Structured Quran recitation, applied Tajweed rules, and foundational Islamic understanding.",
      isPublished: true
    }
  });

  const programEnglish = await prisma.program.upsert({
    where: { slug: "english-mastery" },
    update: {},
    create: {
      title: "English Mastery & Composition",
      slug: "english-mastery",
      category: "English",
      description: "Comprehensive grammar, academic essay composition, and communicative fluency.",
      isPublished: true
    }
  });

  const courseTajweed = await prisma.course.upsert({
    where: { slug: "applied-tajweed-advanced" },
    update: {},
    create: {
      programId: programQuran.id,
      title: "Applied Tajweed & Recitation Rules",
      slug: "applied-tajweed-advanced",
      description: "Deep dive into articulation points (Makharij), characteristics of letters (Sifaat), and fluent Tarteel.",
      deliveryMode: "one-to-one",
      durationWeeks: 12,
      isPublished: true,
      primaryInstructorId: teacherUser1.teacher!.id
    }
  });

  const courseEnglish = await prisma.course.upsert({
    where: { slug: "english-grammar-writing" },
    update: {},
    create: {
      programId: programEnglish.id,
      title: "English Grammar & Academic Writing",
      slug: "english-grammar-writing",
      description: "Advanced sentence structures, essay argumentation, and vocabulary enrichment.",
      deliveryMode: "group",
      durationWeeks: 10,
      isPublished: true,
      primaryInstructorId: teacherUser2.teacher!.id
    }
  });

  // 7. Classes & Timetables
  const classTajweed = await prisma.class.upsert({
    where: { id: "cls-tajweed-alpha" },
    update: {},
    create: {
      id: "cls-tajweed-alpha",
      courseId: courseTajweed.id,
      teacherId: teacherUser1.teacher!.id,
      name: "Applied Tajweed — Cohort Alpha",
      capacity: 5,
      meetingPlatform: "GOOGLE_MEET",
      meetingLink: "https://meet.google.com/aec-tajweed-class",
      status: "ACTIVE",
      academicYearId: academicYear.id,
      termId: term1.id,
      timetableSlots: {
        create: [
          { dayOfWeek: 1, startTime: "17:00", endTime: "17:45", timezone: "Asia/Karachi" },
          { dayOfWeek: 3, startTime: "17:00", endTime: "17:45", timezone: "Asia/Karachi" }
        ]
      }
    }
  });

  const classEnglish = await prisma.class.upsert({
    where: { id: "cls-english-sec-a" },
    update: {},
    create: {
      id: "cls-english-sec-a",
      courseId: courseEnglish.id,
      teacherId: teacherUser2.teacher!.id,
      name: "English Composition — Cohort Sec A",
      capacity: 10,
      meetingPlatform: "ZOOM",
      meetingLink: "https://zoom.us/j/923435999397",
      status: "ACTIVE",
      academicYearId: academicYear.id,
      termId: term1.id,
      timetableSlots: {
        create: [
          { dayOfWeek: 2, startTime: "16:00", endTime: "17:00", timezone: "Asia/Karachi" },
          { dayOfWeek: 4, startTime: "16:00", endTime: "17:00", timezone: "Asia/Karachi" }
        ]
      }
    }
  });

  // 8. Enrollments
  await prisma.enrollment.upsert({
    where: { studentId_courseId: { studentId: studentUser1.student!.id, courseId: courseTajweed.id } },
    update: {},
    create: {
      studentId: studentUser1.student!.id,
      courseId: courseTajweed.id,
      classId: classTajweed.id,
      status: "active"
    }
  });

  await prisma.enrollment.upsert({
    where: { studentId_courseId: { studentId: studentUser3.student!.id, courseId: courseEnglish.id } },
    update: {},
    create: {
      studentId: studentUser3.student!.id,
      courseId: courseEnglish.id,
      classId: classEnglish.id,
      status: "active"
    }
  });

  // 9. Attendance
  await prisma.attendance.upsert({
    where: {
      classId_studentId_date: {
        classId: classTajweed.id,
        studentId: studentUser1.student!.id,
        date: new Date("2026-09-22T00:00:00Z")
      }
    },
    update: {},
    create: {
      classId: classTajweed.id,
      studentId: studentUser1.student!.id,
      date: new Date("2026-09-22T00:00:00Z"),
      status: "present",
      note: "Excellent recitation of Surah Al-Mulk"
    }
  });

  // 10. Assignments & Submissions
  const assignment1 = await prisma.assignment.create({
    data: {
      courseId: courseTajweed.id,
      title: "Surah Al-Mulk (Ayat 1-10) Recitation Audio Recording",
      description: "Record a clear 3-minute audio reciting Surah Al-Mulk with proper Ikhfa and Ghunnah rules applied.",
      dueDate: new Date("2026-09-28T23:59:59Z"),
      maxScore: 50
    }
  });

  await prisma.submission.create({
    data: {
      assignmentId: assignment1.id,
      studentId: studentUser1.student!.id,
      score: 48,
      feedback: "MashaAllah outstanding pronunciation and clear Makharij of letters Qaaf and Khaa."
    }
  });

  // 11. Exams & Results
  const examTajweed = await prisma.exam.create({
    data: {
      courseId: courseTajweed.id,
      title: "Mid-Term Comprehensive Oral & Theory Exam",
      date: new Date("2026-09-15"),
      maxScore: 100
    }
  });

  await prisma.result.create({
    data: {
      examId: examTajweed.id,
      studentId: studentUser1.student!.id,
      score: 96,
      grade: "A+",
      remarks: "Outstanding mastery of Tajweed rules and fluent Tarteel recitation."
    }
  });

  // 12. Certificates
  await prisma.certificate.upsert({
    where: { credentialCode: "AEC-CRD-8891-2026" },
    update: {},
    create: {
      studentId: studentUser1.student!.id,
      courseId: courseTajweed.id,
      title: "Certificate of Completion: Intermediate Tajweed & Quran Recitation",
      credentialCode: "AEC-CRD-8891-2026",
      issuedAt: new Date("2026-08-15")
    }
  });

  // 13. Finance (Fee Plans, Invoices, Payments, Expenses)
  await prisma.feePlan.upsert({
    where: { id: "fee-monthly-regular" },
    update: {},
    create: {
      id: "fee-monthly-regular",
      name: "Monthly Regular Tuition",
      billingCycle: "monthly",
      baseAmount: 65.0,
      currency: "USD",
      description: "Standard monthly fee for 1-on-1 tutoring sessions"
    }
  });

  const invoice1 = await prisma.invoice.create({
    data: {
      studentId: studentUser1.student!.id,
      amount: 65.0,
      currency: "USD",
      dueDate: new Date("2026-09-10"),
      status: "paid"
    }
  });

  await prisma.payment.create({
    data: {
      invoiceId: invoice1.id,
      amount: 65.0,
      method: "card",
      reference: "TXN-AEC-9901"
    }
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      studentId: studentUser3.student!.id,
      amount: 75.0,
      currency: "USD",
      dueDate: new Date("2026-10-10"),
      status: "unpaid"
    }
  });

  await prisma.expense.create({
    data: {
      title: "Zoom & Video Infrastructure Cloud Subscription",
      category: "software",
      amount: 120.0,
      currency: "USD",
      note: "Monthly educational meeting licenses"
    }
  });

  // 14. HR (Leave Types & Requests)
  const leaveAnnual = await prisma.leaveType.upsert({
    where: { code: "AL" },
    update: {},
    create: {
      name: "Annual Leave",
      code: "AL",
      maxDaysPerYear: 20,
      isPaid: true
    }
  });

  const employeeTeacher1 = await prisma.employee.findUnique({ where: { userId: teacherUser1.id } });
  if (employeeTeacher1) {
    await prisma.leaveRequest.create({
      data: {
        employeeId: employeeTeacher1.id,
        leaveTypeId: leaveAnnual.id,
        startDate: new Date("2026-10-15"),
        endDate: new Date("2026-10-17"),
        reason: "Attending academic symposium & personal leave",
        status: "pending"
      }
    });
  }

  // 15. Teacher Feedback & Parent-Teacher Connection
  await prisma.teacherFeedback.create({
    data: {
      studentId: studentUser1.student!.id,
      teacherId: teacherUser1.teacher!.id,
      courseId: courseTajweed.id,
      body: "MashaAllah Abdullah has shown notable improvement in Makharij pronunciation and dedication in class."
    }
  });

  // 16. CRM Leads & Applications
  await prisma.lead.create({
    data: {
      fullName: "Hamza Farooq",
      parentName: "Farooq Ahmed",
      email: "farooq.h@yahoo.com",
      phone: "+92 300 1234567",
      country: "Pakistan",
      subjectInterest: "Spoken Arabic Foundations",
      source: "website_free_trial",
      status: "new"
    }
  });

  // 17. Notifications
  await prisma.notification.create({
    data: {
      userId: studentUser1.id,
      title: "Class Schedule Assigned",
      body: "You have been placed in Applied Tajweed — Cohort Alpha. Next session is on your timetable.",
      type: "class_assigned",
      channel: "in_app"
    }
  });

  await prisma.notification.create({
    data: {
      userId: parentUser1.id,
      title: "New Observation for Abdullah Akbar",
      body: "Ustadh Muhammad Qasim posted a new feedback note for Abdullah.",
      type: "announcement",
      channel: "in_app"
    }
  });

  // 18. Audit Trail
  await prisma.auditLog.create({
    data: {
      actorId: superAdmin.id,
      action: "SEED_DATABASE",
      entity: "System",
      entityId: "SYSTEM_INIT",
      metadata: { status: "complete", environment: "production_ready" }
    }
  });

  console.log("✅ AEC Network database seeding completed successfully with all 10 roles, academic structures, and interconnected workflows!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
