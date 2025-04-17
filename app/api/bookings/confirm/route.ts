import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // In a real application, you would update the booking status in your database
    // For now, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: "Booking confirmed successfully",
      orderId,
    })
  } catch (error) {
    console.error("Error confirming booking:", error)
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 })
  }
}
