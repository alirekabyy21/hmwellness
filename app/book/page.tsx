"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { addDays, format } from "date-fns"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { bookingContent, pricingConfig, calendarConfig } from "../config"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Import the calendar functions at the top of the file
import { getAvailableTimeSlots, createCalendarEvent, createGoogleCalendarEventLink } from "@/components/calendar"

// Define client types with proper structure
const clientTypes = [
  {
    id: "regular",
    label: "Regular Client",
    price: `${pricingConfig.tiers.egypt.regular} EGP`,
  },
  {
    id: "student",
    label: "Student",
    price: `${pricingConfig.tiers.egypt.student} EGP`,
  },
  {
    id: "international",
    label: "International Client",
    price: `$${pricingConfig.international} USD`,
  },
]

export default function BookingPage() {
  const { t, isRTL } = useLanguage()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [step, setStep] = useState(1)
  const [clientType, setClientType] = useState("regular")
  const [paymentMethod, setPaymentMethod] = useState("vodafoneCash")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [googleEventLink, setGoogleEventLink] = useState("")
  const router = useRouter()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [isInternational, setIsInternational] = useState(false)

  // Detect if user is international (outside Egypt)
  useEffect(() => {
    // In a real implementation, you would use a geolocation service
    // For now, we'll use the browser's language as a simple proxy
    const userLanguage = navigator.language || navigator.languages[0]
    const isOutsideEgypt = !userLanguage.includes("ar-EG")
    setIsInternational(isOutsideEgypt)
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

  const getClientTypePrice = () => {
    if (isInternational) {
      return `$${pricingConfig.international}`
    }

    const basePrice = pricingConfig.tiers.egypt.regular
    const discountedPrice = promoApplied ? basePrice - pricingConfig.studentPromo.discount : basePrice
    return `${discountedPrice} EGP`
  }

  const createGoogleCalendarEvent = () => {
    if (!date || !timeSlot) return ""

    // Parse the time slot to get start time
    const timeMatch = timeSlot.match(/(\d+):(\d+)\s*([AP]M)/)
    if (!timeMatch || timeMatch.length < 4) return ""

    const [_, hour, minute, period] = timeMatch
    if (!hour || !minute || !period) return ""

    // Convert to 24-hour format for Google Calendar
    let startHour = Number.parseInt(hour)
    if (period === "PM" && startHour < 12) startHour += 12
    if (period === "AM" && startHour === 12) startHour = 0

    // Create start and end dates
    const startDate = new Date(date)
    startDate.setHours(startHour, Number.parseInt(minute), 0, 0)

    const endDate = new Date(startDate)
    endDate.setHours(startDate.getHours() + 1) // 60-minute session

    // Format dates for Google Calendar URL
    const formatForGoogleCalendar = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "")
    }

    const startDateStr = formatForGoogleCalendar(startDate)
    const endDateStr = formatForGoogleCalendar(endDate)

    // Create Google Calendar event URL
    const eventTitle = encodeURIComponent("Coaching Session with HM Wellness")
    const eventDetails = encodeURIComponent(
      `Coaching session with ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nNotes: ${formData.message}`,
    )
    const eventLocation = encodeURIComponent("Online (Zoom link will be sent via email)")

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDateStr}/${endDateStr}&details=${eventDetails}&location=${eventLocation}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate Google Calendar event link
      const calendarLink = createGoogleCalendarEventLink({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: date!,
        timeSlot,
        clientType,
        message: formData.message,
      })
      setGoogleEventLink(calendarLink)

      // Get the price as a number
      const priceString = getClientTypePrice()
      const priceMatch = priceString.match(/(\d+(\.\d+)?)/)
      const amount = priceMatch ? Number.parseFloat(priceMatch[0]) : 0

      if (amount <= 0) {
        throw new Error("Invalid price amount")
      }

      // Prepare customer data
      const customerData = {
        firstName: formData.name.split(" ")[0] || "",
        lastName: formData.name.split(" ").slice(1).join(" ") || "",
        email: formData.email,
        phoneNumber: formData.phone,
      }

      // Create payment
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          customerData,
          promoCode: promoApplied ? pricingConfig.studentPromo.code : "",
          isInternational,
          bookingDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: date?.toISOString(),
            timeSlot,
            clientType,
            message: formData.message,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment")
      }

      // For manual payment methods, just show the booking confirmation
      if (paymentMethod === "vodafoneCash" || paymentMethod === "bankTransfer") {
        // Create Google Calendar event
        if (calendarConfig.enabled) {
          try {
            await createCalendarEvent({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              date: date!,
              timeSlot,
              clientType,
              message: formData.message,
            })
          } catch (calendarError) {
            console.error("Failed to create calendar event:", calendarError)
            // Continue with booking process even if calendar event creation fails
          }
        }

        setIsSubmitting(false)
        setIsBooked(true)
      } else {
        // For online payment, redirect to the payment gateway
        window.location.href = data.paymentUrl
      }
    } catch (error) {
      console.error("Payment error:", error)
      setIsSubmitting(false)
      alert(
        t({
          en: "There was an error processing your payment. Please try again.",
          ar: "حدث خطأ أثناء معالجة الدفع الخاص بك. يرجى المحاولة مرة أخرى.",
        }),
      )
    }
  }

  // Replace the existing useEffect for loading time slots with this updated version:
  useEffect(() => {
    if (date) {
      const fetchTimeSlots = async () => {
        try {
          const slots = await getAvailableTimeSlots(date)
          // If the previously selected time slot is no longer available, reset it
          if (timeSlot && !slots.includes(timeSlot)) {
            setTimeSlot("")
          }
        } catch (error) {
          console.error("Error fetching time slots:", error)
          // In case of error, we'll use the default time slots from config
        }
      }

      fetchTimeSlots()
    }
  }, [date, timeSlot])

  return (
    <div className={`flex flex-col min-h-screen ${isRTL ? "rtl" : "ltr"}`}>
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title={bookingContent.hero.title} description={bookingContent.hero.description} />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {isBooked ? (
              <Card className="mx-auto max-w-2xl bg-bg-light border-primary">
                <CardHeader>
                  <div className="mx-auto rounded-full bg-primary/20 p-3 mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center text-2xl text-primary">{t(bookingContent.success.title)}</CardTitle>
                  <CardDescription className="text-center text-lg">
                    {t(bookingContent.success.description)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <Alert className="bg-yellow-50 border-yellow-200">
                    <AlertTitle className="text-yellow-800">
                      {t({ en: "Payment Required", ar: "الدفع مطلوب" })}
                    </AlertTitle>
                    <AlertDescription className="text-yellow-700">
                      {t({
                        en: "Your booking is pending until payment is confirmed. Please complete your payment and send proof to confirm your booking.",
                        ar: "حجزك معلق حتى يتم تأكيد الدفع. يرجى إكمال الدفع وإرسال إثبات لتأكيد حجزك.",
                      })}
                    </AlertDescription>
                  </Alert>

                  <p>
                    {t({ en: "We've sent booking details to", ar: "لقد أرسلنا تفاصيل الحجز إلى" })}{" "}
                    <span className="font-medium">{formData.email}</span>
                  </p>
                  <div className="rounded-lg border p-4 bg-white">
                    <h3 className="font-medium text-primary">{t(bookingContent.sections.bookingDetails)}</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t({ en: "Service:", ar: "الخدمة:" })}</span>
                        <span>{t({ en: "60-Minute Coaching Session", ar: "جلسة تدريب لمدة 60 دقيقة" })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t({ en: "Date:", ar: "التاريخ:" })}</span>
                        <span>{date ? format(date, "PPP") : t({ en: "Not selected", ar: "لم يتم التحديد" })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t({ en: "Time:", ar: "الوقت:" })}</span>
                        <span>{timeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t({ en: "Price:", ar: "السعر:" })}</span>
                        <span>{getClientTypePrice()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t({ en: "Payment Method:", ar: "طريقة الدفع:" })}
                        </span>
                        <span>
                          {paymentMethod === "vodafoneCash"
                            ? t({ en: "Vodafone Cash", ar: "فودافون كاش" })
                            : t({ en: "Bank Transfer", ar: "تحويل بنكي" })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 bg-white">
                    <h3 className="font-medium text-primary">
                      {t({ en: "Payment Instructions", ar: "تعليمات الدفع" })}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      {t({
                        en: "Please complete your payment using the method below:",
                        ar: "يرجى إكمال الدفع باستخدام الطريقة أدناه:",
                      })}
                    </p>

                    <Tabs defaultValue={paymentMethod} className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="vodafoneCash">{t({ en: "Vodafone Cash", ar: "فودافون كاش" })}</TabsTrigger>
                        <TabsTrigger value="bankTransfer">{t({ en: "Bank Transfer", ar: "تحويل بنكي" })}</TabsTrigger>
                        <TabsTrigger value="online">{t({ en: "Pay Online", ar: "الدفع عبر الإنترنت" })}</TabsTrigger>
                      </TabsList>
                      <TabsContent value="vodafoneCash" className="mt-4">
                        <div>
                          <h4 className="font-medium mb-2">
                            {t({ en: "Vodafone Cash Payment", ar: "الدفع عبر فودافون كاش" })}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {t({
                              en: "Send the payment to the following Vodafone Cash number:",
                              ar: "أرسل الدفع إلى رقم فودافون كاش التالي:",
                            })}
                          </p>
                          <pre className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                            {t({
                              en: "Vodafone Cash Number: +20 1090250475\nName: Hagar Moharam\nAmount: ",
                              ar: "رقم فودافون كاش: +20 1090250475\nالاسم: هاجر محرم\nالمبلغ: ",
                            })}
                            {getClientTypePrice()}
                          </pre>
                        </div>
                      </TabsContent>
                      <TabsContent value="bankTransfer" className="mt-4">
                        <div>
                          <h4 className="font-medium mb-2">
                            {t({ en: "Bank Transfer Details", ar: "تفاصيل التحويل البنكي" })}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {t({
                              en: "Transfer the payment to the following bank account:",
                              ar: "قم بتحويل الدفع إلى الحساب المصرفي التالي:",
                            })}
                          </p>
                          <pre className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                            {t({
                              en: "Bank: CIB Bank\nAccount Name: Hagar Moharam\nAccount Number: 1234567890\nAmount: ",
                              ar: "البنك: بنك CIB\nاسم الحساب: هاجر محرم\nرقم الحساب: 1234567890\nالمبلغ: ",
                            })}
                            {getClientTypePrice()}
                          </pre>
                        </div>
                      </TabsContent>
                      <TabsContent value="online" className="mt-4">
                        <div>
                          <h4 className="font-medium mb-2">{t({ en: "Online Payment", ar: "الدفع عبر الإنترنت" })}</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {t({
                              en: "Pay securely online with your credit or debit card.",
                              ar: "ادفع بأمان عبر الإنترنت باستخدام بطاقة الائتمان أو الخصم الخاصة بك.",
                            })}
                          </p>
                          <div className="flex flex-wrap gap-4 justify-center">
                            <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-8" />
                            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-8" />
                            <img src="/placeholder.svg?height=30&width=50" alt="Meeza" className="h-8" />
                          </div>
                          <p className="text-sm text-center mt-4 text-muted-foreground">
                            {t({
                              en: "You will be redirected to our secure payment gateway.",
                              ar: "سيتم إعادة توجيهك إلى بوابة الدفع الآمنة الخاصة بنا.",
                            })}
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="rounded-lg border p-4 bg-white">
                    <h3 className="font-medium text-primary">{t(bookingContent.sections.nextSteps)}</h3>
                    <ol className="mt-3 space-y-2 text-left list-decimal list-inside">
                      <li>
                        {t({
                          en: "Complete your payment using the instructions above",
                          ar: "أكمل الدفع باستخدام التعليمات أعلاه",
                        })}
                      </li>
                      <li>
                        {t({
                          en: "Take a screenshot of your payment confirmation",
                          ar: "التقط لقطة شاشة لتأكيد الدفع الخاص بك",
                        })}
                      </li>
                      <li>
                        {t({
                          en: "Send the screenshot to our WhatsApp at +20 1090250475 or email to hagar@hmwellness.co",
                          ar: "أرسل لقطة الشاشة إلى WhatsApp على +20 1090250475 أو البريد الإلكتروني إلى hagar@hmwellness.co",
                        })}
                      </li>
                      <li>
                        {t({
                          en: "We'll confirm your booking manually after verifying your payment",
                          ar: "سنؤكد حجزك يدويًا بعد التحقق من الدفع الخاص بك",
                        })}
                      </li>
                      <li>
                        {t({
                          en: "You'll receive a confirmation email with Zoom meeting details",
                          ar: "ستتلقى رسالة بريد إلكتروني للتأكيد مع تفاصيل اجتماع Zoom",
                        })}
                      </li>
                    </ol>
                  </div>

                  <div className="flex flex-col gap-4 mt-6">
                    {googleEventLink && (
                      <Button asChild variant="outline" className="w-full">
                        <a href={googleEventLink} target="_blank" rel="noopener noreferrer">
                          {t(bookingContent.buttons.addToCalendar)}
                        </a>
                      </Button>
                    )}
                    <Button asChild className="w-full">
                      <Link href="/">{t(bookingContent.buttons.returnHome)}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mx-auto max-w-2xl border-primary/20 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-primary">
                        {t({ en: "Book a 60-Minute Session", ar: "احجز جلسة لمدة 60 دقيقة" })}
                      </CardTitle>
                      <CardDescription>
                        {t({ en: "Select a date and time that works for you", ar: "حدد تاريخًا ووقتًا يناسبك" })}
                      </CardDescription>
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
                          <Label className="text-base">{t({ en: "Select a date", ar: "اختر تاريخًا" })}</Label>
                          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : t({ en: "Select a date", ar: "اختر تاريخًا" })}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date) => {
                                  setDate(date)
                                  setCalendarOpen(false)
                                }}
                                initialFocus
                                disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        {date && (
                          <div className="space-y-2">
                            <Label className="text-base">
                              {t({ en: "Select a time slot (60 minutes)", ar: "اختر فترة زمنية (60 دقيقة)" })}
                            </Label>
                            <RadioGroup
                              value={timeSlot}
                              onValueChange={setTimeSlot}
                              className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4"
                            >
                              {bookingContent.timeSlots.map((slot) => (
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
                        <div className="space-y-2 pt-4 mt-4 border-t">
                          <Label className="text-base">{t({ en: "Pricing", ar: "التسعير" })}</Label>
                          <div className="bg-bg-light p-4 rounded-md">
                            <div className="flex justify-between mb-2">
                              <span>{t({ en: "Base Price:", ar: "السعر الأساسي:" })}</span>
                              <span className="font-semibold">
                                {isInternational
                                  ? `$${pricingConfig.international}`
                                  : `${pricingConfig.tiers.egypt.regular} EGP`}
                              </span>
                            </div>

                            {!isInternational && (
                              <>
                                <div className="flex items-end gap-2 mt-4">
                                  <div className="space-y-2 flex-1">
                                    <Label htmlFor="promoCode">{t(bookingContent.form.promoCode.label)}</Label>
                                    <Input
                                      id="promoCode"
                                      name="promoCode"
                                      value={promoCode}
                                      onChange={(e) => setPromoCode(e.target.value)}
                                      placeholder={t(bookingContent.form.promoCode.placeholder)}
                                      className="border-primary/20 focus-visible:ring-primary"
                                    />
                                  </div>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                      if (promoCode.toUpperCase() === pricingConfig.studentPromo.code) {
                                        setPromoApplied(true)
                                        toast({
                                          title: t({ en: "Promo Code Applied!", ar: "تم تطبيق رمز الخصم!" }),
                                          description: t({
                                            en: `You received ${pricingConfig.studentPromo.discount} EGP discount.`,
                                            ar: `لقد حصلت على خصم ${pricingConfig.studentPromo.discount} جنيه مصري.`,
                                          }),
                                        })
                                      } else {
                                        setPromoApplied(false)
                                        toast({
                                          title: t({ en: "Invalid Promo Code", ar: "رمز الخصم غير صالح" }),
                                          description: t({
                                            en: "Please enter a valid promo code or contact us to get one.",
                                            ar: "الرجاء إدخال رمز خصم صالح أو الاتصال بنا للحصول على واحد.",
                                          }),
                                          variant: "destructive",
                                        })
                                      }
                                    }}
                                  >
                                    {t({ en: "Apply", ar: "تطبيق" })}
                                  </Button>
                                </div>

                                {promoApplied && (
                                  <div className="flex justify-between text-primary mt-2">
                                    <span>{t({ en: "Student Discount:", ar: "خصم الطالب:" })}</span>
                                    <span>-{pricingConfig.studentPromo.discount} EGP</span>
                                  </div>
                                )}

                                <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                                  <span>{t({ en: "Total:", ar: "المجموع:" })}</span>
                                  <span className="text-primary">
                                    {isInternational
                                      ? `$${pricingConfig.international}`
                                      : `${
                                          promoApplied
                                            ? pricingConfig.tiers.egypt.regular - pricingConfig.studentPromo.discount
                                            : pricingConfig.tiers.egypt.regular
                                        } EGP`}
                                  </span>
                                </div>

                                <p className="text-sm text-muted-foreground mt-4">
                                  {t(pricingConfig.studentPromo.message)}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-base">
                              {t(bookingContent.form.name.label)}
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder={t({ en: "Enter your full name", ar: "أدخل اسمك الكامل" })}
                              required
                              className="border-primary/20 focus-visible:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-base">
                              {t(bookingContent.form.email.label)}
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder={t({ en: "Enter your email address", ar: "أدخل عنوان بريدك الإلكتروني" })}
                              required
                              className="border-primary/20 focus-visible:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base">
                            {t(bookingContent.form.phone.label)}
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t({ en: "Enter your phone number", ar: "أدخل رقم هاتفك" })}
                            required
                            className="border-primary/20 focus-visible:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-base">
                            {t(bookingContent.form.message.label)}
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder={t({ en: "Enter your message (optional)", ar: "أدخل رسالتك (اختياري)" })}
                            rows={4}
                            className="border-primary/20 focus-visible:ring-primary"
                          />
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="rounded-lg border p-4 bg-bg-light">
                          <h3 className="font-medium text-primary">{t(bookingContent.sections.bookingSummary)}</h3>
                          <div className="mt-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t({ en: "Service:", ar: "الخدمة:" })}</span>
                              <span>{t({ en: "60-Minute Coaching Session", ar: "جلسة تدريب لمدة 60 دقيقة" })}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t({ en: "Date:", ar: "التاريخ:" })}</span>
                              <span>
                                {date ? format(date, "PPP") : t({ en: "Not selected", ar: "لم يتم التحديد" })}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t({ en: "Time:", ar: "الوقت:" })}</span>
                              <span>{timeSlot || t({ en: "Not selected", ar: "لم يتم التحديد" })}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                {t({ en: "Client Type:", ar: "نوع العميل:" })}
                              </span>
                              <span>
                                {t({
                                  en: clientTypes.find((type) => type.id === clientType)?.label || "Regular Client",
                                  ar: clientTypes.find((type) => type.id === clientType)?.label || "عميل عادي",
                                })}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t({ en: "Name:", ar: "الاسم:" })}</span>
                              <span>{formData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                {t({ en: "Email:", ar: "البريد الإلكتروني:" })}
                              </span>
                              <span>{formData.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t({ en: "Phone:", ar: "الهاتف:" })}</span>
                              <span>{formData.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4 bg-bg-light">
                          <h3 className="font-medium text-primary">{t(bookingContent.sections.paymentMethod)}</h3>
                          <p className="text-sm text-muted-foreground mt-1 mb-4">
                            {t({
                              en: "Secure online payment with credit or debit card",
                              ar: "دفع آمن عبر الإنترنت باستخدام بطاقة الائتمان أو الخصم",
                            })}
                          </p>

                          <div className="flex flex-wrap gap-4 justify-center my-4">
                            <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-8" />
                            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-8" />
                            <img src="/placeholder.svg?height=30&width=50" alt="Meeza" className="h-8" />
                          </div>
                        </div>

                        <Alert className="bg-yellow-50 border-yellow-200">
                          <AlertTitle className="text-yellow-800">
                            {t({ en: "Manual Confirmation Required", ar: "التأكيد اليدوي مطلوب" })}
                          </AlertTitle>
                          <AlertDescription className="text-yellow-700">
                            {t({
                              en: "After submitting your booking, you'll need to complete the payment and send a screenshot of your payment confirmation to our WhatsApp at +20 1090250475 or email to hagar@hmwellness.co. Your booking will be confirmed manually after verification.",
                              ar: "بعد تقديم حجزك، ستحتاج إلى إكمال الدفع وإرسال لقطة شاشة لتأكيد الدفع الخاص بك إلى WhatsApp على +20 1090250475 أو البريد الإلكتروني إلى hagar@hmwellness.co. سيتم تأكيد حجزك يدويًا بعد التحقق.",
                            })}
                          </AlertDescription>
                        </Alert>
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
                      {t(bookingContent.buttons.back)}
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
                      {t(bookingContent.buttons.next)}
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
                          {t(bookingContent.buttons.processing)}
                        </>
                      ) : (
                        <>
                          {t(bookingContent.buttons.submit)}
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
      </main>
      <SiteFooter />
    </div>
  )
}
