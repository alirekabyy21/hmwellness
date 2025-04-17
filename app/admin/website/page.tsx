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
import { toast } from "@/components/ui/use-toast"

export default function WebsiteSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Settings saved",
        description: "Your website settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Website Settings</h1>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
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
                  <Input id="email" type="email" defaultValue="hello@hmwellness.com" />
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

        <TabsContent value="home" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Update your homepage hero section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Title</Label>
                <Input id="hero-title" defaultValue="Transform Your Life with Professional Coaching" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  defaultValue="Discover your true potential with Hagar Moharam, a certified life coach dedicated to helping you achieve your goals and live a more fulfilling life."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-image">Hero Image</Label>
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg" alt="Hero" className="w-24 h-24 rounded-md object-cover" />
                  <Input id="hero-image" type="file" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
              <CardDescription>Manage testimonials displayed on your homepage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testimonial-1-text">Testimonial 1</Label>
                  <Textarea
                    id="testimonial-1-text"
                    defaultValue="Working with Hagar has been transformative. Her guidance helped me clarify my goals and take meaningful steps toward achieving them. I'm more confident and focused than ever before."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-1-author">Author</Label>
                    <Input id="testimonial-1-author" defaultValue="Sarah K." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-1-role">Role/Location (Optional)</Label>
                    <Input id="testimonial-1-role" defaultValue="Cairo, Egypt" />
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testimonial-2-text">Testimonial 2</Label>
                  <Textarea
                    id="testimonial-2-text"
                    defaultValue="Hagar's coaching style is both compassionate and effective. She helped me overcome obstacles that had been holding me back for years. I highly recommend her services to anyone looking to grow."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-2-author">Author</Label>
                    <Input id="testimonial-2-author" defaultValue="Michael T." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-2-role">Role/Location (Optional)</Label>
                    <Input id="testimonial-2-role" defaultValue="Alexandria, Egypt" />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                + Add Testimonial
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Manage the services you offer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-1-title">Service Title</Label>
                    <Input id="service-1-title" defaultValue="Personal Development" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-1-subtitle">Subtitle</Label>
                    <Input id="service-1-subtitle" defaultValue="Discover your true potential" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-1-description">Description</Label>
                  <Textarea
                    id="service-1-description"
                    defaultValue="This coaching program focuses on self-discovery, building confidence, and developing a growth mindset. We'll work together to identify your strengths, overcome limiting beliefs, and create a personal development plan that aligns with your values."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="space-y-2">
                    <Input defaultValue="Self-awareness and emotional intelligence" />
                    <Input defaultValue="Confidence building and self-esteem" />
                    <Input defaultValue="Overcoming limiting beliefs" />
                    <Input defaultValue="Developing resilience and adaptability" />
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    + Add Feature
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                + Add Service
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Settings</CardTitle>
              <CardDescription>Manage your pricing and payment options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Egypt Pricing (EGP)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="egypt-student-price">Student Price</Label>
                    <Input id="egypt-student-price" type="number" defaultValue="400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="egypt-regular-price">Regular Price</Label>
                    <Input id="egypt-regular-price" type="number" defaultValue="600" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>International Pricing (USD)</Label>
                <div className="space-y-2">
                  <Label htmlFor="international-price">Price</Label>
                  <Input id="international-price" type="number" defaultValue="30" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Methods</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-card" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="payment-card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-paypal" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="payment-paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-bank" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="payment-bank">Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-vodafone" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="payment-vodafone">Vodafone Cash</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" defaultValue="hello@hmwellness.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input id="contact-phone" defaultValue="+20 123 456 7890" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <div className="space-y-2">
                  <Input placeholder="Street" defaultValue="123 Coaching Street" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="City" defaultValue="Cairo" />
                    <Input placeholder="State/Province" defaultValue="" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Postal Code" defaultValue="" />
                    <Input placeholder="Country" defaultValue="Egypt" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Office Hours</Label>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Day(s)" defaultValue="Monday - Friday" />
                    <Input placeholder="Hours" defaultValue="9:00 AM - 5:00 PM" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Day(s)" defaultValue="Saturday" />
                    <Input placeholder="Hours" defaultValue="10:00 AM - 2:00 PM" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Day(s)" defaultValue="Sunday" />
                    <Input placeholder="Hours" defaultValue="Closed" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  + Add Hours
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
