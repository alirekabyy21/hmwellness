"use client"

import { useState, useEffect } from "react"
import { WorkshopSignupForm } from "./workshop-signup-form"
import { WorkshopThankYou } from "./workshop-thank-you"

export function WorkshopLayout() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmitSuccess = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-light to-bg-medium flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-primary/10 blur-2xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full py-4 px-4 md:px-6 bg-white/80 backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              HM
            </div>
            <span className="text-lg font-semibold text-primary">HM Wellness</span>
          </div>
          <a
            href="https://wa.me/201090250475"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Contact Us
          </a>
        </div>
      </header>

      {/* Main content */}
      <main
        className={`flex-1 relative z-10 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {submitted ? <WorkshopThankYou email={email} /> : <WorkshopSignupForm onSubmitSuccess={handleSubmitSuccess} />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 md:px-6 text-center text-sm text-gray-600 bg-white/80 backdrop-blur-sm border-t border-primary/10">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} HM Wellness. All rights reserved.</p>
          <p className="mt-1">
            <a href="mailto:hagar@hmwellness.site" className="text-primary hover:text-primary/80 transition-colors">
              hagar@hmwellness.site
            </a>{" "}
            |{" "}
            <a href="tel:+201090250475" className="text-primary hover:text-primary/80 transition-colors">
              +20 1090250475
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
