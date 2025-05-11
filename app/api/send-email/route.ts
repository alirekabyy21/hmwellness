import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, generateTestEmail } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html, text, replyTo } = body

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, and either html or text" },
        { status: 400 },
      )
    }

    const result = await sendEmail({
      to,
      subject,
      html,
      text,
      replyTo,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error("Error in send-email API route:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const to = searchParams.get("to")

    if (!to) {
      return NextResponse.json({ success: false, error: "Missing required parameter: to" }, { status: 400 })
    }

    const html = await generateTestEmail()
    const result = await sendEmail({
      to,
      subject: "Test Email from Hagar Moharam Coaching",
      html,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error("Error in send-email API route:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
