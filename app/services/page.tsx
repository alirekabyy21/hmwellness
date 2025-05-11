import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { servicesContent } from "../config"
import { CheckCircle, Users, Briefcase, Heart, Clock } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Coaching Services"
          description="Discover the transformative coaching services designed to help you achieve your goals and live a more fulfilling life."
          className="bg-gradient-to-r from-[#f8f9ff] to-[#f0f4ff]"
        />

        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {servicesContent.services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col h-full rounded-xl border border-[#d1dbff] bg-gradient-card p-6 shadow-sm card-hover"
                >
                  <div className="icon-circle-lg mb-4">
                    {index === 0 && <Users className="h-6 w-6" />}
                    {index === 1 && <Briefcase className="h-6 w-6" />}
                    {index === 2 && <Heart className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-[#5d6bb0] mb-2">{service.title}</h3>
                  <p className="text-[#6b7280] mb-2 text-sm">{service.subtitle}</p>
                  <p className="text-[#6b7280] mb-6 flex-grow">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                        <span className="text-[#6b7280]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-auto bg-[#5d6bb0] hover:bg-[#4a5899]">
                    <Link href="/book">Book This Service</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-[#f8f9ff]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-[#d1dbff] bg-white px-3 py-1 text-sm text-[#5d6bb0] mb-4">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>The Process</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gradient-text">How It Works</h2>
                <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My coaching process is designed to provide you with clarity, support, and actionable steps to achieve
                  your goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-4 lg:gap-12">
              {servicesContent.process.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center space-y-4 text-center card-hover p-6 rounded-xl border border-[#d1dbff] bg-white"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5d6bb0] text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-[#5d6bb0]">{step.title}</h3>
                  <p className="text-[#6b7280]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-[#5d6bb0] to-[#8a94d3] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Transform Your Life?</h2>
                <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take the first step towards a better you. Schedule your coaching session today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button asChild size="lg" className="bg-white text-[#5d6bb0] hover:bg-white/90">
                  <Link href="/book" className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book a Session
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
