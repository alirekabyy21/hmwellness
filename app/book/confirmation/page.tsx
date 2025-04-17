"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Calendar, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { generateICalendarFile } from "@/lib/google-calendar"

interface BookingDetails {
  name: string
  email: string
  date: string
  timeSlot: string
  meetingLink: string
  calendarEventLink: string
  orderId: string
  promoCodeApplied: string | null
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<"success" | "pending" | "failed">("pending")

  useEffect(() => {
    // Get booking details from session storage
    const storedDetails = sessionStorage.getItem("bookingDetails")
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails))
    }

    // Check payment status from URL parameters
    const orderId = searchParams.get("orderId")
    const paymentStatus = searchParams.get("paymentStatus")

    if (paymentStatus === "success") {
      setPaymentStatus("success")
    } else if (paymentStatus === "failed") {
      setPaymentStatus("failed")
    } else {
      // If no status is provided, assume success for now
      // In a real implementation, you would verify with your backend
      setPaymentStatus("success")
    }
  }, [searchParams])

  // Function to download iCalendar file
  const downloadICalendarFile = () => {
    if (!bookingDetails) return

    const startTime = new Date(bookingDetails.date)
    const [hours, minutes] = bookingDetails.timeSlot
      .match(/(\d+):(\d+)/)
      ?.slice(1)
      .map(Number) || [0, 0]
    const isPM = bookingDetails.timeSlot.includes("PM") && hours < 12
    startTime.setHours(isPM ? hours + 12 : hours, minutes, 0)

    const endTime = new Date(startTime)
    endTime.setHours(endTime.getHours() + 1)

    const iCalContent = generateICalendarFile({
      summary: "Coaching Session with Hagar Moharam",
      description: `60-Minute Coaching Session\nMeeting Link: ${bookingDetails.meetingLink}`,
      startTime,
      endTime,
      location: bookingDetails.meetingLink,
    })

    const blob = new Blob([iCalContent], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "coaching-session.ics")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!bookingDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">
          <PageHeader title="Booking Confirmation" description="Thank you for booking a session with Hagar Moharam." />
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <Card className="mx-auto max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-center">Booking Information Not Found</CardTitle>
                  <CardDescription className="text-center">
                    We couldn't find your booking details. Please contact us for assistance.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/">Return to Homepage</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Booking Confirmation" description="Thank you for booking a session with Hagar Moharam." />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl bg-bg-light border-primary">
              <CardHeader>
                <div className="mx-auto rounded-full bg-primary/20 p-3 mb-4">
                  {paymentStatus === "success" ? (
                    <Check className="h-8 w-8 text-primary" />
                  ) : (
                    <div className="h-8 w-8 text-yellow-500">!</div>
                  )}
                </div>
                <CardTitle className="text-center text-2xl text-primary">
                  {paymentStatus === "success"
                    ? "Booking Confirmed!"
                    : paymentStatus === "pending"
                      ? "Payment Pending"
                      : "Payment Failed"}
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  {paymentStatus === "success"
                    ? "Thank you for booking a session with Hagar Moharam."
                    : paymentStatus === "pending"
                      ? "Your payment is being processed."
                      : "There was an issue with your payment."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p>
                  {paymentStatus === "success" ? (
                    <>
                      We've sent a confirmation email to <span className="font-medium">{bookingDetails.email}</span>
                    </>
                  ) : paymentStatus === "pending" ? (
                    <>
                      We'll send a confirmation email to <span className="font-medium">{bookingDetails.email}</span>{" "}
                      once your payment is processed.
                    </>
                  ) : (
                    <>Please try again or contact us for assistance.</>
                  )}
                </p>
                <div className="rounded-lg border p-4 bg-white">
                  <h3 className="font-medium text-primary">Booking Details</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span>60-Minute Coaching Session</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{new Date(bookingDetails.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{bookingDetails.timeSlot}</span>
                    </div>
                    {bookingDetails.promoCodeApplied && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discount:</span>
                        <span className="text-primary">{bookingDetails.promoCodeApplied}</span>
                      </div>
                    )}
                    {paymentStatus === "success" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meeting Link:</span>
                        <a
                          href={bookingDetails.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Join Meeting
                        </a>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order ID:</span>
                      <span>{bookingDetails.orderId}</span>
                    </div>
                  </div>
                </div>

                {paymentStatus === "success" && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
                    >
                      <a href={bookingDetails.calendarEventLink} target="_blank" rel="noopener noreferrer">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Google Calendar
                      </a>
                    </Button>
                    <Button
                      onClick={downloadICalendarFile}
                      variant="outline"
                      className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Download Calendar File (.ics)
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/">Return to Homepage</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
