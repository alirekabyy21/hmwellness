"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarCheck, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(8, { message: "Please enter a valid phone number" }),
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
      expectations: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // In a real implementation, you would send this data to your server
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Call the success callback with the email
      onSubmitSuccess(data.email)
    } catch (err) {
      setError("There was an error submitting your registration. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-6xl px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
          Transformative Coaching Workshop
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Join Hagar Moharam for an exclusive in-person workshop in New Cairo next Friday. Limited spots available!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Card className="bg-white/80 backdrop-blur-sm border-primary/20 shadow-lg">
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
                  <p className="text-muted-foreground">Next Friday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">New Cairo (Exact location to be announced)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Duration</h3>
                  <p className="text-muted-foreground">3 hours of immersive coaching</p>
                </div>
              </div>

              <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                <AlertDescription>
                  Full details including exact location, time, and what to bring will be sent to registered participants
                  later this week.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="mt-8 space-y-4 bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-primary/20 shadow-lg">
            <h3 className="text-xl font-semibold text-primary">What You'll Experience</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Breakthrough limiting beliefs that hold you back</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Develop practical strategies for personal growth</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Connect with like-minded individuals on a similar journey</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Take home actionable tools and techniques</span>
              </li>
            </ul>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Register Now</CardTitle>
            <CardDescription>Fill out the form below to secure your spot</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className="border-primary/20 focus-visible:ring-primary"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  {...register("phone")}
                  className="border-primary/20 focus-visible:ring-primary"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
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

      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} HM Wellness. All rights reserved.</p>
      </div>
    </div>
  )
}
