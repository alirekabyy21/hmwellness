import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-service"
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from "@/lib/db-service"

export async function GET(request: NextRequest) {
  const auth = await requireAuth()

  if (!auth.success) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (id) {
    const booking = await getBookingById(id)

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, booking })
  }

  const bookings = await getBookings()
  return NextResponse.json({ success: true, bookings })
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth()

  if (!auth.success) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()

  // Validate required fields
  const requiredFields = ["name", "email", "phone", "date", "time", "service"]
  for (const field of requiredFields) {
    if (!data[field]) {
      return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
    }
  }

  const booking = await createBooking({
    name: data.name,
    email: data.email,
    phone: data.phone,
    date: data.date,
    time: data.time,
    service: data.service,
    status: data.status || "pending",
    notes: data.notes,
    paymentStatus: data.paymentStatus || "pending",
    paymentAmount: data.paymentAmount || 0,
    paymentCurrency: data.paymentCurrency || "EGP",
    eventId: data.eventId,
  })

  return NextResponse.json({ success: true, booking })
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth()

  if (!auth.success) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()

  if (!data.id) {
    return NextResponse.json({ success: false, error: "Booking ID is required" }, { status: 400 })
  }

  const booking = await updateBooking(data.id, {
    name: data.name,
    email: data.email,
    phone: data.phone,
    date: data.date,
    time: data.time,
    service: data.service,
    status: data.status,
    notes: data.notes,
    paymentStatus: data.paymentStatus,
    paymentAmount: data.paymentAmount,
    paymentCurrency: data.paymentCurrency,
    eventId: data.eventId,
  })

  if (!booking) {
    return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, booking })
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAuth()

  if (!auth.success) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ success: false, error: "Booking ID is required" }, { status: 400 })
  }

  const success = await deleteBooking(id)

  if (!success) {
    return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
