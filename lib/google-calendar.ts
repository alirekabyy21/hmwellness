export interface CalendarEvent {
  summary: string
  description: string
  startTime: Date
  endTime: Date
  attendees: string[]
  meetingLink?: string
}

export async function createCalendarEvent(event: CalendarEvent): Promise<{
  eventId: string
  meetingLink: string
  calendarEventLink: string
}> {
  try {
    const response = await fetch("/api/calendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...event,
        startTime: event.startTime.toISOString(),
        endTime: event.endTime.toISOString(),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Calendar API error:", errorData)
      throw new Error(errorData.error || "Failed to create calendar event")
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
  // In a real implementation, this would check the Google Calendar for available slots
  console.log("Getting available slots for date:", date)

  // Return mock data
  return ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]
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
