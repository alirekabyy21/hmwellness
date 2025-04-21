import { NextResponse } from "next/server"
import { google } from "googleapis"
import { OAuth2Client } from "google-auth-library"

// Add export config to make this route dynamic
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Set up OAuth2 client with credentials
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || "https://developers.google.com/oauthplayground",
    )

    // Set credentials using a refresh token
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    })

    // Create a Calendar client
    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    })

    // Get calendar list to test access
    const calendarList = await calendar.calendarList.list()

    // Create a test event
    const testEvent = {
      summary: "Test Event - HM Wellness",
      description: "This is a test event created by the HM Wellness website to verify Google Calendar integration.",
      start: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        timeZone: "Africa/Cairo",
      },
      end: {
        dateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
        timeZone: "Africa/Cairo",
      },
      attendees: [{ email: process.env.EMAIL_SERVER_USER || "hagar@hmwellness.site" }],
      conferenceData: {
        createRequest: {
          requestId: `test-meeting-${Date.now()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    }

    // Insert the test event
    const eventResponse = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "hagarmoharam7@gmail.com",
      requestBody: testEvent,
      conferenceDataVersion: 1,
    })

    // Get the meeting link
    const meetingLink = eventResponse.data.conferenceData?.entryPoints?.[0]?.uri || ""

    return NextResponse.json({
      success: true,
      message: "Google Calendar integration is working correctly",
      calendars: calendarList.data.items?.map((cal) => ({
        id: cal.id,
        summary: cal.summary,
        primary: cal.primary,
      })),
      testEvent: {
        id: eventResponse.data.id,
        summary: eventResponse.data.summary,
        meetingLink,
      },
    })
  } catch (error) {
    console.error("Error testing Google Calendar integration:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to test Google Calendar integration",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
