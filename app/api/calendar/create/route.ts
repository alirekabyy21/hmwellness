import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { OAuth2Client } from "google-auth-library"

// This is a server-side only file
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { summary, description, startTime, endTime, attendees } = body

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
    const calendar = google.calendar({ version: "v3", auth: oauth2Client })

    // Format the event for Google Calendar
    const calendarEvent = {
      summary,
      description,
      start: {
        dateTime: new Date(startTime).toISOString(),
        timeZone: "Africa/Cairo", // Using Cairo time zone for Egypt
      },
      end: {
        dateTime: new Date(endTime).toISOString(),
        timeZone: "Africa/Cairo",
      },
      attendees: attendees.map((email: string) => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: `meeting-${Date.now()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    }

    // Insert the event
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      requestBody: calendarEvent,
      conferenceDataVersion: 1,
    })

    // Get the meeting link
    const meetingLink = response.data.conferenceData?.entryPoints?.[0]?.uri || ""

    // Generate a Google Calendar link
    const calendarEventLink = generateGoogleCalendarLink({
      summary,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      location: meetingLink,
    })

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      meetingLink,
      calendarEventLink,
    })
  } catch (error) {
    console.error("Error creating calendar event:", error)

    // Return a fallback response
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        // Provide fallback data for development/testing
        eventId: `event_${Math.random().toString(36).substring(2, 11)}`,
        meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(2, 7)}`,
        calendarEventLink: generateGoogleCalendarLink({
          summary: "Fallback Event",
          description: "This is a fallback event due to an error",
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          location: "",
        }),
      },
      { status: 500 },
    )
  }
}

// Helper function to generate a Google Calendar link
function generateGoogleCalendarLink({
  summary,
  description,
  startTime,
  endTime,
  location,
}: {
  summary: string
  description: string
  startTime: Date
  endTime: Date
  location: string
}): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "")
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: summary,
    details: description,
    location: location,
    dates: `${formatDate(startTime)}/${formatDate(endTime)}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
