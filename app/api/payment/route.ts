import { type NextRequest, NextResponse } from "next/server"
import { createPaymentSession, type PaymentDetails } from "@/lib/payment-service"

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

    console.log("Creating payment with details:", body)

    // Create payment URL - ensure we're using the live environment
    const paymentUrl = await createPaymentSession(body as PaymentDetails)

    // Log the generated URL for debugging
    console.log("Generated payment URL:", paymentUrl)

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
