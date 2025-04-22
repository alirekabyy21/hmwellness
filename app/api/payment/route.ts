import { type NextRequest, NextResponse } from "next/server"
import { createPaymentUrl, type PaymentDetails, generateNumericOrderId } from "@/lib/payment-service"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Generate a numeric order ID if not provided
    const orderId = body.orderId || generateNumericOrderId()

    // Create customer reference
    const customerReference = `REF-${body.customerName.substring(0, 3).toUpperCase()}-${orderId.substring(0, 5)}`

    // Validate required fields
    const requiredFields = ["amount", "currency", "customerName", "customerEmail", "redirectUrl"]
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

    // Create payment details with customer reference
    const paymentDetails: PaymentDetails = {
      ...body,
      orderId,
      customerReference,
    }

    // Create payment URL
    const paymentUrl = await createPaymentUrl(paymentDetails)

    // Return success response
    return NextResponse.json({
      success: true,
      paymentUrl,
      orderId,
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
