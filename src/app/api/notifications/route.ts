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

    // Fetch user-specific notifications
    const rawNotifications = await prisma.notification.findMany({
      where: {
        OR: [
          { userId },
          ...(role === "SUPER_ADMIN" || role === "ADMIN" || role === "ADMISSIONS_OFFICER"
            ? [{ type: { in: ["system", "enrollment", "trial", "admission"] } }]
            : [])
        ]
      },
      orderBy: { createdAt: "desc" },
      take: 40
    });

    // Deduplicate by title + body (or entityId) to ensure 1 notification per unique event
    const seen = new Set<string>();
    const notifications: typeof rawNotifications = [];

    for (const n of rawNotifications) {
      const key = `${n.title}__${n.body}`;
      if (!seen.has(key)) {
        seen.add(key);
        notifications.push(n);
      }
    }

    const unreadCount = notifications.filter((n) => !n.readAt).length;

    return NextResponse.json({
      notifications: notifications.slice(0, 20).map((n) => ({
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

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as { id?: string }).id : null;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Notification ID required" }, { status: 400 });
    }

    await prisma.notification.deleteMany({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("[NOTIFICATIONS_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
  }
}
