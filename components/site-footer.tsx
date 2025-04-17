import Link from "next/link"
import { siteConfig } from "@/app/config"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
            About
          </Link>
          <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
            Services
          </Link>
          <Link href="/workshops" className="text-sm text-muted-foreground hover:text-primary">
            Workshops
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
