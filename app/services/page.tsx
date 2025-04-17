import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold text-xl">
            Hagar Moharam
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/about" className="font-medium">
              About
            </Link>
            <Link href="/services" className="font-medium">
              Services
            </Link>
            <Link href="/book" className="font-medium">
              Book a Session
            </Link>
            <Link href="/contact" className="font-medium">
              Contact
            </Link>
          </nav>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/book">Book Now</Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
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
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-rose-50 to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Coaching Services</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the transformative coaching services designed to help you achieve your goals and live a more
                  fulfilling life.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Development</CardTitle>
                  <CardDescription>Discover your true potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This coaching program focuses on self-discovery, building confidence, and developing a growth
                    mindset. We'll work together to identify your strengths, overcome limiting beliefs, and create a
                    personal development plan that aligns with your values.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>• Self-awareness and emotional intelligence</li>
                    <li>• Confidence building and self-esteem</li>
                    <li>• Overcoming limiting beliefs</li>
                    <li>• Developing resilience and adaptability</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/book">Book a Session</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Career Coaching</CardTitle>
                  <CardDescription>Achieve professional success</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Whether you're looking to advance in your current role, change careers, or start your own business,
                    this coaching program will help you clarify your professional goals and develop strategies to
                    achieve them.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>• Career path clarification</li>
                    <li>• Professional goal setting</li>
                    <li>• Leadership development</li>
                    <li>• Work-life balance strategies</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/book">Book a Session</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Life Transition Coaching</CardTitle>
                  <CardDescription>Navigate change with confidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Major life transitions can be challenging. This coaching program provides support and guidance as
                    you navigate significant changes such as relocation, career shifts, relationship changes, or other
                    life transitions.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>• Adapting to change</li>
                    <li>• Decision-making strategies</li>
                    <li>• Building support systems</li>
                    <li>• Creating new routines and habits</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/book">Book a Session</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My coaching process is designed to provide you with clarity, support, and actionable steps to achieve
                  your goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Discovery</h3>
                <p className="text-muted-foreground">
                  We begin with a comprehensive assessment of your current situation, goals, and challenges.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Planning</h3>
                <p className="text-muted-foreground">
                  Together, we create a personalized action plan with clear objectives and milestones.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Implementation</h3>
                <p className="text-muted-foreground">
                  You take action with ongoing support, guidance, and accountability from me.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <h3 className="text-xl font-bold">Evaluation</h3>
                <p className="text-muted-foreground">
                  We regularly review progress, celebrate successes, and adjust strategies as needed.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Invest in yourself with my coaching services.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle>Single Session</CardTitle>
                    <CardDescription>One 60-minute coaching session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-4xl font-bold">$150</p>
                      <p className="text-muted-foreground mt-2">per session</p>
                    </div>
                    <ul className="mt-4 space-y-2 text-muted-foreground">
                      <li>• 60-minute online session</li>
                      <li>• Session recording available</li>
                      <li>• Follow-up email with action items</li>
                      <li>• Email support for 1 week</li>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/book">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-between border-primary">
                <div>
                  <CardHeader>
                    <CardTitle>Monthly Package</CardTitle>
                    <CardDescription>Four 60-minute sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-4xl font-bold">$500</p>
                      <p className="text-muted-foreground mt-2">per month</p>
                    </div>
                    <ul className="mt-4 space-y-2 text-muted-foreground">
                      <li>• 4 weekly 60-minute sessions</li>
                      <li>• Session recordings available</li>
                      <li>• Detailed action plan</li>
                      <li>• Unlimited email support</li>
                      <li>• Progress tracking</li>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/book">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle>3-Month Program</CardTitle>
                    <CardDescription>Twelve 60-minute sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-4xl font-bold">$1,350</p>
                      <p className="text-muted-foreground mt-2">($450 per month)</p>
                    </div>
                    <ul className="mt-4 space-y-2 text-muted-foreground">
                      <li>• 12 weekly 60-minute sessions</li>
                      <li>• Session recordings available</li>
                      <li>• Comprehensive development plan</li>
                      <li>• Unlimited email support</li>
                      <li>• Priority scheduling</li>
                      <li>• Monthly progress reviews</li>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/book">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Hagar Moharam. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-muted-foreground">
              About
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground">
              Services
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
