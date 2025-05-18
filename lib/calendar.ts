import { google, type calendar_v3 } from "googleapis"
import { OAuth2Client } from "google-auth-library"
import { calendarConfig } from "@/app/config"

// Types
export interface BookingDetails {
  name: string
  email: string
  phone: string
  date: Date
  timeSlot: string
  clientType: string
  message?: string
}

// Initialize the Google Calendar API client
function getCalendarClient(): calendar_v3.Calendar | null {
  try {
    // Check if calendar integration is enabled
    if (!calendarConfig.enabled) {
      console.log("Google Calendar integration is disabled in config")
      return null
    }

    // Check if credentials are set
    if (
      !calendarConfig.credentials.clientId ||
      !calendarConfig.credentials.clientSecret ||
      !calendarConfig.credentials.refreshToken
    ) {
      console.log("Google Calendar credentials are not properly configured")
      return null
    }

    // Create OAuth2 client
    const oauth2Client = new OAuth2Client(
      calendarConfig.credentials.clientId,
      calendarConfig.credentials.clientSecret,
      calendarConfig.credentials.redirectUri,
    )

    // Set credentials
    oauth2Client.setCredentials({
      refresh_token: calendarConfig.credentials.refreshToken,
    })

    // Create and return the calendar client
    return google.calendar({ version: "v3", auth: oauth2Client })
  } catch (error) {
    console.error("Error initializing Google Calendar client:", error)
    return null
  }
}

// Create a Google Calendar event for a booking
export async function createCalendarEvent(booking: BookingDetails): Promise<string | null> {
  try {
    const calendarClient = getCalendarClient()
    if (!calendarClient) {
      console.log("Calendar client not available")
      return null
    }

    // Parse the time slot to get start time
    const [hour, minute, period] = booking.timeSlot.match(/(\d+):(\d+)\s*([AP]M)/)?.slice(1) || []
    if (!hour || !minute || !period) {
      console.error("Invalid time format:", booking.timeSlot)
      return null
    }

    // Convert to 24-hour format
    let startHour = Number.parseInt(hour)
    if (period === "PM" && startHour < 12) startHour += 12
    if (period === "AM" && startHour === 12) startHour = 0

    // Create start and end dates
    const startDate = new Date(booking.date)
    startDate.setHours(startHour, Number.parseInt(minute), 0, 0)

    const endDate = new Date(startDate)
    endDate.setHours(startDate.getHours() + 1) // 60-minute session

    // Create event details
    const event = {
      summary: `Coaching Session with ${booking.name}`,
      description: `Client: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\n\nNotes: ${booking.message || "No additional notes"}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: calendarConfig.timeZone,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: calendarConfig.timeZone,
      },
      attendees: [{ email: booking.email, displayName: booking.name }, { email: calendarConfig.calendarId }],
      conferenceData: {
        createRequest: {
          requestId: `booking-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 30 }, // 30 minutes before
        ],
      },
    }

    // Insert the event
    const response = await calendarClient.events.insert({
      calendarId: calendarConfig.calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    })

    console.log("Event created:", response.data.htmlLink)
    return response.data.htmlLink || null
  } catch (error) {
    console.error("Error creating calendar event:", error)
    return null
  }
}

// Check availability for a specific date
export async function getAvailableTimeSlots(date: Date): Promise<string[]> {
  try {
    const calendarClient = getCalendarClient()
    if (!calendarClient) {
      // If calendar integration is not available, return default time slots
      return require("@/app/config").bookingContent.timeSlots
    }

    // Set up time boundaries for the day
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    // Get events for the day
    const response = await calendarClient.events.list({
      calendarId: calendarConfig.calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })

    const events = response.data.items || []
    const busySlots: string[] = []

    // Extract busy time slots
    events.forEach((event) => {
      if (event.start?.dateTime && event.end?.dateTime) {
        const start = new Date(event.start.dateTime)
        const startHour = start.getHours()
        const startMinute = start.getMinutes()

        // Format to match our time slot format (e.g., "10:00 AM")
        let period = "AM"
        let hour = startHour

        if (startHour >= 12) {
          period = "PM"
          hour = startHour === 12 ? 12 : startHour - 12
        }

        const timeSlot = `${hour}:${startMinute.toString().padStart(2, "0")} ${period}`
        busySlots.push(timeSlot)
      }
    })

    // Get all available time slots from config
    const allTimeSlots = require("@/app/config").bookingContent.timeSlots

    // Filter out busy slots
    const availableSlots = allTimeSlots.filter((slot) => !busySlots.includes(slot))

    return availableSlots
  } catch (error) {
    console.error("Error fetching available time slots:", error)
    // Return default time slots in case of error
    return require("@/app/config").bookingContent.timeSlots
  }
}

// Generate a Google Calendar event link for adding to calendar
export function createGoogleCalendarEventLink(booking: BookingDetails): string {
  if (!booking.date || !booking.timeSlot) return ""

  // Parse the time slot to get start time
  const [hour, minute, period] = booking.timeSlot.match(/(\d+):(\d+)\s*([AP]M)/)?.slice(1) || []
  if (!hour || !minute || !period) return ""

  // Convert to 24-hour format for Google Calendar
  let startHour = Number.parseInt(hour)
  if (period === "PM" && startHour < 12) startHour += 12
  if (period === "AM" && startHour === 12) startHour = 0

  // Create start and end dates
  const startDate = new Date(booking.date)
  startDate.setHours(startHour, Number.parseInt(minute), 0, 0)

  const endDate = new Date(startDate)
  endDate.setHours(startDate.getHours() + 1) // 60-minute session

  // Format dates for Google Calendar URL
  const formatForGoogleCalendar = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "")
  }

  const startDateStr = formatForGoogleCalendar(startDate)
  const endDateStr = formatForGoogleCalendar(endDate)

  // Create Google Calendar event URL
  const eventTitle = encodeURIComponent("Coaching Session with HM Wellness")
  const eventDetails = encodeURIComponent(
    `Coaching session with ${booking.name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\n\nNotes: ${booking.message || "No additional notes"}`,
  )
  const eventLocation = encodeURIComponent("Online (Zoom link will be sent via email)")

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDateStr}/${endDateStr}&details=${eventDetails}&location=${eventLocation}`
}

// Instructions for setting up Google Calendar API
export const googleCalendarSetupInstructions = `
# Setting up Google Calendar API

To fully integrate with Google Calendar, follow these steps:

1. Go to the Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Calendar API
4. Create OAuth 2.0 credentials:
   - Set up the OAuth consent screen
   - Create OAuth client ID (Web application)
   - Add authorized redirect URIs (e.g., https://yourwebsite.com/api/auth/callback/google)
5. Download the credentials JSON file
6. Extract the client ID, client secret, and set up a refresh token
7. Add these credentials to your environment variables or config file

For detailed instructions, visit: https://developers.google.com/calendar/api/quickstart/nodejs
`
