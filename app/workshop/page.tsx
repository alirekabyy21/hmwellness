"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, MapPin, Users, Phone, Mail, PhoneIcon as WhatsApp } from "lucide-react"

export default function WorkshopPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    expectations: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/workshop/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        setMessage("Registration successful! Check your email for confirmation.")
        setFormData({ name: "", email: "", phone: "", whatsapp: "", expectations: "" })
      } else {
        setSubmitStatus("error")
        setMessage(result.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">HM Wellness</h1>
              <p className="text-sm text-gray-600">Transform Your Life</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+20 1090250475</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>hagar@hmwellness.site</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Workshop Info - Show first on mobile */}
          <div className="space-y-8 order-1 lg:order-1">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Transformative Coaching Workshop</h2>
              <p className="text-xl text-gray-600 mb-6">
                Join us for an intensive 2-hour workshop designed to help you discover your potential and create lasting
                change in your life.
              </p>
            </div>

            {/* Workshop Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">Workshop Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium">Friday, May 30th, 2025</p>
                    <p className="text-sm text-gray-600">7:00 PM - 9:00 PM (2 hours)</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium">Espaces - New Cairo</p>
                    <p className="text-sm text-gray-600">5th Settlement, New Cairo</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium">Limited to 40 participants</p>
                    <p className="text-sm text-gray-600">Small group for personalized attention</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Espaces - 5th Settlement</p>
                    <p className="text-sm text-gray-600">New Cairo, Egypt</p>
                  </div>
                  <div className="w-full h-64 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.4971563394943!2d31.440047800000002!3d29.993878000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d3ff4fccb3b%3A0x51f79c978c375f9d!2sEspaces%20-%205th%20Settlement!5e0!3m2!1sen!2seg!4v1748084300431!5m2!1sen!2seg"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Identify and overcome limiting beliefs",
                    "Set clear, achievable goals",
                    "Develop a growth mindset",
                    "Build confidence and self-awareness",
                    "Create an action plan for transformation",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-900 mb-2">500 EGP</div>
                  <p className="text-sm text-gray-500">
                    Students get additional discount with valid ID. Contact us on WhatsApp for promo code.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form - Show second on mobile */}
          <div className="lg:sticky lg:top-8 order-2 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">Register Now</CardTitle>
                <CardDescription>Secure your spot in this transformative workshop</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number (Primary) *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your primary phone number"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">This number will be used for calls</p>
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="Enter your WhatsApp number"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must have WhatsApp for confirmation</p>
                  </div>

                  <div>
                    <Label htmlFor="expectations">What do you hope to achieve? (Optional)</Label>
                    <Textarea
                      id="expectations"
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      placeholder="Share your goals and expectations for this workshop..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  {submitStatus === "success" && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">{message}</AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === "error" && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-800">{message}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register for Workshop"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By registering, you'll receive a confirmation email with workshop details.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-purple-900">Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <WhatsApp className="h-4 w-4 text-purple-600 mr-3" />
                  <span className="text-sm">WhatsApp: +20 1090250475</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-purple-600 mr-3" />
                  <span className="text-sm">hagar@hmwellness.site</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 HM Wellness. All rights reserved.</p>
          <p className="text-xs text-gray-400 mt-2">hmwellness.site</p>
        </div>
      </footer>
    </div>
  )
}
