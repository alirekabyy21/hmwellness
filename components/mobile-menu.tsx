"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
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
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="font-semibold text-xl text-primary" onClick={() => setOpen(false)}>
              Hagar Moharam
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="px-2 py-3 text-lg font-medium hover:bg-primary/10 rounded-md"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-2 py-3 text-lg font-medium hover:bg-primary/10 rounded-md"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="px-2 py-3 text-lg font-medium hover:bg-primary/10 rounded-md"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/workshops"
              className="px-2 py-3 text-lg font-medium hover:bg-primary/10 rounded-md"
              onClick={() => setOpen(false)}
            >
              Workshops
            </Link>
            <Link
              href="/book"
              className="px-2 py-3 text-lg font-medium hover:bg-primary/10 rounded-md"
              onClick={() => setOpen(false)}
            >
              Book a Session
            </Link>
            <Link
              href="/contact"
              className="px-2 py-3 text-lg font-medium hover:bg-primary/10 rounded-md"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </nav>
          <div className="mt-auto pt-6">
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <Link href="/book">Book Now</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
