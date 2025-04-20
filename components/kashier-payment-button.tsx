"use client"

import React, { useState } from "react"
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
  customerReference: string // ✅ Required by Kashier
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
  customerReference,
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
      alert("Missing Kashier credentials.")
      setIsLoading(false)
      return
    }

    const hashString = `${amount}${currency}${orderId}${merchantId}${apiKey}`
    const hash = crypto.SHA256(hashString).toString()

    const customer = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone ?? "",
    }

    let paymentUrl = `https://checkout.kashier.io/?merchantId=${merchantId}`
    paymentUrl += `&orderId=${orderId}`
    paymentUrl += `&amount=${amount}`
    paymentUrl += `&currency=${currency}`
    paymentUrl += `&hash=${hash}`
    paymentUrl += `&mode=${isTestMode ? "test" : "live"}`
    paymentUrl += `&merchantRedirect=${encodeURIComponent(redirectUrl)}`
    paymentUrl += `&display=en`
    paymentUrl += `&type=external`
    paymentUrl += `&description=${encodeURIComponent(description)}`
    paymentUrl += `&customerReference=${encodeURIComponent(customerReference)}`
    paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customer))}`

    window.location.href = paymentUrl
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading} className={className}>
      {isLoading ? "Processing..." : children}
    </Button>
  )
}
