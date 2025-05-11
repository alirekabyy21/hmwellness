"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
  const [signature, setSignature] = useState("")

  // Generate signature on component mount
  useEffect(() => {
    const generateSignature = async () => {
      try {
        const response = await fetch("/api/payment/signature", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount.toFixed(2),
            currency,
            orderId,
          }),
        })

        const data = await response.json()
        if (data.success) {
          setSignature(data.signature)
        } else {
          console.error("Error generating signature:", data.error)
        }
      } catch (error) {
        console.error("Error generating signature:", error)
      }
    }

    generateSignature()
  }, [amount, currency, orderId])

  const handlePayment = () => {
    setIsLoading(true)

    // Get Kashier credentials from environment variables
    const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID
    const testMode = process.env.NODE_ENV !== "production"

    if (!merchantId || !signature) {
      console.error("Missing Kashier credentials or signature")
      setIsLoading(false)
      return
    }

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = amount.toFixed(2)

    // Create customer data
    const customerData = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone || "",
    }

    // Construct the payment URL
    const baseUrl = "https://checkout.kashier.io"

    // Build the URL with required parameters
    let paymentUrl = `${baseUrl}?merchantId=${merchantId}&orderId=${orderId}&amount=${formattedAmount}&currency=${currency}&signature=${signature}&mode=${testMode ? "test" : "live"}&redirectUrl=${encodeURIComponent(redirectUrl)}&display=en&type=external`

    // Add optional parameters
    if (description) {
      paymentUrl += `&description=${encodeURIComponent(description.substring(0, 120))}`
    }

    paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`

    // Redirect to payment page
    window.location.href = paymentUrl
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading || !signature} className={className}>
      {isLoading ? "Processing..." : children}
    </Button>
  )
}
