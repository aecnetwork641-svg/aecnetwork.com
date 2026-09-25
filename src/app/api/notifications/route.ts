import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as { id?: string }).id : null;
    const role = session?.user ? (session.user as { role?: string }).role : null;

    if (!userId) {
      return NextResponse.json({ notifications: [], unreadCount: 0 });
    }

    // Fetch user-specific notifications or admin system broadcasts
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { userId },
          ...(role === "SUPER_ADMIN" || role === "ADMIN" || role === "ADMISSIONS_OFFICER"
            ? [{ type: { in: ["system", "enrollment", "trial", "admission"] } }]
            : [])
        ]
      },
      orderBy: { createdAt: "desc" },
      take: 20
    });

    // Also fetch latest trial bookings to synthesize real-time alerts if DB notifications are fresh
    const unreadCount = notifications.filter((n) => !n.readAt).length;

    return NextResponse.json({
      notifications: notifications.map((n) => ({
        id: n.id,
        title: n.title,
        body: n.body,
        type: n.type || "system",
        entityType: n.entityType,
        entityId: n.entityId,
        read: !!n.readAt,
        createdAt: n.createdAt
      })),
      unreadCount
    });
  } catch (error) {
    console.error("[NOTIFICATIONS_GET_ERROR]", error);
    return NextResponse.json({ notifications: [], unreadCount: 0 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as { id?: string }).id : null;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { id, all } = body;

    if (all) {
      await prisma.notification.updateMany({
        where: {
          OR: [{ userId }, { readAt: null }]
        },
        data: { readAt: new Date() }
      });
      return NextResponse.json({ success: true, message: "All notifications marked as read" });
    }

    if (id) {
      await prisma.notification.updateMany({
        where: { id },
        data: { readAt: new Date() }
      });
      return NextResponse.json({ success: true, message: "Notification marked as read" });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("[NOTIFICATIONS_PATCH_ERROR]", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}
