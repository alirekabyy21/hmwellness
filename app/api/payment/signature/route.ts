import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

interface SignatureRequestBody {
  amount: string
  currency: string
  orderId: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, orderId } = body as SignatureRequestBody

    // Get Kashier credentials
    const merchantId = process.env.KASHIER_MERCHANT_ID
    const secretKey = process.env.KASHIER_SECRET_KEY

    if (!merchantId || !secretKey) {
      console.error("Missing Kashier credentials")
      return NextResponse.json({ success: false, error: "Missing Kashier credentials" }, { status: 500 })
    }

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(amount).toFixed(2)

    // Generate signature using HMAC-SHA256
    // Format: merchantId + amount + currency + orderId
    const signatureString = `${merchantId}${formattedAmount}${currency}${orderId}`

    // Use HMAC-SHA256 with the secret key
    const signature = crypto.createHmac("sha256", secretKey).update(signatureString).digest("hex")

    return NextResponse.json({
      success: true,
      signature,
    })
  } catch (error) {
    console.error("Error generating signature:", error)
    return NextResponse.json({ success: false, error: "Failed to generate signature" }, { status: 500 })
  }
}
