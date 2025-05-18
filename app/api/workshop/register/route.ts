import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, generateWorkshopConfirmationEmail, generateAdminNotificationEmail } from "@/lib/email"
import { emailConfig } from "@/app/config"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, expectations } = data

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Name, email, and phone are required fields" },
        { status: 400 },
      )
    }

    // Send confirmation email to participant
    const participantEmailResult = await sendEmail({
      to: email,
      subject: "Your Workshop Registration Confirmation",
      html: generateWorkshopConfirmationEmail({ name, email, phone, expectations }),
    })

    // Send notification email to admin
    let adminEmailResult = { success: true, message: "Admin notification skipped" }
    if (emailConfig.adminEmail) {
      adminEmailResult = await sendEmail({
        to: emailConfig.adminEmail,
        subject: "New Workshop Registration",
        html: generateAdminNotificationEmail({ name, email, phone, expectations }),
      })
    }

    // Log the results
    console.log("Participant email result:", participantEmailResult)
    console.log("Admin email result:", adminEmailResult)

    // Return success even if admin email fails, as long as participant email succeeds
    if (participantEmailResult.success) {
      return NextResponse.json({
        success: true,
        message: "Registration successful! Check your email for confirmation.",
      })
    } else {
      // If participant email fails, return error
      return NextResponse.json(
        {
          success: false,
          message: "Registration received, but there was an issue sending the confirmation email.",
          error: participantEmailResult.message,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Workshop registration error:", error)
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
