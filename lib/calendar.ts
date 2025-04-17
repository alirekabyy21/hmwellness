export interface BookingDetails {
  name: string
  email: string
  phone: string
  date: Date
  timeSlot: string
  clientType: string
  message?: string
}

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

export async function getAvailableTimeSlots(date: Date): Promise<string[]> {
  // In a real implementation, this would check Google Calendar for available slots
  // For now, we'll return the predefined time slots from the config

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // For demonstration, let's make some time slots "unavailable" based on the day
  const dayOfWeek = date.getDay()
  const { timeSlots } = require("@/app/config").bookingContent

  // Simulate some slots being unavailable based on the day of week
  // This is just for demonstration - replace with actual availability logic
  if (dayOfWeek === 1) {
    // Monday
    return timeSlots.filter((_, index) => index !== 0 && index !== 3) // Remove first and fourth slots
  } else if (dayOfWeek === 5) {
    // Friday
    return timeSlots.filter((_, index) => index !== 2 && index !== 5) // Remove third and sixth slots
  } else if (dayOfWeek === 0 || dayOfWeek === 6) {
    // Weekend
    return timeSlots.filter((_, index) => index < 3) // Only morning slots available on weekends
  }

  return timeSlots
}

// Instructions for setting up Google Calendar API
export const googleCalendarSetupInstructions = `
# Setting up Google Calendar API

To fully integrate with Google Calendar, follow these steps:

1. Go to the Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Calendar API
4. Create OAuth 2.0 credentials
5. Download the credentials JSON file
6. Set up environment variables for the credentials
7. Implement the Google Calendar API client using the google-auth-library and googleapis packages

For detailed instructions, visit: https://developers.google.com/calendar/api/quickstart/nodejs
`
