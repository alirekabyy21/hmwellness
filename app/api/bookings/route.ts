import { NextResponse } from "next/server"

// In a real application, you would use a database here
const bookings = []

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "service", "date", "time"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create a new booking with a unique ID
    const booking = {
      id: `booking_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // In a real application, you would save this to a database
    bookings.push(booking)

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET() {
  // In a real application, you would fetch from a database
  return NextResponse.json(bookings)
}
