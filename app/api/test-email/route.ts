import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { emailConfig } from "@/app/config"

export async function GET() {
  try {
    // Send a test email
    const result = await sendEmail({
      to: emailConfig.adminEmail,
      subject: "Test Email from HM Wellness",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #8e44ad;">Email Test Successful!</h1>
          <p>This is a test email to verify that your email configuration is working correctly.</p>
          <p>If you're seeing this, it means your Hostinger email is properly configured.</p>
          <p>Email settings used:</p>
          <ul>
            <li>Host: ${emailConfig.host}</li>
            <li>Port: ${emailConfig.port}</li>
            <li>Secure: ${emailConfig.secure}</li>
            <li>User: ${emailConfig.user}</li>
          </ul>
          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            Sent from HM Wellness Website
          </p>
        </div>
      `,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send test email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
