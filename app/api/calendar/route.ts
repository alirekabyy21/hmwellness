import { type NextRequest, NextResponse } from "next/server"

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

    // In a real implementation, this would call the Google Calendar API
    // to create an event and generate a Google Meet link
    console.log("Creating calendar event:", { summary, description, startTime, endTime, attendees })

    // For now, we'll return mock data with a properly formatted Google Meet link
    const eventId = `event_${Math.random().toString(36).substring(2, 11)}`

    // Create a more realistic Google Meet link format
    const meetCode = Math.random().toString(36).substring(2, 11)
    const meetingLink = `https://meet.google.com/${meetCode}`

    // Generate a Google Calendar event link that users can click to add to their calendar
    const calendarEventLink = generateGoogleCalendarLink({
      summary,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      location: meetingLink,
    })

    return NextResponse.json({
      success: true,
      eventId,
      meetingLink,
      calendarEventLink,
    })
  } catch (error) {
    console.error("Error creating calendar event:", error)
    return NextResponse.json({ success: false, error: "Failed to create calendar event" }, { status: 500 })
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
