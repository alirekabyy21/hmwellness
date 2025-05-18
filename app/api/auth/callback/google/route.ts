import { type NextRequest, NextResponse } from "next/server"
import { OAuth2Client } from "google-auth-library"
import { calendarConfig } from "@/app/config"

export async function GET(request: NextRequest) {
  try {
    // Get the authorization code from the URL
    const url = new URL(request.url)
    const code = url.searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "No authorization code provided" }, { status: 400 })
    }

    // Create OAuth2 client
    const oauth2Client = new OAuth2Client(
      calendarConfig.credentials.clientId,
      calendarConfig.credentials.clientSecret,
      calendarConfig.credentials.redirectUri,
    )

    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code)

    // Store the refresh token securely (this is just for demonstration)
    // In a real application, you would store this in a secure database
    console.log("Refresh token:", tokens.refresh_token)

    // Redirect to a success page
    return NextResponse.redirect(new URL("/admin/calendar-setup-success", request.url))
  } catch (error) {
    console.error("Error in Google auth callback:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
