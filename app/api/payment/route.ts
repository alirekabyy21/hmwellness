import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export interface PaymentDetails {
  amount: number
  currency: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  description: string
  orderId: string
  redirectUrl: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const paymentDetails = body as PaymentDetails

    // Get Kashier credentials from environment variables
    const merchantId = process.env.KASHIER_MERCHANT_ID
    const apiKey = process.env.KASHIER_API_KEY
    const testMode = process.env.NODE_ENV !== "production"

    if (!merchantId || !apiKey) {
      return NextResponse.json({ success: false, error: "Missing Kashier credentials" }, { status: 500 })
    }

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(paymentDetails.amount).toFixed(2)

    // Generate signature using HMAC-SHA256
    // Format: merchantId + amount + currency + orderId
    const signatureString = `${merchantId}${formattedAmount}${paymentDetails.currency}${paymentDetails.orderId}`

    // Use HMAC-SHA256 with the secret key
    const signature = crypto.createHmac("sha256", apiKey).update(signatureString).digest("hex")

    // Use the test environment endpoint
    const baseUrl = "https://checkout.kashier.io/"
    const paymentUrl = new URL(baseUrl)

    // Add required parameters
    paymentUrl.searchParams.append("merchantId", merchantId)
    paymentUrl.searchParams.append("amount", formattedAmount)
    paymentUrl.searchParams.append("currency", paymentDetails.currency)
    paymentUrl.searchParams.append("orderId", paymentDetails.orderId)
    paymentUrl.searchParams.append("signature", signature)
    paymentUrl.searchParams.append("redirectUrl", paymentDetails.redirectUrl)

    // Add mode parameter for test environment
    if (testMode) {
      paymentUrl.searchParams.append("mode", "test")
    }

    // Add display language
    paymentUrl.searchParams.append("display", "en")

    // Add optional parameters if provided
    if (paymentDetails.description) {
      paymentUrl.searchParams.append("description", paymentDetails.description.substring(0, 120))
    }

    if (paymentDetails.customerName) {
      const customerData = {
        name: paymentDetails.customerName,
        email: paymentDetails.customerEmail,
        phone: paymentDetails.customerPhone || "",
      }
      paymentUrl.searchParams.append("customer", JSON.stringify(customerData))
    }

    return NextResponse.json({
      success: true,
      paymentUrl: paymentUrl.toString(),
    })
  } catch (error) {
    console.error("Error creating payment session:", error)
    return NextResponse.json({ success: false, error: "Failed to create payment session" }, { status: 500 })
  }
}
