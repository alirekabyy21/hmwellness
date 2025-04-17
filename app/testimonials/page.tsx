import { Star } from "lucide-react"

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Executive",
      content:
        "Working with Hagar has been transformative. Her coaching helped me identify my strengths and overcome obstacles I didn't even realize were holding me back. After just three months, I received a promotion at work and have found a much better work-life balance.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "The group sessions were incredibly valuable. I not only learned from Hagar but also from the experiences and perspectives of other participants. The tools and techniques I gained have helped me communicate more effectively with my team and manage stress during tight deadlines.",
      rating: 5,
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Team Lead",
      content:
        "Hagar's workshop on leadership fundamentally changed how I approach my role. I'm now more confident, effective, and fulfilled in my work. My team has noticed the difference, and our productivity has increased significantly.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "Entrepreneur",
      content:
        "As someone starting a new business, I was overwhelmed with challenges. Hagar helped me clarify my vision, set realistic goals, and develop strategies to overcome obstacles. Her coaching was instrumental in the successful launch of my company.",
      rating: 5,
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "HR Director",
      content:
        "We hired Hagar for corporate consultations to improve our workplace culture. Her insights and recommendations were invaluable. She helped us identify issues we weren't aware of and implemented changes that significantly improved employee satisfaction and retention.",
      rating: 5,
    },
    {
      id: 6,
      name: "Omar Hassan",
      role: "Medical Doctor",
      content:
        "I was experiencing burnout in my medical practice when I started working with Hagar. Her holistic approach to wellness coaching helped me rediscover my passion for medicine and develop sustainable self-care practices. I'm now more present with my patients and enjoying my work again.",
      rating: 5,
    },
    {
      id: 7,
      name: "Sophia Lee",
      role: "Graduate Student",
      content:
        "As a student juggling multiple responsibilities, I was constantly stressed and overwhelmed. Hagar taught me effective time management and mindfulness techniques that have transformed my academic performance and overall wellbeing.",
      rating: 4,
    },
    {
      id: 8,
      name: "James Wilson",
      role: "Sales Manager",
      content:
        "The leadership coaching I received from Hagar helped me build a more cohesive and motivated sales team. Our numbers have improved, but more importantly, the work environment is more positive and collaborative.",
      rating: 5,
    },
  ]

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">Client Testimonials</h1>

          <p className="text-xl text-gray-500 text-center mb-16">
            Discover how coaching with Hagar Moharam has transformed the lives and careers of our clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
