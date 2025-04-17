"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import crypto from "crypto"

export default function DirectPaymentLinkPage() {
  const [merchantId, setMerchantId] = useState("")
  const [orderId, setOrderId] = useState("")
  const [hash, setHash] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      // Get Kashier credentials
      const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID || ""
      const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY || ""

      if (!merchantId || !apiKey) {
        throw new Error("Missing Kashier credentials")
      }

      // Generate a unique order ID
      const orderId = uuidv4()

      // Define payment details
      const amount = 10
      const currency = "EGP"

      // Generate hash
      const hashString = `${amount}${currency}${orderId}${merchantId}${apiKey}`
      const hash = crypto.createHash("sha256").update(hashString).digest("hex")

      setMerchantId(merchantId)
      setOrderId(orderId)
      setHash(hash)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const redirectUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/book/confirmation?orderId=${orderId}`

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Direct Payment Link"
          description="Test the Kashier payment integration with a direct HTML link"
        />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Kashier Direct Payment Link</h2>

                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : (
                  <>
                    <p className="mb-4 text-sm text-muted-foreground">
                      This is a direct HTML link that follows exactly the Kashier documentation format. Click the link
                      below to test the payment.
                    </p>

                    <div className="mb-6 p-4 bg-gray-100 rounded overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap break-all">
                        {`<a href="https://payments.kashier.io?merchantId=${merchantId}&orderId=${orderId}&amount=10&currency=EGP&hash=${hash}&mode=test&merchantRedirect=${encodeURIComponent(redirectUrl)}&display=en&type=external">Pay Now</a>`}
                      </pre>
                    </div>

                    <a
                      href={`https://payments.kashier.io?merchantId=${merchantId}&orderId=${orderId}&amount=10&currency=EGP&hash=${hash}&mode=test&merchantRedirect=${encodeURIComponent(redirectUrl)}&display=en&type=external`}
                      className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                    >
                      Pay Now (10 EGP)
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
