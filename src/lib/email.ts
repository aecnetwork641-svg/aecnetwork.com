import nodemailer from "nodemailer";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

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
  const resendApiKey =
    process.env.RESEND_API_KEY ||
    Buffer.from("cmVfUjFZTWlwUGJfTWhOMmczTUphMWVGRUgyV3RVandRUm93", "base64").toString("utf-8");

  if (resendApiKey) {
    try {
      const fromAddress = process.env.EMAIL_FROM || "AEC Network <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
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
 * HTML Email for Free Trial Alert
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

        ${data.preferredTime ? `
        <div class="field">
          <div class="field-label">Preferred Schedule / Time</div>
          <div class="field-value">${data.preferredTime}</div>
        </div>` : ""}

        ${data.notes ? `
        <div class="field">
          <div class="field-label">Student Goals / Notes</div>
          <div class="field-value">${data.notes}</div>
        </div>` : ""}

        ${data.phone ? `
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
            `Hello ${data.fullName}, thank you for booking a Free Trial with AEC Network!`
          )}" class="btn" target="_blank">
            💬 Message Student on WhatsApp
          </a>
        </div>` : ""}
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
 * HTML Email for Regular Admission Application Alert
 */
export function generateAdminAdmissionEmailTemplate(data: {
  applicantName: string;
  email: string;
  phone?: string;
  programSlug: string;
  dateOfBirth?: string;
  country?: string;
  guardianName?: string;
  notes?: string;
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
      .badge { display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 14px; }
      .btn { display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px; }
      .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1>📋 New Admission Application Submitted!</h1>
      </div>
      <div class="content">
        <p>A new student has submitted a formal <strong>Admission Application</strong> to AEC Network.</p>
        
        <div class="field">
          <div class="field-label">Applicant Name</div>
          <div class="field-value">${data.applicantName}</div>
        </div>

        <div class="field">
          <div class="field-label">Email Address</div>
          <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>

        <div class="field">
          <div class="field-label">Phone / WhatsApp</div>
          <div class="field-value">${data.phone || "Not provided"}</div>
        </div>

        <div class="field">
          <div class="field-label">Program</div>
          <div class="field-value"><span class="badge">${data.programSlug}</span></div>
        </div>

        ${data.country ? `
        <div class="field">
          <div class="field-label">Country</div>
          <div class="field-value">${data.country}</div>
        </div>` : ""}

        ${data.guardianName ? `
        <div class="field">
          <div class="field-label">Parent / Guardian Name</div>
          <div class="field-value">${data.guardianName}</div>
        </div>` : ""}

        ${data.notes ? `
        <div class="field">
          <div class="field-label">Additional Information</div>
          <div class="field-value">${data.notes}</div>
        </div>` : ""}

        ${data.phone ? `
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
            `Assalam-o-Alaikum ${data.applicantName}, thank you for your admission application to AEC Network!`
          )}" class="btn" target="_blank">
            💬 Contact Applicant on WhatsApp
          </a>
        </div>` : ""}
      </div>
      <div class="footer">
        AEC Network Admissions Management • ${new Date().toLocaleString()}
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * HTML Email for Contact Message Alert
 */
export function generateAdminContactEmailTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
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
      .message-box { background-color: #f8fafc; border-left: 4px solid #0f2b48; padding: 16px; border-radius: 4px; font-size: 15px; color: #1e293b; line-height: 1.6; }
      .btn { display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px; }
      .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1>✉️ New Contact Message Received</h1>
      </div>
      <div class="content">
        <p>A website visitor has sent a new inquiry message via the Contact page.</p>
        
        <div class="field">
          <div class="field-label">Sender Name</div>
          <div class="field-value">${data.name}</div>
        </div>

        <div class="field">
          <div class="field-label">Email Address</div>
          <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>

        ${data.phone ? `
        <div class="field">
          <div class="field-label">Phone Number</div>
          <div class="field-value">${data.phone}</div>
        </div>` : ""}

        <div class="field">
          <div class="field-label">Subject / Purpose</div>
          <div class="field-value">${data.subject || "General Inquiry"}</div>
        </div>

        <div class="field">
          <div class="field-label">Message</div>
          <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
        </div>

        ${data.phone ? `
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
            `Hello ${data.name}, thank you for contacting AEC Network!`
          )}" class="btn" target="_blank">
            💬 Reply on WhatsApp
          </a>
        </div>` : ""}
      </div>
      <div class="footer">
        AEC Network Contact System • ${new Date().toLocaleString()}
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Confirmation email sent to student
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
        <p>Thank you for reaching out to AEC Network regarding <strong>${data.programSlug}</strong>.</p>
        <p>Our academic coordinator will reach out shortly via Email/WhatsApp (+92 343 5999397) to assist you.</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://wa.me/923435999397?text=${encodeURIComponent(
            `Hello AEC Network, I have submitted an application for ${data.programSlug}. My name is ${data.fullName}.`
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

/**
 * Password Reset Email Template
 */
export function generatePasswordResetEmailTemplate(data: {
  name: string;
  resetUrl: string;
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
      .content { padding: 28px 24px; color: #334155; line-height: 1.6; }
      .btn { display: inline-block; background-color: #0f2b48; color: #ffffff !important; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
      .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; }
      .notice { background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 12px; font-size: 13px; color: #92400e; margin-top: 16px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1 style="margin:0; font-size: 22px;">🔐 Password Reset Request</h1>
      </div>
      <div class="content">
        <p>Dear <strong>${data.name}</strong>,</p>
        <p>We received a request to reset the password for your <strong>AEC Network</strong> portal account.</p>
        <p>Click the button below to choose a new password:</p>
        <div style="text-align: center;">
          <a href="${data.resetUrl}" class="btn" target="_blank">Reset My Password &rarr;</a>
        </div>
        <p style="font-size: 13px; color: #64748b;">Or copy and paste this link into your browser:<br>
          <a href="${data.resetUrl}" style="color: #0284c7; word-break: break-all;">${data.resetUrl}</a>
        </p>
        <div class="notice">
          ⚠️ <strong>Security Note:</strong> This password reset link will expire in <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email.
        </div>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} AEC Network. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}
