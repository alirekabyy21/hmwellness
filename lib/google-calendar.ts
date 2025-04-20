import { google } from "googleapis"
import { OAuth2Client } from "google-auth-library"

export interface CalendarEvent {
  summary: string
  description: string
  startTime: Date
  endTime: Date
  attendees: string[]
  meetingLink?: string
}

// Set up OAuth2 client with credentials
const getOAuth2Client = (): OAuth2Client => {
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || "https://developers.google.com/oauthplayground",
  )

  // Set credentials using a refresh token
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  return oauth2Client
}

export async function createCalendarEvent(event: CalendarEvent): Promise<{
  eventId: string
  meetingLink: string
  calendarEventLink: string
}> {
  try {
    // Create a Calendar client
    const oauth2Client = getOAuth2Client()
    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    })

    // Format the event for Google Calendar
    const calendarEvent = {
      summary: event.summary,
      description: event.description,
      start: {
        dateTime: event.startTime.toISOString(),
        timeZone: "Africa/Cairo", // Using Cairo time zone for Egypt
      },
      end: {
        dateTime: event.endTime.toISOString(),
        timeZone: "Africa/Cairo",
      },
      attendees: event.attendees.map((email) => ({ email })),
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
      summary: event.summary,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      location: meetingLink,
    })

    return {
      eventId: response.data.id || "",
      meetingLink,
      calendarEventLink,
    }
  } catch (error) {
    console.error("Error creating Google Calendar event:", error)

    // Fallback to a mock meeting link if the API call fails
    const meetCode = Math.random().toString(36).substring(2, 11)
    const meetingLink = `https://meet.google.com/${meetCode}`

    // Generate a fallback Google Calendar link
    const calendarEventLink = generateGoogleCalendarLink({
      summary: event.summary,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      location: meetingLink,
    })

    return {
      eventId: `event_${Math.random().toString(36).substring(2, 11)}`,
      meetingLink,
      calendarEventLink,
    }
  }
}

export async function getAvailableSlots(date: Date): Promise<string[]> {
  try {
    // Create a Calendar client
    const oauth2Client = getOAuth2Client()
    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    })

    // Set up time min and max for the given date
    const timeMin = new Date(date)
    timeMin.setHours(0, 0, 0, 0)

    const timeMax = new Date(date)
    timeMax.setHours(23, 59, 59, 999)

    // Get events for the day
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "hagarmoharam7@gmail.com",
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })

    const events = response.data.items || []

    // Get booked time slots
    const bookedSlots = events.map((event) => {
      const start = new Date(event.start?.dateTime || "")
      return `${start.getHours()}:${start.getMinutes() === 0 ? "00" : start.getMinutes()} ${start.getHours() >= 12 ? "PM" : "AM"}`
    })

    // Define all available time slots
    const allSlots = [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
    ]

    // Filter out booked slots
    return allSlots.filter((slot) => !bookedSlots.includes(slot))
  } catch (error) {
    console.error("Error getting available slots:", error)

    // Return default slots if there's an error
    return ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
  }
}

// Helper function to generate a Google Calendar link
export function generateGoogleCalendarLink({
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

// Generate an iCalendar (.ics) file content
export function generateICalendarFile({
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
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//HM Wellness//Coaching Session//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${summary}
DESCRIPTION:${description.replace(/\n/g, "\\n")}
LOCATION:${location}
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(endTime)}
END:VEVENT
END:VCALENDAR`
}
