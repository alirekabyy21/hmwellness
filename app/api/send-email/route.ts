import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    console.log("Email API route called")

    const body = await request.json()
    const { to, subject, html } = body

    console.log("Email request received:", { to, subject, htmlLength: html?.length })

    if (!to || !subject || !html) {
      console.error("Missing required fields:", { to, subject, htmlPresent: !!html })
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, or html" },
        { status: 400 },
      )
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      debug: true, // Enable debug output
    })

    // Send the email
    try {
      console.log("Sending email...")
      const fromName = process.env.EMAIL_FROM_NAME || "HM Wellness"
      const fromAddress = process.env.EMAIL_FROM_ADDRESS || "hello@hmwellness.com"

      console.log(`Sending from: "${fromName}" <${fromAddress}>`)

      const info = await transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
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
