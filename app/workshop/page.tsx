"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, MapPin, Users, Phone, Mail } from "lucide-react"

export default function WorkshopPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

    // Frontend validation for mandatory fields
    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitStatus("error")
      setMessage("Please fill in all required fields.")
      return
    }

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
        setFormData({ name: "", email: "", phone: "", expectations: "" })
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">HM Wellness</h1>
            <p className="text-sm text-gray-600">Transform Your Life</p>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+20 1090250475</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>hagar@hmwellness.site</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Transformative Coaching Workshop
        </h2>

        <div className="flex flex-col space-y-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0">
          {/* Left column: Details + What you'll learn */}
          <section className="order-1 lg:order-none space-y-8">
            {/* Workshop Description */}
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join us for an intensive 3-hour workshop designed to help you discover your potential and create lasting
              change in your life.
            </p>

            {/* Workshop Details Card */}
            <Card className="max-w-xl mx-auto lg:mx-0">
              <CardHeader>
                <CardTitle className="text-purple-900">Workshop Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-purple-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Next Friday, 7:00 PM – 9:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-purple-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Espaces, New Cairo</p>
                    <a
                      href="https://goo.gl/maps/hN1FpBq1E1a5bh6Y9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-700 underline hover:text-purple-900"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-purple-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Limited to 20 participants</p>
                    <p className="text-sm text-gray-600">Small group for personalized attention</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn Card */}
            <Card className="max-w-xl mx-auto lg:mx-0">
              <CardHeader>
                <CardTitle className="text-purple-900">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 list-disc list-inside text-gray-800">
                  {[
                    "Identify and overcome limiting beliefs",
                    "Set clear, achievable goals",
                    "Develop a growth mindset",
                    "Build confidence and self-awareness",
                    "Create an action plan for transformation",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="max-w-xl mx-auto lg:mx-0">
              <CardHeader>
                <CardTitle className="text-purple-900">Investment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-extrabold text-purple-900 mb-2">600 EGP</div>
                <p className="text-lg text-gray-700 mb-3 font-semibold">Early bird special: 450 EGP</p>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  Students get additional discount with valid ID. Contact us on WhatsApp for promo code.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Right column: Registration Form */}
          <section className="order-2 lg:order-none lg:sticky lg:top-8 max-w-xl mx-auto lg:mx-0">
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
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="mt-1"
                    />
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
                    <Alert className="border-green-200 bg-green-50 flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
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

                  <p className="text-xs text-gray-500 text-center mt-2">
                    By registering, you'll receive a confirmation email with workshop details.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6 max-w-xl mx-auto lg:mx-0">
              <CardHeader>
                <CardTitle className="text-purple-900">Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">WhatsApp: +20 1090250475</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">hagar@hmwellness.site</span>
                </div>
              </CardContent>
            </Card>
          </section>
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
