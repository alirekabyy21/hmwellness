import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html } = body

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, or html" },
        { status: 400 },
      )
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // Verify connection configuration
    try {
      await transporter.verify()
      console.log("SMTP connection verified successfully")
    } catch (verifyError) {
      console.error("SMTP connection verification failed:", verifyError)
      return NextResponse.json(
        { success: false, error: "Email server connection failed", details: verifyError },
        { status: 500 },
      )
    }

    // Send the email
    try {
      const info = await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || "HM Wellness"}" <${process.env.EMAIL_FROM_ADDRESS || "hello@hmwellness.com"}>`,
        to,
        subject,
        html,
      })

      console.log("Email sent successfully:", info.messageId)
      return NextResponse.json({ success: true, messageId: info.messageId })
    } catch (sendError) {
      console.error("Error sending email:", sendError)
      return NextResponse.json({ success: false, error: "Failed to send email", details: sendError }, { status: 500 })
    }
  } catch (error) {
    console.error("General error in email API route:", error)
    return NextResponse.json({ success: false, error: "Internal server error", details: error }, { status: 500 })
  }
}
