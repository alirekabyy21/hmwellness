import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { workshopsContent } from "../config"

export default function WorkshopsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title={workshopsContent.hero.title} description={workshopsContent.hero.description} />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl text-primary mb-4">Upcoming Workshops</h2>

              {workshopsContent.upcoming.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {workshopsContent.upcoming.map((workshop, index) => (
                    <Card key={index} className={`overflow-hidden ${workshop.featured ? "border-primary" : ""}`}>
                      <div className="relative">
                        <img
                          src={workshop.image || "/placeholder.svg"}
                          alt={workshop.title}
                          className="w-full h-48 object-cover"
                        />
                        {workshop.featured && (
                          <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary/90">Featured</Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">{workshop.title}</CardTitle>
                        <CardDescription>{workshop.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">{workshop.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">{workshop.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">{workshop.location}</span>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-muted-foreground">Starting from</p>
                                <p className="font-semibold text-primary">
                                  {workshop.price.egypt.student}{" "}
                                  <span className="text-xs text-muted-foreground">(Student)</span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Regular</p>
                                <p className="font-semibold">{workshop.price.egypt.regular}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href="/contact?workshop=true">Register Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-bg-light rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No Upcoming Workshops</h3>
                  <p className="text-muted-foreground mb-6">
                    We're currently planning our next workshops. Check back soon or subscribe to our newsletter to be
                    notified.
                  </p>
                  <Button asChild>
                    <Link href="/contact">Get Notified</Link>
                  </Button>
                </div>
              )}
            </div>

            {workshopsContent.past.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl text-primary mb-4">Past Workshops</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {workshopsContent.past.map((workshop, index) => (
                    <Card key={index} className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                      <div>
                        <img
                          src={workshop.image || "/placeholder.svg"}
                          alt={workshop.title}
                          className="w-full h-40 object-cover grayscale hover:grayscale-0 transition-all"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{workshop.title}</CardTitle>
                        <CardDescription>{workshop.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{workshop.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-bg-medium">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                  Want to Host a Workshop?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer customized workshops for organizations and groups. Contact us to discuss your needs.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/contact?corporate=true">Contact Us</Link>
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
