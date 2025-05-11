import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { User, Award, BookOpen, Calendar, CheckCircle, Heart, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-[#f8f9ff] to-[#f0f4ff]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#e8edff] blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#e8edff] blur-2xl"></div>
                <img
                  src="/placeholder.svg?height=800&width=800"
                  alt="Hagar Moharam"
                  width="800"
                  height="800"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-lg relative z-10"
                />
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 glass-effect">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-[#5d6bb0]" />
                    <span className="text-sm font-medium">Certified Coach</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 glass-effect">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-[#5d6bb0]" />
                    <span className="text-sm font-medium">10+ Years Experience</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-[#d1dbff] bg-white px-3 py-1 text-sm text-[#5d6bb0]">
                  <User className="mr-1 h-3.5 w-3.5" />
                  <span>About Me</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">About Hagar Moharam</h1>
                <p className="text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I'm a certified life coach with over 10 years of experience helping people transform their lives. My
                  journey began when I discovered the power of coaching in my own life, and I've been passionate about
                  sharing that transformation with others ever since.
                </p>
                <p className="text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  With a background in psychology and extensive training in various coaching methodologies, I provide a
                  unique approach that combines evidence-based techniques with intuitive guidance.
                </p>
                <p className="text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My mission is to help you discover your true potential, overcome obstacles, and create a life that
                  aligns with your deepest values and aspirations.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Button asChild className="bg-[#5d6bb0] hover:bg-[#4a5899]">
                    <Link href="/book">Book a Session</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-[#d1dbff] text-[#5d6bb0] hover:bg-[#f0f4ff]">
                    <Link href="/contact">Contact Me</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24 lg:py-32 bg-[#f8f9ff]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-[#d1dbff] bg-white px-3 py-1 text-sm text-[#5d6bb0]">
                <Award className="mr-1 h-3.5 w-3.5" />
                <span>Credentials</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gradient-text">
                  My Qualifications
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-xl border border-[#d1dbff] p-6 bg-white shadow-sm card-hover">
                <div className="icon-circle-lg">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#5d6bb0]">Certifications</h3>
                <ul className="space-y-2 text-[#6b7280]">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Certified Professional Coach (ICF)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Neuro-Linguistic Programming Practitioner</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Emotional Intelligence Coach</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Mindfulness-Based Stress Reduction</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-xl border border-[#d1dbff] p-6 bg-white shadow-sm card-hover">
                <div className="icon-circle-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#5d6bb0]">Education</h3>
                <ul className="space-y-2 text-[#6b7280]">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Master's in Psychology</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Bachelor's in Human Development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Advanced Training in Positive Psychology</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Continuing Education in Coaching Techniques</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-xl border border-[#d1dbff] p-6 bg-white shadow-sm card-hover">
                <div className="icon-circle-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#5d6bb0]">Experience</h3>
                <ul className="space-y-2 text-[#6b7280]">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>10+ Years as a Professional Coach</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Worked with 500+ Clients</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Corporate Wellness Programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#5d6bb0] mr-2 shrink-0 mt-0.5" />
                    <span>Group and Individual Coaching</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-[#d1dbff] bg-[#f8f9ff] px-3 py-1 text-sm text-[#5d6bb0]">
                <Heart className="mr-1 h-3.5 w-3.5" />
                <span>My Approach</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gradient-text">
                  My Coaching Philosophy
                </h2>
                <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I believe that everyone has the inner resources they need to create positive change in their lives. My
                  role is to help you access those resources and use them effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4 rounded-xl border border-[#d1dbff] p-6 bg-white shadow-sm card-hover">
                <div className="icon-circle">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#5d6bb0]">Client-Centered Approach</h3>
                <p className="text-[#6b7280]">
                  I tailor my coaching to your unique needs, goals, and learning style. There's no one-size-fits-all in
                  my practice. Each session is designed specifically for you.
                </p>
              </div>
              <div className="space-y-4 rounded-xl border border-[#d1dbff] p-6 bg-white shadow-sm card-hover">
                <div className="icon-circle">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#5d6bb0]">Holistic Perspective</h3>
                <p className="text-[#6b7280]">
                  I consider all aspects of your life—career, relationships, health, personal growth—because they're all
                  interconnected. Improvement in one area often leads to positive changes in others.
                </p>
              </div>
              <div className="space-y-4 rounded-xl border border-[#d1dbff] p-6 bg-white shadow-sm card-hover">
                <div className="icon-circle">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#5d6bb0]">Action-Oriented</h3>
                <p className="text-[#6b7280]">
                  While reflection is important, I emphasize taking concrete steps toward your goals. Each session ends
                  with clear action items to maintain momentum.
                </p>
              </div>
              <div className="space-y-4 rounded-xl border border-[#d1dbff] p-6 bg-white shadow-sm card-hover">
                <div className="icon-circle">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#5d6bb0]">Compassionate Accountability</h3>
                <p className="text-[#6b7280]">
                  I provide a supportive environment while also holding you accountable to your commitments. This
                  balance helps you stay motivated and make consistent progress.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild size="lg" className="bg-[#5d6bb0] hover:bg-[#4a5899]">
                <Link href="/book" className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Session
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
