import { google } from "googleapis"
import { bookingConfig } from "@/app/config"

// Initialize the Google Calendar API client
const calendar = google.calendar({
  version: "v3",
  auth: new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_ID,
    key: process.env.GOOGLE_CLIENT_SECRET,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  }),
})

export interface CalendarEvent {
  summary: string
  description: string
  startTime: string // ISO string
  endTime: string // ISO string
  attendeeEmail: string
  attendeeName: string
  location?: string
}

export async function createCalendarEvent(eventDetails: CalendarEvent) {
  try {
    console.log("Creating calendar event:", JSON.stringify(eventDetails, null, 2))

    const event = {
      summary: eventDetails.summary,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: bookingConfig.timeZone,
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: bookingConfig.timeZone,
      },
      attendees: [{ email: eventDetails.attendeeEmail, displayName: eventDetails.attendeeName }],
      location: eventDetails.location || "Online Session",
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 30 }, // 30 minutes before
        ],
      },
      sendUpdates: "all", // Send emails to attendees
    }

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    })

    console.log("Calendar event created:", response.data.htmlLink)

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    }
  } catch (error) {
    console.error("Error creating calendar event:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown calendar error",
    }
  }
}

export async function getAvailableSlots(date: string) {
  try {
    // Get the start and end of the requested date
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    // Get events for the day
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })

    const events = response.data.items || []

    // Get all booked time slots
    const bookedSlots = events.map((event) => {
      const start = new Date(event.start?.dateTime || "")
      return start.getHours() + ":" + (start.getMinutes() < 10 ? "0" : "") + start.getMinutes()
    })

    // Filter available slots
    const availableSlots = bookingConfig.availableTimeSlots.filter((slot) => !bookedSlots.includes(slot))

    return {
      success: true,
      availableSlots,
    }
  } catch (error) {
    console.error("Error getting available slots:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown calendar error",
      availableSlots: bookingConfig.availableTimeSlots, // Fallback to all slots
    }
  }
}

export async function deleteCalendarEvent(eventId: string) {
  try {
    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    })

    return { success: true }
  } catch (error) {
    console.error("Error deleting calendar event:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown calendar error",
    }
  }
}

export async function updateCalendarEvent(eventId: string, eventDetails: Partial<CalendarEvent>) {
  try {
    const event: any = {}

    if (eventDetails.summary) event.summary = eventDetails.summary
    if (eventDetails.description) event.description = eventDetails.description
    if (eventDetails.location) event.location = eventDetails.location

    if (eventDetails.startTime) {
      event.start = {
        dateTime: eventDetails.startTime,
        timeZone: bookingConfig.timeZone,
      }
    }

    if (eventDetails.endTime) {
      event.end = {
        dateTime: eventDetails.endTime,
        timeZone: bookingConfig.timeZone,
      }
    }

    if (eventDetails.attendeeEmail) {
      event.attendees = [{ email: eventDetails.attendeeEmail, displayName: eventDetails.attendeeName || "" }]
    }

    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId,
      requestBody: event,
      sendUpdates: "all", // Send emails to attendees
    })

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    }
  } catch (error) {
    console.error("Error updating calendar event:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown calendar error",
    }
  }
}
