import { type NextRequest, NextResponse } from "next/server"

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

    // Add customer reference if not provided
    if (!body.customerReference) {
      body.customerReference = body.orderId
    }

    console.log("Creating payment with details:", {
      ...body,
      amount: Number(body.amount).toFixed(2),
    })

    // Return success response with payment URL
    return NextResponse.json({
      success: true,
      paymentUrl: `/payment/${body.orderId}`,
      orderId: body.orderId,
      // Include all data so it can be stored in session storage
      paymentData: body,
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
