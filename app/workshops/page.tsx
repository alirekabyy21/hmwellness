import Link from "next/link"
import { CalendarClock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"

export default function WorkshopsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Workshops"
          description="Join our transformative workshops designed to help you grow and develop new skills."
          className="bg-gradient-to-r from-bg-light to-bg-medium"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center min-h-[400px]">
              <div className="rounded-full bg-primary/10 p-6 mb-4">
                <CalendarClock className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tighter text-primary">Coming Soon</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're currently planning exciting workshops to help you on your personal development journey. Sign up
                for our newsletter to be the first to know when new workshops are available.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Get Notified</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  <Link href="/services">Explore Services</Link>
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
