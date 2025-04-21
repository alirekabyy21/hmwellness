"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Clock, Globe } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { detectUserLocationSimple } from "@/lib/location-service"

// Available time slots
const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
]

// Pricing configuration
const PRICING = {
  egypt: {
    regular: 600,
    student: 400,
    currency: "EGP",
  },
  international: {
    regular: 30,
    currency: "USD",
  },
}

export default function BookingPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [promoCode, setPromoCode] = useState("")
  const [promoCodeValid, setPromoCodeValid] = useState(false)
  const [promoCodeError, setPromoCodeError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userLocation, setUserLocation] = useState<{ country: string; isEgypt: boolean }>({
    country: "Unknown",
    isEgypt: true,
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>(TIME_SLOTS)
  const [error, setError] = useState<string | null>(null)

  // Detect user's location
  useEffect(() => {
    const detectLocation = async () => {
      const location = detectUserLocationSimple()
      setUserLocation(location)
    }

    detectLocation()
  }, [])

  // Fetch available slots when date changes
  useEffect(() => {
    if (date) {
      // In a real app, you would fetch available slots from the server
      // For now, we'll just use a subset of the time slots
      const slots = TIME_SLOTS.filter((_, index) => index % 2 === 0)
      setAvailableSlots(slots)
    }
  }, [date])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      phone: "",
    }
    let isValid = true

    // Validate name
    if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    // Validate phone
    if (formData.phone.trim().length < 10) {
      errors.phone = "Please enter a valid phone number"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleNextStep = () => {
    if (step === 2) {
      // Validate form before proceeding to step 3
      if (!validateForm()) {
        return
      }
    }

    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const validatePromoCode = () => {
    setPromoCodeError("")

    // Check if the promo code is valid
    if (promoCode.toLowerCase() === "student") {
      setPromoCodeValid(true)
    } else {
      setPromoCodeValid(false)
      if (promoCode) {
        setPromoCodeError("Invalid promo code")
      }
    }
  }

  useEffect(() => {
    if (promoCode) {
      validatePromoCode()
    } else {
      setPromoCodeValid(false)
      setPromoCodeError("")
    }
  }, [promoCode])

  const getPrice = () => {
    if (!userLocation.isEgypt) {
      return `${PRICING.international.regular} ${PRICING.international.currency}`
    }

    // Apply student discount if promo code is valid
    if (promoCodeValid) {
      return `${PRICING.egypt.student} ${PRICING.egypt.currency}`
    }

    return `${PRICING.egypt.regular} ${PRICING.egypt.currency}`
  }

  const getPriceAmount = () => {
    if (!userLocation.isEgypt) {
      return PRICING.international.regular
    }

    // Apply student discount if promo code is valid
    if (promoCodeValid) {
      return PRICING.egypt.student
    }

    return PRICING.egypt.regular
  }

  const getCurrency = () => {
    return userLocation.isEgypt ? PRICING.egypt.currency : PRICING.international.currency
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Final validation before submission
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Create a unique order ID
      const orderId = uuidv4()
      console.log(`Generated order ID: ${orderId}`)

      // Store booking details in session storage
      const bookingDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        date: date ? date.toISOString() : "",
        time: timeSlot,
        orderId,
        promoCodeApplied: promoCodeValid ? "Student Discount" : null,
      }

      sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))

      // Calculate the correct amount based on location and promo code
      const amount = getPriceAmount()
      const currency = getCurrency()

      // Create payment data
      const paymentData = {
        orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerReference: orderId,
        amount,
        currency,
        description: "60-Minute Coaching Session with Hagar Moharam",
        redirectUrl: `${window.location.origin}/book/confirmation?orderId=${orderId}`,
      }

      console.log("Creating payment with:", paymentData)

      // Call the payment API
      const paymentResponse = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json()
        console.error("Payment API error:", errorData)
        throw new Error(`Payment API error: ${errorData.error || "Unknown error"}`)
      }

      const paymentResult = await paymentResponse.json()
      console.log("Payment API response:", paymentResult)

      if (paymentResult.success) {
        // Redirect to the payment URL
        window.location.href = paymentResult.paymentUrl
      } else {
        throw new Error("Invalid payment response: " + JSON.stringify(paymentResult))
      }
    } catch (error) {
      console.error("Error booking appointment:", error)
      setError((error as Error).message || "Failed to process booking. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Book a Session"
          description="Schedule your 60-minute coaching session with Hagar Moharam"
          className="bg-gradient-to-r from-bg-light to-bg-medium"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl border-primary/20 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-primary">Book a 60-Minute Session</CardTitle>
                    <CardDescription>Select a date and time that works for you</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full",
                        step >= 1
                          ? "bg-primary text-primary-foreground"
                          : "border border-muted-foreground text-muted-foreground",
                      )}
                    >
                      1
                    </div>
                    <div className={cn("h-px w-6", step >= 2 ? "bg-primary" : "bg-muted-foreground")} />
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full",
                        step >= 2
                          ? "bg-primary text-primary-foreground"
                          : "border border-muted-foreground text-muted-foreground",
                      )}
                    >
                      2
                    </div>
                    <div className={cn("h-px w-6", step >= 3 ? "bg-primary" : "bg-muted-foreground")} />
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full",
                        step >= 3
                          ? "bg-primary text-primary-foreground"
                          : "border border-muted-foreground text-muted-foreground",
                      )}
                    >
                      3
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert className="mb-4 bg-red-50 border-red-200 text-red-800">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-base">Select a date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {date && (
                        <div className="space-y-2">
                          <Label className="text-base">Select a time slot (60 minutes)</Label>
                          <RadioGroup
                            value={timeSlot}
                            onValueChange={setTimeSlot}
                            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4"
                          >
                            {availableSlots.map((slot) => (
                              <div key={slot}>
                                <RadioGroupItem value={slot} id={slot} className="peer sr-only" />
                                <Label
                                  htmlFor={slot}
                                  className="flex cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary"
                                >
                                  <Clock className="mr-2 h-4 w-4 text-primary" />
                                  {slot}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className={cn(
                            "border-primary/20 focus-visible:ring-primary",
                            formErrors.name && "border-red-500",
                          )}
                        />
                        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          required
                          className={cn(
                            "border-primary/20 focus-visible:ring-primary",
                            formErrors.email && "border-red-500",
                          )}
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={userLocation.isEgypt ? "01012345678" : "123 456 7890"}
                          required
                          className={cn(
                            "border-primary/20 focus-visible:ring-primary",
                            formErrors.phone && "border-red-500",
                          )}
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base">
                          What would you like to focus on in our session?
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please share any specific goals or challenges you'd like to address..."
                          rows={4}
                          className="border-primary/20 focus-visible:ring-primary"
                        />
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4 bg-bg-light">
                        <h3 className="font-medium text-primary">Booking Summary</h3>
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Service:</span>
                            <span>60-Minute Coaching Session</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span>{date ? format(date, "PPP") : "Not selected"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time:</span>
                            <span>{timeSlot || "Not selected"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span>{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span>{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone:</span>
                            <span>{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      {userLocation.isEgypt && (
                        <div className="rounded-lg border p-4 bg-bg-light">
                          <h3 className="font-medium text-primary">Promo Code</h3>
                          <div className="mt-3 flex gap-2">
                            <div className="flex-1">
                              <Input
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="border-primary/20 focus-visible:ring-primary"
                              />
                              {promoCodeError && <p className="text-red-500 text-xs mt-1">{promoCodeError}</p>}
                              {promoCodeValid && (
                                <p className="text-green-600 text-xs mt-1">Student discount applied!</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="rounded-lg border p-4 bg-bg-light">
                        <h3 className="font-medium text-primary">Payment</h3>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center gap-2">
                            {userLocation.isEgypt ? (
                              <div className="flex items-center gap-1">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Egypt</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Globe className="h-4 w-4 text-primary" />
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  International
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          You will be redirected to our secure payment page after confirming your booking.
                        </p>
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <div>
                              {promoCodeValid && userLocation.isEgypt && (
                                <div className="flex flex-col items-end">
                                  <span className="text-sm line-through text-muted-foreground">
                                    {PRICING.egypt.regular} {PRICING.egypt.currency}
                                  </span>
                                  <span className="text-primary">
                                    {PRICING.egypt.student} {PRICING.egypt.currency}
                                  </span>
                                </div>
                              )}
                              {!promoCodeValid && <span className="text-primary">{getPrice()}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    className="border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                {step < 3 ? (
                  <Button
                    onClick={handleNextStep}
                    disabled={
                      (step === 1 && (!date || !timeSlot)) ||
                      (step === 2 && (!formData.name || !formData.email || !formData.phone))
                    }
                    className="bg-primary hover:bg-primary/90"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <Check className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
