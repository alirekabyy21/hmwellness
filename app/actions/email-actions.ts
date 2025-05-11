"use server"

import { sendEmail, generateTestEmail } from "@/lib/email-service"

export async function sendTestEmail(email: string) {
  if (!email) {
    return { success: false, error: "Email is required" }
  }

  try {
    const result = await sendEmail({
      to: email,
      subject: "Test Email from HM Wellness",
      html: generateTestEmail(),
    })

    return result
  } catch (error) {
    console.error("Test email error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
