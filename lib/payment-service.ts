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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL || "https://checkout.kashier.io"}/api/v1/payments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.KASHIER_API_KEY}`,
        },
        body: JSON.stringify({
          amount: details.amount,
          currency: details.currency,
          order_id: details.orderId,
          customer_reference: details.customerReference,
          redirect_url: details.successUrl,
          fail_url: details.failureUrl,
          customer: {
            name: details.customerName,
            email: details.customerEmail,
            phone: details.customerPhone,
          },
          source: {
            type: "card",
          },
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Payment gateway error:", errorText)
      throw new Error(`Payment gateway error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log("Payment session created:", JSON.stringify(data, null, 2))

    return {
      success: true,
      paymentUrl: data.payment_url || data.redirect_url,
      sessionId: data.payment_id || data.id,
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
