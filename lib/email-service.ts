import nodemailer from "nodemailer"

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    console.log("Sending email to:", options.to)

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    console.log("Email sent successfully:", info.messageId)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

export function generateConfirmationEmail(
  name: string,
  service: string,
  date: string,
  time: string,
  meetingLink: string,
  paymentUrl?: string,
  calendarLink?: string,
): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #8a2be2; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">HM Wellness</h1>
        <p style="margin: 10px 0 0;">Your session is confirmed!</p>
      </div>
      
      <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
        <p>Hello ${name},</p>
        
        <p>Your ${service} session with Hagar Moharam has been confirmed for ${date} at ${time}.</p>
        
        <div style="background-color: #f8f0ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #8a2be2;">Session Details</h3>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Meeting Link:</strong> <a href="${meetingLink}" style="color: #8a2be2;">${meetingLink}</a></p>
          ${paymentUrl ? `<p><strong>Payment Link:</strong> <a href="${paymentUrl}" style="color: #8a2be2;">Complete Payment</a></p>` : ""}
          ${calendarLink ? `<p><strong>Add to Calendar:</strong> <a href="${calendarLink}" style="color: #8a2be2;">Add to Google Calendar</a></p>` : ""}
        </div>
        
        <p>Please join the meeting 5 minutes before the scheduled time. If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>
        
        <p>Looking forward to our session!</p>
        
        <p>Warm regards,<br>Hagar Moharam<br>HM Wellness</p>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>© ${new Date().getFullYear()} HM Wellness. All rights reserved.</p>
        <p>
          <a href="https://hmwellness.com/privacy" style="color: #8a2be2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
          <a href="https://hmwellness.com/terms" style="color: #8a2be2; text-decoration: none; margin: 0 10px;">Terms & Conditions</a> |
          <a href="https://hmwellness.com/refund" style="color: #8a2be2; text-decoration: none; margin: 0 10px;">Refund Policy</a>
        </p>
      </div>
    </div>
  `
}
