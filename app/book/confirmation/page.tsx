"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Check, Loader2 } from "lucide-react"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [isLoading, setIsLoading] = useState(true)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  useEffect(() => {
    // Retrieve booking details from session storage
    const storedDetails = sessionStorage.getItem("bookingDetails")

    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails))
    }

    setIsLoading(false)
  }, [])

  const downloadCalendarFile = () => {
    if (!bookingDetails) return

    // Create a calendar event
    const startDate = new Date(bookingDetails.date)
    const [hours, minutes] = bookingDetails.time.split(":")
    startDate.setHours(Number.parseInt(hours), Number.parseInt(minutes), 0)

    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + 1)

    const event = {
      title: `Coaching Session with Hagar Moharam`,
      description: `${bookingDetails.service}\n\nAdditional notes: ${bookingDetails.message || "None"}`,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      location: "Online (link will be sent via email)",
    }

    // Generate iCalendar file
    const icsContent = generateICS(event)

    // Create and download the file
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "coaching-session.ics")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateICS = (event: any) => {
    return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, "\\n")}
LOCATION:${event.location}
DTSTART:${formatICSDate(new Date(event.start))}
DTEND:${formatICSDate(new Date(event.end))}
END:VEVENT
END:VCALENDAR`
  }

  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Processing your booking...</h2>
        <p className="text-gray-600">Please wait while we confirm your appointment.</p>
      </div>
    )
  }

  if (!bookingDetails) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Booking Information Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">
              We couldn't find your booking details. This might happen if you refreshed the page or accessed this page
              directly.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/book">Return to Booking Page</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-primary">Booking Confirmed!</h1>
          <p className="text-gray-600">Thank you for booking a session with Hagar Moharam.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{bookingDetails.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{bookingDetails.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium">{bookingDetails.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{bookingDetails.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{bookingDetails.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{bookingDetails.time}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              A confirmation email has been sent to <strong>{bookingDetails.email}</strong> with all the details of your
              booking.
            </p>
            <p>
              The session will be conducted online via Zoom, and the link will be sent to you before the scheduled time.
            </p>
            <p>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="w-full sm:w-auto flex items-center" onClick={downloadCalendarFile}>
              <Calendar className="mr-2 h-4 w-4" />
              Add to Calendar
            </Button>
            <Button variant="outline" className="w-full sm:w-auto flex items-center" asChild>
              <a href={`mailto:contact@hmwellness.site?subject=Regarding%20Booking%20${bookingDetails.orderId}`}>
                Contact Us
              </a>
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
