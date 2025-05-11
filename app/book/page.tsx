"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format, addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { bookingConfig } from "@/app/config"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { isValidPhoneNumber } from "react-phone-number-input"
import { CalendarIcon, Clock, User, Mail, Phone, MessageSquare, CreditCard, Loader2 } from "lucide-react"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState("")
  const [isInternational, setIsInternational] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [availableSlots, setAvailableSlots] = useState<string[]>(bookingConfig.availableTimeSlots)

  // Fetch available time slots when date changes
  useEffect(() => {
    if (!date) {
      setAvailableSlots([])
      return
    }

    const fetchAvailableSlots = async () => {
      try {
        const response = await fetch(`/api/calendar?date=${format(date, "yyyy-MM-dd")}`)
        const data = await response.json()

        if (data.success) {
          setAvailableSlots(data.availableSlots)
        } else {
          console.error("Error fetching available slots:", data.error)
          setAvailableSlots(bookingConfig.availableTimeSlots)
        }
      } catch (error) {
        console.error("Error fetching available slots:", error)
        setAvailableSlots(bookingConfig.availableTimeSlots)
      }
    }

    fetchAvailableSlots()
  }, [date])

  // Validate form fields
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!name.trim()) {
      errors.name = "Name is required"
    }

    if (!email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!phone) {
      errors.phone = "Phone number is required"
    } else if (!isValidPhoneNumber(phone)) {
      errors.phone = "Please enter a valid phone number"
    }

    if (!date) {
      errors.date = "Please select a date"
    }

    if (!timeSlot) {
      errors.time = "Please select a time slot"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Create payment session
      const paymentResponse = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: isInternational ? 30 : 600,
          currency: isInternational ? "USD" : "EGP",
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          service: "Life Coaching Session (60 minutes)",
          date: format(date!, "yyyy-MM-dd"),
          time: timeSlot,
          message,
        }),
      })

      const paymentData = await paymentResponse.json()

      if (!paymentData.success) {
        throw new Error(paymentData.error || "Failed to create payment session")
      }

      // Store booking details in session storage for confirmation page
      sessionStorage.setItem(
        "bookingDetails",
        JSON.stringify({
          name,
          email,
          phone,
          service: "Life Coaching Session (60 minutes)",
          date: format(date!, "yyyy-MM-dd"),
          time: timeSlot,
          message,
          orderId: paymentData.orderId,
        }),
      )

      // Redirect to payment page
      window.location.href = paymentData.paymentUrl
    } catch (error) {
      console.error("Error processing booking:", error)
      setFormErrors({
        submit: error instanceof Error ? error.message : "An unexpected error occurred",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-gradient-to-b from-[#f8f9ff] to-[#f0f4ff]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#5d6bb0] mb-4">Book Your Coaching Session</h1>
        <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
          Schedule your 60-minute life coaching session with Hagar Moharam and take the first step towards positive
          change.
        </p>
      </div>

      {error && (
        <Alert className="mb-8 max-w-2xl mx-auto bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">
            {error === "payment_failed" ? "Payment failed. Please try again." : error}
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-[#e8edff] border-b border-[#d1dbff]">
          <div className="flex items-center">
            <div className="bg-[#5d6bb0] p-3 rounded-full text-white mr-4">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-[#5d6bb0]">Life Coaching Session (60 minutes)</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[#5d6bb0] font-medium flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                  Select Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-[#d1dbff] hover:bg-[#f0f4ff] hover:border-[#5d6bb0]",
                        !date && "text-muted-foreground",
                        formErrors.date && "border-red-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#5d6bb0]" />
                      {date ? format(date, "EEEE, MMMM d, yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-[#d1dbff]">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today || date > addDays(today, 30)
                      }}
                      initialFocus
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
                {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
              </div>

              {date && (
                <div className="space-y-2">
                  <Label className="text-[#5d6bb0] font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                    Select Time
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={timeSlot === slot ? "default" : "outline"}
                          className={cn(
                            "text-sm",
                            timeSlot === slot
                              ? "bg-[#5d6bb0] hover:bg-[#4a5899] text-white"
                              : "border-[#d1dbff] text-[#5d6bb0] hover:bg-[#f0f4ff] hover:border-[#5d6bb0]",
                          )}
                          onClick={() => setTimeSlot(slot)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {slot}
                        </Button>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-4 text-[#6b7280] bg-[#f8f9ff] rounded-md border border-[#d1dbff]">
                        No available slots for this date. Please select another date.
                      </div>
                    )}
                  </div>
                  {formErrors.time && <p className="text-red-500 text-sm">{formErrors.time}</p>}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#5d6bb0] font-medium flex items-center">
                  <User className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn(
                    "border-[#d1dbff] focus:border-[#5d6bb0] focus:ring-[#5d6bb0]",
                    formErrors.name ? "border-red-500" : "",
                  )}
                  required
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#5d6bb0] font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "border-[#d1dbff] focus:border-[#5d6bb0] focus:ring-[#5d6bb0]",
                    formErrors.email ? "border-red-500" : "",
                  )}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#5d6bb0] font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                  Phone Number
                </Label>
                <div className={cn("rounded-md border", formErrors.phone ? "border-red-500" : "border-[#d1dbff]")}>
                  <PhoneInput
                    international
                    defaultCountry="EG"
                    value={phone}
                    onChange={(value) => setPhone(value || "")}
                    className="flex h-10 w-full rounded-md border-0 bg-background px-3 py-2 text-sm"
                  />
                </div>
                {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#5d6bb0] font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-[#5d6bb0]" />
              Additional Information (Optional)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please share any specific topics or questions you'd like to address in our session."
              className="min-h-[100px] border-[#d1dbff] focus:border-[#5d6bb0] focus:ring-[#5d6bb0]"
            />
          </div>

          <div className="border-t border-[#d1dbff] pt-6">
            <div className="flex items-center mb-4">
              <input
                id="international"
                type="checkbox"
                checked={isInternational}
                onChange={(e) => setIsInternational(e.target.checked)}
                className="h-4 w-4 rounded border-[#d1dbff] text-[#5d6bb0] focus:ring-[#5d6bb0]"
              />
              <label htmlFor="international" className="ml-2 block text-sm text-[#6b7280]">
                International payment (USD)
              </label>
            </div>

            <div className="p-4 bg-[#f8f9ff] rounded-md border border-[#d1dbff]">
              <div className="flex justify-between items-center">
                <span className="text-[#5d6bb0] font-medium flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                  Session Fee:
                </span>
                <span className="text-[#5d6bb0] font-bold text-lg">{isInternational ? "$30.00" : "EGP 600"}</span>
              </div>
            </div>
          </div>

          {formErrors.submit && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">{formErrors.submit}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-[#5d6bb0] hover:bg-[#4a5899] text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Proceed to Payment (${isInternational ? "$30.00" : "EGP 600"})`
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
