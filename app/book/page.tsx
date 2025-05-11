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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { bookingConfig, pricingConfig } from "@/app/config"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { isValidPhoneNumber } from "react-phone-number-input"
import { CalendarIcon, Clock, User, Mail, Phone, MessageSquare, CreditCard, Loader2 } from "lucide-react"
import { KashierPaymentButton } from "@/components/kashier-payment-button"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const promoCode = searchParams.get("promo")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState("")
  const [service, setService] = useState("Life Coaching Session")
  const [location, setLocation] = useState("egypt")
  const [promoCodeInput, setPromoCodeInput] = useState(promoCode || "")
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [availableSlots, setAvailableSlots] = useState<string[]>(bookingConfig.availableTimeSlots)
  const [orderId, setOrderId] = useState(`ORDER-${Date.now()}`)

  // Calculate price based on location and promo code
  const calculatePrice = () => {
    const basePrice = location === "international" ? pricingConfig.internationalPrice : pricingConfig.defaultPrice
    let finalPrice = basePrice

    if (appliedPromoCode && pricingConfig.promoCodes[appliedPromoCode]) {
      const discountPercent = pricingConfig.promoCodes[appliedPromoCode]
      const discountAmount = (basePrice * discountPercent) / 100
      finalPrice = basePrice - discountAmount
      setDiscount(discountPercent)
    }

    return {
      basePrice,
      finalPrice,
      currency: location === "international" ? pricingConfig.internationalCurrency : pricingConfig.currency,
    }
  }

  const { basePrice, finalPrice, currency } = calculatePrice()

  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCodeInput) {
      setFormErrors({ ...formErrors, promoCode: "Please enter a promo code" })
      return
    }

    if (pricingConfig.promoCodes[promoCodeInput]) {
      setAppliedPromoCode(promoCodeInput)
      setFormErrors({ ...formErrors, promoCode: "" })
    } else {
      setFormErrors({ ...formErrors, promoCode: "Invalid promo code" })
    }
  }

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

  // Apply promo code from URL parameter
  useEffect(() => {
    if (promoCode && pricingConfig.promoCodes[promoCode]) {
      setPromoCodeInput(promoCode)
      setAppliedPromoCode(promoCode)
    }
  }, [promoCode])

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
      // Store booking details in session storage for confirmation page
      const bookingDetails = {
        name,
        email,
        phone,
        service,
        date: format(date!, "yyyy-MM-dd"),
        time: timeSlot,
        message,
        orderId,
        price: finalPrice,
        currency,
        discount: appliedPromoCode ? discount : 0,
      }

      sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))

      // For direct Kashier integration, we'll use the KashierPaymentButton component
      // The actual redirect happens in the component
      setIsLoading(false)
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
        <h1 className="text-4xl font-bold text-primary mb-4">Book Your Coaching Session</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Schedule your coaching session with Hagar Moharam and take the first step towards positive change.
        </p>
      </div>

      {error && (
        <Alert className="mb-8 max-w-2xl mx-auto">
          <AlertDescription className="text-red-600">
            {error === "payment_failed" ? "Payment failed. Please try again." : error}
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-primary/10 border-b">
          <div className="flex items-center">
            <div className="bg-primary p-3 rounded-full text-white mr-4">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-primary">Book Your Session</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <Label className="text-primary font-medium">Select Service</Label>
            <RadioGroup
              defaultValue="Life Coaching Session"
              onValueChange={setService}
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex items-center space-x-2 border p-4 rounded-md">
                <RadioGroupItem value="Life Coaching Session" id="service-life" />
                <Label htmlFor="service-life" className="flex-1 cursor-pointer">
                  <div className="font-medium">Life Coaching Session</div>
                  <div className="text-sm text-gray-500">60-minute personalized coaching session</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-primary font-medium flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                  Select Date
                </Label>
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
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {date ? format(date, "EEEE, MMMM d, yyyy") : <span>Pick a date</span>}
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
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
                {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
              </div>

              {date && (
                <div className="space-y-2">
                  <Label className="text-primary font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    Select Time
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={timeSlot === slot ? "default" : "outline"}
                          className={cn("text-sm")}
                          onClick={() => setTimeSlot(slot)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {slot}
                        </Button>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-4 text-gray-500 bg-gray-50 rounded-md border">
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
                <Label htmlFor="name" className="text-primary font-medium flex items-center">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn(formErrors.name ? "border-red-500" : "")}
                  required
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(formErrors.email ? "border-red-500" : "")}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  Phone Number
                </Label>
                <div className={cn("rounded-md border", formErrors.phone ? "border-red-500" : "")}>
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
            <Label htmlFor="message" className="text-primary font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
              Additional Information (Optional)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please share any specific topics or questions you'd like to address in our session."
              className="min-h-[100px]"
            />
          </div>

          <div className="border-t pt-6">
            <div className="space-y-4">
              <Label className="text-primary font-medium flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-primary" />
                Payment Options
              </Label>

              <RadioGroup
                defaultValue="egypt"
                onValueChange={setLocation}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="egypt" id="location-egypt" />
                  <Label htmlFor="location-egypt" className="flex-1 cursor-pointer">
                    <div className="font-medium">Egypt (EGP)</div>
                    <div className="text-sm text-gray-500">Pay in Egyptian Pounds</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="international" id="location-international" />
                  <Label htmlFor="location-international" className="flex-1 cursor-pointer">
                    <div className="font-medium">International (USD)</div>
                    <div className="text-sm text-gray-500">Pay in US Dollars</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="promoCode" className="text-primary font-medium">
                  Promo Code (Optional)
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="promoCode"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className={cn(formErrors.promoCode ? "border-red-500" : "")}
                  />
                  <Button type="button" variant="outline" onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
                {formErrors.promoCode && <p className="text-red-500 text-sm">{formErrors.promoCode}</p>}
                {appliedPromoCode && <p className="text-green-600 text-sm">Promo code applied: {discount}% discount</p>}
              </div>
              <div className="p-4 bg-gray-50 rounded-md border">
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Session Fee:</span>
                  <span className="text-primary font-bold text-lg">
                    {currency} {finalPrice.toFixed(2)}
                  </span>
                </div>
                {appliedPromoCode && (
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                    <span>Original price:</span>
                    <span className="line-through">
                      {currency} {basePrice.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {formErrors.submit && (
            <Alert>
              <AlertDescription className="text-red-600">{formErrors.submit}</AlertDescription>
            </Alert>
          )}

          {validateForm() && (
            <KashierPaymentButton
              amount={finalPrice}
              currency={currency}
              orderId={orderId}
              description={`${service} - ${date ? format(date, "yyyy-MM-dd") : ""} ${timeSlot || ""}`}
              customerName={name}
              customerEmail={email}
              customerPhone={phone}
              redirectUrl={`${process.env.NEXT_PUBLIC_BASE_URL || "https://hmwellness.site"}/book/confirmation`}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay Now (${currency} ${finalPrice.toFixed(2)})`
              )}
            </KashierPaymentButton>
          )}

          {!validateForm() && (
            <Button type="submit" className="w-full">
              Continue to Payment
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
