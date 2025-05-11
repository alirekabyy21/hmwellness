import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email-service"

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
