import Link from "next/link"
import { CalendarClock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function WorkshopsPage() {
  // Upcoming workshops data
  const upcomingWorkshops = [
    {
      id: 1,
      title: "Mindfulness for Beginners",
      date: "November 15, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Online via Zoom",
      price: "300 EGP",
      description:
        "Learn the basics of mindfulness meditation and how to incorporate it into your daily life for reduced stress and increased well-being.",
      spots: 15,
      spotsLeft: 8,
    },
    {
      id: 2,
      title: "Goal Setting Workshop",
      date: "November 22, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Online via Zoom",
      price: "300 EGP",
      description:
        "Learn effective strategies for setting and achieving meaningful goals that align with your values and vision for your life.",
      spots: 15,
      spotsLeft: 10,
    },
  ]

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
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Upcoming Workshops</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join one of our upcoming workshops to learn new skills and connect with like-minded individuals.
              </p>
            </div>

            {upcomingWorkshops.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                {upcomingWorkshops.map((workshop) => (
                  <Card key={workshop.id} className="overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b">
                      <CardTitle>{workshop.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center mt-2">
                          <CalendarClock className="h-4 w-4 mr-2 text-primary" />
                          <span>
                            {workshop.date} • {workshop.time}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-4">{workshop.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">Location:</span>
                          <p>{workshop.location}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Price:</span>
                          <p>{workshop.price}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Spots:</span>
                          <p>
                            {workshop.spotsLeft} of {workshop.spots} available
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/20 border-t">
                      <Button className="w-full">Register Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <CalendarClock className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter text-primary">Coming Soon</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[600px]">
                  We're currently planning exciting workshops to help you on your personal development journey. Check
                  back soon for updates!
                </p>

                <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Custom Workshops</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Looking for a specific workshop for your team or organization? I offer custom workshops tailored to your
                needs.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/contact">Request a Custom Workshop</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
