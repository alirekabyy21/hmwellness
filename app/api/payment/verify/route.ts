import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Log the verification request
    console.log("Payment verification request:", body)

    // In a real implementation, you would verify the payment with Kashier
    // and update your database accordingly

    return NextResponse.json({
      success: true,
      message: "Payment verification received",
    })
  } catch (error) {
    console.error("Payment verification error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to verify payment",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const orderId = searchParams.get("orderId")
  const paymentStatus = searchParams.get("paymentStatus")

  console.log("Payment verification GET request:", { orderId, paymentStatus })

  // Redirect to the confirmation page
  return NextResponse.redirect(
    `${request.nextUrl.origin}/book/confirmation?orderId=${orderId}&paymentStatus=${paymentStatus || "success"}`,
  )
}
