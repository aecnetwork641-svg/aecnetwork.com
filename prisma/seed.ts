/**
 * DEMO SEED DATA ONLY — AEC NETWORK
 *
 * Visibly flagged as demo records. Never present demo statistics as genuine institutional data.
 * Default demo login password for all seeded accounts: "Demo@12345"
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Demo@12345", 10);

  // 1. Super Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@demo.aecnetwork.local" },
    update: {},
    create: {
      email: "admin@demo.aecnetwork.local",
      name: "Demo Super Administrator",
      role: "SUPER_ADMIN",
      hashedPassword: passwordHash
    }
  });

  // 2. Academic Head
  const academicHead = await prisma.user.upsert({
    where: { email: "academic@demo.aecnetwork.local" },
    update: {},
    create: {
      email: "academic@demo.aecnetwork.local",
      name: "Demo Academic Head",
      role: "ACADEMIC_HEAD",
      hashedPassword: passwordHash
    }
  });

  // 3. Finance Manager
  const financeManager = await prisma.user.upsert({
    where: { email: "finance@demo.aecnetwork.local" },
    update: {},
    create: {
      email: "finance@demo.aecnetwork.local",
      name: "Demo Finance Officer",
      role: "FINANCE_MANAGER",
      hashedPassword: passwordHash
    }
  });

  // 4. HR Manager
  const hrManager = await prisma.user.upsert({
    where: { email: "hr@demo.aecnetwork.local" },
    update: {},
    create: {
      email: "hr@demo.aecnetwork.local",
      name: "Demo HR Manager",
      role: "HR_MANAGER",
      hashedPassword: passwordHash
    }
  });

  // 5. Department & Supervisor
  const dept = await prisma.department.upsert({
    where: { name: "Quranic & Islamic Studies" },
    update: {},
    create: {
      name: "Quranic & Islamic Studies",
      code: "QIS"
    }
  });

  const supervisorUser = await prisma.user.upsert({
    where: { email: "supervisor@demo.aecnetwork.local" },
    update: {},
    create: {
      email: "supervisor@demo.aecnetwork.local",
      name: "Demo Department Supervisor",
      role: "SUPERVISOR",
      hashedPassword: passwordHash,
      employee: {
        create: {
          employeeCode: "EMP-SUP-01",
          departmentId: dept.id,
          position: "Head of Department"
        }
      }
    }
  });

  // 6. Teacher
  const teacherUser = await prisma.user.upsert({
    where: { email: "teacher@demo.aecnetwork.local" },
    update: {},
    create: {
      email: "teacher@demo.aecnetwork.local",
      name: "Demo Instructor (Sheikh Ahmad)",
      role: "TEACHER",
      hashedPassword: passwordHash,
      teacher: {
        create: {
          teacherCode: "T-0001",
          specialties: ["Quran Recitation", "Tajweed", "Classical Arabic"],
          bio: "Certified Qari with 10+ years teaching foundational and advanced Tajweed."
        }
      },
      employee: {
        create: {
          employeeCode: "EMP-T-0001",
          departmentId: dept.id,
          position: "Senior Instructor"
        }
      }
    },
    include: { teacher: true }
  });

  // 7. Parent & Student
  const parentUser = await prisma.user.upsert({
    where: { email: "parent@demo.aecnetwork.local" },
    update: {},
    create: {
      email: "parent@demo.aecnetwork.local",
      name: "Demo Parent (Mrs. Fatima)",
      role: "PARENT",
      hashedPassword: passwordHash,
      parent: { create: {} }
    },
    include: { parent: true }
  });

  const studentUser = await prisma.user.upsert({
    where: { email: "student@demo.aecnetwork.local" },
    update: {},
    create: {
      email: "student@demo.aecnetwork.local",
      name: "Demo Student (Zayd)",
      role: "STUDENT",
      hashedPassword: passwordHash,
      student: {
        create: {
          studentCode: "AEC-ST-101",
          guardianId: parentUser.parent?.id,
          country: "United Kingdom"
        }
      }
    },
    include: { student: true }
  });

  // 8. Program & Course
  const program = await prisma.program.upsert({
    where: { slug: "quran-islamic-studies" },
    update: {},
    create: {
      title: "Quran & Islamic Studies",
      slug: "quran-islamic-studies",
      category: "Quran & Islamic Studies",
      description: "Comprehensive foundational Quranic reading, Tajweed, and Islamic comprehension.",
      isPublished: true
    }
  });

  const course = await prisma.course.upsert({
    where: { slug: "tajweed-foundations" },
    update: {},
    create: {
      programId: program.id,
      title: "Tajweed & Recitation Foundations",
      slug: "tajweed-foundations",
      description: "Structured curriculum covering articulation points, phonetic rules, and practical recitation.",
      deliveryMode: "one-to-one",
      durationWeeks: 12,
      isPublished: true,
      primaryInstructorId: teacherUser.teacher?.id
    }
  });

  // 9. Class & Timetable
  const demoClass = await prisma.class.create({
    data: {
      courseId: course.id,
      teacherId: teacherUser.teacher!.id,
      name: "Tajweed Foundations — Cohort Alpha",
      capacity: 5,
      meetingPlatform: "ZOOM",
      meetingLink: "https://zoom.us/j/demo-meeting-link",
      status: "ACTIVE",
      timetableSlots: {
        create: [
          { dayOfWeek: 1, startTime: "10:00", endTime: "11:00", timezone: "UTC" },
          { dayOfWeek: 3, startTime: "10:00", endTime: "11:00", timezone: "UTC" }
        ]
      }
    }
  });

  // 10. Enrollment
  await prisma.enrollment.create({
    data: {
      studentId: studentUser.student!.id,
      courseId: course.id,
      classId: demoClass.id,
      status: "active"
    }
  });

  // 11. Attendance Records
  await prisma.attendance.create({
    data: {
      classId: demoClass.id,
      studentId: studentUser.student!.id,
      date: new Date(),
      status: "present",
      note: "Excellent participation in Tajweed recitation"
    }
  });

  // 12. Tuition Invoice
  await prisma.invoice.create({
    data: {
      studentId: studentUser.student!.id,
      amount: 150.0,
      currency: "USD",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: "unpaid"
    }
  });

  // 13. Announcement
  await prisma.announcement.create({
    data: {
      title: "Welcome to the Academic Term (Demo)",
      content: "Term classes have commenced across all Quranic and Academic departments.",
      authorId: admin.id,
      isPublished: true
    }
  });

  // 14. Audit Log
  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "SEED_DATABASE",
      entity: "System",
      entityId: "SYSTEM_INIT",
      metadata: { environment: "development_demo" }
    }
  });

  console.log("Demo seed database initialization completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
