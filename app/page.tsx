"use client"

import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { homeContent } from "./config"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t, isRTL } = useLanguage()

  return (
    <div className={`flex flex-col min-h-screen ${isRTL ? "rtl" : "ltr"}`}>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-bg-light to-bg-medium">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                  {t(homeContent.hero.title)}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t(homeContent.hero.description)}
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/book">{t({ en: "Book a Session", ar: "احجز جلسة" })}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Link href="/services">{t({ en: "Learn More", ar: "اعرف المزيد" })}</Link>
                  </Button>
                </div>
              </div>
              <img
                src={homeContent.hero.image || "/placeholder.svg"}
                alt={t({ en: "Hagar Moharam Life Coach", ar: "هاجر محرم مدربة حياة" })}
                width="550"
                height="550"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-bg-medium px-3 py-1 text-sm text-primary font-medium">
                  {t(homeContent.services.title)}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                  {t(homeContent.services.subtitle)}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t(homeContent.services.description)}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {homeContent.services.items.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center space-y-4 p-6 rounded-xl bg-bg-light hover:shadow-md transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {index === 0 ? (
                      <User className="h-6 w-6 text-primary" />
                    ) : index === 1 ? (
                      <Calendar className="h-6 w-6 text-primary" />
                    ) : (
                      <Clock className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-primary">{t(service.title)}</h3>
                  <p className="text-muted-foreground">{t(service.description)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-bg-medium">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                  {t({ en: "Book Your 60-Minute Session", ar: "احجز جلستك لمدة 60 دقيقة" })}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t({
                    en: "Take the first step towards a better you. Schedule your online coaching session today.",
                    ar: "اتخذ الخطوة الأولى نحو نسخة أفضل من نفسك. جدول جلسة التدريب عبر الإنترنت اليوم.",
                  })}
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/book">{t({ en: "Book Now", ar: "احجز الآن" })}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                  {t(homeContent.testimonials.title)}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t(homeContent.testimonials.description)}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {homeContent.testimonials.items.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-bg-light"
                >
                  <div className="relative">
                    <svg
                      className="absolute -top-6 -left-6 h-12 w-12 text-primary/20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />
                      <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />
                    </svg>
                    <p className="text-muted-foreground relative">{t(testimonial.text)}</p>
                  </div>
                  <p className="font-semibold text-primary">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
