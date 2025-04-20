import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

interface PaymentRequestBody {
  orderId: string
  customerName: string
  customerEmail: string
  isEgypt: boolean
  isStudent: boolean
  redirectUrl: string
}

// Define pricing config directly in this file to avoid import issues
const pricingConfig = {
  egypt: {
    regular: 600,
    student: 400,
    currency: "EGP",
  },
  international: {
    regular: 30,
    currency: "USD",
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PaymentRequestBody
    const { orderId, customerName, customerEmail, isEgypt, isStudent, redirectUrl } = body

    // Get Kashier credentials - updated to match your environment variables
    const merchantId = process.env.KASHIER_MERCHANT_ID
    const apiKey = process.env.KASHIER_SECRET_KEY // Changed to match your env var

    if (!merchantId || !apiKey) {
      console.error("Missing Kashier credentials:", { merchantIdExists: !!merchantId, apiKeyExists: !!apiKey })
      return NextResponse.json({ success: false, error: "Missing Kashier credentials" }, { status: 500 })
    }

    // Determine price and currency based on location and discount
    const priceDetails = isEgypt
      ? {
          amount: isStudent ? pricingConfig.egypt.student : pricingConfig.egypt.regular,
          currency: pricingConfig.egypt.currency,
        }
      : {
          amount: pricingConfig.international.regular,
          currency: pricingConfig.international.currency,
        }

    // Generate hash
    const hashString = `${priceDetails.amount}${priceDetails.currency}${orderId}${merchantId}${apiKey}`
    const hash = crypto.createHash("sha256").update(hashString).digest("hex")

    // Create customer data
    const customerData = {
      name: customerName,
      email: customerEmail,
    }

    // Use the correct payment gateway URL from environment variable
    const paymentGatewayUrl = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL || "https://checkout.kashier.io"

    // Construct the payment URL
    let paymentUrl = `${paymentGatewayUrl}?merchantId=${merchantId}&orderId=${orderId}&amount=${priceDetails.amount}&currency=${priceDetails.currency}&hash=${hash}&mode=test&merchantRedirect=${encodeURIComponent(redirectUrl)}&display=en&type=external&customerReference=${encodeURIComponent(customerName)}`

    // Add customer data
    paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`

    console.log("Generated payment URL:", paymentUrl)

    return NextResponse.json({
      success: true,
      paymentUrl,
      amount: priceDetails.amount,
      currency: priceDetails.currency,
    })
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json({ success: false, error: "Failed to create payment" }, { status: 500 })
  }
}
