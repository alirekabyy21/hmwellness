"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Edit, Mail, MapPin, Phone, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Booking } from "@/lib/db-service"

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBooking()
  }, [])

  const fetchBooking = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/bookings?id=${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch booking")
      }

      setBooking(data.booking)
    } catch (error) {
      console.error("Error fetching booking:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBooking = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/bookings?id=${params.id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete booking")
      }

      router.push("/admin/bookings")
    } catch (error) {
      console.error("Error deleting booking:", error)
      alert(error instanceof Error ? error.message : "Failed to delete booking")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      case "refunded":
        return <Badge className="bg-blue-500">Refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Loading booking details...</p>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || "Booking not found"}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={fetchBooking}>
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">Booking Details</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/bookings/${params.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDeleteBooking}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Contact details and personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Name</p>
                <p className="text-gray-600">{booking.name}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">{booking.email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">{booking.phone}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <a href={`mailto:${booking.email}`}>Send Email</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Session information and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <div className="h-5 w-5 mr-3 flex items-center justify-center">
                <span className="block h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <div>
                <p className="font-medium">Service</p>
                <p className="text-gray-600">{booking.service}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{booking.date}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-gray-600">{booking.time}</p>
              </div>
            </div>
            {booking.eventId && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Calendar Event</p>
                  <p className="text-gray-600">
                    <a
                      href={`https://calendar.google.com/calendar/event?eid=${booking.eventId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View in Calendar
                    </a>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status Information</CardTitle>
          <CardDescription>Current booking and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Booking Status</h3>
              <div className="flex items-center mb-4">
                {getStatusBadge(booking.status)}
                <span className="ml-2 text-sm text-gray-500">
                  Last updated: {new Date(booking.updatedAt).toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  variant={booking.status === "confirmed" ? "default" : "outline"}
                  size="sm"
                  className="mr-2"
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/admin/bookings`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: booking.id,
                          status: "confirmed",
                        }),
                      })

                      if (!response.ok) {
                        throw new Error("Failed to update status")
                      }

                      fetchBooking()
                    } catch (error) {
                      console.error("Error updating status:", error)
                      alert("Failed to update status")
                    }
                  }}
                >
                  Confirm
                </Button>
                <Button
                  variant={booking.status === "cancelled" ? "default" : "outline"}
                  size="sm"
                  className="mr-2"
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/admin/bookings`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: booking.id,
                          status: "cancelled",
                        }),
                      })

                      if (!response.ok) {
                        throw new Error("Failed to update status")
                      }

                      fetchBooking()
                    } catch (error) {
                      console.error("Error updating status:", error)
                      alert("Failed to update status")
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={booking.status === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/admin/bookings`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: booking.id,
                          status: "completed",
                        }),
                      })

                      if (!response.ok) {
                        throw new Error("Failed to update status")
                      }

                      fetchBooking()
                    } catch (error) {
                      console.error("Error updating status:", error)
                      alert("Failed to update status")
                    }
                  }}
                >
                  Mark as Completed
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Payment Status</h3>
              <div className="flex items-center mb-4">
                {getPaymentStatusBadge(booking.paymentStatus)}
                <span className="ml-2">
                  {booking.paymentAmount} {booking.paymentCurrency}
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  variant={booking.paymentStatus === "paid" ? "default" : "outline"}
                  size="sm"
                  className="mr-2"
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/admin/bookings`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: booking.id,
                          paymentStatus: "paid",
                        }),
                      })

                      if (!response.ok) {
                        throw new Error("Failed to update payment status")
                      }

                      fetchBooking()
                    } catch (error) {
                      console.error("Error updating payment status:", error)
                      alert("Failed to update payment status")
                    }
                  }}
                >
                  Mark as Paid
                </Button>
                <Button
                  variant={booking.paymentStatus === "refunded" ? "default" : "outline"}
                  size="sm"
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/admin/bookings`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: booking.id,
                          paymentStatus: "refunded",
                        }),
                      })

                      if (!response.ok) {
                        throw new Error("Failed to update payment status")
                      }

                      fetchBooking()
                    } catch (error) {
                      console.error("Error updating payment status:", error)
                      alert("Failed to update payment status")
                    }
                  }}
                >
                  Mark as Refunded
                </Button>
              </div>
            </div>
          </div>

          {booking.notes && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-600 whitespace-pre-line">{booking.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
