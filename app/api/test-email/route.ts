import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const EMAIL_CONFIG = {
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  user: "hagar@hmwellness.site",
  password: process.env.EMAIL_PASSWORD || "",
  fromName: "HM Wellness",
}

export async function GET() {
  try {
    console.log("🧪 Testing email configuration...")

    if (!EMAIL_CONFIG.password) {
      return NextResponse.json({
        success: false,
        message: "EMAIL_PASSWORD environment variable not set",
        config: {
          host: EMAIL_CONFIG.host,
          port: EMAIL_CONFIG.port,
          user: EMAIL_CONFIG.user,
          passwordSet: false,
        },
      })
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

    // Test connection
    await transporter.verify()
    console.log("✅ SMTP connection verified")

    // Send test email
    const info = await transporter.sendMail({
      from: `"${EMAIL_CONFIG.fromName}" <${EMAIL_CONFIG.user}>`,
      to: EMAIL_CONFIG.user,
      subject: "Test Email - HM Wellness System",
      html: `
        <h2>✅ Email System Test Successful!</h2>
        <p>This is a test email from your HM Wellness workshop registration system.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Configuration:</strong></p>
        <ul>
          <li>Host: ${EMAIL_CONFIG.host}</li>
          <li>Port: ${EMAIL_CONFIG.port}</li>
          <li>Secure: ${EMAIL_CONFIG.secure}</li>
          <li>From: ${EMAIL_CONFIG.user}</li>
        </ul>
        <p>Your email system is working correctly! 🎉</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      messageId: info.messageId,
      config: {
        host: EMAIL_CONFIG.host,
        port: EMAIL_CONFIG.port,
        user: EMAIL_CONFIG.user,
        passwordSet: true,
      },
    })
  } catch (error) {
    console.error("❌ Email test failed:", error)
    return NextResponse.json({
      success: false,
      message: `Email test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      config: {
        host: EMAIL_CONFIG.host,
        port: EMAIL_CONFIG.port,
        user: EMAIL_CONFIG.user,
        passwordSet: !!EMAIL_CONFIG.password,
      },
    })
  }
}
