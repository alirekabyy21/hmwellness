"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone, Send, MessageSquare, User, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { siteConfig } from "@/app/config"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you would typically send the contact form data to your backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-[#f8f9ff] to-[#f0f4ff]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-[#d1dbff] bg-white px-3 py-1 text-sm text-[#5d6bb0]">
                <MessageSquare className="mr-1 h-3.5 w-3.5" />
                <span>Get in Touch</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">Get in Touch</h1>
                <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or want to learn more? Reach out and I'll get back to you soon.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter gradient-text">Contact Information</h2>
                  <p className="text-[#6b7280]">Feel free to reach out through any of the following channels.</p>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="icon-circle-lg shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5d6bb0]">Email</h3>
                      <p className="text-[#6b7280]">{siteConfig.email}</p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-[#5d6bb0] hover:text-[#4a5899] font-medium inline-flex items-center mt-1"
                      >
                        Send an email
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="icon-circle-lg shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5d6bb0]">Phone</h3>
                      <p className="text-[#6b7280]">{siteConfig.phone}</p>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                        className="text-[#5d6bb0] hover:text-[#4a5899] font-medium inline-flex items-center mt-1"
                      >
                        Call now
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="icon-circle-lg shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5d6bb0]">Office</h3>
                      <p className="text-[#6b7280]">
                        123 Coaching Street
                        <br />
                        Cairo, Egypt
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#5d6bb0]">Office Hours</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-[#d1dbff] p-3 bg-white">
                      <p className="font-medium text-[#5d6bb0]">Monday - Friday</p>
                      <p className="text-[#6b7280]">9:00 AM - 5:00 PM</p>
                    </div>
                    <div className="rounded-lg border border-[#d1dbff] p-3 bg-white">
                      <p className="font-medium text-[#5d6bb0]">Saturday</p>
                      <p className="text-[#6b7280]">10:00 AM - 2:00 PM</p>
                    </div>
                    <div className="rounded-lg border border-[#d1dbff] p-3 bg-white col-span-2">
                      <p className="font-medium text-[#5d6bb0]">Sunday</p>
                      <p className="text-[#6b7280]">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter gradient-text">Send a Message</h2>
                  <p className="text-[#6b7280]">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 rounded-xl border border-[#d1dbff] p-6 bg-white shadow-sm"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#5d6bb0] font-medium flex items-center">
                        <User className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="border-[#d1dbff] focus:border-[#5d6bb0] focus:ring-[#5d6bb0]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#5d6bb0] font-medium flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email"
                        className="border-[#d1dbff] focus:border-[#5d6bb0] focus:ring-[#5d6bb0]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#5d6bb0] font-medium flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      className="border-[#d1dbff] focus:border-[#5d6bb0] focus:ring-[#5d6bb0]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#5d6bb0] font-medium flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-[#5d6bb0]" />
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message"
                      rows={6}
                      className="border-[#d1dbff] focus:border-[#5d6bb0] focus:ring-[#5d6bb0]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#5d6bb0] hover:bg-[#4a5899]" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                        <svg
                          className="animate-spin h-4 w-4"
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
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
