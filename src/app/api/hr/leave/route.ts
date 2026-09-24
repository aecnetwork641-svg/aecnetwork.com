import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession, createAuditLog } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { emitLeaveRequested } from "@/lib/events";
import { notify } from "@/lib/notifications";

const requestLeaveSchema = z.object({
  leaveTypeId: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().min(5, "Reason is required")
});

const reviewLeaveSchema = z.object({
  leaveRequestId: z.string(),
  status: z.enum(["approved", "rejected"]),
  comment: z.string().optional()
});

export async function GET(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isOneOf(role, ["SUPER_ADMIN", "ADMIN", "HR", "HR_MANAGER", "SUPERVISOR", "DIRECTOR"])) {
      const requests = await prisma.leaveRequest.findMany({
        include: {
          employee: { include: { user: true, department: true } },
          leaveType: true
        },
        orderBy: { createdAt: "desc" }
      });
      return NextResponse.json({ success: true, requests });
    }

    // Scoped to current employee
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) {
      return NextResponse.json({ error: "Employee record not found" }, { status: 404 });
    }

    const requests = await prisma.leaveRequest.findMany({
      where: { employeeId: employee.id },
      include: { leaveType: true },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("[GET_LEAVE_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch leave requests" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getCurrentUserSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) {
      return NextResponse.json({ error: "Only staff/employees can submit leave requests" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = requestLeaveSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid leave details", details: parsed.error.format() }, { status: 400 });
    }

    const { leaveTypeId, startDate, endDate, reason } = parsed.data;

    const request = await prisma.leaveRequest.create({
      data: {
        employeeId: employee.id,
        leaveTypeId: leaveTypeId || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: "pending"
      }
    });

    try {
      await emitLeaveRequested(request.id);
    } catch (eventErr) {
      console.error("[LEAVE_EVENT_ERR]", eventErr);
    }

    await createAuditLog({
      actorId: userId,
      action: "REQUEST_LEAVE",
      entity: "LeaveRequest",
      entityId: request.id,
      metadata: { startDate, endDate, reason }
    });

    return NextResponse.json({ success: true, request }, { status: 201 });
  } catch (error: any) {
    console.error("[REQUEST_LEAVE_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to submit leave request" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId: actorId, role } = await getCurrentUserSession();
    if (!actorId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "HR", "HR_MANAGER", "SUPERVISOR"])) {
      return NextResponse.json({ error: "Unauthorized to review leave requests" }, { status: 403 });
    }

    const json = await req.json();
    const parsed = reviewLeaveSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.format() }, { status: 400 });
    }

    const { leaveRequestId, status, comment } = parsed.data;

    const isSupervisor = role === "SUPERVISOR";
    const updateData: any = {
      status,
      ...(isSupervisor ? { supervisorStatus: status, supervisorComment: comment } : { hrStatus: status, hrComment: comment })
    };

    const request = await prisma.leaveRequest.update({
      where: { id: leaveRequestId },
      data: updateData,
      include: { employee: { include: { user: true } }, leaveType: true }
    });

    // Notify employee
    await notify({
      userId: request.employee.user.id,
      type: "leave_decision",
      title: `Leave Request ${status.toUpperCase()}`,
      body: `Your ${request.leaveType?.name ?? "leave"} request from ${request.startDate.toLocaleDateString()} to ${request.endDate.toLocaleDateString()} has been ${status}.${comment ? ` Note: ${comment}` : ""}`,
      entityType: "leave",
      entityId: request.id
    });

    await createAuditLog({
      actorId,
      action: `LEAVE_${status.toUpperCase()}`,
      entity: "LeaveRequest",
      entityId: request.id,
      metadata: { status, comment }
    });

    return NextResponse.json({ success: true, request });
  } catch (error: any) {
    console.error("[REVIEW_LEAVE_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to process leave request" }, { status: 500 });
  }
}
