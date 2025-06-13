"use client"

import React, { useState } from "react"
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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, phone, whatsapp } = formData
    if (!name || !email || !phone || !whatsapp) {
      setSubmitStatus("error")
      setMessage("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/workshop/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setMessage(result.message || "Registration successful! Check your WhatsApp for confirmation.")
        setFormData({ name: "", email: "", phone: "", whatsapp: "", expectations: "" })
      } else {
        setSubmitStatus("error")
        setMessage(result.message || "Something went wrong. Please try again.")
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
          <div className="space-y-8">
            <Card>
              <CardHeader><CardTitle className="text-purple-900">Workshop Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center"><Clock className="h-5 w-5 text-purple-600 mr-3" /><div><p className="font-medium">Saturday, June 21st, 2025</p><p className="text-sm text-gray-600">7:00 PM - 9:00 PM</p></div></div>
                <div className="flex items-center"><MapPin className="h-5 w-5 text-purple-600 mr-3" /><div><p className="font-medium">Espaces - New Cairo</p><p className="text-sm text-gray-600">5th Settlement, New Cairo</p></div></div>
                <div className="flex items-center"><Users className="h-5 w-5 text-purple-600 mr-3" /><div><p className="font-medium">Limited to 20 participants</p><p className="text-sm text-gray-600">Small group for personalized attention</p></div></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-purple-900">Location</CardTitle></CardHeader>
              <CardContent>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://maps.app.goo.gl/2TYzBAH6LUoFbWwo6?g_st=com.google.maps.preview.copy"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-purple-900">What You'll Learn</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {["Identify and overcome limiting beliefs", "Set clear, achievable goals", "Develop a growth mindset", "Build confidence and self-awareness", "Create an action plan for transformation"].map((item, i) => (
                    <li key={i} className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-purple-900">Price</CardTitle></CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-900 mb-2">500 EGP</div>
                  <p className="text-sm text-gray-500">Students get discount with valid ID. Contact us on WhatsApp for promo code.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">Register Now</CardTitle>
                <CardDescription>Secure your spot in this transformative workshop</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div><Label htmlFor="name">Full Name *</Label><Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" /></div>
                  <div><Label htmlFor="email">Email Address *</Label><Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" /></div>
                  <div><Label htmlFor="phone">Phone Number *</Label><Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} placeholder="Primary phone number" /></div>
                  <div><Label htmlFor="whatsapp">WhatsApp Number *</Label><Input id="whatsapp" name="whatsapp" type="tel" required value={formData.whatsapp} onChange={handleInputChange} placeholder="WhatsApp number" /></div>
                  <div><Label htmlFor="expectations">Expectations (Optional)</Label><Textarea id="expectations" name="expectations" value={formData.expectations} onChange={handleInputChange} placeholder="Share your goals..." rows={4} /></div>

                  {submitStatus === "success" && <Alert className="border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">{message}</AlertDescription></Alert>}
                  {submitStatus === "error" && <Alert className="border-red-200 bg-red-50"><AlertDescription className="text-red-800">{message}</AlertDescription></Alert>}

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register for Workshop"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader><CardTitle className="text-purple-900">Questions?</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center"><WhatsApp className="h-4 w-4 text-purple-600 mr-3" /><span className="text-sm">WhatsApp: +20 1090250475</span></div>
                <div className="flex items-center"><Mail className="h-4 w-4 text-purple-600 mr-3" /><span className="text-sm">hagar@hmwellness.site</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2024 HM Wellness. All rights reserved.</p>
          <p className="text-xs text-gray-400 mt-2">hmwellness.site</p>
        </div>
      </footer>
    </div>
  )
}
