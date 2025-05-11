"use server"

import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
  replyTo?: string
  attachments?: any[]
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_PORT === "465",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // Parse the EMAIL_FROM value
    const fromName = process.env.EMAIL_FROM_NAME || "Hagar Moharam"
    const fromEmail = process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_SERVER_USER || "contact@hagarmoharam.com"

    // Send the email
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
      attachments: options.attachments,
    })

    console.log("Email sent successfully:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function generateTestEmail() {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Test Email</h2>
      <p>This is a test email to verify that the email functionality is working correctly.</p>
      <p>If you received this email, it means that your email configuration is set up correctly.</p>
      <p>Best regards,<br>HM Wellness</p>
    </div>
  `
}

export async function generateBookingConfirmationEmail(
  name: string,
  service: string,
  date: string,
  time: string,
  meetingLink = "",
  calendarLink = "",
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #8a2be2; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Booking Confirmation</h1>
        <p style="margin: 10px 0 0;">Your session with Hagar Moharam is confirmed!</p>
      </div>
      
      <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
        <p>Hello ${name},</p>
        
        <p>Thank you for booking a ${service} with Hagar Moharam. Your session has been confirmed for ${date} at ${time}.</p>
        
        <div style="background-color: #f8f0ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #8a2be2;">Session Details</h3>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          ${
            meetingLink
              ? `<p><strong>Meeting Link:</strong> <a href="${meetingLink}" style="color: #8a2be2;">${meetingLink}</a></p>`
              : `<p><strong>Meeting Link:</strong> A Zoom link will be sent to you before the session.</p>`
          }
          ${
            calendarLink
              ? `<p><strong>Add to Calendar:</strong> <a href="${calendarLink}" style="color: #8a2be2;">Add to Google Calendar</a></p>`
              : ""
          }
        </div>
        
        <p>Please join the meeting 5 minutes before the scheduled time. If you need to reschedule or cancel, please do so at least 24 hours in advance by replying to this email.</p>
        
        <p>Looking forward to our session!</p>
        
        <p>Warm regards,<br>Hagar Moharam<br>Life Coach</p>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>© ${new Date().getFullYear()} Hagar Moharam. All rights reserved.</p>
        <p>
          <a href="https://hagarmoharam.com/privacy" style="color: #8a2be2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
          <a href="https://hagarmoharam.com/terms" style="color: #8a2be2; text-decoration: none; margin: 0 10px;">Terms & Conditions</a>
        </p>
      </div>
    </div>
  `
}
