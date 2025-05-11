import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-service"
import { getBookingStats } from "@/lib/db-service"

export async function GET(request: NextRequest) {
  const auth = await requireAuth()

  if (!auth.success) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const stats = await getBookingStats()
  return NextResponse.json({ success: true, stats })
}
