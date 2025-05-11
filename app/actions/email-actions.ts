"use server"

import { sendEmail, generateTestEmail } from "@/lib/email-service"

export async function sendTestEmail(email: string) {
  try {
    if (!email) {
      return { success: false, error: "Email address is required" }
    }

    const html = await generateTestEmail()
    const result = await sendEmail({
      to: email,
      subject: "Test Email from Hagar Moharam Coaching",
      html,
    })

    return result
  } catch (error) {
    console.error("Error sending test email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
