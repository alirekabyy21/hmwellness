import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { OAuth2Client } from "google-auth-library"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date } = body

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          error: "Date parameter is required",
        },
        { status: 400 },
      )
    }

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

    // Set up time min and max for the given date
    const timeMin = new Date(date)
    timeMin.setHours(0, 0, 0, 0)

    const timeMax = new Date(date)
    timeMax.setHours(23, 59, 59, 999)

    // Get events for the day
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })

    const events = response.data.items || []

    // Get booked time slots
    const bookedSlots = events.map((event) => {
      const start = new Date(event.start?.dateTime || "")
      return `${start.getHours()}:${start.getMinutes() === 0 ? "00" : start.getMinutes()} ${
        start.getHours() >= 12 ? "PM" : "AM"
      }`
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
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot))

    return NextResponse.json({
      success: true,
      date: new Date(date).toISOString(),
      availableSlots,
    })
  } catch (error) {
    console.error("Error getting available slots:", error)

    // Return default slots if there's an error
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get available slots",
        availableSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
      },
      { status: 500 },
    )
  }
}
