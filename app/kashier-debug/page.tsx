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
import crypto from "crypto-js"

export default function KashierDebugPage() {
  const [merchantId, setMerchantId] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [orderId, setOrderId] = useState("")
  const [amount, setAmount] = useState("10")
  const [currency, setCurrency] = useState("EGP")
  const [hash, setHash] = useState("")
  const [paymentUrl, setPaymentUrl] = useState("")
  const [redirectUrl, setRedirectUrl] = useState("")

  useEffect(() => {
    // Get Kashier credentials
    const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID || ""
    const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY || ""
    const orderId = uuidv4()
    const redirectUrl = `${window.location.origin}/book/confirmation?orderId=${orderId}`

    setMerchantId(merchantId)
    setApiKey(apiKey)
    setOrderId(orderId)
    setRedirectUrl(redirectUrl)
  }, [])

  useEffect(() => {
    if (merchantId && apiKey && orderId && amount && currency) {
      try {
        // Generate hash
        const hashString = `${amount}${currency}${orderId}${merchantId}${apiKey}`
        const generatedHash = crypto.SHA256(hashString).toString()
        setHash(generatedHash)

        // Create payment URL
        const url = new URL("https://payments.kashier.io")
        url.searchParams.append("merchantId", merchantId)
        url.searchParams.append("orderId", orderId)
        url.searchParams.append("amount", amount)
        url.searchParams.append("currency", currency)
        url.searchParams.append("hash", generatedHash)
        url.searchParams.append("mode", "test")
        url.searchParams.append("merchantRedirect", redirectUrl)
        url.searchParams.append("display", "en")
        url.searchParams.append("type", "external")

        setPaymentUrl(url.toString())
      } catch (error) {
        console.error("Error generating hash or URL:", error)
      }
    }
  }, [merchantId, apiKey, orderId, amount, currency, redirectUrl])

  const handlePaymentClick = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Kashier Debug" description="Debug and test the Kashier payment integration" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-3xl">
              <CardHeader>
                <CardTitle>Kashier Integration Debug</CardTitle>
                <CardDescription>This page helps debug issues with the Kashier payment integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="merchantId">Merchant ID</Label>
                      <Input
                        id="merchantId"
                        value={merchantId}
                        onChange={(e) => setMerchantId(e.target.value)}
                        placeholder="Your Kashier Merchant ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <Input
                        id="apiKey"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Your Kashier API Key"
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderId">Order ID</Label>
                      <Input
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Unique Order ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Payment Amount"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Input
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        placeholder="Currency Code"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="redirectUrl">Redirect URL</Label>
                    <Input
                      id="redirectUrl"
                      value={redirectUrl}
                      onChange={(e) => setRedirectUrl(e.target.value)}
                      placeholder="Redirect URL after payment"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hash">Generated Hash</Label>
                    <div className="flex gap-2">
                      <Input id="hash" value={hash} readOnly className="font-mono text-xs" />
                      <Button
                        variant="outline"
                        onClick={() => {
                          const hashString = `${amount}${currency}${orderId}${merchantId}${apiKey}`
                          const generatedHash = crypto.SHA256(hashString).toString()
                          setHash(generatedHash)
                        }}
                      >
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Hash string: amount + currency + orderId + merchantId + apiKey
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentUrl">Payment URL</Label>
                    <div className="bg-muted p-3 rounded-md overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap break-all">{paymentUrl}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePaymentClick} disabled={!paymentUrl} className="w-full">
                  Test Payment
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
