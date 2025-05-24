import nodemailer from "nodemailer"
import { emailConfig } from "@/app/config"

export interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    // Determine which email service to use
    const useService = emailConfig.useService
    let currentConfig = emailConfig.primary
    let serviceName = "Primary (Hostinger)"

    if (useService === "fallback") {
      currentConfig = emailConfig.fallback
      serviceName = "Fallback (Gmail)"
    }

    console.log(`Attempting to send email using ${serviceName}`)
    console.log(`To: ${emailData.to}`)
    console.log(`Subject: ${emailData.subject}`)

    // Check if email configuration is set up
    if (!currentConfig.user || !currentConfig.password) {
      console.log(`${serviceName} configuration is incomplete. Missing username or password.`)

      // If primary fails and we're in auto mode, try fallback
      if (useService === "auto" && currentConfig === emailConfig.primary) {
        console.log("Trying fallback Gmail service...")
        return await sendEmailWithConfig(emailData, emailConfig.fallback, "Fallback (Gmail)")
      }

      return {
        success: false,
        message: `${serviceName} configuration is incomplete. Please set up your email credentials.`,
      }
    }

    return await sendEmailWithConfig(emailData, currentConfig, serviceName)
  } catch (error) {
    console.error("Error in sendEmail:", error)
    return {
      success: false,
      message: `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

async function sendEmailWithConfig(
  emailData: EmailData,
  config: any,
  serviceName: string,
): Promise<{ success: boolean; message: string }> {
  try {
    console.log(`Sending email with ${serviceName} configuration:`)
    console.log(`Host: ${config.host}:${config.port}`)
    console.log(`User: ${config.user}`)
    console.log(`Secure: ${config.secure}`)

    // For Hostinger, try multiple configurations
    if (config.host.includes("hostinger")) {
      const hostingerConfigs = [
        {
          ...config,
          host: "smtp.hostinger.com",
          port: 587,
          secure: false,
        },
        {
          ...config,
          host: "mail.hostinger.com",
          port: 587,
          secure: false,
        },
        {
          ...config,
          host: "smtp.hostinger.com",
          port: 465,
          secure: true,
        },
        {
          ...config,
          host: "mail.hostinger.com",
          port: 465,
          secure: true,
        },
      ]

      for (const hostingerConfig of hostingerConfigs) {
        try {
          console.log(
            `Trying Hostinger config: ${hostingerConfig.host}:${hostingerConfig.port}, secure: ${hostingerConfig.secure}`,
          )

          const transporter = nodemailer.createTransporter({
            host: hostingerConfig.host,
            port: hostingerConfig.port,
            secure: hostingerConfig.secure,
            auth: {
              user: hostingerConfig.user,
              pass: hostingerConfig.password,
            },
            tls: {
              rejectUnauthorized: false,
            },
            connectionTimeout: 15000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
          })

          // Test connection
          await transporter.verify()
          console.log(`Hostinger SMTP connection verified: ${hostingerConfig.host}:${hostingerConfig.port}`)

          // Send email
          const info = await transporter.sendMail({
            from: `"${hostingerConfig.fromName}" <${hostingerConfig.user}>`,
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html,
          })

          console.log(`Email sent successfully with Hostinger:`, info.messageId)
          return {
            success: true,
            message: `Email sent successfully using Hostinger (${hostingerConfig.host}:${hostingerConfig.port})`,
          }
        } catch (configError) {
          console.log(`Hostinger config ${hostingerConfig.host}:${hostingerConfig.port} failed:`, configError.message)
          continue
        }
      }

      // If all Hostinger configs failed
      return {
        success: false,
        message: `All Hostinger SMTP configurations failed. Please check your email password and account settings.`,
      }
    }

    // For non-Hostinger services (Gmail, etc.)
    const transporter = nodemailer.createTransporter({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    })

    // Verify connection
    await transporter.verify()
    console.log(`${serviceName} SMTP connection verified successfully`)

    // Send the email
    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.user}>`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    })

    console.log(`Email sent successfully with ${serviceName}:`, info.messageId)

    return {
      success: true,
      message: `Email sent successfully using ${serviceName}`,
    }
  } catch (error) {
    console.error(`Error sending email with ${serviceName}:`, error)

    return {
      success: false,
      message: `Failed to send email with ${serviceName}: ${error instanceof Error ? error.message : "Unknown error"}`,
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
