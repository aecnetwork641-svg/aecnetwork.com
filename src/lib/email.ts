import nodemailer from "nodemailer";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Creates nodemailer transport based on environment variables.
 * Fallbacks to Gmail or SMTP settings.
 */
function getEmailTransporter() {
  const host = process.env.EMAIL_SERVER_HOST || "smtp.gmail.com";
  const port = Number(process.env.EMAIL_SERVER_PORT) || 465;
  const user = process.env.EMAIL_SERVER_USER || process.env.ADMIN_NOTIFICATION_EMAIL || "aecnetwork641@gmail.com";
  const pass = process.env.EMAIL_SERVER_PASSWORD;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends an email notification using Resend API or Nodemailer SMTP.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailParams): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;

  // 1. Preferred: Resend API (Instant, modern, reliable)
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AEC Network <onboarding@resend.dev>",
          to: [to],
          subject,
          html,
          text: text || html.replace(/<[^>]*>?/gm, ""),
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(`[RESEND EMAIL SENT] ID: ${resData.id} to ${to}`);
        return true;
      } else {
        console.error("[RESEND API ERROR]", resData);
      }
    } catch (err) {
      console.error("[RESEND NETWORK ERROR]", err);
    }
  }

  // 2. Fallback: SMTP / Nodemailer
  const transporter = getEmailTransporter();
  if (transporter) {
    try {
      const from = process.env.EMAIL_FROM || `AEC Network <${process.env.ADMIN_NOTIFICATION_EMAIL || "aecnetwork641@gmail.com"}>`;
      const info = await transporter.sendMail({
        from,
        to,
        subject,
        text: text || html.replace(/<[^>]*>?/gm, ""),
        html,
      });
      console.log(`[SMTP EMAIL SENT] ID: ${info.messageId} to ${to}`);
      return true;
    } catch (error) {
      console.error("[SMTP ERROR]", error);
      return false;
    }
  }

  console.log(`[EMAIL NOTICE - No active provider] To: ${to} | Subject: ${subject}`);
  return true;
}

/**
 * Generates formatted HTML email for Admin notification on new trial booking.
 */
export function generateAdminTrialEmailTemplate(data: {
  fullName: string;
  email: string;
  phone?: string;
  programSlug: string;
  preferredTime?: string;
  notes?: string;
  bookingId?: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
      .card { background: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
      .header { background-color: #0f2b48; color: #ffffff; padding: 24px; text-align: center; }
      .header h1 { margin: 0; font-size: 22px; }
      .content { padding: 24px; color: #334155; }
      .field { margin-bottom: 16px; }
      .field-label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 4px; }
      .field-value { font-size: 16px; color: #0f172a; font-weight: 500; }
      .badge { display: inline-block; background-color: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 14px; }
      .btn { display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px; }
      .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1>🎓 New Free Trial Booking Received!</h1>
      </div>
      <div class="content">
        <p>A new student has requested a complimentary free trial session on <strong>AEC Network</strong>.</p>
        
        <div class="field">
          <div class="field-label">Student / Applicant Name</div>
          <div class="field-value">${data.fullName}</div>
        </div>

        <div class="field">
          <div class="field-label">Email Address</div>
          <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>

        <div class="field">
          <div class="field-label">Phone / WhatsApp Number</div>
          <div class="field-value">${data.phone || "Not provided"}</div>
        </div>

        <div class="field">
          <div class="field-label">Program of Interest</div>
          <div class="field-value"><span class="badge">${data.programSlug}</span></div>
        </div>

        ${
          data.preferredTime
            ? `
        <div class="field">
          <div class="field-label">Preferred Schedule / Time</div>
          <div class="field-value">${data.preferredTime}</div>
        </div>
        `
            : ""
        }

        ${
          data.notes
            ? `
        <div class="field">
          <div class="field-label">Student Goals / Notes</div>
          <div class="field-value">${data.notes}</div>
        </div>
        `
            : ""
        }

        ${
          data.phone
            ? `
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hello ${data.fullName}, thank you for booking a Free Trial with AEC Network!`
              )}" class="btn" target="_blank">
            💬 Message Student on WhatsApp
          </a>
        </div>
        `
            : ""
        }
      </div>
      <div class="footer">
        AEC Network Automated Lead Notification System • ${new Date().toLocaleString()}
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Generates confirmation email sent to the student.
 */
export function generateStudentConfirmationEmail(data: {
  fullName: string;
  programSlug: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
      .card { background: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
      .header { background-color: #0f2b48; color: #ffffff; padding: 24px; text-align: center; }
      .content { padding: 24px; color: #334155; line-height: 1.6; }
      .btn { display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px; }
      .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1>Welcome to AEC Network!</h1>
      </div>
      <div class="content">
        <p>Assalam-o-Alaikum / Dear <strong>${data.fullName}</strong>,</p>
        <p>Thank you for booking a Free Trial session for <strong>${data.programSlug}</strong> with AEC Network.</p>
        <p>Our academic coordinator will reach out shortly via Email/WhatsApp (+92 343 5999397) to confirm your trial class date and assign your dedicated instructor.</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://wa.me/923435999397?text=${encodeURIComponent(
            `Hello AEC Network, I have booked a Free Trial for ${data.programSlug}. My name is ${data.fullName}.`
          )}" class="btn" target="_blank">
            💬 Connect on WhatsApp (+92 343 5999397)
          </a>
        </div>
        <p>Best regards,<br><strong>AEC Network Academic Team</strong><br>Email: aecnetwork641@gmail.com<br>WhatsApp: +92 343 5999397</p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} AEC Network. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}
