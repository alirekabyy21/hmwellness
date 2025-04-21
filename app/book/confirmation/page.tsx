"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Check, Calendar, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const status = searchParams.get("status") || "success"

  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [paymentResult, setPaymentResult] = useState<any>(null)

  useEffect(() => {
    // Get booking details from session storage
    const storedDetails = sessionStorage.getItem("bookingDetails")
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails))
    }

    // Get payment result from session storage
    const storedPayment = sessionStorage.getItem("paymentResult")
    if (storedPayment) {
      setPaymentResult(JSON.parse(storedPayment))
    }
  }, [])

  // Generate a mock meeting link if not available
  const meetingLink = bookingDetails?.meetingLink || `https://meet.google.com/mock-${orderId?.substring(0, 8)}`

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
                  {status === "success" ? (
                    <Check className="h-8 w-8 text-primary" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  )}
                </div>
                <CardTitle className="text-center text-2xl text-primary">
                  {status === "success" ? "Booking Confirmed!" : "Payment Pending"}
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  {status === "success"
                    ? "Thank you for booking a session with Hagar Moharam."
                    : "Your booking is pending payment confirmation."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                {bookingDetails && (
                  <>
                    <p>
                      {status === "success" ? (
                        <>
                          We've sent a confirmation email to <span className="font-medium">{bookingDetails.email}</span>
                        </>
                      ) : (
                        <>
                          We'll send a confirmation email to <span className="font-medium">{bookingDetails.email}</span>{" "}
                          once your payment is processed.
                        </>
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
                          <span>{bookingDetails.time}</span>
                        </div>
                        {status === "success" && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Meeting Link:</span>
                            <a
                              href={meetingLink}
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
                          <span>{orderId}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!bookingDetails && (
                  <div className="text-center">
                    <p>Booking details not found. Please contact support if you believe this is an error.</p>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
                    >
                      <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                        <Calendar className="mr-2 h-4 w-4" />
                        Join Meeting
                      </a>
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
