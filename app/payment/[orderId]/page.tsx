"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KashierPaymentIframe } from "@/components/kashier-payment-iframe"
import { prepareKashierData } from "@/lib/kashier-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get payment data from session storage
    const orderId = params.orderId as string
    const storedData = sessionStorage.getItem(`payment_${orderId}`)

    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        setPaymentData(data)
      } catch (err) {
        setError("Invalid payment data")
        console.error("Error parsing payment data:", err)
      }
    } else {
      setError("Payment data not found")
    }

    setLoading(false)
  }, [params.orderId])

  const handlePaymentSuccess = (response: any) => {
    console.log("Payment successful:", response)
    // Redirect to confirmation page
    router.push(`/book/confirmation?orderId=${params.orderId}&paymentStatus=success`)
  }

  const handlePaymentFailure = (error: any) => {
    console.error("Payment failed:", error)
    // Redirect to confirmation page with failure status
    router.push(`/book/confirmation?orderId=${params.orderId}&paymentStatus=failed`)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">
          <PageHeader title="Payment" description="Processing your payment..." />
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <Card className="mx-auto max-w-3xl">
                <CardHeader>
                  <CardTitle>Loading Payment...</CardTitle>
                  <CardDescription>Please wait while we prepare your payment</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (error || !paymentData) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">
          <PageHeader title="Payment Error" description="There was a problem with your payment" />
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <Card className="mx-auto max-w-3xl">
                <CardHeader>
                  <CardTitle>Payment Error</CardTitle>
                  <CardDescription>We couldn't process your payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive">
                    <AlertDescription>{error || "Payment data not found"}</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Prepare Kashier data
  const kashierData = prepareKashierData({
    amount: paymentData.amount,
    currency: paymentData.currency,
    orderId: paymentData.orderId,
    customerName: paymentData.customerName,
    customerEmail: paymentData.customerEmail,
    customerPhone: paymentData.customerPhone,
    customerReference: paymentData.customerReference || paymentData.orderId,
    description: paymentData.description || "Coaching Session",
    redirectUrl: `${window.location.origin}/book/confirmation`,
  })

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Complete Your Payment" description="Secure payment via Kashier" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-3xl">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  You're paying {kashierData.amount} {kashierData.currency} for a coaching session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-muted rounded-md">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Order ID:</div>
                    <div>{kashierData.orderId}</div>
                    <div className="text-muted-foreground">Amount:</div>
                    <div>
                      {kashierData.amount} {kashierData.currency}
                    </div>
                    <div className="text-muted-foreground">Name:</div>
                    <div>{kashierData.customerName}</div>
                  </div>
                </div>

                <KashierPaymentIframe
                  merchantId={kashierData.merchantId}
                  orderId={kashierData.orderId}
                  amount={kashierData.amount}
                  currency={kashierData.currency}
                  hash={kashierData.hash}
                  customerReference={kashierData.customerReference}
                  customerName={kashierData.customerName}
                  customerEmail={kashierData.customerEmail}
                  customerPhone={kashierData.customerPhone}
                  description={kashierData.description}
                  redirectUrl={kashierData.redirectUrl}
                  onSuccess={handlePaymentSuccess}
                  onFailure={handlePaymentFailure}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
