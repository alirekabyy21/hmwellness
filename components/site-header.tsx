"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { siteConfig, languageConfig } from "@/app/config"
import { useLanguage } from "@/contexts/language-context"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-primary">
          {siteConfig.name}
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="font-medium hover:text-primary transition-colors">
            {t({ en: "Home", ar: "الرئيسية" })}
          </Link>
          <Link href="/about" className="font-medium hover:text-primary transition-colors">
            {t({ en: "About", ar: "عن المدرب" })}
          </Link>
          <Link href="/services" className="font-medium hover:text-primary transition-colors">
            {t({ en: "Services", ar: "الخدمات" })}
          </Link>
          <Link href="/workshops" className="font-medium hover:text-primary transition-colors">
            {t({ en: "Workshops", ar: "ورش العمل" })}
          </Link>
          <Link href="/book" className="font-medium hover:text-primary transition-colors">
            {t({ en: "Book a Session", ar: "احجز جلسة" })}
          </Link>
          <Link href="/contact" className="font-medium hover:text-primary transition-colors">
            {t({ en: "Contact", ar: "اتصل بنا" })}
          </Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <LanguageSwitcher />
          <Button asChild variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
            <Link href="/contact">{t({ en: "Contact", ar: "اتصل بنا" })}</Link>
          </Button>
          <Button asChild>
            <Link href="/book">{t({ en: "Book Now", ar: "احجز الآن" })}</Link>
          </Button>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-6">
                <Link
                  href="/"
                  className="font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t({ en: "Home", ar: "الرئيسية" })}
                </Link>
                <Link
                  href="/about"
                  className="font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t({ en: "About", ar: "عن المدرب" })}
                </Link>
                <Link
                  href="/services"
                  className="font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t({ en: "Services", ar: "الخدمات" })}
                </Link>
                <Link
                  href="/workshops"
                  className="font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t({ en: "Workshops", ar: "ورش العمل" })}
                </Link>
                <Link
                  href="/book"
                  className="font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t({ en: "Book a Session", ar: "احجز جلسة" })}
                </Link>
                <Link
                  href="/contact"
                  className="font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t({ en: "Contact", ar: "اتصل بنا" })}
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button asChild className="w-full">
                    <Link href="/book" onClick={() => setIsOpen(false)}>
                      {t({ en: "Book Now", ar: "احجز الآن" })}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageConfig.availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? "bg-primary/10 font-medium" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
