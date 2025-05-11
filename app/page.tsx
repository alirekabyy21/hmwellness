import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { siteConfig, homeContent } from "./config"
import { ArrowRight, Users, Briefcase, Heart, Star, Quote, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-[#f8f9ff] to-[#f0f4ff]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-[#d1dbff] bg-white px-3 py-1 text-sm text-[#5d6bb0]">
                  <Star className="mr-1 h-3.5 w-3.5 fill-[#5d6bb0]" />
                  <span>Professional Life Coaching</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                  {homeContent.hero.title}
                </h1>
                <p className="max-w-[600px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {homeContent.hero.description}
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-[#5d6bb0] hover:bg-[#4a5899] btn-hover">
                    <Link href="/book" className="flex items-center">
                      Book a Session
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-[#d1dbff] text-[#5d6bb0] hover:bg-[#f0f4ff]"
                  >
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-[#6b7280]">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-[#f0f4ff] flex items-center justify-center text-[#5d6bb0] text-xs font-medium"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-[#5d6bb0] text-[#5d6bb0]" />
                    <Star className="h-4 w-4 fill-[#5d6bb0] text-[#5d6bb0]" />
                    <Star className="h-4 w-4 fill-[#5d6bb0] text-[#5d6bb0]" />
                    <Star className="h-4 w-4 fill-[#5d6bb0] text-[#5d6bb0]" />
                    <Star className="h-4 w-4 fill-[#5d6bb0] text-[#5d6bb0]" />
                    <span className="ml-2">5.0 (120+ reviews)</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#e8edff] blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#e8edff] blur-2xl"></div>
                <img
                  src={homeContent.hero.image || "/placeholder.svg"}
                  alt={`${siteConfig.coachName} - Life Coach`}
                  width="550"
                  height="550"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last relative z-10 shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 glass-effect">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Certified Coach</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 glass-effect">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#5d6bb0]" />
                    <span className="text-sm font-medium">500+ Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-[#d1dbff] bg-[#f8f9ff] px-3 py-1 text-sm text-[#5d6bb0]">
                {homeContent.services.title}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gradient-text">
                {homeContent.services.subtitle}
              </h2>
              <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {homeContent.services.description}
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {homeContent.services.items.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center space-y-4 rounded-xl border border-[#d1dbff] bg-gradient-card p-6 shadow-sm card-hover"
                >
                  <div className="icon-circle-lg">
                    {index === 0 && <Users className="h-6 w-6" />}
                    {index === 1 && <Briefcase className="h-6 w-6" />}
                    {index === 2 && <Heart className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-[#5d6bb0]">{service.title}</h3>
                  <p className="text-[#6b7280]">{service.description}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center text-[#5d6bb0] hover:text-[#4a5899] font-medium"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-[#5d6bb0] to-[#8a94d3] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Transform Your Life?</h2>
                <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take the first step towards a better you. Schedule your online coaching session today.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild className="w-full bg-white text-[#5d6bb0] hover:bg-white/90" size="lg">
                  <Link href="/book" className="flex items-center justify-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Your Session Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-[#f8f9ff]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-[#d1dbff] bg-white px-3 py-1 text-sm text-[#5d6bb0]">
                <Star className="mr-1 h-3.5 w-3.5 fill-[#5d6bb0]" />
                {homeContent.testimonials.title}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gradient-text">
                What My Clients Say
              </h2>
              <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {homeContent.testimonials.description}
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {homeContent.testimonials.items.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center space-y-4 rounded-xl border border-[#d1dbff] bg-white p-6 shadow-sm card-hover"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-10 w-10 rounded-full bg-[#f0f4ff] flex items-center justify-center text-[#5d6bb0] font-semibold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2d3748]">{testimonial.author}</p>
                      {testimonial.location && <p className="text-sm text-[#6b7280]">{testimonial.location}</p>}
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#5d6bb0]/20" />
                    <p className="text-[#6b7280] relative pl-6">{testimonial.text}</p>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-[#5d6bb0] text-[#5d6bb0]" />
                    ))}
                  </div>
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
