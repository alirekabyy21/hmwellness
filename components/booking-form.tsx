"use client"

import { useState } from "react"
import { PaymentForm } from "./payment-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Individual Coaching",
    date: "",
    time: "",
    message: "",
  })

  // Service prices (in EGP)
  const servicePrices = {
    "Individual Coaching": 500,
    "Group Session": 300,
    Workshop: 750,
    Consultation: 400,
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleServiceChange = (value) => {
    setBookingDetails((prev) => ({
      ...prev,
      service: value,
    }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setBookingDetails((prev) => ({
        ...prev,
        date: format(date, "yyyy-MM-dd"),
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">{step === 1 ? "Book Your Session" : "Complete Payment"}</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={bookingDetails.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={bookingDetails.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={bookingDetails.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select value={bookingDetails.service} onValueChange={handleServiceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual Coaching">Individual Coaching</SelectItem>
                  <SelectItem value="Group Session">Group Session</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select
                  value={bookingDetails.time}
                  onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, time: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Information (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your goals or any specific areas you'd like to focus on"
                value={bookingDetails.message}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Proceed to Payment
              </Button>
            </div>
          </form>
        ) : (
          <PaymentForm amount={servicePrices[bookingDetails.service]} bookingDetails={bookingDetails} />
        )}
      </CardContent>
    </Card>
  )
}
