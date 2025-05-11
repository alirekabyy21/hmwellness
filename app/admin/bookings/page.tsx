"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, Edit, Eye, Filter, MoreHorizontal, Plus, RefreshCw, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Booking } from "@/lib/db-service"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/bookings")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch bookings")
      }

      setBookings(data.bookings)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/bookings?id=${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete booking")
      }

      // Remove the deleted booking from the state
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id))
    } catch (error) {
      console.error("Error deleting booking:", error)
      alert(error instanceof Error ? error.message : "Failed to delete booking")
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    // Apply status filter
    if (filter !== "all" && booking.status !== filter) {
      return false
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        booking.name.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.phone.toLowerCase().includes(query) ||
        booking.service.toLowerCase().includes(query)
      )
    }

    return true
  })

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Bookings</h1>
        <Link href="/admin/bookings/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Bookings</CardTitle>
          <CardDescription>View and manage all booking requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-40">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon" onClick={fetchBookings}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p>Loading bookings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={fetchBookings}>
                Try Again
              </Button>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No bookings found</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Date & Time
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="font-medium">{booking.name}</div>
                        <div className="text-sm text-muted-foreground">{booking.email}</div>
                      </TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div>
                            <div>{booking.date}</div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div>{getPaymentStatusBadge(booking.paymentStatus)}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.paymentAmount} {booking.paymentCurrency}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`/admin/bookings/${booking.id}`}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/admin/bookings/${booking.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => handleDeleteBooking(booking.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
