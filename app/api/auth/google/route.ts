import { NextResponse } from "next/server"
import { OAuth2Client } from "google-auth-library"
import { calendarConfig } from "@/app/config"

export async function GET() {
  try {
    // Create OAuth2 client
    const oauth2Client = new OAuth2Client(
      calendarConfig.credentials.clientId,
      calendarConfig.credentials.clientSecret,
      calendarConfig.credentials.redirectUri,
    )

    // Generate the authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"],
      prompt: "consent", // Force to get refresh token
    })

    // Redirect to Google's authorization page
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error("Error generating auth URL:", error)
    return NextResponse.json({ error: "Failed to generate authentication URL" }, { status: 500 })
  }
}
