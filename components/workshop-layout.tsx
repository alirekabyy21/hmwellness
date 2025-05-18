"use client"

import { useState } from "react"
import { WorkshopSignupForm } from "./workshop-signup-form"
import { WorkshopThankYou } from "./workshop-thank-you"

export function WorkshopLayout() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmitSuccess = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-light to-bg-medium flex flex-col">
      {submitted ? <WorkshopThankYou email={email} /> : <WorkshopSignupForm onSubmitSuccess={handleSubmitSuccess} />}
    </div>
  )
}
