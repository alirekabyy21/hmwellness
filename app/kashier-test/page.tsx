"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import crypto from "crypto"

export default function KashierTestPage() {
  const [paymentUrl, setPaymentUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState<any>({})

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
      const amount = "400.00" // Formatted with 2 decimal places
      const currency = "EGP"
      const redirectUrl = `${window.location.origin}/book/confirmation?orderId=${orderId}`

      // Generate signature using HMAC-SHA256
      // Format: merchantId + amount + currency + orderId
      const signatureString = `${merchantId}${amount}${currency}${orderId}`

      // Use HMAC-SHA256 with the secret key
      const signature = crypto.createHmac("sha256", apiKey).update(signatureString).digest("hex")

      // Create the payment URL
      const url = new URL("https://checkout.kashier.io/")
      url.searchParams.append("merchantId", merchantId)
      url.searchParams.append("amount", amount)
      url.searchParams.append("currency", currency)
      url.searchParams.append("orderId", orderId)
      url.searchParams.append("signature", signature)
      url.searchParams.append("redirectUrl", redirectUrl)
      url.searchParams.append("mode", "test")
      url.searchParams.append("display", "en")

      // Store debug info
      setDebugInfo({
        merchantId,
        amount,
        currency,
        orderId,
        signatureString,
        signature,
        redirectUrl,
      })

      setPaymentUrl(url.toString())
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Kashier HPP Test" description="Test the Kashier Hosted Payment Page integration" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Kashier HPP Test</CardTitle>
                <CardDescription>
                  This page creates a payment URL exactly as specified in the Kashier HPP documentation
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
                      A payment URL has been generated for a 400.00 EGP test payment. Click the button below to proceed
                      to the Kashier payment page.
                    </p>
                    <div className="bg-muted p-3 rounded-md overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap break-all">{paymentUrl}</pre>
                    </div>

                    <div className="bg-muted p-3 rounded-md overflow-auto">
                      <h3 className="text-sm font-medium mb-2">Debug Information</h3>
                      <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(debugInfo, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {!isLoading && !error && (
                  <Button onClick={() => (window.location.href = paymentUrl)} className="w-full">
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
