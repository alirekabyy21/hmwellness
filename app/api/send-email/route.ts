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

    // Log environment variables (without exposing sensitive data)
    console.log("Email environment variables check:", {
      hostPresent: !!process.env.EMAIL_SERVER_HOST,
      portPresent: !!process.env.EMAIL_SERVER_PORT,
      userPresent: !!process.env.EMAIL_SERVER_USER,
      passwordPresent: !!process.env.EMAIL_SERVER_PASSWORD,
      fromPresent: !!process.env.EMAIL_FROM,
    })

    // Create a transporter with the correct configuration
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // Send the email
    try {
      console.log("Sending email...")

      // Parse the EMAIL_FROM value which is in the format "Name <email>"
      let fromName = "HM Wellness"
      let fromEmail = process.env.EMAIL_SERVER_USER || "hagar@hmwellness.site"

      if (process.env.EMAIL_FROM) {
        const matches = process.env.EMAIL_FROM.match(/"([^"]+)"\s+<([^>]+)>/)
        if (matches && matches.length >= 3) {
          fromName = matches[1]
          fromEmail = matches[2]
        }
      }

      console.log(`Sending from: "${fromName}" <${fromEmail}>`)

      const info = await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
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
