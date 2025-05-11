export const siteConfig = {
  name: "Hagar Moharam",
  coachName: "Hagar Moharam",
  description: "Professional Life Coach helping you transform your life and achieve your goals.",
  domain: "hagarmoharam.com",
  email: "hello@hagarmoharam.com",
  phone: "+20 123 456 7890",
  address: "Cairo, Egypt",
}

export const colors = {
  primary: "#5d6bb0",
  secondary: "#4a5899",
  accent: "#8a94d3",
  background: {
    light: "#f8f9ff",
    medium: "#f0f4ff",
    dark: "#e8edff",
  },
  text: {
    primary: "#2d3748",
    secondary: "#6b7280",
    accent: "#5d6bb0",
  },
  border: "#d1dbff",
}

export const homeContent = {
  hero: {
    title: "Transform Your Life With Professional Coaching",
    description:
      "Discover your true potential and overcome obstacles with personalized coaching sessions designed to help you achieve your goals.",
    image: "/placeholder.svg?height=550&width=550",
  },
  services: {
    title: "My Services",
    subtitle: "Personalized Coaching for Every Aspect of Your Life",
    description:
      "I offer a range of coaching services designed to help you overcome challenges and achieve your goals in various areas of life.",
    items: [
      {
        title: "Life Coaching",
        description:
          "Gain clarity, overcome obstacles, and create a fulfilling life aligned with your values and aspirations.",
        icon: "users",
      },
      {
        title: "Career Coaching",
        description:
          "Navigate career transitions, improve leadership skills, and achieve professional growth and satisfaction.",
        icon: "briefcase",
      },
      {
        title: "Mindfulness Coaching",
        description:
          "Learn techniques to reduce stress, increase focus, and develop greater awareness and emotional balance.",
        icon: "heart",
      },
    ],
  },
  testimonials: {
    title: "What My Clients Say",
    description: "Read about the experiences and transformations of people I've worked with.",
    items: [
      {
        text: "Working with Hagar has been transformative. Her guidance helped me gain clarity about my goals and develop practical strategies to achieve them.",
        author: "Sarah M.",
        location: "Cairo",
      },
      {
        text: "Hagar's coaching approach is both compassionate and effective. She helped me overcome limiting beliefs that were holding me back for years.",
        author: "Ahmed K.",
        location: "Alexandria",
      },
    ],
  },
}

export const servicesContent = {
  services: [
    {
      title: "Life Coaching",
      subtitle: "Find Direction and Purpose",
      description:
        "My life coaching sessions help you gain clarity about your values, overcome obstacles, and create a fulfilling life aligned with your true self.",
      features: [
        "Identify core values and life purpose",
        "Overcome limiting beliefs and self-doubt",
        "Develop effective goal-setting strategies",
        "Create actionable plans for personal growth",
        "Build resilience and emotional intelligence",
      ],
    },
    {
      title: "Career Coaching",
      subtitle: "Achieve Professional Success",
      description:
        "Navigate career transitions, improve leadership skills, and achieve professional growth with personalized career coaching.",
      features: [
        "Clarify career goals and aspirations",
        "Develop leadership and communication skills",
        "Navigate career transitions and challenges",
        "Improve work-life balance",
        "Build confidence in professional settings",
      ],
    },
    {
      title: "Relationship Coaching",
      subtitle: "Enhance Your Connections",
      description:
        "Improve communication, resolve conflicts, and build healthier relationships with partners, family members, and colleagues.",
      features: [
        "Enhance communication skills",
        "Develop conflict resolution strategies",
        "Set healthy boundaries",
        "Deepen emotional connections",
        "Navigate relationship transitions",
      ],
    },
  ],
  process: {
    steps: [
      {
        number: 1,
        title: "Discovery",
        description: "We begin with an in-depth conversation about your current situation, challenges, and goals.",
      },
      {
        number: 2,
        title: "Strategy",
        description:
          "Together, we develop a personalized coaching plan tailored to your specific needs and aspirations.",
      },
      {
        number: 3,
        title: "Action",
        description: "You'll implement agreed-upon actions with ongoing support and accountability from me.",
      },
      {
        number: 4,
        title: "Growth",
        description:
          "We track progress, celebrate successes, and adjust strategies as needed to ensure continued growth.",
      },
    ],
  },
}

export const bookingConfig = {
  availableTimeSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  daysInAdvance: 30,
  sessionDuration: 60, // minutes
  timeZone: "Africa/Cairo",
}

export const pricingConfig = {
  defaultPrice: 600,
  internationalPrice: 30,
  currency: "EGP",
  internationalCurrency: "USD",
  promoCodes: {
    WELCOME10: 10,
    SUMMER20: 20,
    test1234: 100,
  },
}

export const bookingContent = {
  hero: {
    title: "Book Your Coaching Session",
    description: "Schedule your 60-minute life coaching session and take the first step towards positive change.",
  },
  timeSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  sessionPrice: {
    egypt: "EGP 600",
    international: "30",
  },
}

export const workshopsContent = {
  hero: {
    title: "Transformative Workshops",
    description:
      "Join our interactive workshops designed to help you develop new skills and insights for personal growth.",
  },
  workshops: [
    {
      id: 1,
      title: "Mindfulness & Self-Discovery",
      description: "A transformative workshop focused on mindfulness practices and self-discovery techniques.",
      date: "June 15, 2023",
      time: "10:00 AM - 2:00 PM",
      location: "Cairo, Egypt",
      spots: 20,
      spotsLeft: 8,
      price: "EGP 1,500",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 2,
      title: "Goal Setting & Achievement",
      description:
        "Learn effective strategies for setting meaningful goals and developing action plans to achieve them.",
      date: "July 22, 2023",
      time: "11:00 AM - 3:00 PM",
      location: "Online (Zoom)",
      spots: 30,
      spotsLeft: 15,
      price: "EGP 1,200",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 3,
      title: "Building Emotional Resilience",
      description: "Develop skills to navigate life's challenges with greater emotional strength and flexibility.",
      date: "August 10, 2023",
      time: "9:30 AM - 1:30 PM",
      location: "Alexandria, Egypt",
      spots: 25,
      spotsLeft: 10,
      price: "EGP 1,800",
      image: "/placeholder.svg?height=300&width=600",
    },
  ],
}

export const adminConfig = {
  email: "admin@example.com",
  password: "password",
}
