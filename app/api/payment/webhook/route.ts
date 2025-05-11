import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received Kashier webhook:", JSON.stringify(body, null, 2))

    // Get Kashier credentials
    const merchantId = process.env.KASHIER_MERCHANT_ID
    const secretKey = process.env.KASHIER_SECRET_KEY

    if (!merchantId || !secretKey) {
      console.error("Missing Kashier credentials")
      return NextResponse.json({ success: false, error: "Missing Kashier credentials" }, { status: 500 })
    }

    // Verify the signature
    const signature = request.headers.get("x-kashier-signature")
    if (!signature) {
      console.error("Missing Kashier signature")
      return NextResponse.json({ success: false, error: "Missing signature" }, { status: 400 })
    }

    // Create the signature string
    const signatureString = JSON.stringify(body)
    const expectedSignature = crypto.createHmac("sha256", secretKey).update(signatureString).digest("hex")

    if (signature !== expectedSignature) {
      console.error("Invalid signature")
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }

    // Process the webhook
    const { event, data } = body

    if (event === "payment.succeeded") {
      // Payment succeeded
      console.log("Payment succeeded:", data)

      // Here you would update your database, send confirmation emails, etc.
      // For now, we'll just log the data
    } else if (event === "payment.failed") {
      // Payment failed
      console.log("Payment failed:", data)

      // Here you would update your database, send notification emails, etc.
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing Kashier webhook:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
