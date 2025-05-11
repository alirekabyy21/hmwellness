import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Optional: Move to .env
const KASHIER_MERCHANT_ID = process.env.KASHIER_MERCHANT_ID || ""
const KASHIER_SECRET = process.env.KASHIER_SECRET || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Kashier callback payload:", body)

    const {
      orderId,
      status,
      amount,
      currency,
      transactionId,
      hash,
      paymentMethod,
    } = body

    // Validate required fields
    if (!orderId || !status || !amount || !currency || !transactionId || !hash) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Recreate the hash to validate integrity
    const payload = `${orderId}|${amount}|${currency}|${KASHIER_MERCHANT_ID}|${transactionId}|${status}`
    const expectedHash = crypto
      .createHmac("sha256", KASHIER_SECRET)
      .update(payload)
      .digest("hex")

    if (hash !== expectedHash) {
      console.warn("Hash mismatch. Potential tampering detected.")
      return NextResponse.json({ success: false, error: "Invalid hash signature" }, { status: 403 })
    }

    // Do something with the payment result (e.g., update DB)
    console.log(`✅ Payment for order ${orderId} was ${status}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Callback error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
