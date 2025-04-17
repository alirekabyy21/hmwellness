"use client"

import { useState } from "react"
import { PaymentForm } from "./payment-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Individual Coaching",
    date: "",
    time: "",
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
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

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={bookingDetails.date} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" value={bookingDetails.time} onChange={handleChange} required />
            </div>

            <Button type="submit" className="w-full">
              Proceed to Payment
            </Button>
          </form>
        ) : (
          <PaymentForm amount={servicePrices[bookingDetails.service]} bookingDetails={bookingDetails} />
        )}
      </CardContent>
    </Card>
  )
}
