"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

interface KashierPaymentIframeProps {
  merchantId: string
  orderId: string
  amount: string
  currency: string
  hash: string
  customerReference: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  description?: string
  redirectUrl?: string
  onSuccess?: (data: any) => void
  onFailure?: (error: any) => void
}

export function KashierPaymentIframe({
  merchantId,
  orderId,
  amount,
  currency,
  hash,
  customerReference,
  customerName,
  customerEmail,
  customerPhone,
  description,
  redirectUrl,
  onSuccess,
  onFailure,
}: KashierPaymentIframeProps) {
  const kashierInitialized = useRef(false)

  useEffect(() => {
    // Define global callback functions
    window.kashierCallback = (response: any) => {
      console.log("Kashier payment response:", response)

      if (response.status === "SUCCESS") {
        console.log("Payment successful!")
        if (onSuccess) onSuccess(response)

        // Redirect if URL is provided
        if (redirectUrl) {
          window.location.href = `${redirectUrl}?paymentStatus=success&orderId=${orderId}`
        }
      } else {
        console.error("Payment failed:", response)
        if (onFailure) onFailure(response)

        // Redirect if URL is provided
        if (redirectUrl) {
          window.location.href = `${redirectUrl}?paymentStatus=failed&orderId=${orderId}`
        }
      }
    }

    // Initialize Kashier when script is loaded
    if ((window as any).Kashier && !kashierInitialized.current) {
      initializeKashier()
    }

    return () => {
      // Cleanup
      delete window.kashierCallback
    }
  }, [orderId, redirectUrl, onSuccess, onFailure])

  // Initialize Kashier payment form
  const initializeKashier = () => {
    if (kashierInitialized.current) return

    console.log("Initializing Kashier payment form...")

    try {
      const Kashier = (window as any).Kashier

      Kashier.setConfig({
        kashierMode: "live", // Force live mode
        domain: "kashier.io",
        merchantId: merchantId,
      })

      // Create payment form
      Kashier.buildForm({
        amount: amount,
        currency: currency,
        orderId: orderId,
        hash: hash,
        merchantRedirect: "", // Handle redirect in callback instead
        customerReference: customerReference,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone || "",
        description: description || "Payment for services",
        allowedMethods: "card,wallet", // Only allow cards and wallets
        displayLang: "en",
        callback: "kashierCallback",
      })

      kashierInitialized.current = true
      console.log("Kashier payment form initialized")
    } catch (error) {
      console.error("Error initializing Kashier:", error)
    }
  }

  // Handle script load
  const handleScriptLoad = () => {
    console.log("Kashier script loaded")
    initializeKashier()
  }

  return (
    <div className="kashier-payment-container">
      <Script src="https://checkout.kashier.io/kashier.js" onLoad={handleScriptLoad} strategy="afterInteractive" />
      <div id="kashier-iframeContainer" className="w-full min-h-[500px]"></div>
    </div>
  )
}

// Add global type definition for kashierCallback
declare global {
  interface Window {
    kashierCallback: (response: any) => void
    Kashier?: any
  }
}
