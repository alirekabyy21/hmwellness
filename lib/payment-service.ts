import { pricingConfig } from "@/app/config"
import crypto from "crypto"

export interface PaymentDetails {
  amount: number
  currency: string
  orderId: string
  customerReference: string
  customerName: string
  customerEmail: string
  customerPhone: string
  successUrl: string
  failureUrl: string
}

export async function createPaymentSession(details: PaymentDetails) {
  try {
    console.log("Creating payment session with details:", JSON.stringify(details, null, 2))

    // Get Kashier credentials
    const merchantId = process.env.KASHIER_MERCHANT_ID
    const secretKey = process.env.KASHIER_SECRET_KEY

    if (!merchantId || !secretKey) {
      console.error("Missing Kashier credentials")
      return {
        success: false,
        error: "Missing Kashier credentials",
      }
    }

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = details.amount.toFixed(2)

    // Generate signature using HMAC-SHA256
    // Format: merchantId + amount + currency + orderId
    const signatureString = `${merchantId}${formattedAmount}${details.currency}${details.orderId}`

    // Use HMAC-SHA256 with the secret key
    const signature = crypto.createHmac("sha256", secretKey).update(signatureString).digest("hex")

    // Create customer data
    const customerData = {
      name: details.customerName,
      email: details.customerEmail,
      phone: details.customerPhone || "",
    }

    // Construct the payment URL
    const baseUrl = "https://checkout.kashier.io"
    const testMode = process.env.NODE_ENV !== "production"

    // Build the URL with required parameters
    let paymentUrl = `${baseUrl}?merchantId=${merchantId}&orderId=${details.orderId}&amount=${formattedAmount}&currency=${details.currency}&signature=${signature}&mode=${testMode ? "test" : "live"}&redirectUrl=${encodeURIComponent(details.successUrl)}&failureUrl=${encodeURIComponent(details.failureUrl)}&display=en&type=external`

    // Add customer reference
    paymentUrl += `&customerReference=${encodeURIComponent(details.customerReference)}`

    // Add customer data
    paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`

    console.log("Payment URL:", paymentUrl)

    return {
      success: true,
      paymentUrl,
      sessionId: details.orderId,
    }
  } catch (error) {
    console.error("Error creating payment session:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown payment error",
    }
  }
}

export function calculatePrice(
  isInternational: boolean,
  promoCode?: string,
): {
  price: number
  currency: string
  discount: number
} {
  // Determine base price and currency based on location
  let price = isInternational ? pricingConfig.internationalPrice : pricingConfig.defaultPrice
  const currency = isInternational ? pricingConfig.internationalCurrency : pricingConfig.currency

  // Apply promo code if valid
  let discount = 0
  if (promoCode && pricingConfig.promoCodes[promoCode]) {
    discount = pricingConfig.promoCodes[promoCode]
    price = price * (1 - discount / 100)
  }

  return {
    price: Math.round(price), // Round to avoid floating point issues
    currency,
    discount,
  }
}
