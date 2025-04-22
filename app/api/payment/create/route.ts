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
    const secretKey = process.env.KASHIER_SECRET_KEY

    if (!merchantId || !secretKey) {
      console.error("Missing Kashier credentials:", { merchantIdExists: !!merchantId, secretKeyExists: !!secretKey })
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

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(priceDetails.amount).toFixed(2)

    // Generate signature using HMAC-SHA256
    // Format: merchantId + amount + currency + orderId
    const signatureString = `${merchantId}${formattedAmount}${priceDetails.currency}${orderId}`

    // Use HMAC-SHA256 with the secret key
    const signature = crypto.createHmac("sha256", secretKey).update(signatureString).digest("hex")

    // Create customer data
    const customerData = {
      name: customerName,
      email: customerEmail,
    }

    // Use the correct payment gateway URL from environment variable
    const paymentGatewayUrl = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL || "https://checkout.kashier.io"

    // Construct the payment URL
    const paymentUrl = new URL(paymentGatewayUrl)

    // Add required parameters
    paymentUrl.searchParams.append("merchantId", merchantId)
    paymentUrl.searchParams.append("amount", formattedAmount)
    paymentUrl.searchParams.append("currency", priceDetails.currency)
    paymentUrl.searchParams.append("orderId", orderId)
    paymentUrl.searchParams.append("signature", signature)
    paymentUrl.searchParams.append("redirectUrl", encodeURIComponent(redirectUrl))

    // Add mode parameter for test environment
    if (process.env.NODE_ENV !== "production") {
      paymentUrl.searchParams.append("mode", "live")
    }

    // Add display language
    paymentUrl.searchParams.append("display", "en")

    // Add customer data
    paymentUrl.searchParams.append("customer", JSON.stringify(customerData))

    console.log("Generated payment URL:", paymentUrl.toString())

    return NextResponse.json({
      success: true,
      paymentUrl: paymentUrl.toString(),
      amount: priceDetails.amount,
      currency: priceDetails.currency,
    })
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json({ success: false, error: "Failed to create payment" }, { status: 500 })
  }
}
