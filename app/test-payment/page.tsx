"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import crypto from "crypto-js"

export default function TestPaymentPage() {
  const [amount, setAmount] = useState("10")
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = () => {
    setIsLoading(true)

    try {
      // Create a unique order ID
      const orderId = uuidv4()

      // Get Kashier credentials
      const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID
      const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY

      if (!merchantId || !apiKey) {
        throw new Error("Missing Kashier credentials")
      }

      // Define the redirect URL
      const redirectUrl = `${window.location.origin}/book/confirmation?orderId=${orderId}`

      // Generate hash
      const hashString = `${amount}EGP${orderId}${merchantId}${apiKey}`
      const hash = crypto.SHA256(hashString).toString()

      // Create customer data
      const customerData = {
        name: "Test User",
        email: "test@example.com",
        phone: "+201234567890",
      }

      // Construct the payment URL
      const baseUrl = "https://payments.kashier.io"

      // Build the URL with required parameters
      let paymentUrl = `${baseUrl}?merchantId=${merchantId}&orderId=${orderId}&amount=${amount}&currency=EGP&hash=${hash}&mode=test&merchantRedirect=${encodeURIComponent(redirectUrl)}&display=en&type=external`

      // Add optional parameters
      const description = "Test payment for HM Wellness"
      paymentUrl += `&description=${encodeURIComponent(description)}`
      paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`

      // Redirect to payment page
      window.location.href = paymentUrl
    } catch (error) {
      console.error("Error creating payment:", error)
      setIsLoading(false)
      alert("Error creating payment: " + (error as Error).message)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Test Payment" description="Test the Kashier payment integration" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Test Kashier Payment</CardTitle>
                <CardDescription>Enter an amount to test the payment integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                  <div>
                    <p className="text-sm text-muted-foreground">
                      This will create a test payment with Kashier. You will be redirected to the Kashier payment page.
                    </p>
                  </div>
                </div>
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
