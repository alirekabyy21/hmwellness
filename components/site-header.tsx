import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/app/config"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Home, User, Briefcase, Calendar, BookOpen, Phone, Menu } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-[#d1dbff] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-[#5d6bb0] flex items-center">
          <span className="bg-[#5d6bb0] text-white p-1 rounded-md mr-2">
            <BookOpen className="h-5 w-5" />
          </span>
          {siteConfig.name}
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="font-medium hover:text-[#5d6bb0] transition-colors flex items-center gap-1">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link href="/about" className="font-medium hover:text-[#5d6bb0] transition-colors flex items-center gap-1">
            <User className="h-4 w-4" />
            About
          </Link>
          <Link href="/services" className="font-medium hover:text-[#5d6bb0] transition-colors flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            Services
          </Link>
          <Link
            href="/workshops"
            className="font-medium hover:text-[#5d6bb0] transition-colors flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            Workshops
          </Link>
          <Link href="/book" className="font-medium hover:text-[#5d6bb0] transition-colors flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Book a Session
          </Link>
          <Link href="/contact" className="font-medium hover:text-[#5d6bb0] transition-colors flex items-center gap-1">
            <Phone className="h-4 w-4" />
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="mr-2" />
          <Button asChild className="hidden md:inline-flex bg-[#5d6bb0] hover:bg-[#4a5899]">
            <Link href="/book" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Book Now
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden border-[#d1dbff]">
            <Menu className="h-5 w-5 text-[#5d6bb0]" />
          </Button>
        </div>
      </div>
    </header>
  )
}
