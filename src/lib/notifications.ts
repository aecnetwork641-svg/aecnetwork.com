import { prisma } from "@/lib/prisma";

export type NotificationChannel = "in_app" | "email" | "sms" | "whatsapp";

export type NotificationType =
  | "new_enrollment"
  | "class_assigned"
  | "class_reminder"
  | "attendance"
  | "assignment"
  | "exam"
  | "result"
  | "fee_due"
  | "payment_received"
  | "leave_request"
  | "leave_decision"
  | "new_message"
  | "announcement"
  | "task"
  | "system";

export interface NotifyParams {
  userId: string;
  type?: NotificationType;
  title: string;
  body: string;
  entityType?: "student" | "class" | "invoice" | "leave" | "exam" | "attendance";
  entityId?: string;
  channels?: NotificationChannel[];
}

/**
 * Provider interface stubs.
 * Configured to safely log in development/demo without sending live emails/SMS/WhatsApp
 * until environment credentials are confirmed.
 */
class NotificationDispatcher {
  static async sendEmail(to: string, subject: string, content: string): Promise<boolean> {
    if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER) {
      // Safely queue or log without erroring in demo
      return true;
    }
    // Production SMTP integration placeholder
    return true;
  }

  static async sendSMS(toPhone: string, message: string): Promise<boolean> {
    if (!process.env.SMS_API_KEY) {
      return true;
    }
    return true;
  }

  static async sendWhatsApp(toPhone: string, message: string): Promise<boolean> {
    if (!process.env.WHATSAPP_API_TOKEN) {
      return true;
    }
    return true;
  }
}

/**
 * Central notification dispatching service for AEC Network.
 */
export async function notify(params: NotifyParams) {
  const channels = params.channels ?? ["in_app"];

  // 1. Always create the in-app notification record
  const notification = await prisma.notification.create({
    data: {
      userId: params.userId,
      title: params.title,
      body: params.body,
      type: params.type ?? "system",
      entityType: params.entityType,
      entityId: params.entityId,
      channel: channels[0] ?? "in_app"
    }
  });

  // 2. Dispatch to external providers if specified and configured
  if (channels.includes("email") || channels.includes("sms") || channels.includes("whatsapp")) {
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
      select: { email: true }
    });

    if (user?.email && channels.includes("email")) {
      await NotificationDispatcher.sendEmail(user.email, params.title, params.body);
    }
  }

  return notification;
}

// Backward compatible helper
export async function notifyUser(userId: string, params: { title: string; body: string }) {
  return notify({
    userId,
    title: params.title,
    body: params.body,
    type: "system"
  });
}
