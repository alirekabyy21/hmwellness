import { pricingConfig } from "@/app/config"

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

    // Construct the API URL with Kashier v2 checkout endpoint
    const paymentGatewayUrl = `${process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL || "https://checkout.kashier.io"}/api/v2/checkout`

    // Make a POST request to the payment gateway API
    const response = await fetch(paymentGatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KASHIER_API_KEY}`, // Use your API key from environment
      },
      body: JSON.stringify({
        amount: details.amount,
        currency: details.currency,
        order_id: details.orderId, // Your unique order ID
        customer_reference: details.customerReference, // Customer reference
        redirect_url: details.successUrl, // Success URL after payment
        fail_url: details.failureUrl, // Failure URL if payment fails
        customer: {
          name: details.customerName, // Customer's name
          email: details.customerEmail, // Customer's email
          phone: details.customerPhone, // Customer's phone
        },
      }),
    })

    // If the response is not OK, handle error
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Payment gateway error:", errorText)
      throw new Error(`Payment gateway error: ${response.status} ${errorText}`)
    }

    // Parse the response JSON
    const data = await response.json()
    console.log("Payment session created:", JSON.stringify(data, null, 2))

    // Return the payment URL and session ID
    return {
      success: true,
      paymentUrl: data.payment_url || data.redirect_url, // Redirect URL for payment
      sessionId: data.payment_id || data.id, // Payment session ID
    }
  } catch (error) {
    console.error("Error creating payment session:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown payment error",
    }
  }
}

// Price calculation function, including promo code support
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
