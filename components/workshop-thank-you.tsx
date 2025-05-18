"use client"

import { CheckCircle, Calendar, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface WorkshopThankYouProps {
  email: string
}

export function WorkshopThankYou({ email }: WorkshopThankYouProps) {
  return (
    <div className="container max-w-3xl px-4 py-16 mx-auto flex flex-col items-center">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">Registration Successful!</h1>
        <p className="text-xl text-muted-foreground">
          Thank you for registering for our Transformative Coaching Workshop.
        </p>
      </div>

      <Card className="w-full bg-white/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">What's Next?</CardTitle>
          <CardDescription>Here's what you can expect in the coming days</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Confirmation Email</h3>
              <p className="text-muted-foreground">
                We've sent a confirmation email to <span className="font-medium">{email}</span>. Please check your inbox
                (and spam folder, just in case).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Workshop Details</h3>
              <p className="text-muted-foreground">
                Later this week, you'll receive an email with the complete workshop details, including:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                <li>Exact location in New Cairo</li>
                <li>Workshop start and end time</li>
                <li>What to bring with you</li>
                <li>Pre-workshop preparation (if any)</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">
            If you have any questions before the workshop, please contact us at{" "}
            <a href="mailto:hagar@hmwellness.co" className="text-primary hover:underline">
              hagar@hmwellness.co
            </a>{" "}
            or WhatsApp at +20 1090250475.
          </p>
          <Button
            variant="outline"
            className="w-full border-primary/20 text-primary hover:bg-primary/10"
            onClick={() => (window.location.href = "https://instagram.com/hmwellness")}
          >
            Follow Us on Instagram for Updates
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} HM Wellness. All rights reserved.</p>
      </div>
    </div>
  )
}
