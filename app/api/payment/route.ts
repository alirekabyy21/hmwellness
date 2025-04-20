import { type NextRequest, NextResponse } from "next/server"
import { createPaymentUrl, type PaymentDetails } from "@/lib/payment-service"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["amount", "currency", "orderId", "customerName", "customerEmail", "redirectUrl"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        )
      }
    }

    // Create payment URL
    const paymentUrl = await createPaymentUrl(body as PaymentDetails)

    // Return success response
    return NextResponse.json({
      success: true,
      paymentUrl,
    })
  } catch (error) {
    console.error("Payment API error:", error)

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to create payment",
      },
      { status: 500 },
    )
  }
}
