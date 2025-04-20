"use client"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SimpleConfirmationProps {
  name: string
  email: string
  date: string
  timeSlot: string
  onClose: () => void
}

export function SimpleConfirmation({ name, email, date, timeSlot, onClose }: SimpleConfirmationProps) {
  return (
    <Card className="mx-auto max-w-2xl bg-bg-light border-primary">
      <CardHeader>
        <div className="mx-auto rounded-full bg-primary/20 p-3 mb-4">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-center text-2xl text-primary">Booking Confirmed!</CardTitle>
        <CardDescription className="text-center text-lg">
          Thank you for booking a session with Hagar Moharam.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p>
          We've sent a confirmation email to <span className="font-medium">{email}</span>
        </p>
        <div className="rounded-lg border p-4 bg-white">
          <h3 className="font-medium text-primary">Booking Details</h3>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span>60-Minute Coaching Session</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span>{timeSlot}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild className="w-full">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
