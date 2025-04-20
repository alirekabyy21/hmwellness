"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import crypto from "crypto-js"

export default function TestPaymentFormPage() {
  const [merchantId, setMerchantId] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [orderId, setOrderId] = useState("")
  const [hash, setHash] = useState("")

  useEffect(() => {
    // Get Kashier credentials
    const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID || ""
    const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY || ""

    // Generate a unique order ID
    const orderId = uuidv4()

    // Set state
    setMerchantId(merchantId)
    setApiKey(apiKey)
    setOrderId(orderId)

    // Generate hash
    if (merchantId && apiKey && orderId) {
      const hashString = `10EGP${orderId}${merchantId}${apiKey}`
      const hash = crypto.SHA256(hashString).toString()
      setHash(hash)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Test Payment Form"
          description="Test the Kashier payment integration with a direct HTML form"
        />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Kashier Payment Form</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  This form follows exactly the Kashier documentation. Click the link below to test the payment.
                </p>

                <div className="mb-6 p-4 bg-gray-100 rounded overflow-auto">
                  <pre className="text-xs">
                    {`<a
  href="https://payments.kashier.io/?merchantId=${merchantId}&
  orderId=${orderId}&
  amount=10&
  currency=EGP&
  hash=${hash}&
  mode=test&
  merchantRedirect=${encodeURIComponent(`${window.location.origin}/book/confirmation?orderId=${orderId}`)}&
  display=en&
  type=external"
>
  Pay Now
</a>`}
                  </pre>
                </div>

                <a
                  href={`https://payments.kashier.io/?merchantId=${merchantId}&orderId=${orderId}&amount=10&currency=EGP&hash=${hash}&mode=test&merchantRedirect=${encodeURIComponent(`${window.location.origin}/book/confirmation?orderId=${orderId}`)}&display=en&type=external`}
                  className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Pay Now (10 EGP)
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
