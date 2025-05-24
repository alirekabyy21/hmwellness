"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarCheck, MapPin, Clock, ArrowRight, Sparkles, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { workshopConfig } from "@/app/config"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(8, { message: "Please enter a valid phone number" }),
  whatsapp: z.string().min(8, { message: "Please enter a valid WhatsApp number" }),
  expectations: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface WorkshopSignupFormProps {
  onSubmitSuccess: (email: string) => void
}

export function WorkshopSignupForm({ onSubmitSuccess }: WorkshopSignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      expectations: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Send the registration data to the API
      const response = await fetch("/api/workshop/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        // Call the success callback with the email
        onSubmitSuccess(data.email)
      } else {
        setError(result.message || "There was an error submitting your registration. Please try again.")
        console.error("Form submission error:", result)
      }
    } catch (err) {
      setError("There was an error submitting your registration. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-6xl px-4 py-8 md:py-12 mx-auto">
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">{workshopConfig.title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
          Join Hagar Moharam for an exclusive in-person workshop in New Cairo next Friday. Limited spots available!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div className="order-2 md:order-1">
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Workshop Details</CardTitle>
              <CardDescription>Reserve your spot for this transformative experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CalendarCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Date</h3>
                  <p className="text-muted-foreground">Friday, May 30th, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Time</h3>
                  <p className="text-muted-foreground">7:00 PM - 9:00 PM (2 hours)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">Espaces - New Cairo</p>
                  <a
                    href="https://maps.app.goo.gl/2TYzBAH6LUoFbWwo6?g_st=com.google.maps.preview.copy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    📍 Click here for Google Maps directions
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Participants</h3>
                  <p className="text-muted-foreground">Limited to 40 participants</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Price</h3>
                  <p className="text-muted-foreground">500 EGP</p>
                </div>
              </div>

              <Alert className="bg-green-50 border-green-200 text-green-800">
                <AlertDescription>Payment instructions will be sent via email after registration.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="space-y-4 bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-primary/20 shadow-lg">
            <h3 className="text-xl font-semibold text-primary">What You'll Experience</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Breakthrough limiting beliefs that hold you back</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Develop practical strategies for personal growth</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Connect with like-minded individuals on a similar journey</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Take home actionable tools and techniques</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Register Now</CardTitle>
              <CardDescription>Fill out the form below to secure your spot</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    {...register("phone")}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input
                    id="whatsapp"
                    placeholder="Enter your WhatsApp number"
                    {...register("whatsapp")}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                  {errors.whatsapp && <p className="text-sm text-red-500">{errors.whatsapp.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectations">What do you hope to gain from this workshop? (Optional)</Label>
                  <Textarea
                    id="expectations"
                    placeholder="Share your expectations or specific areas you'd like to focus on..."
                    {...register("expectations")}
                    className="border-primary/20 focus-visible:ring-primary"
                    rows={4}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90"
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
                    Secure Your Spot
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">What Participants Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#8e44ad"
                      stroke="#8e44ad"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p className="italic text-gray-700">
                  "Hagar's workshop was truly transformative. I left with practical tools that I've been able to
                  implement in my daily life. The atmosphere was supportive and the content was incredibly valuable."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                    SK
                  </div>
                  <div>
                    <p className="font-medium">Sarah K.</p>
                    <p className="text-sm text-gray-500">Previous Workshop Participant</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#8e44ad"
                      stroke="#8e44ad"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p className="italic text-gray-700">
                  "I was hesitant to join at first, but I'm so glad I did. Hagar creates a safe space for growth and
                  self-discovery. The workshop exceeded my expectations and I've recommended it to all my friends."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                    MT
                  </div>
                  <div>
                    <p className="font-medium">Mohamed T.</p>
                    <p className="text-sm text-gray-500">Previous Workshop Participant</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
