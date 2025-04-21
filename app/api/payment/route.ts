import { type NextRequest, NextResponse } from "next/server"
import { createKashierPaymentUrl } from "@/lib/kashier-service"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["amount", "currency", "orderId", "customerName", "customerEmail"]
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

    // Create payment URL using Kashier service
    const paymentUrl = createKashierPaymentUrl({
      amount: body.amount,
      currency: body.currency,
      orderId: body.orderId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      description: body.description || "Coaching Session with Hagar Moharam",
      redirectUrl: body.redirectUrl || `${request.nextUrl.origin}/book/confirmation?orderId=${body.orderId}`,
      customerReference: body.customerReference || body.orderId,
    })

    // Return success response with payment URL
    return NextResponse.json({
      success: true,
      paymentUrl,
      orderId: body.orderId,
    })
  } catch (error) {
    console.error("Payment API error:", error)

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create payment",
      },
      { status: 500 },
    )
  }
}
