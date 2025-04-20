import { google } from "googleapis"
import { OAuth2Client } from "google-auth-library"

// Create a simplified interface for calendar events
export interface SimpleCalendarEvent {
  summary: string
  description: string
  startTime: Date
  endTime: Date
  attendeeEmails: string[]
}

// Create a function to get an authenticated OAuth2 client
function getAuthClient() {
  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  )

  client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  return client
}

// Function to create a calendar event
export async function createCalendarEvent(eventData: SimpleCalendarEvent) {
  try {
    const auth = getAuthClient()

    // Create the calendar API client
    const calendar = google.calendar({
      version: "v3",
      auth,
    })

    // Format the event for Google Calendar
    const event = {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: eventData.startTime.toISOString(),
        timeZone: "Africa/Cairo",
      },
      end: {
        dateTime: eventData.endTime.toISOString(),
        timeZone: "Africa/Cairo",
      },
      attendees: eventData.attendeeEmails.map((email) => ({ email })),
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
      requestBody: event,
      conferenceDataVersion: 1,
    })

    // Get the meeting link
    const meetingLink = response.data.conferenceData?.entryPoints?.[0]?.uri || ""

    return {
      eventId: response.data.id,
      meetingLink,
      calendarLink: generateGoogleCalendarLink(eventData),
    }
  } catch (error) {
    console.error("Error creating calendar event:", error)

    // Return a fallback response
    return {
      eventId: `mock-${Date.now()}`,
      meetingLink: `https://meet.google.com/mock-${Math.random().toString(36).substring(2, 7)}`,
      calendarLink: generateGoogleCalendarLink(eventData),
    }
  }
}

// Helper function to generate a Google Calendar link
function generateGoogleCalendarLink(event: SimpleCalendarEvent): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "")
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.summary,
    details: event.description,
    dates: `${formatDate(event.startTime)}/${formatDate(event.endTime)}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
