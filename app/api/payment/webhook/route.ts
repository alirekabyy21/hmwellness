import { type NextRequest, NextResponse } from "next/server"
import { validateWebhook } from "@/lib/payment"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get("x-kashier-signature") || ""

    // Validate webhook signature
    const isValid = validateWebhook(body, signature)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 })
    }

    // Process the payment notification
    const { orderId, status, amount, currency } = body

    // Here you would update your database with the payment status
    // For example:
    // await updatePaymentStatus(orderId, status);

    console.log(`Payment ${status} for order ${orderId}: ${amount} ${currency}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}
