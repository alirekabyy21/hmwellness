// Ensure "use client" is the first line of the file
"use client"

import type React from "react"
import Link from "next/link"
import { CalendarClock, BellRing } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function WorkshopsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Workshops"
          description="Join our transformative workshops designed to help you grow and develop new skills."
          className="bg-gradient-to-r from-bg-light to-bg-medium"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
              <div className="rounded-full bg-primary/10 p-6 mb-4">
                <CalendarClock className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-primary">Coming Soon</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[600px]">
                We're currently planning exciting workshops to help you on your personal development journey. Sign up
                below to be the first to know when new workshops are available.
              </p>

              <div className="w-full max-w-md mt-6">
                <NotificationSignup />
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

// Client component for the notification signup
function NotificationSignup() {
  "use client"  // Ensure this is a Client Component
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would send this to your backend
    console.log("Email submitted:", email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center justify-center">
        <BellRing className="h-5 w-5 mr-2" />
        <p>Thank you! We'll notify you when workshops are available.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button type="submit" className="rounded-l-none">
        Notify Me
      </Button>
    </form>
  )
}
