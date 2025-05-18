"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/app/config"
import { useLanguage } from "@/contexts/language-context"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const { t, isRTL } = useLanguage()

  return (
    <footer className={`w-full bg-bg-dark ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">{siteConfig.name}</h3>
            <p className="text-muted-foreground mb-4">
              {t({
                en: "Dedicated to helping you achieve personal growth and transformation through professional coaching.",
                ar: "مكرسة لمساعدتك على تحقيق النمو الشخصي والتحول من خلال التدريب المهني.",
              })}
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href={siteConfig.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href={siteConfig.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">{t({ en: "Quick Links", ar: "روابط سريعة" })}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t({ en: "Home", ar: "الرئيسية" })}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t({ en: "About", ar: "عن المدرب" })}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  {t({ en: "Services", ar: "الخدمات" })}
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-muted-foreground hover:text-primary transition-colors">
                  {t({ en: "Workshops", ar: "ورش العمل" })}
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">
                  {t({ en: "Book a Session", ar: "احجز جلسة" })}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t({ en: "Contact", ar: "اتصل بنا" })}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">{t({ en: "Contact Us", ar: "اتصل بنا" })}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">
                  {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.country}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">{t({ en: "Office Hours", ar: "ساعات العمل" })}</h3>
            <ul className="space-y-2">
              {siteConfig.officeHours.map((item, index) => (
                <li key={index} className="text-muted-foreground">
                  <span className="font-medium">{item.day}:</span> {item.hours}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-muted">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} {siteConfig.name}. {t({ en: "All rights reserved.", ar: "جميع الحقوق محفوظة." })}
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t({ en: "Privacy Policy", ar: "سياسة الخصوصية" })}
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t({ en: "Terms & Conditions", ar: "الشروط والأحكام" })}
              </Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t({ en: "Refund Policy", ar: "سياسة الاسترداد" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
