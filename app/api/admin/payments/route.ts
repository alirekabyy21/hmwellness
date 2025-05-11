import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-service"
import { getPayments, getPaymentById, updatePayment, getPaymentsByBookingId } from "@/lib/db-service"

export async function GET(request: NextRequest) {
  const auth = await requireAuth()

  if (!auth.success) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")
  const bookingId = searchParams.get("bookingId")

  if (id) {
    const payment = await getPaymentById(id)

    if (!payment) {
      return NextResponse.json({ success: false, error: "Payment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, payment })
  }

  if (bookingId) {
    const payments = await getPaymentsByBookingId(bookingId)
    return NextResponse.json({ success: true, payments })
  }

  const payments = await getPayments()
  return NextResponse.json({ success: true, payments })
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth()

  if (!auth.success) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 })
  }

  const data = await request.json()

  if (!data.id) {
    return NextResponse.json({ success: false, error: "Payment ID is required" }, { status: 400 })
  }

  const payment = await updatePayment(data.id, {
    status: data.status,
    paymentMethod: data.paymentMethod,
    transactionId: data.transactionId,
  })

  if (!payment) {
    return NextResponse.json({ success: false, error: "Payment not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, payment })
}
