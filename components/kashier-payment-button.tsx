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

    // Get Kashier credentials from environment variables
    const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID
    const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY

    if (!merchantId || !apiKey) {
      console.error("Missing Kashier credentials")
      setIsLoading(false)
      return
    }

    // Generate hash
    const hashString = `${amount}${currency}${orderId}${merchantId}${apiKey}`
    const hash = crypto.SHA256(hashString).toString()

    // Create customer data
    const customerData = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone || "",
    }

    // Construct the payment URL
    const baseUrl = "https://checkout.kashier.io"

    // Build the URL with required parameters
    let paymentUrl = `${baseUrl}?merchantId=${merchantId}&orderId=${orderId}&amount=${amount}&currency=${currency}&hash=${hash}&merchantRedirect=${encodeURIComponent(redirectUrl)}&display=en&type=external`

    // Add optional parameters
    if (description) {
      paymentUrl += `&description=${encodeURIComponent(description.substring(0, 120))}`
    }

    paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`

    // Redirect to payment page
    window.location.href = paymentUrl
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading} className={className}>
      {isLoading ? "Processing..." : children}
    </Button>
  )
}
