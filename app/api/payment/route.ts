import { type NextRequest, NextResponse } from "next/server"
import { createKashierPayment } from "@/lib/kashier-service"

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

    console.log("Creating payment with details:", {
      ...body,
      amount: Number(body.amount).toFixed(2),
    })

    // Create payment using Kashier service
    const paymentResponse = await createKashierPayment({
      amount: Number(body.amount),
      currency: body.currency,
      orderId: body.orderId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      redirectUrl: body.redirectUrl,
    })

    if (!paymentResponse.success) {
      return NextResponse.json(
        {
          success: false,
          error: paymentResponse.error || "Failed to create payment",
        },
        { status: 500 },
      )
    }

    // Return success response with payment URL
    return NextResponse.json({
      success: true,
      paymentUrl: paymentResponse.paymentUrl,
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
