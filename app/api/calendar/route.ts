import { type NextRequest, NextResponse } from "next/server"
import { createCalendarEvent, getAvailableSlots, deleteCalendarEvent, updateCalendarEvent } from "@/lib/google-calendar"
import { bookingConfig } from "@/app/config"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["summary", "startTime", "attendeeEmail", "attendeeName"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Calculate end time if not provided
    if (!data.endTime) {
      const startTime = new Date(data.startTime)
      startTime.setMinutes(startTime.getMinutes() + bookingConfig.sessionDuration)
      data.endTime = startTime.toISOString()
    }

    const result = await createCalendarEvent({
      summary: data.summary,
      description: data.description || `Session with ${data.attendeeName}`,
      startTime: data.startTime,
      endTime: data.endTime,
      attendeeEmail: data.attendeeEmail,
      attendeeName: data.attendeeName,
      location: data.location,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      eventId: result.eventId,
      eventLink: result.eventLink,
    })
  } catch (error) {
    console.error("Calendar API error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json({ success: false, error: "Date parameter is required" }, { status: 400 })
    }

    const result = await getAvailableSlots(date)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      availableSlots: result.availableSlots,
    })
  } catch (error) {
    console.error("Calendar API error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const eventId = searchParams.get("eventId")

    if (!eventId) {
      return NextResponse.json({ success: false, error: "Event ID is required" }, { status: 400 })
    }

    const result = await deleteCalendarEvent(eventId)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Calendar API error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.eventId) {
      return NextResponse.json({ success: false, error: "Event ID is required" }, { status: 400 })
    }

    const result = await updateCalendarEvent(data.eventId, {
      summary: data.summary,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
      attendeeEmail: data.attendeeEmail,
      attendeeName: data.attendeeName,
      location: data.location,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      eventId: result.eventId,
      eventLink: result.eventLink,
    })
  } catch (error) {
    console.error("Calendar API error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
