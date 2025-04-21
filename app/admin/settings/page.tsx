"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Update your website's general information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Website Name</Label>
                  <Input id="site-name" defaultValue="HM Wellness" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coach-name">Coach Name</Label>
                  <Input id="coach-name" defaultValue="Hagar Moharam" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Website Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Discover your true potential with Hagar Moharam, a certified life coach dedicated to helping you achieve your goals and live a more fulfilling life."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="hagar@hmwellness.site" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+20 123 456 7890" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Update your social media links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" defaultValue="https://instagram.com/hmwellness" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" defaultValue="https://facebook.com/hmwellness" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" defaultValue="https://linkedin.com/in/hagarmoharam" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input id="youtube" defaultValue="" placeholder="https://youtube.com/@hmwellness" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
              <CardDescription>Configure your booking system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-duration">Default Session Duration (minutes)</Label>
                  <Input id="session-duration" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buffer-time">Buffer Time Between Sessions (minutes)</Label>
                  <Input id="buffer-time" type="number" defaultValue="15" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advance-booking">Maximum Advance Booking (days)</Label>
                  <Input id="advance-booking" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-notice">Minimum Notice Period (hours)</Label>
                  <Input id="min-notice" type="number" defaultValue="24" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-confirm">Automatically Confirm Bookings</Label>
                  <Switch id="auto-confirm" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, bookings will be automatically confirmed after payment.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="send-reminders">Send Booking Reminders</Label>
                  <Switch id="send-reminders" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Send email reminders to clients 24 hours before their session.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>Set your available working hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-7 gap-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="space-y-2">
                    <Label>{day}</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{day === "Sunday" ? "Closed" : "9:00 AM - 5:00 PM"}</span>
                      <Switch defaultChecked={day !== "Sunday"} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure your payment options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kashier-merchant-id">Kashier Merchant ID</Label>
                <Input id="kashier-merchant-id" defaultValue={process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID || ""} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="live-mode">Live Mode</Label>
                  <Switch id="live-mode" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, real payments will be processed. Disable for testing purposes only.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" defaultValue="EGP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-price">Session Price (EGP)</Label>
                  <Input id="session-price" type="number" defaultValue="600" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-price">Student Price (EGP)</Label>
                <Input id="student-price" type="number" defaultValue="400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-payment">Require Payment to Confirm Booking</Label>
                  <Switch id="require-payment" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, bookings will only be confirmed after payment is received.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notifications for you and your clients.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="booking-confirmation">Booking Confirmation</Label>
                  <Switch id="booking-confirmation" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Send an email confirmation to clients when a booking is confirmed.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="booking-reminder">Booking Reminder</Label>
                  <Switch id="booking-reminder" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Send a reminder email to clients 24 hours before their session.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-confirmation">Payment Confirmation</Label>
                  <Switch id="payment-confirmation" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Send an email receipt to clients when a payment is received.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-notification">Admin Notifications</Label>
                  <Switch id="admin-notification" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for new bookings, payments, and cancellations.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="hagar@hmwellness.site" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
