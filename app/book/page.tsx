"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format, addDays } from "date-fns"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { bookingContent } from "@/app/config"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { isValidPhoneNumber } from "react-phone-number-input"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined)
  const [service, setService] = useState("Life Coaching Session")
  const [message, setMessage] = useState("")
  const [isInternational, setIsInternational] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(1)
  const [availableSlots, setAvailableSlots] = useState<string[]>(bookingContent.timeSlots)

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
          setAvailableSlots(bookingContent.timeSlots)
        }
      } catch (error) {
        console.error("Error fetching available slots:", error)
        setAvailableSlots(bookingContent.timeSlots)
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

    if (step === 1 && !date) {
      errors.date = "Please select a date"
    }

    if (step === 1 && !timeSlot) {
      errors.time = "Please select a time slot"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
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
          service,
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
          service,
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
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">{bookingContent.hero.title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{bookingContent.hero.description}</p>
      </div>

      {error && (
        <Alert className="mb-8 max-w-2xl mx-auto bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">
            {error === "payment_failed" ? "Payment failed. Please try again." : error}
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-primary/5 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">Book Your Session</h2>
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  step >= 1 ? "bg-primary text-white" : "border border-gray-300 text-gray-400",
                )}
              >
                1
              </div>
              <div className={cn("h-px w-6", step >= 2 ? "bg-primary" : "bg-gray-300")} />
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  step >= 2 ? "bg-primary text-white" : "border border-gray-300 text-gray-400",
                )}
              >
                2
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service">Service Type</Label>
                <RadioGroup value={service} onValueChange={setService} className="flex flex-col space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Life Coaching Session" id="coaching" />
                    <Label htmlFor="coaching">Life Coaching Session (60 minutes)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Career Coaching" id="career" />
                    <Label htmlFor="career">Career Coaching (60 minutes)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Consultation" id="consultation" />
                    <Label htmlFor="consultation">Initial Consultation (30 minutes)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        formErrors.date && "border-red-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
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
                    />
                  </PopoverContent>
                </Popover>
                {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
              </div>

              {date && (
                <div className="space-y-2">
                  <Label>Select Time</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={timeSlot === slot ? "default" : "outline"}
                          className="text-sm"
                          onClick={() => setTimeSlot(slot)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {slot}
                        </Button>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-4 text-gray-500">
                        No available slots for this date. Please select another date.
                      </div>
                    )}
                  </div>
                  {formErrors.time && <p className="text-red-500 text-sm">{formErrors.time}</p>}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={formErrors.name ? "border-red-500" : ""}
                  required
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formErrors.email ? "border-red-500" : ""}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className={`rounded-md border ${formErrors.phone ? "border-red-500" : "border-input"}`}>
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

              <div className="space-y-2">
                <Label htmlFor="message">Additional Information (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please share any specific topics or questions you'd like to address in our session."
                  className="min-h-[100px]"
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center mb-4">
                  <input
                    id="international"
                    type="checkbox"
                    checked={isInternational}
                    onChange={(e) => setIsInternational(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="international" className="ml-2 block text-sm text-gray-700">
                    International payment (USD)
                  </label>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="flex justify-between font-medium">
                    <span>Session Fee:</span>
                    <span className="text-primary">
                      {isInternational
                        ? `$${bookingContent.sessionPrice.international}`
                        : `${bookingContent.sessionPrice.egypt}`}
                    </span>
                  </div>
                </div>
              </div>

              {formErrors.submit && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-800">{formErrors.submit}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-gray-200">
            {step === 2 ? (
              <>
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm & Pay"
                  )}
                </Button>
              </>
            ) : (
              <>
                <div></div>
                <Button type="button" onClick={handleNextStep} disabled={!date || !timeSlot}>
                  Continue
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
