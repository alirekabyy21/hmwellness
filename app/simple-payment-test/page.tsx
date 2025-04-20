"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import crypto from "crypto-js"

export default function SimplePaymentTestPage() {
  const [paymentUrl, setPaymentUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      // Get Kashier credentials
      const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID
      const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY

      if (!merchantId || !apiKey) {
        throw new Error("Missing Kashier credentials")
      }

      // Generate a unique order ID
      const orderId = uuidv4()

      // Define payment details
      const amount = 10
      const currency = "EGP"
      const redirectUrl = `${window.location.origin}/book/confirmation?orderId=${orderId}`

      // Generate hash
      const hashString = `${amount}${currency}${orderId}${merchantId}${apiKey}`
      const hash = crypto.SHA256(hashString).toString()

      // Create the payment URL exactly as in the Kashier documentation
      const url = `https://payments.kashier.io?merchantId=${merchantId}&orderId=${orderId}&amount=${amount}&currency=${currency}&hash=${hash}&mode=test&merchantRedirect=${encodeURIComponent(redirectUrl)}&display=en&type=external`

      setPaymentUrl(url)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handlePaymentClick = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Simple Payment Test" description="Test the Kashier payment integration with minimal code" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Simple Kashier Payment Test</CardTitle>
                <CardDescription>
                  This page creates a payment URL exactly as specified in the Kashier documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      A payment URL has been generated for a 10 EGP test payment. Click the button below to proceed to
                      the Kashier payment page.
                    </p>
                    <div className="bg-muted p-3 rounded-md overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap break-all">{paymentUrl}</pre>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {!isLoading && !error && (
                  <Button onClick={handlePaymentClick} className="w-full">
                    Proceed to Payment
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
