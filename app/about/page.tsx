import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <img
                src="/placeholder.svg?height=800&width=800"
                alt="Hagar Moharam"
                width="800"
                height="800"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Hagar Moharam</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I'm a certified life coach with over 10 years of experience helping people transform their lives. My
                  journey began when I discovered the power of coaching in my own life, and I've been passionate about
                  sharing that transformation with others ever since.
                </p>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  With a background in psychology and extensive training in various coaching methodologies, I provide a
                  unique approach that combines evidence-based techniques with intuitive guidance.
                </p>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My mission is to help you discover your true potential, overcome obstacles, and create a life that
                  aligns with your deepest values and aspirations.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">My Qualifications</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 bg-background">
                <h3 className="text-xl font-bold">Certifications</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Certified Professional Coach (ICF)</li>
                  <li>Neuro-Linguistic Programming Practitioner</li>
                  <li>Emotional Intelligence Coach</li>
                  <li>Mindfulness-Based Stress Reduction</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 bg-background">
                <h3 className="text-xl font-bold">Education</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Master's in Psychology</li>
                  <li>Bachelor's in Human Development</li>
                  <li>Advanced Training in Positive Psychology</li>
                  <li>Continuing Education in Coaching Techniques</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 bg-background">
                <h3 className="text-xl font-bold">Experience</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>10+ Years as a Professional Coach</li>
                  <li>Worked with 500+ Clients</li>
                  <li>Corporate Wellness Programs</li>
                  <li>Group and Individual Coaching</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">My Coaching Philosophy</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I believe that everyone has the inner resources they need to create positive change in their lives. My
                  role is to help you access those resources and use them effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Client-Centered Approach</h3>
                <p className="text-muted-foreground">
                  I tailor my coaching to your unique needs, goals, and learning style. There's no one-size-fits-all in
                  my practice. Each session is designed specifically for you.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Holistic Perspective</h3>
                <p className="text-muted-foreground">
                  I consider all aspects of your life—career, relationships, health, personal growth—because they're all
                  interconnected. Improvement in one area often leads to positive changes in others.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Action-Oriented</h3>
                <p className="text-muted-foreground">
                  While reflection is important, I emphasize taking concrete steps toward your goals. Each session ends
                  with clear action items to maintain momentum.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Compassionate Accountability</h3>
                <p className="text-muted-foreground">
                  I provide a supportive environment while also holding you accountable to your commitments. This
                  balance helps you stay motivated and make consistent progress.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild size="lg">
                <Link href="/book">Book a Session</Link>
              </Button>
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
