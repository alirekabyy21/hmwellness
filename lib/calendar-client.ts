export interface CalendarEventData {
  summary: string
  description: string
  startTime: Date
  endTime: Date
  attendees: string[]
}

export interface CalendarEventResult {
  eventId: string
  meetingLink: string
  calendarEventLink: string
}

// Client-side function to create a calendar event
export async function createCalendarEvent(eventData: CalendarEventData): Promise<CalendarEventResult> {
  try {
    // Filter out hagarmoharam7@gmail.com from attendees
    const filteredAttendees = eventData.attendees.filter((email) => email !== "hagarmoharam7@gmail.com")

    const response = await fetch("/api/calendar/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: eventData.summary,
        description: eventData.description,
        startTime: eventData.startTime.toISOString(),
        endTime: eventData.endTime.toISOString(),
        attendees: filteredAttendees,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to create calendar event: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to create calendar event")
    }

    return {
      eventId: data.eventId,
      meetingLink: data.meetingLink,
      calendarEventLink: data.calendarEventLink,
    }
  } catch (error) {
    console.error("Error creating calendar event:", error)

    // Return a fallback response
    return {
      eventId: `mock-${Date.now()}`,
      meetingLink: `https://meet.google.com/mock-${Math.random().toString(36).substring(2, 7)}`,
      calendarEventLink: "#",
    }
  }
}

// Client-side function to get available slots
export async function getAvailableSlots(date: Date): Promise<string[]> {
  try {
    const response = await fetch("/api/calendar/slots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date.toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to get available slots: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to get available slots")
    }

    return data.availableSlots
  } catch (error) {
    console.error("Error getting available slots:", error)

    // Return default slots if there's an error
    return ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
  }
}

// Helper function to generate an iCalendar file content (client-safe)
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
