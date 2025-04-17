import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { siteConfig, homeContent } from "./config"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-bg-light to-bg-medium">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{homeContent.hero.title}</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {homeContent.hero.description}
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/book">Book a Session</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
              </div>
              <img
                src={homeContent.hero.image || "/placeholder.svg"}
                alt={`${siteConfig.coachName} - Life Coach`}
                width="550"
                height="550"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{homeContent.services.title}</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {homeContent.services.subtitle}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {homeContent.services.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {homeContent.services.items.map((service, index) => (
                <div key={index} className="flex flex-col justify-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
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
                      className="h-6 w-6 text-primary"
                    >
                      {index === 0 && <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />}
                      {index === 0 && <circle cx="9" cy="7" r="4" />}
                      {index === 0 && <path d="M22 21v-2a4 4 0 0 0-3-3.87" />}
                      {index === 0 && <path d="M16 3.13a4 4 0 0 1 0 7.75" />}

                      {index === 1 && <path d="M8 3v3a2 2 0 0 1-2 2H3" />}
                      {index === 1 && <path d="M21 8V5a2 2 0 0 0-2-2H8" />}
                      {index === 1 && <path d="M3 16v3a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3" />}
                      {index === 1 && <path d="M16 16v-3a2 2 0 0 0-2-2H8" />}
                      {index === 1 && <path d="M3 8v8" />}
                      {index === 1 && <path d="M21 16V8" />}

                      {index === 2 && <path d="M12 20h9" />}
                      {index === 2 && <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Book Your 60-Minute Session</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take the first step towards a better you. Schedule your online coaching session today.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/book">Book Now</Link>
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {homeContent.testimonials.title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {homeContent.testimonials.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {homeContent.testimonials.items.map((testimonial, index) => (
                <div key={index} className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
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
                    <p className="text-muted-foreground relative">{testimonial.text}</p>
                  </div>
                  <p className="font-semibold">
                    - {testimonial.author}
                    {testimonial.location && `, ${testimonial.location}`}
                  </p>
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
