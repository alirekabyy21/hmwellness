"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Clock, Globe } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

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
import { bookingContent } from "../config"
import { createCalendarEvent } from "@/lib/google-calendar"
import { sendEmail, generateConfirmationEmail } from "@/lib/email-service"
import { detectUserLocationSimple } from "@/lib/location-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SimpleConfirmation } from "./simple-confirmation"
import { EmailFallback } from "./email-fallback"

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [promoCode, setPromoCode] = useState("")
  const [promoCodeValid, setPromoCodeValid] = useState(false)
  const [promoCodeError, setPromoCodeError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [userLocation, setUserLocation] = useState<{ country: string; isEgypt: boolean }>({
    country: "Unknown",
    isEgypt: true,
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>(bookingContent.timeSlots)
  const [meetingLink, setMeetingLink] = useState("")
  const [showPromoInfo, setShowPromoInfo] = useState(false)
  const [showEmailFallback, setShowEmailFallback] = useState(false)

  // Detect user's location
  useEffect(() => {
    const detectLocation = async () => {
      const location = detectUserLocationSimple()
      setUserLocation(location)
    }

    detectLocation()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
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
      return bookingContent.sessionPrice.international
    }

    // Apply student discount if promo code is valid
    if (promoCodeValid) {
      return bookingContent.sessionPrice.egyptStudent
    }

    return bookingContent.sessionPrice.egypt
  }

  const getPriceValue = () => {
    if (!userLocation.isEgypt) {
      return 30 // International price in USD
    }

    // Apply student discount if promo code is valid
    if (promoCodeValid) {
      return 400 // Student price in EGP
    }

    return 600 // Regular price in EGP
  }

  // Update the handleSubmit function to use the payment service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create a unique order ID
      const orderId = uuidv4()

      // Create calendar event
      if (date && timeSlot) {
        const [hours, minutes] = timeSlot
          .match(/(\d+):(\d+)/)
          ?.slice(1)
          .map(Number) || [0, 0]
        const isPM = timeSlot.includes("PM") && hours < 12
        const startTime = new Date(date)
        startTime.setHours(isPM ? hours + 12 : hours, minutes, 0)

        const endTime = new Date(startTime)
        endTime.setHours(endTime.getHours() + 1)

        const calendarEvent = await createCalendarEvent({
          summary: `Coaching Session with ${formData.name}`,
          description: `Service: 60-Minute Coaching Session\nClient: ${formData.name}\nPhone: ${formData.phone}\nNotes: ${formData.message}`,
          startTime,
          endTime,
          attendees: [formData.email, "hagarmoharam7@gmail.com"], // Add the coach's email
        })

        setMeetingLink(calendarEvent.meetingLink)

        // Store booking details in session storage
        sessionStorage.setItem(
          "bookingDetails",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            date: date.toISOString(),
            timeSlot,
            meetingLink: calendarEvent.meetingLink,
            calendarEventLink: calendarEvent.calendarEventLink,
            orderId,
            promoCodeApplied: promoCodeValid ? "Student Discount" : null,
          }),
        )

        // Try to send email
        const emailSuccess = await sendEmail({
          to: formData.email,
          subject: "Your Coaching Session is Confirmed - HM Wellness",
          html: generateConfirmationEmail(
            formData.name,
            "60-Minute Coaching Session",
            format(date, "EEEE, MMMM d, yyyy"),
            timeSlot,
            calendarEvent.meetingLink,
            "",
            calendarEvent.calendarEventLink,
          ),
        })

        // Set booking as confirmed
        setIsBooked(true)

        // If email failed, show the fallback
        if (!emailSuccess) {
          console.log("Email sending failed, showing fallback")
          setShowEmailFallback(true)
        }
      }
    } catch (error) {
      console.error("Error booking appointment:", error)
      // Show the fallback if there was an error
      setIsBooked(true)
      setShowEmailFallback(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title={bookingContent.hero.title}
          description={bookingContent.hero.description}
          className="bg-gradient-to-r from-bg-light to-bg-medium"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {isBooked ? (
              <SimpleConfirmation
                name={formData.name}
                email={formData.email}
                date={date ? format(date, "EEEE, MMMM d, yyyy") : ""}
                timeSlot={timeSlot}
                onClose={() => setIsBooked(false)}
              />
            ) : (
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-base">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              required
                              className="border-primary/20 focus-visible:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-base">
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john@example.com"
                              required
                              className="border-primary/20 focus-visible:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+20 123 456 7890"
                            required
                            className="border-primary/20 focus-visible:ring-primary"
                          />
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
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-primary">Promo Code</h3>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPromoInfo(!showPromoInfo)}
                                className="text-primary hover:text-primary/80 hover:bg-primary/10 -mr-2"
                              >
                                {showPromoInfo ? "Hide Info" : "Student Discount?"}
                              </Button>
                            </div>

                            {showPromoInfo && (
                              <Alert className="mt-2 bg-primary/5 border-primary/20">
                                <AlertDescription>
                                  <p className="text-sm">
                                    <strong>Student Discount:</strong> Send a WhatsApp message to{" "}
                                    <a
                                      href="https://wa.me/201090250475"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary font-medium"
                                    >
                                      01090250475
                                    </a>{" "}
                                    with your valid student ID to receive the student promo code.
                                  </p>
                                </AlertDescription>
                              </Alert>
                            )}

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
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    Egypt
                                  </span>
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
                                    <span className="text-sm line-through text-muted-foreground">600 EGP</span>
                                    <span className="text-primary">400 EGP</span>
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
            )}
          </div>
        </section>
        {showEmailFallback && (
          <EmailFallback
            name={formData.name}
            email={formData.email}
            date={date ? format(date, "EEEE, MMMM d, yyyy") : ""}
            timeSlot={timeSlot}
            open={showEmailFallback}
            onClose={() => setShowEmailFallback(false)}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
