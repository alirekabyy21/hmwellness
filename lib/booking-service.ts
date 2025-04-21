import { v4 as uuidv4 } from "uuid"

export interface BookingDetails {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  message?: string
  createdAt: string
  meetingLink?: string
}

// In-memory storage for bookings (in a real app, this would be a database)
const bookings: Record<string, BookingDetails> = {}

export function createBooking(details: Omit<BookingDetails, "id" | "createdAt" | "meetingLink">): BookingDetails {
  const id = uuidv4()
  const createdAt = new Date().toISOString()

  // Generate a mock meeting link
  const meetingLink = `https://meet.google.com/mock-${id.substring(0, 8)}`

  const booking: BookingDetails = {
    id,
    ...details,
    createdAt,
    meetingLink,
  }

  // Store the booking
  bookings[id] = booking

  return booking
}

export function getBooking(id: string): BookingDetails | null {
  return bookings[id] || null
}

export function getAllBookings(): BookingDetails[] {
  return Object.values(bookings)
}
