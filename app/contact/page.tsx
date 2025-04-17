"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the contact form data to your backend
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
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold text-xl">
            Hagar Moharam
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/about" className="font-medium">
              About
            </Link>
            <Link href="/services" className="font-medium">
              Services
            </Link>
            <Link href="/book" className="font-medium">
              Book a Session
            </Link>
            <Link href="/contact" className="font-medium">
              Contact
            </Link>
          </nav>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/book">Book Now</Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-rose-50 to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or want to learn more? Reach out and I'll get back to you soon.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">Contact Information</h2>
                  <p className="text-muted-foreground">Feel free to reach out through any of the following channels.</p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 mt-1 text-primary" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">hello@hagarmoharam.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 mt-1 text-primary" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 mt-1 text-primary" />
                    <div>
                      <h3 className="font-semibold">Office</h3>
                      <p className="text-muted-foreground">
                        123 Coaching Street
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Office Hours</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-medium">Monday - Friday</p>
                      <p className="text-muted-foreground">9:00 AM - 5:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium">Saturday</p>
                      <p className="text-muted-foreground">10:00 AM - 2:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium">Sunday</p>
                      <p className="text-muted-foreground">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">Send a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message"
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Hagar Moharam. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-muted-foreground">
              About
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground">
              Services
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
