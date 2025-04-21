import { NextResponse } from "next/server"
import { OAuth2Client } from "google-auth-library"

// This endpoint is for testing Google OAuth2 credentials
export async function GET() {
  try {
    // Check if we have the required environment variables
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN

    if (!clientId || !clientSecret || !refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing Google OAuth2 credentials",
          missingCredentials: {
            clientId: !clientId,
            clientSecret: !clientSecret,
            refreshToken: !refreshToken,
          },
        },
        { status: 400 },
      )
    }

    // Create OAuth2 client
    const oauth2Client = new OAuth2Client(
      clientId,
      clientSecret,
      process.env.GOOGLE_REDIRECT_URI || "https://developers.google.com/oauthplayground",
    )

    // Set credentials
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    })

    // Try to get a new access token
    const { credentials } = await oauth2Client.refreshAccessToken()

    return NextResponse.json({
      success: true,
      message: "Google OAuth2 credentials are valid",
      accessTokenExpiry: credentials.expiry_date,
      scopes: credentials.scope?.split(" ") || [],
    })
  } catch (error) {
    console.error("Error testing Google OAuth2 credentials:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to validate Google OAuth2 credentials",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
