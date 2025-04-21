"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard } from "lucide-react"

export default function SimplePaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [name, setName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  useEffect(() => {
    // Get booking details from session storage
    const storedDetails = sessionStorage.getItem("bookingDetails")
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)

    // Simulate payment processing
    setTimeout(() => {
      // Store payment result in session storage
      sessionStorage.setItem(
        "paymentResult",
        JSON.stringify({
          success: true,
          orderId,
          amount: 600,
          currency: "EGP",
          timestamp: new Date().toISOString(),
        }),
      )

      // Redirect to confirmation page
      router.push(`/book/confirmation?orderId=${orderId}&status=success`)
    }, 2000)
  }

  if (!orderId || !bookingDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">
          <PageHeader title="Payment" description="Complete your booking payment" />
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <Card className="mx-auto max-w-md">
                <CardHeader>
                  <CardTitle>Error</CardTitle>
                  <CardDescription>Missing order information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive">
                    <AlertDescription>
                      We couldn't find your booking information. Please try booking again.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => router.push("/book")} className="w-full">
                    Return to Booking
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
        <PageHeader title="Payment" description="Complete your booking payment" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
                <CardDescription>Enter your payment details to confirm your booking</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Booking Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span>60-Minute Coaching Session</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date(bookingDetails.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{bookingDetails.time}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>600 EGP</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 1111 1111 1111"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay 600 EGP
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-4 text-center text-xs text-muted-foreground">
                  <p>This is a test payment page. No actual payment will be processed.</p>
                  <p>You can use any test card details.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
