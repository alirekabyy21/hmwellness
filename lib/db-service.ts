export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes?: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentAmount: number
  paymentCurrency: string
  createdAt: string
  updatedAt: string
  eventId?: string
}

// In-memory storage
const bookings: Booking[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+201234567890",
    date: "2023-06-15",
    time: "10:00",
    service: "Life Coaching Session",
    status: "confirmed",
    paymentStatus: "paid",
    paymentAmount: 600,
    paymentCurrency: "EGP",
    createdAt: "2023-06-10T12:00:00Z",
    updatedAt: "2023-06-10T12:30:00Z",
    eventId: "event_123",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+201234567891",
    date: "2023-06-20",
    time: "14:00",
    service: "Career Coaching",
    status: "pending",
    paymentStatus: "pending",
    paymentAmount: 600,
    paymentCurrency: "EGP",
    createdAt: "2023-06-12T09:00:00Z",
    updatedAt: "2023-06-12T09:00:00Z",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+201234567892",
    date: "2023-06-25",
    time: "11:00",
    service: "Life Coaching Session",
    status: "cancelled",
    paymentStatus: "refunded",
    paymentAmount: 600,
    paymentCurrency: "EGP",
    createdAt: "2023-06-14T15:00:00Z",
    updatedAt: "2023-06-15T10:00:00Z",
    eventId: "event_456",
  },
]

// Bookings
export async function getBookings() {
  return [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getBookingById(id: string) {
  return bookings.find((booking) => booking.id === id)
}

export async function createBooking(booking: Omit<Booking, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString()
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now,
  }

  bookings.push(newBooking)
  return newBooking
}

export async function updateBooking(id: string, updates: Partial<Booking>) {
  const index = bookings.findIndex((booking) => booking.id === id)

  if (index === -1) {
    return null
  }

  bookings[index] = {
    ...bookings[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  return bookings[index]
}

export async function deleteBooking(id: string) {
  const index = bookings.findIndex((booking) => booking.id === id)

  if (index === -1) {
    return false
  }

  bookings.splice(index, 1)
  return true
}

// Statistics
export async function getBookingStats() {
  const total = bookings.length
  const confirmed = bookings.filter((booking) => booking.status === "confirmed").length
  const pending = bookings.filter((booking) => booking.status === "pending").length
  const cancelled = bookings.filter((booking) => booking.status === "cancelled").length
  const completed = bookings.filter((booking) => booking.status === "completed").length

  const totalRevenue = bookings
    .filter((booking) => booking.paymentStatus === "paid")
    .reduce((sum, booking) => sum + booking.paymentAmount, 0)

  const upcomingSessions = bookings.filter(
    (booking) =>
      booking.status === "confirmed" && new Date(`${booking.date}T${booking.time}`).getTime() > new Date().getTime(),
  ).length

  return {
    total,
    confirmed,
    pending,
    cancelled,
    completed,
    totalRevenue,
    upcomingSessions,
  }
}
