import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";

const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email address is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum([
    "SUPER_ADMIN",
    "ADMIN",
    "DIRECTOR",
    "ACADEMIC_ADMIN",
    "ACADEMIC_HEAD",
    "ADMISSIONS",
    "ADMISSIONS_OFFICER",
    "COUNSELOR",
    "TEACHER",
    "SUPERVISOR",
    "HR",
    "HR_MANAGER",
    "FINANCE",
    "FINANCE_MANAGER",
    "CONTENT_EDITOR",
    "STUDENT",
    "PARENT",
    "STAFF"
  ] as const)
});

const updateUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  role: z.string().optional(),
  isActive: z.boolean().optional()
});

export async function GET() {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "DIRECTOR"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error("[ADMIN_USERS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, role: callerRole } = await getCurrentUserSession();
    if (!userId || !isOneOf(callerRole, ["SUPER_ADMIN", "ADMIN"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const { name, email, password, role } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existing) {
      return NextResponse.json(
        { error: "A user with this email address already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        hashedPassword,
        role: role as any,
        isActive: true
      }
    });

    // Auto-create role profile shell if needed
    if (role === "STUDENT") {
      await prisma.student.create({
        data: {
          userId: newUser.id,
          studentCode: `STU-${Math.floor(100000 + Math.random() * 900000)}`
        }
      });
    } else if (role === "TEACHER") {
      await prisma.teacher.create({
        data: {
          userId: newUser.id,
          teacherCode: `TEA-${Math.floor(100000 + Math.random() * 900000)}`,
          specialties: ["General Faculty"]
        }
      });
    } else if (role === "PARENT") {
      await prisma.parentProfile.create({
        data: {
          userId: newUser.id
        }
      });
    } else if (["HR", "HR_MANAGER", "FINANCE", "FINANCE_MANAGER", "SUPERVISOR", "STAFF"].includes(role)) {
      await prisma.employee.create({
        data: {
          userId: newUser.id,
          employeeCode: `EMP-${Math.floor(100000 + Math.random() * 900000)}`,
          position: role.replace("_", " ")
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: "User account created successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error: any) {
    console.error("[ADMIN_USER_CREATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId, role: callerRole } = await getCurrentUserSession();
    if (!userId || !isOneOf(callerRole, ["SUPER_ADMIN", "ADMIN"])) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid update payload" }, { status: 400 });
    }

    const { id, name, password, role, isActive } = parsed.data;

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    if (role) dataToUpdate.role = role;
    if (typeof isActive === "boolean") dataToUpdate.isActive = isActive;
    if (password) {
      dataToUpdate.hashedPassword = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: dataToUpdate
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully.",
      user: { id: updated.id, email: updated.email, role: updated.role, isActive: updated.isActive }
    });
  } catch (error: any) {
    console.error("[ADMIN_USER_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}
