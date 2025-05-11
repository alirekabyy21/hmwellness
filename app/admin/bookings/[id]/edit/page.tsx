"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Booking } from "@/lib/db-service"

export default function EditBookingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    status: "",
    paymentStatus: "",
    paymentAmount: 0,
    paymentCurrency: "EGP",
    notes: "",
  })

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
      setFormData({
        name: data.booking.name,
        email: data.booking.email,
        phone: data.booking.phone,
        service: data.booking.service,
        date: data.booking.date,
        time: data.booking.time,
        status: data.booking.status,
        paymentStatus: data.booking.paymentStatus,
        paymentAmount: data.booking.paymentAmount,
        paymentCurrency: data.booking.paymentCurrency,
        notes: data.booking.notes || "",
      })
    } catch (error) {
      console.error("Error fetching booking:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/bookings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.id,
          ...formData,
          paymentAmount: Number(formData.paymentAmount),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update booking")
      }

      router.push(`/admin/bookings/${params.id}`)
    } catch (error) {
      console.error("Error updating booking:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
      setIsSaving(false)
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

  if (error && !booking) {
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
            <p>{error}</p>
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
      <div className="flex items-center">
        <Button variant="outline" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-primary">Edit Booking</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>Edit contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Edit session information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Life Coaching Session">Life Coaching Session</SelectItem>
                    <SelectItem value="Career Coaching">Career Coaching</SelectItem>
                    <SelectItem value="Relationship Coaching">Relationship Coaching</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" value={formData.time} onChange={handleInputChange} required />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Status Information</CardTitle>
            <CardDescription>Update booking and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Booking Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows={4} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select
                    value={formData.paymentStatus}
                    onValueChange={(value) => handleSelectChange("paymentStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentAmount">Payment Amount</Label>
                  <Input
                    id="paymentAmount"
                    name="paymentAmount"
                    type="number"
                    value={formData.paymentAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentCurrency">Currency</Label>
                  <Select
                    value={formData.paymentCurrency}
                    onValueChange={(value) => handleSelectChange("paymentCurrency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EGP">EGP</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
