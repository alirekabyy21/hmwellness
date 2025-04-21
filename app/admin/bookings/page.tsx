"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, MoreHorizontal, Plus, Search } from "lucide-react"
import { format, addDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddingSlot, setIsAddingSlot] = useState(false)
  const [isEditingBooking, setIsEditingBooking] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      email: "sarah@example.com",
      service: "Career Coaching",
      date: new Date(),
      time: "10:00 AM",
      duration: "60 minutes",
      status: "confirmed",
    },
    {
      id: 2,
      clientName: "Ahmed Hassan",
      email: "ahmed@example.com",
      service: "Life Transition Coaching",
      date: new Date(),
      time: "2:00 PM",
      duration: "60 minutes",
      status: "confirmed",
    },
    {
      id: 3,
      clientName: "Mona Ali",
      email: "mona@example.com",
      service: "Personal Development",
      date: addDays(new Date(), 1),
      time: "11:00 AM",
      duration: "60 minutes",
      status: "pending",
    },
  ]

  // Filter bookings for the selected date
  const filteredBookings = bookings.filter((booking) => date && booking.date.toDateString() === date.toDateString())

  const handleEditBooking = (booking: any) => {
    setSelectedBooking(booking)
    setIsEditingBooking(true)
  }

  const handleCancelBooking = (bookingId: number) => {
    // In a real app, you would call an API to cancel the booking
    alert(`Booking ${bookingId} cancelled`)
  }

  const handleSaveBooking = () => {
    // In a real app, you would call an API to update the booking
    setIsEditingBooking(false)
    setSelectedBooking(null)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Bookings</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search bookings..." className="w-[250px] pl-8" />
          </div>
          <Dialog open={isAddingSlot} onOpenChange={setIsAddingSlot}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Availability
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Availability</DialogTitle>
                <DialogDescription>Add new time slots when you're available for bookings.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Select>
                      <SelectTrigger id="start-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "9:00 AM",
                          "10:00 AM",
                          "11:00 AM",
                          "12:00 PM",
                          "1:00 PM",
                          "2:00 PM",
                          "3:00 PM",
                          "4:00 PM",
                          "5:00 PM",
                        ].map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Select>
                      <SelectTrigger id="end-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "10:00 AM",
                          "11:00 AM",
                          "12:00 PM",
                          "1:00 PM",
                          "2:00 PM",
                          "3:00 PM",
                          "4:00 PM",
                          "5:00 PM",
                          "6:00 PM",
                        ].map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeat">Repeat</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="repeat">
                      <SelectValue placeholder="Select repeat option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Do not repeat</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingSlot(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddingSlot(false)}>Add Slots</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-6">
        <Card className="w-[300px]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Calendar</h2>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm mx-2">{format(new Date(), "MMMM yyyy")}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="mt-4 space-y-2">
              <h3 className="font-medium text-sm">Available Slots</h3>
              <div className="grid grid-cols-2 gap-2">
                {["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"].map((time) => (
                  <div key={time} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md text-center">
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <h2 className="font-semibold mb-4">Bookings for {date ? format(date, "MMMM d, yyyy") : "Today"}</h2>

          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {booking.clientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium">{booking.clientName}</div>
                      <div className="text-sm text-muted-foreground">{booking.email}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{booking.service}</div>
                    <div className="text-sm text-muted-foreground">{booking.duration}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{booking.time}</div>
                    <div
                      className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                        booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditBooking(booking)}>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleCancelBooking(booking.id)}>
                        Cancel Booking
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg bg-muted/20">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No Bookings</h3>
              <p className="text-muted-foreground text-sm mt-1">There are no bookings scheduled for this day.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditingBooking} onOpenChange={setIsEditingBooking}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>Update the booking details.</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-client-name">Client Name</Label>
                <Input id="edit-client-name" defaultValue={selectedBooking.clientName} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-client-email">Client Email</Label>
                <Input id="edit-client-email" defaultValue={selectedBooking.email} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedBooking.date, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedBooking.date} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-time">Time</Label>
                  <Select defaultValue={selectedBooking.time}>
                    <SelectTrigger id="edit-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "9:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "12:00 PM",
                        "1:00 PM",
                        "2:00 PM",
                        "3:00 PM",
                        "4:00 PM",
                        "5:00 PM",
                      ].map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedBooking.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingBooking(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBooking}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
