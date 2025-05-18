import nodemailer from "nodemailer"
import { emailConfig } from "@/app/config"

export interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    // Check if email configuration is set up
    if (!emailConfig.user || !emailConfig.password) {
      console.log("Email configuration is incomplete. Missing username or password.")
      return {
        success: false,
        message: "Email configuration is incomplete. Please set up your email credentials in the .env.local file.",
      }
    }

    console.log(`Attempting to send email to ${emailData.to} using ${emailConfig.host}:${emailConfig.port}`)

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
      debug: true, // Enable for debugging
    })

    // Verify connection configuration
    try {
      await transporter.verify()
      console.log("SMTP connection verified successfully")
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError)

      // Try alternative Hostinger settings if the first attempt fails
      if (emailConfig.host === "smtp.hostinger.com") {
        console.log("Trying alternative Hostinger SMTP settings...")

        const alternativeTransporter = nodemailer.createTransport({
          host: "mail.hostinger.com", // Alternative host
          port: 465, // Alternative port
          secure: true, // Use SSL
          auth: {
            user: emailConfig.user,
            pass: emailConfig.password,
          },
          tls: {
            rejectUnauthorized: false,
          },
          debug: true,
        })

        try {
          await alternativeTransporter.verify()
          console.log("Alternative SMTP connection verified successfully")

          // If alternative settings work, use this transporter instead
          transporter.options.host = "mail.hostinger.com"
          transporter.options.port = 465
          transporter.options.secure = true
        } catch (altError) {
          console.error("Alternative SMTP verification also failed:", altError)
          return {
            success: false,
            message: `SMTP verification failed with both standard and alternative settings. Please check your email credentials.`,
          }
        }
      } else {
        return {
          success: false,
          message: `SMTP verification failed: ${verifyError instanceof Error ? verifyError.message : "Unknown error"}`,
        }
      }
    }

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

// Function to generate workshop registration confirmation email
export function generateWorkshopConfirmationEmail(data: {
  name: string
  email: string
  phone: string
  expectations?: string
}): string {
  const { name } = data

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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Workshop Registration Confirmed!</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Thank you for registering for our Transformative Coaching Workshop in New Cairo next Friday.</p>
            
            <div class="details">
              <h3>What's Next?</h3>
              <p>We'll send you an email later this week with all the details you need, including:</p>
              <ul>
                <li>Exact location in New Cairo</li>
                <li>Workshop start and end times</li>
                <li>What to bring</li>
                <li>Parking information</li>
              </ul>
            </div>
            
            <div class="alert">
              <p><strong>Important:</strong> If you have any questions before then, please don't hesitate to contact us at:</p>
              <ul>
                <li>WhatsApp: +20 1090250475</li>
                <li>Email: hagar@hmwellness.site</li>
              </ul>
            </div>
            
            <p>We're excited to have you join us for this transformative experience!</p>
            
            <p>Best regards,<br>Hagar Moharam<br>HM Wellness</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} HM Wellness. All rights reserved.</p>
            <p>hmwellness.site</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Function to generate admin notification email for new workshop registrations
export function generateAdminNotificationEmail(data: {
  name: string
  email: string
  phone: string
  expectations?: string
}): string {
  const { name, email, phone, expectations } = data

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8e44ad; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; }
          .details { background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Workshop Registration</h1>
          </div>
          <div class="content">
            <p>A new participant has registered for the Transformative Coaching Workshop.</p>
            
            <div class="details">
              <h3>Participant Details</h3>
              <p><strong>Name:</strong> ${name}<br>
              <strong>Email:</strong> ${email}<br>
              <strong>Phone:</strong> ${phone}</p>
              
              ${expectations ? `<p><strong>Expectations:</strong> ${expectations}</p>` : ""}
            </div>
            
            <p>You can contact this participant directly if needed.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} HM Wellness. All rights reserved.</p>
            <p>hmwellness.site</p>
          </div>
        </div>
      </body>
    </html>
  `
}
