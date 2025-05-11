import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, generateTestEmail } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["to", "subject"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Ensure either text or html is provided
    if (!data.text && !data.html) {
      return NextResponse.json({ success: false, error: "Either text or html content is required" }, { status: 400 })
    }

    const result = await sendEmail({
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
      replyTo: data.replyTo,
      attachments: data.attachments,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

// Add a special endpoint for test emails
export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json({ success: false, error: "Email parameter is required" }, { status: 400 })
  }

  try {
    const result = await sendEmail({
      to: email,
      subject: "Test Email from HM Wellness",
      html: generateTestEmail(),
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
