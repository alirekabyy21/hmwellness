"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import crypto from "crypto-js"

interface KashierPaymentButtonProps {
  amount: number
  currency: string
  orderId: string
  description: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  redirectUrl: string
  className?: string
  children?: React.ReactNode
}

export function KashierPaymentButton({
  amount,
  currency,
  orderId,
  description,
  customerName,
  customerEmail,
  customerPhone,
  redirectUrl,
  className,
  children = "Pay Now",
}: KashierPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = () => {
    setIsLoading(true)

    const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID
    const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY
    const isTestMode = process.env.NODE_ENV !== "production"

    if (!merchantId || !apiKey) {
      console.error("Missing Kashier credentials")
      setIsLoading(false)
      return
    }

    // Generate hash
    const hashString = `${amount}${currency}${orderId}${merchantId}${apiKey}`
    const hash = crypto.SHA256(hashString).toString()

    // Customer data
    const customerData = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone || "",
    }

    // Correct Kashier base URL
    const baseUrl = "https://checkout.kashier.io"

    // Build payment URL
    let paymentUrl = `${baseUrl}?merchantId=${merchantId}`
    paymentUrl += `&orderId=${orderId}`
    paymentUrl += `&amount=${amount}`
    paymentUrl += `&currency=${currency}`
    paymentUrl += `&hash=${hash}`
    paymentUrl += `&mode=${isTestMode ? "test" : "live"}`
    paymentUrl += `&merchantRedirect=${encodeURIComponent(redirectUrl)}`
    paymentUrl += `&display=en&type=external`
    paymentUrl += `&customerReference=${orderId}` // ✅ Important
    paymentUrl += `&description=${encodeURIComponent(description)}`
    paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`

    // Redirect to Kashier
    window.location.href = paymentUrl
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading} className={className}>
      {isLoading ? "Processing..." : children}
    </Button>
  )
}
