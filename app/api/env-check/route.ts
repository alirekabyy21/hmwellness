import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check for required environment variables
    const envs = {
      KASHIER_MERCHANT_ID: !!process.env.KASHIER_MERCHANT_ID,
      KASHIER_SECRET_KEY: !!process.env.KASHIER_SECRET_KEY,
      NEXT_PUBLIC_KASHIER_MERCHANT_ID: !!process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID,
    }

    return NextResponse.json({
      success: true,
      envs,
    })
  } catch (error) {
    console.error("Error checking environment variables:", error)
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to check environment variables",
      },
      { status: 500 },
    )
  }
}
