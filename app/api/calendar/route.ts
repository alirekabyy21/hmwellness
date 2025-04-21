import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { OAuth2Client } from "google-auth-library"

export interface CalendarEvent {
  summary: string
  description: string
  startTime: string
  endTime: string
  attendees: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { summary, description, startTime, endTime, attendees } = body as CalendarEvent

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

    // Format the event for Google Calendar
    const calendarEvent = {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: "Africa/Cairo", // Using Cairo time zone for Egypt
      },
      end: {
        dateTime: endTime,
        timeZone: "Africa/Cairo",
      },
      attendees: attendees.map((email) => ({ email })),
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
      calendarId: process.env.GOOGLE_CALENDAR_ID || "hagarmoharam7@gmail.com",
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

    // Create a fallback response with a mock meeting link
    const meetCode = Math.random().toString(36).substring(2, 11)
    const meetingLink = `https://meet.google.com/${meetCode}`

    // Generate a fallback Google Calendar link
    const body = await request.json() // Declare body here
    const calendarEventLink = generateGoogleCalendarLink({
      summary: body?.summary || "Coaching Session",
      description: body?.description || "Session with Hagar Moharam",
      startTime: new Date(body?.startTime || Date.now()),
      endTime: new Date(body?.endTime || Date.now() + 3600000),
      location: meetingLink,
    })

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create calendar event",
        // Provide fallback data for development/testing
        eventId: `event_${Math.random().toString(36).substring(2, 11)}`,
        meetingLink,
        calendarEventLink,
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
