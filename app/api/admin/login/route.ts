import { type NextRequest, NextResponse } from "next/server"
import { login } from "@/lib/auth-service"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.email || !data.password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const result = await login(data.email, data.password)

    if (!result.success) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
