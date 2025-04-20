import nodemailer from "nodemailer"
import { emailConfig } from "@/app/config"

// This is a placeholder for email sending functionality
// You'll need to set up your email credentials in the config.ts file

export interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    // Check if email configuration is set up
    if (!emailConfig.user || !emailConfig.password) {
      console.log("Email configuration is incomplete. Skipping email sending.")
      return {
        success: false,
        message: "Email configuration is incomplete. Please set up your email credentials in the config.ts file.",
      }
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    })

    // Verify connection configuration
    await transporter.verify()
    console.log("SMTP connection verified successfully")

    // Send the email
    const info = await transporter.sendMail({
      from: `"${emailConfig.fromName}" <${emailConfig.user}>`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    })

    console.log("Email sent successfully:", info.messageId)

    return {
      success: true,
      message: "Email sent successfully",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Function to generate booking confirmation email
export function generateBookingConfirmationEmail(booking: any): string {
  const { date, timeSlot, name, promoApplied, isInternational, amount, currency } = booking

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8e44ad; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; }
          .button { display: inline-block; background-color: #8e44ad; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
          .alert { background-color: #fff3cd; border: 1px solid #ffeeba; color: #856404; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
          .details { background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
          .payment { background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Booking Request Received</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Thank you for booking a coaching session with HM Wellness. Your booking request has been received.</p>
            
            <div class="details">
              <h3>Booking Details</h3>
              <p><strong>Service:</strong> 60-Minute Coaching Session<br>
              <strong>Date:</strong> ${date}<br>
              <strong>Time:</strong> ${timeSlot}<br>
              <strong>Price:</strong> ${amount} ${currency}${promoApplied ? " (Student discount applied)" : ""}</p>
            </div>
            
            <p>Your session will be conducted online via Zoom. You will receive the meeting link before your scheduled session.</p>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact us at:</p>
            <ul>
              <li>WhatsApp: +20 1090250475</li>
              <li>Email: hagar@hmwellness.site</li>
            </ul>
            
            <p>Best regards,<br>Hagar Moharam<br>HM Wellness</p>
          </div>
          <div class="footer">
            <p>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
