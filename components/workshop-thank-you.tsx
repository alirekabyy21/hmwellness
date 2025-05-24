"use client"

import { CheckCircle, Calendar, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/app/config"

interface WorkshopThankYouProps {
  email: string
}

export function WorkshopThankYou({ email }: WorkshopThankYouProps) {
  const handleAddToCalendar = () => {
    // Create Google Calendar link
    const title = encodeURIComponent("Transformative Coaching Workshop")
    const details = encodeURIComponent(
      "Join Hagar Moharam for a transformative coaching workshop at Espaces - New Cairo. Payment instructions will be sent via WhatsApp.",
    )
    const location = encodeURIComponent("Espaces - New Cairo, 5th Settlement")
    const dates = encodeURIComponent("20240530T190000/20240530T210000") // May 30th 2024, 7-9 PM

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`
    window.open(calendarUrl, "_blank")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Transformative Coaching Workshop",
          text: "I just registered for Hagar Moharam's Transformative Coaching Workshop! Join me for this amazing experience.",
          url: window.location.href,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Share this page: " + window.location.href)
    }
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Registration Confirmed!</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Thank you for registering for our Transformative Coaching Workshop. We're excited to have you join us!
        </p>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg mb-8">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Workshop Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                  <strong>Date:</strong> Friday, May 30th, 2024
                </p>
                <p>
                  <strong>Time:</strong> 7:00 PM - 9:00 PM (2 hours)
                </p>
                <p>
                  <strong>Location:</strong> Espaces - New Cairo, 5th Settlement
                </p>
                <p>
                  <strong>Price:</strong> 500 EGP
                </p>
                <p>
                  <strong>Directions:</strong>{" "}
                  <a
                    href="https://www.google.com/maps/place/Espaces+-+New+Cairo/@30.0371272,31.4799947,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f1ea331999f:0x9e03f8954b759f96!8m2!3d30.0371272!4d31.4821834!16s%2Fg%2F11j3047_0j?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    📍 Click here for Google Maps directions
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">What's Next?</h2>
              <p className="text-gray-600">
                We've sent a confirmation email to <strong>{email}</strong> with all the details. If you don't see it in
                your inbox, please check your spam folder.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
              <h3 className="font-medium mb-2">Payment Instructions</h3>
              <p>
                We'll contact you on WhatsApp within 24 hours to share payment details. Once payment is confirmed,
                you'll receive full workshop confirmation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Have Questions?</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions before the workshop, please don't hesitate to contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${siteConfig.phone.replace(/\+|\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>WhatsApp: {siteConfig.phone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 p-3 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>Email: {siteConfig.email}</span>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button onClick={handleAddToCalendar} variant="outline" className="border-primary/20 hover:bg-primary/5">
          <Calendar className="mr-2 h-4 w-4" />
          Add to Calendar
        </Button>
        <Button onClick={handleShare} variant="outline" className="border-primary/20 hover:bg-primary/5">
          <Share2 className="mr-2 h-4 w-4" />
          Share with Friends
        </Button>
      </div>
    </div>
  )
}
