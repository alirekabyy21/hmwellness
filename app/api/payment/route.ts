import { type NextRequest, NextResponse } from "next/server"
import { createPaymentSession } from "@/lib/payment-service"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["amount", "currency", "customerName", "customerEmail", "customerPhone"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Generate a unique order ID (numeric string for Kashier compatibility)
    const orderId = Date.now().toString()

    // Create a customer reference from name and timestamp
    const customerReference = `${data.customerName.replace(/\s+/g, "-")}-${Date.now()}`

    // Create success and failure URLs with the order ID
    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "https://hmwellness.site"
    const successUrl = `${baseUrl}/book/confirmation?orderId=${orderId}`
    const failureUrl = `${baseUrl}/book?error=payment_failed&orderId=${orderId}`

    const paymentResult = await createPaymentSession({
      amount: data.amount,
      currency: data.currency,
      orderId,
      customerReference,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      successUrl,
      failureUrl,
    })

    if (!paymentResult.success) {
      return NextResponse.json({ success: false, error: paymentResult.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      paymentUrl: paymentResult.paymentUrl,
      orderId,
      sessionId: paymentResult.sessionId,
    })
  } catch (error) {
    console.error("Payment API error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
