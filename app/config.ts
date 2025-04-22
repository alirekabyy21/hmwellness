export const siteConfig = {
  name: "HM Wellness", // Website name
  coachName: "Hagar Moharam", // Coach name
  tagline: "Transform Your Life with Professional Coaching", // Main tagline
  description:
    "Discover your true potential with Hagar Moharam, a certified life coach dedicated to helping you achieve your goals and live a more fulfilling life.",
  email: "hagar@hmwellness.site", // Email
  domain: "hmwellness.site", // Domain
  phone: "+20 123 456 7890",
  address: {
    street: "123 Coaching Street",
    city: "Cairo",
    state: "",
    zip: "",
    country: "Egypt",
  },
  officeHours: [
    { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  socialMedia: {
    instagram: "https://instagram.com/hmwellness",
    facebook: "https://facebook.com/hmwellness",
    linkedin: "https://linkedin.com/in/hagarmoharam",
    youtube: "",
  },
}

// Colors - Edit these to change your website's color scheme
export const colors = {
  primary: "#8a2be2", // Bright purple - main color
  secondary: "#6a0dad", // Darker purple - accent color
  background: {
    light: "#f8f0ff", // Light purple background
    medium: "#f0e6ff", // Medium purple background
    dark: "#e6d9ff", // Dark purple background
  },
  text: {
    dark: "#2c3e50", // Dark text
    medium: "#34495e", // Medium text
    light: "#7f8c8d", // Light text
  },
}

// Home Page Content
export const homeContent = {
  // Hero Section
  hero: {
    title: "Transform Your Life with Professional Coaching",
    description:
      "Discover your true potential with Hagar Moharam, a certified life coach dedicated to helping you achieve your goals and live a more fulfilling life.",
    image: "/placeholder.svg?height=550&width=550", // Replace with your image
  },

  // Services Section
  services: {
    title: "Why Choose Me",
    subtitle: "Personalized Coaching Experience",
    description:
      "I provide tailored coaching sessions designed to address your specific needs and help you overcome obstacles in your personal and professional life.",
    items: [
      {
        title: "Personal Growth",
        description: "Develop self-awareness, build confidence, and discover your true purpose in life.",
      },
      {
        title: "Goal Achievement",
        description: "Set meaningful goals, create actionable plans, and stay accountable to achieve success.",
      },
      {
        title: "Work-Life Balance",
        description: "Find harmony between your professional ambitions and personal well-being.",
      },
    ],
  },

  // Testimonials
  testimonials: {
    title: "What My Clients Say",
    description: "Read testimonials from people who have transformed their lives through coaching.",
    items: [
      {
        text: "Working with Hagar has been transformative. Her guidance helped me clarify my goals and take meaningful steps toward achieving them. I'm more confident and focused than ever before.",
        author: "Sarah K.",
        location: "Cairo, Egypt",
      },
      {
        text: "Hagar's coaching style is both compassionate and effective. She helped me overcome obstacles that had been holding me back for years. I highly recommend her services to anyone looking to grow.",
        author: "Ahmed H.",
        location: "Alexandria, Egypt",
      },
    ],
  },
}

// About Page Content
export const aboutContent = {
  hero: {
    title: "About Hagar Moharam",
    description: [
      "I'm a certified life coach with over 10 years of experience helping people transform their lives. My journey began when I discovered the power of coaching in my own life, and I've been passionate about sharing that transformation with others ever since.",
      "With a background in psychology and extensive training in various coaching methodologies, I provide a unique approach that combines evidence-based techniques with intuitive guidance.",
      "My mission is to help you discover your true potential, overcome obstacles, and create a life that aligns with your deepest values and aspirations.",
    ],
    image: "/placeholder.svg?height=800&width=800", // Replace with your image
  },

  qualifications: {
    title: "My Qualifications",
    sections: [
      {
        title: "Certifications",
        items: [
          "Certified Professional Coach (ICF)",
          "Neuro-Linguistic Programming Practitioner",
          "Emotional Intelligence Coach",
          "Mindfulness-Based Stress Reduction",
        ],
      },
      {
        title: "Education",
        items: [
          "Master's in Psychology",
          "Bachelor's in Human Development",
          "Advanced Training in Positive Psychology",
          "Continuing Education in Coaching Techniques",
        ],
      },
      {
        title: "Experience",
        items: [
          "10+ Years as a Professional Coach",
          "Worked with 500+ Clients",
          "Corporate Wellness Programs",
          "Group and Individual Coaching",
        ],
      },
    ],
  },

  philosophy: {
    title: "My Coaching Philosophy",
    description:
      "I believe that everyone has the inner resources they need to create positive change in their lives. My role is to help you access those resources and use them effectively.",
    items: [
      {
        title: "Client-Centered Approach",
        description:
          "I tailor my coaching to your unique needs, goals, and learning style. There's no one-size-fits-all in my practice. Each session is designed specifically for you.",
      },
      {
        title: "Holistic Perspective",
        description:
          "I consider all aspects of your life—career, relationships, health, personal growth—because they're all interconnected. Improvement in one area often leads to positive changes in others.",
      },
      {
        title: "Action-Oriented",
        description:
          "While reflection is important, I emphasize taking concrete steps toward your goals. Each session ends with clear action items to maintain momentum.",
      },
      {
        title: "Compassionate Accountability",
        description:
          "I provide a supportive environment while also holding you accountable to your commitments. This balance helps you stay motivated and make consistent progress.",
      },
    ],
  },
}

// Services Page Content
export const servicesContent = {
  hero: {
    title: "Coaching Services",
    description:
      "Discover the transformative coaching services designed to help you achieve your goals and live a more fulfilling life.",
  },

  services: [
    {
      title: "Personal Development",
      subtitle: "Discover your true potential",
      description:
        "This coaching program focuses on self-discovery, building confidence, and developing a growth mindset. We'll work together to identify your strengths, overcome limiting beliefs, and create a personal development plan that aligns with your values.",
      features: [
        "Self-awareness and emotional intelligence",
        "Confidence building and self-esteem",
        "Overcoming limiting beliefs",
        "Developing resilience and adaptability",
      ],
    },
    {
      title: "Career Coaching",
      subtitle: "Achieve professional success",
      description:
        "Whether you're looking to advance in your current role, change careers, or start your own business, this coaching program will help you clarify your professional goals and develop strategies to achieve them.",
      features: [
        "Career path clarification",
        "Professional goal setting",
        "Leadership development",
        "Work-life balance strategies",
      ],
    },
    {
      title: "Life Transition Coaching",
      subtitle: "Navigate change with confidence",
      description:
        "Major life transitions can be challenging. This coaching program provides support and guidance as you navigate significant changes such as relocation, career shifts, relationship changes, or other life transitions.",
      features: [
        "Adapting to change",
        "Decision-making strategies",
        "Building support systems",
        "Creating new routines and habits",
      ],
    },
  ],

  process: {
    title: "How It Works",
    description:
      "My coaching process is designed to provide you with clarity, support, and actionable steps to achieve your goals.",
    steps: [
      {
        number: 1,
        title: "Discovery",
        description: "We begin with a comprehensive assessment of your current situation, goals, and challenges.",
      },
      {
        number: 2,
        title: "Planning",
        description: "Together, we create a personalized action plan with clear objectives and milestones.",
      },
      {
        number: 3,
        title: "Implementation",
        description: "You take action with ongoing support, guidance, and accountability from me.",
      },
      {
        number: 4,
        title: "Evaluation",
        description: "We regularly review progress, celebrate successes, and adjust strategies as needed.",
      },
    ],
  },

  pricing: {
    title: "Pricing",
    description: "Invest in yourself with my coaching services.",
    plans: [
      {
        title: "Single Session",
        description: "One 60-minute coaching session",
        priceEgypt: "600 EGP",
        priceInternational: "$30",
        period: "per session",
        features: [
          "60-minute online session",
          "Session recording available",
          "Follow-up email with action items",
          "Email support for 1 week",
        ],
        featured: false,
      },
      {
        title: "Monthly Package",
        description: "Four 60-minute sessions",
        priceEgypt: "2000 EGP",
        priceInternational: "$100",
        period: "per month",
        features: [
          "4 weekly 60-minute sessions",
          "Session recordings available",
          "Detailed action plan",
          "Session recordings available",
          "Unlimited email support",
          "Progress tracking",
        ],
        featured: true,
      },
      {
        title: "3-Month Program",
        description: "Twelve 60-minute sessions",
        priceEgypt: "5400 EGP",
        priceInternational: "$270",
        period: "($90 per month)",
        features: [
          "12 weekly 60-minute sessions",
          "Session recordings available",
          "Comprehensive development plan",
          "Unlimited email support",
          "Priority scheduling",
          "Monthly progress reviews",
        ],
        featured: false,
      },
    ],
  },
}

// Booking Page Content
export const bookingContent = {
  hero: {
    title: "Book Your Coaching Session",
    description: "Schedule your 60-minute online coaching session with Hagar Moharam.",
  },

  // Available time slots for booking
  timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],

  // Session price
  sessionPrice: {
    egypt: "600 EGP",
    egyptStudent: "400 EGP", // Added student price
    international: "$30.00",
  },
}

// Contact Page Content
export const contactContent = {
  hero: {
    title: "Get in Touch",
    description: "Have questions or want to learn more? Reach out and I'll get back to you soon.",
  },
}

// Workshops Page Content
export const workshopsContent = {
  hero: {
    title: "Workshops",
    description: "Join our transformative workshops designed to help you grow and develop new skills.",
  },
  workshops: [
    {
      id: "workshop-1",
      title: "Mindfulness for Everyday Life",
      date: "June 15, 2024",
      time: "10:00 AM - 1:00 PM",
      location: "Online via Zoom",
      price: "300 EGP",
      description: "Learn practical mindfulness techniques to reduce stress and increase focus in your daily life.",
      image: "/placeholder.svg?height=300&width=500",
      spots: 20,
      spotsLeft: 8,
    },
    {
      id: "workshop-2",
      title: "Goal Setting Masterclass",
      date: "July 10, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Online via Zoom",
      price: "250 EGP",
      description: "Discover how to set meaningful goals and create actionable plans to achieve them.",
      image: "/placeholder.svg?height=300&width=500",
      spots: 15,
      spotsLeft: 5,
    },
    {
      id: "workshop-3",
      title: "Building Healthy Relationships",
      date: "August 5, 2024",
      time: "11:00 AM - 2:00 PM",
      location: "Online via Zoom",
      price: "350 EGP",
      description: "Learn effective communication skills and strategies for building healthier relationships.",
      image: "/placeholder.svg?height=300&width=500",
      spots: 25,
      spotsLeft: 15,
    },
  ],
}

// Arabic Content
export const arabicContent = {
  siteConfig: {
    name: "HM Wellness",
    coachName: "هاجر محرم",
    tagline: "حوّل حياتك مع التدريب المهني",
    description:
      "اكتشف إمكاناتك الحقيقية مع هاجر محرم، مدربة حياة معتمدة مكرسة لمساعدتك على تحقيق أهدافك والعيش حياة أكثر إشباعًا.",
  },

  navigation: {
    home: "الرئيسية",
    about: "عن هاجر",
    services: "الخدمات",
    book: "احجز جلسة",
    contact: "اتصل بنا",
    workshops: "ورش العمل",
  },

  homeContent: {
    hero: {
      title: "حوّل حياتك مع التدريب المهني",
      description:
        "اكتشف إمكاناتك الحقيقية مع هاجر محرم، مدربة حياة معتمدة مكرسة لمساعدتك على تحقيق أهدافك والعيش حياة أكثر إشباعًا.",
    },
    cta: {
      bookNow: "احجز الآن",
      learnMore: "اعرف المزيد",
    },
  },
}

// Pricing configuration for payment API
export const pricingConfig = {
  egypt: {
    regular: 600,
    student: 400,
    currency: "EGP",
  },
  international: {
    regular: 30,
    currency: "USD",
  },
}

// Promo codes configuration
export const promoCodes = {
  student: {
    code: "student",
    discount: "student",
    description: "Student Discount",
  },
}

// Admin configuration
export const adminConfig = {
  email: "alirekaby01@gmail.com",
  passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99", // This is just a placeholder, we'll use a secure auth method
}
