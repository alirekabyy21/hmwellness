import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Simple email configuration - all in one place for easy debugging
const EMAIL_CONFIG = {
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // SSL
  user: "hagar@hmwellness.site",
  password: process.env.EMAIL_PASSWORD || "",
  fromName: "HM Wellness",
  adminEmail: "hagar@hmwellness.site",
}

// Simple email sending function
async function sendEmail(to: string, subject: string, html: string): Promise<{ success: boolean; message: string }> {
  try {
    console.log(`📧 Sending email to: ${to}`)
    console.log(`📧 Subject: ${subject}`)
    console.log(`📧 Using: ${EMAIL_CONFIG.host}:${EMAIL_CONFIG.port}`)

    if (!EMAIL_CONFIG.password) {
      console.error("❌ EMAIL_PASSWORD environment variable not set")
      return { success: false, message: "Email configuration missing" }
    }

    const transporter = nodemailer.createTransporter({
      host: EMAIL_CONFIG.host,
      port: EMAIL_CONFIG.port,
      secure: EMAIL_CONFIG.secure,
      auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Verify connection
    await transporter.verify()
    console.log("✅ SMTP connection verified")

    // Send email
    const info = await transporter.sendMail({
      from: `"${EMAIL_CONFIG.fromName}" <${EMAIL_CONFIG.user}>`,
      to: to,
      subject: subject,
      html: html,
    })

    console.log("✅ Email sent successfully:", info.messageId)
    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("❌ Email sending failed:", error)
    return {
      success: false,
      message: `Email failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Generate participant confirmation email
function generateConfirmationEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8e44ad, #9b59b6); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px 20px; border: 1px solid #e0e0e0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .highlight { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8e44ad; }
        .contact { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        h1 { margin: 0; font-size: 24px; }
        h2 { color: #8e44ad; margin-top: 0; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Workshop Registration Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>
          
          <p>Thank you for registering for our <strong>Transformative Coaching Workshop</strong>! We're excited to have you join us.</p>
          
          <div class="highlight">
            <h2>📅 Workshop Details</h2>
            <ul>
              <li><strong>Date:</strong> Next Friday</li>
              <li><strong>Duration:</strong> 3 hours</li>
              <li><strong>Location:</strong> New Cairo</li>
              <li><strong>Group Size:</strong> Limited to 20 participants</li>
            </ul>
          </div>
          
          <h2>📋 What's Next?</h2>
          <p>We'll send you a detailed email later this week with:</p>
          <ul>
            <li>Exact workshop location and directions</li>
            <li>Start and end times</li>
            <li>What to bring</li>
            <li>Parking information</li>
            <li>Pre-workshop preparation materials</li>
          </ul>
          
          <div class="contact">
            <h2>💬 Questions?</h2>
            <p>If you have any questions before the workshop, feel free to contact us:</p>
            <ul>
              <li><strong>WhatsApp:</strong> +20 1090250475</li>
              <li><strong>Email:</strong> hagar@hmwellness.site</li>
            </ul>
          </div>
          
          <p>We can't wait to see you at the workshop and support you on your transformation journey!</p>
          
          <p>Best regards,<br>
          <strong>Hagar Moharam</strong><br>
          HM Wellness</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} HM Wellness | hmwellness.site</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Generate admin notification email
function generateAdminEmail(data: { name: string; email: string; phone: string; expectations?: string }): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8e44ad; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 20px; border: 1px solid #e0e0e0; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .participant-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        h1 { margin: 0; font-size: 20px; }
        .label { font-weight: bold; color: #8e44ad; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🆕 New Workshop Registration</h1>
        </div>
        <div class="content">
          <p>A new participant has registered for the Transformative Coaching Workshop.</p>
          
          <div class="participant-info">
            <h2>👤 Participant Details</h2>
            <p><span class="label">Name:</span> ${data.name}</p>
            <p><span class="label">Email:</span> ${data.email}</p>
            <p><span class="label">Phone:</span> ${data.phone}</p>
            ${data.expectations ? `<p><span class="label">Expectations:</span><br>${data.expectations}</p>` : ""}
          </div>
          
          <p>The participant has been sent a confirmation email automatically.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} HM Wellness | Workshop Registration System</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Workshop registration started")

    const data = await request.json()
    const { name, email, phone, expectations } = data

    // Validate required fields
    if (!name || !email || !phone) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ success: false, message: "Name, email, and phone are required" }, { status: 400 })
    }

    console.log(`📝 Registration for: ${name} (${email})`)

    // Send confirmation email to participant
    console.log("📧 Sending confirmation email to participant...")
    const participantResult = await sendEmail(
      email,
      "Workshop Registration Confirmed - HM Wellness",
      generateConfirmationEmail(name),
    )

    // Send notification email to admin
    console.log("📧 Sending notification email to admin...")
    const adminResult = await sendEmail(
      EMAIL_CONFIG.adminEmail,
      `New Workshop Registration: ${name}`,
      generateAdminEmail({ name, email, phone, expectations }),
    )

    // Log results
    console.log("📊 Results:")
    console.log(`  Participant email: ${participantResult.success ? "✅" : "❌"} ${participantResult.message}`)
    console.log(`  Admin email: ${adminResult.success ? "✅" : "❌"} ${adminResult.message}`)

    // Return success if participant email was sent (admin email is optional)
    if (participantResult.success) {
      return NextResponse.json({
        success: true,
        message: "Registration successful! Check your email for confirmation.",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Registration received, but there was an issue sending the confirmation email.",
          error: participantResult.message,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("💥 Workshop registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during registration.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
