import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession, createAuditLog } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";

const createStudentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").default("Student@12345"),
  studentCode: z.string().min(2, "Student code is required"),
  country: z.string().optional(),
  guardianName: z.string().optional(),
  guardianEmail: z.string().email().optional().or(z.literal("")),
  courseId: z.string().optional(),
  classId: z.string().optional()
});

export async function GET(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "ADMISSIONS", "ADMISSIONS_OFFICER"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const students = await prisma.student.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, isActive: true, createdAt: true } },
        guardian: { include: { user: { select: { id: true, name: true, email: true } } } },
        enrollments: { include: { course: true, class: true } },
        invoices: true
      },
      orderBy: { enrolledAt: "desc" }
    });

    return NextResponse.json({ success: true, students });
  } catch (error) {
    console.error("[GET_STUDENTS_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch student directory" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId: actorId, role } = await getCurrentUserSession();
    if (!actorId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ADMISSIONS", "ADMISSIONS_OFFICER", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = createStudentSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid student details", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;
    const existingUser = await prisma.user.findUnique({ where: { email: data.email.toLowerCase().trim() } });
    if (existingUser) {
      return NextResponse.json({ error: "A user with this email address already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create guardian user and profile if provided
      let guardianId: string | undefined = undefined;
      if (data.guardianEmail) {
        let guardianUser = await tx.user.findUnique({ where: { email: data.guardianEmail.toLowerCase().trim() } });
        if (!guardianUser) {
          const guardianPasswordHash = await bcrypt.hash("Parent@12345", 10);
          guardianUser = await tx.user.create({
            data: {
              email: data.guardianEmail.toLowerCase().trim(),
              name: data.guardianName || "Guardian",
              role: "PARENT",
              hashedPassword: guardianPasswordHash,
              parent: { create: {} }
            }
          });
        }
        const parentProfile = await tx.parentProfile.findUnique({ where: { userId: guardianUser.id } });
        if (parentProfile) {
          guardianId = parentProfile.id;
        }
      }

      // 2. Create student user and student record
      const studentUser = await tx.user.create({
        data: {
          email: data.email.toLowerCase().trim(),
          name: data.name,
          role: "STUDENT",
          hashedPassword: passwordHash,
          student: {
            create: {
              studentCode: data.studentCode,
              country: data.country || "Pakistan",
              guardianId
            }
          }
        },
        include: { student: true }
      });

      // 3. Create course enrollment if specified
      if (data.courseId && studentUser.student) {
        await tx.enrollment.create({
          data: {
            studentId: studentUser.student.id,
            courseId: data.courseId,
            classId: data.classId || undefined,
            status: "active"
          }
        });
      }

      return studentUser;
    });

    // Record audit log
    await createAuditLog({
      actorId,
      action: "CREATE",
      entity: "Student",
      entityId: result.student?.id || result.id,
      metadata: { name: data.name, email: data.email, studentCode: data.studentCode }
    });

    return NextResponse.json({ success: true, student: result }, { status: 201 });
  } catch (error: any) {
    console.error("[CREATE_STUDENT_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to create student" }, { status: 500 });
  }
}
