"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function KashierDirectTestPage() {
  const [merchantId, setMerchantId] = useState("")
  const [secretKey, setSecretKey] = useState("")
  const [orderId, setOrderId] = useState("")
  const [amount, setAmount] = useState("10.00")
  const [currency, setCurrency] = useState("EGP")
  const [signature, setSignature] = useState("")
  const [paymentUrl, setPaymentUrl] = useState("")
  const [redirectUrl, setRedirectUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      // Get Kashier credentials
      const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID || ""
      // We don't expose the secret key to the client
      const orderId = uuidv4()
      const redirectUrl = `${window.location.origin}/book/confirmation?orderId=${orderId}`

      setMerchantId(merchantId)
      setOrderId(orderId)
      setRedirectUrl(redirectUrl)
      setIsLoading(false)
    } catch (err) {
      setError((err as Error).message)
      setIsLoading(false)
    }
  }, [])

  const handleGenerateSignature = async () => {
    try {
      // Call our API to generate the signature (since we can't expose the secret key to the client)
      const response = await fetch("/api/payment/signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          orderId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate signature")
      }

      const data = await response.json()
      setSignature(data.signature)

      // Create payment URL
      const url = new URL(process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL || "https://checkout.kashier.io")
      url.searchParams.append("merchantId", merchantId)
      url.searchParams.append("amount", amount)
      url.searchParams.append("currency", currency)
      url.searchParams.append("orderId", orderId)
      url.searchParams.append("signature", data.signature)
      url.searchParams.append("redirectUrl", redirectUrl)
      url.searchParams.append("mode", "test")
      url.searchParams.append("display", "en")

      setPaymentUrl(url.toString())
    } catch (error) {
      console.error("Error generating signature:", error)
      setError((error as Error).message)
    }
  }

  const handlePaymentClick = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Kashier Direct Test" description="Test the Kashier payment integration directly" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Kashier Direct Test</CardTitle>
                <CardDescription>
                  This page allows you to test the Kashier payment integration directly using the official API
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
                    <div className="space-y-2">
                      <Label htmlFor="merchantId">Merchant ID</Label>
                      <Input
                        id="merchantId"
                        value={merchantId}
                        onChange={(e) => setMerchantId(e.target.value)}
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orderId">Order ID</Label>
                      <Input id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} readOnly />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="10.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Input
                          id="currency"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          placeholder="EGP"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="redirectUrl">Redirect URL</Label>
                      <Input
                        id="redirectUrl"
                        value={redirectUrl}
                        onChange={(e) => setRedirectUrl(e.target.value)}
                        readOnly
                      />
                    </div>

                    <Button onClick={handleGenerateSignature} className="w-full">
                      Generate Signature & URL
                    </Button>

                    {signature && (
                      <div className="space-y-2">
                        <Label htmlFor="signature">Generated Signature</Label>
                        <Input id="signature" value={signature} readOnly className="font-mono text-xs" />
                      </div>
                    )}

                    {paymentUrl && (
                      <div className="space-y-2">
                        <Label htmlFor="paymentUrl">Payment URL</Label>
                        <div className="bg-muted p-3 rounded-md overflow-auto">
                          <pre className="text-xs whitespace-pre-wrap break-all">{paymentUrl}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handlePaymentClick} disabled={!paymentUrl} className="w-full">
                  Proceed to Payment
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
