import Link from "next/link"
import { siteConfig } from "@/app/config"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-bg-dark">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
