import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/app/config"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MobileMenu } from "@/components/mobile-menu"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-primary">
          {siteConfig.name}
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/services" className="font-medium hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/workshops" className="font-medium hover:text-primary transition-colors">
            Workshops
          </Link>
          <Link href="/book" className="font-medium hover:text-primary transition-colors">
            Book a Session
          </Link>
          <Link href="/contact" className="font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="mr-2" />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/book">Book Now</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
