"use client"

import { useState } from "react"
import { sendTestEmail } from "@/app/actions/email-actions"

export default function EmailTestPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSendTest = async () => {
    if (!email) {
      setStatus("error")
      setMessage("Please enter an email address")
      return
    }

    setStatus("loading")
    setMessage("Sending test email...")

    try {
      // Use the server action instead of API route
      const result = await sendTestEmail(email)

      if (result.success) {
        setStatus("success")
        setMessage("Test email sent successfully! Please check your inbox.")
      } else {
        setStatus("error")
        setMessage(`Failed to send test email: ${result.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error in test email:", error)
      setStatus("error")
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  // Rest of the component remains the same
  // ...
}
