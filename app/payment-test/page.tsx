"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PaymentTestPage() {
  const [amount, setAmount] = useState("10")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const handlePayment = async () => {
    setIsLoading(true)
    setError(null)
    setDebugInfo(null)

    try {
      // Create a unique order ID
      const orderId = uuidv4()

      // Define the redirect URL
      const redirectUrl = `${window.location.origin}/book/confirmation?orderId=${orderId}`

      // Create the payment request
      const paymentRequest = {
        amount: Number.parseFloat(amount),
        currency: "EGP",
        orderId,
        customerName: "Test User",
        customerEmail: "test@example.com",
        redirectUrl,
      }

      // Call the payment API
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRequest),
      })

      // Parse the response
      const data = await response.json()

      // Store debug info
      setDebugInfo({
        request: paymentRequest,
        response: data,
      })

      // Check if the request was successful
      if (data.success && data.paymentUrl) {
        // Redirect to the payment URL
        window.location.href = data.paymentUrl
      } else {
        // Handle error
        setError(data.error || "Failed to create payment")
      }
    } catch (err) {
      console.error("Payment error:", err)
      setError((err as Error).message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Payment Test" description="Test the Kashier payment integration" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Test Payment</CardTitle>
                <CardDescription>Enter an amount to test the payment integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (EGP)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="1"
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  This will create a test payment with Kashier. You will be redirected to the Kashier payment page.
                </div>

                {debugInfo && (
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <h3 className="text-sm font-medium mb-2">Debug Information</h3>
                    <pre className="text-xs whitespace-pre-wrap overflow-auto">
                      {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handlePayment} disabled={isLoading} className="w-full">
                  {isLoading ? "Processing..." : "Test Payment"}
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
