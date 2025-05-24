export const siteConfig = {
  name: "HM Wellness", // Business name
  coachName: "Hagar Moharam", // Coach's name
  tagline: "Transform Your Life with Professional Coaching", // Main tagline
  description:
    "Discover your true potential with Hagar Moharam at HM Wellness, dedicated to helping you achieve your goals and live a more fulfilling life.",
  email: "hagar@hmwellness.site", // Your email address
  phone: "+20 1090250475", // Your phone number
  domain: "hmwellness.site", // Website domain
  address: {
    street: "123 Wellness Street",
    city: "Cairo",
    state: "",
    zip: "12345",
    country: "Egypt",
  },
  officeHours: [
    { day: "Monday - Thursday", hours: "10:00 AM - 6:00 PM" },
    { day: "Friday", hours: "10:00 AM - 2:00 PM" },
    { day: "Saturday - Sunday", hours: "Closed" },
  ],
  socialMedia: {
    instagram: "https://instagram.com/hmwellness",
    facebook: "https://facebook.com/hmwellness",
    linkedin: "https://linkedin.com/in/hagarmoharam",
  },
}

// Pricing Tiers
export const pricingConfig = {
  currency: {
    egypt: "EGP",
    international: "USD",
  },
  tiers: {
    egypt: {
      regular: 600,
      student: 400, // After promo code (600 - 200)
    },
    international: 30,
  },
  // Student promo code
  studentPromo: {
    code: "STUDENT200",
    discount: 200,
    message: {
      en: "Students can get a 200 EGP discount with a valid student ID. Contact us on WhatsApp to get your promo code.",
      ar: "يمكن للطلاب الحصول على خصم 200 جنيه مصري مع بطاقة طالب صالحة. اتصل بنا على WhatsApp للحصول على رمز الخصم الخاص بك.",
    },
  },
}

// Email Settings - Hostinger Only
export const emailConfig = {
  // Hostinger email configuration
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // Use SSL for port 465
  user: "hagar@hmwellness.site",
  password: process.env.EMAIL_PASSWORD || "",
  fromName: "HM Wellness",

  // Admin email for notifications (same as sender)
  adminEmail: "hagar@hmwellness.site",
}

// Google Calendar Integration
export const calendarConfig = {
  enabled: true, // Set to true to enable Google Calendar integration
  calendarId: "hagarmoharam7@gmail.com", // Google Calendar ID
  timeZone: "Africa/Cairo", // Time zone for appointments
  credentials: {
    clientId: process.env.GOOGLE_CLIENT_ID || "", // Google OAuth client ID
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // Google OAuth client secret
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN || "", // Google OAuth refresh token
    redirectUri: process.env.GOOGLE_REDIRECT_URI || "https://hmwellness.co/api/auth/callback/google",
  },
}

// Payment Settings
export const paymentConfig = {
  // Payment gateway
  gateway: {
    enabled: true,
    name: "Kashier",
    description: "Secure payment processing",
    testMode: true,
    merchantId: "MID-33722-173",
    apiKey: "1f175f51-baea-4497-bba2-fbcb9a530abb",
    secretKey:
      "ea88d1dd8c266c5b7501ec8d68c97a91$6abfe0ea86ba0ea798701694eaeddfffd23eff7dac790f4605366dee4b947c86a8ce980827de0cbb52a5ae53393e5c8e",
  },
  // Manual payment methods
  manualPayment: {
    vodafoneCash: {
      number: "+20 1090250475",
      name: "Hagar Moharam",
    },
    bankTransfer: {
      bank: "CIB Bank",
      accountName: "Hagar Moharam",
      accountNumber: "1234567890",
    },
  },
  // Confirmation method
  requireManualConfirmation: true,
}

// Language Settings
export const languageConfig = {
  defaultLanguage: "en", // Default language
  availableLanguages: [
    { code: "en", name: "English", direction: "ltr" },
    { code: "ar", name: "العربية", direction: "rtl" },
  ],
  askOnFirstVisit: true, // Ask for language preference on first visit
}

// Home Page Content
export const homeContent = {
  // Hero Section
  hero: {
    title: {
      en: "Transform Your Life with HM Wellness",
      ar: "غير حياتك مع إتش إم ويلنس",
    },
    description: {
      en: "Discover your true potential with Hagar Moharam, a certified life coach dedicated to helping you achieve your goals and live a more fulfilling life.",
      ar: "اكتشف إمكاناتك الحقيقية مع هاجر محرم، مدربة حياة معتمدة مكرسة لمساعدتك على تحقيق أهدافك والعيش حياة أكثر إشباعًا.",
    },
    image: "/placeholder.svg?height=550&width=550", // Replace with your image
  },

  // Services Section
  services: {
    title: {
      en: "Why Choose Us",
      ar: "لماذا تختارنا",
    },
    subtitle: {
      en: "Personalized Coaching Experience",
      ar: "تجربة تدريب شخصية",
    },
    description: {
      en: "We provide tailored coaching sessions designed to address your specific needs and help you overcome obstacles in your personal and professional life.",
      ar: "نقدم جلسات تدريب مخصصة مصممة لتلبية احتياجاتك الخاصة ومساعدتك على التغلب على العقبات في حياتك الشخصية والمهنية.",
    },
    items: [
      {
        title: { en: "Personal Growth", ar: "النمو الشخصي" },
        description: {
          en: "Develop self-awareness, build confidence, and discover your true purpose in life.",
          ar: "تطوير الوعي الذاتي، وبناء الثقة، واكتشاف هدفك الحقيقي في الحياة.",
        },
      },
      {
        title: { en: "Goal Achievement", ar: "تحقيق الأهداف" },
        description: {
          en: "Set meaningful goals, create actionable plans, and stay accountable to achieve success.",
          ar: "وضع أهداف ذات معنى، وإنشاء خطط قابلة للتنفيذ، والبقاء مسؤولاً لتحقيق النجاح.",
        },
      },
      {
        title: { en: "Work-Life Balance", ar: "التوازن بين العمل والحياة" },
        description: {
          en: "Find harmony between your professional ambitions and personal well-being.",
          ar: "إيجاد التناغم بين طموحاتك المهنية ورفاهيتك الشخصية.",
        },
      },
    ],
  },

  // Testimonials
  testimonials: {
    title: {
      en: "What Our Clients Say",
      ar: "ماذا يقول عملاؤنا",
    },
    description: {
      en: "Read testimonials from people who have transformed their lives through coaching.",
      ar: "اقرأ شهادات من أشخاص غيروا حياتهم من خلال التدريب.",
    },
    items: [
      {
        text: {
          en: "Working with Hagar has been transformative. Her guidance helped me clarify my goals and take meaningful steps toward achieving them. I'm more confident and focused than ever before.",
          ar: "العمل مع هاجر كان تحويليًا. ساعدتني إرشاداتها على توضيح أهدافي واتخاذ خطوات هادفة نحو تحقيقها. أنا أكثر ثقة وتركيزًا من أي وقت مضى.",
        },
        author: "Sarah K.",
      },
      {
        text: {
          en: "Hagar's coaching style is both compassionate and effective. She helped me overcome obstacles that had been holding me back for years. I highly recommend her services to anyone looking to grow.",
          ar: "أسلوب هاجر في التدريب متعاطف وفعال. ساعدتني على التغلب على العقبات التي كانت تعيقني لسنوات. أوصي بشدة بخدماتها لأي شخص يتطلع إلى النمو.",
        },
        author: "Michael T.",
      },
    ],
  },
}

// About Page Content
export const aboutContent = {
  hero: {
    title: {
      en: "About HM Wellness",
      ar: "عن إتش إم ويلنس",
    },
    description: [
      {
        en: "Founded by Hagar Moharam, HM Wellness is dedicated to helping individuals achieve personal growth and transformation through professional coaching.",
        ar: "تأسست إتش إم ويلنس على يد هاجر محرم، وهي مكرسة لمساعدة الأفراد على تحقيق النمو الشخصي والتحول من خلال التدريب المهني.",
      },
      {
        en: "With a background in psychology and extensive training in various coaching methodologies, Hagar provides a unique approach that combines evidence-based techniques with intuitive guidance.",
        ar: "مع خلفية في علم النفس وتدريب مكثف في مختلف منهجيات التدريب، تقدم هاجر نهجًا فريدًا يجمع بين التقنيات القائمة على الأدلة والتوجيه الحدسي.",
      },
      {
        en: "Our mission is to help you discover your true potential, overcome obstacles, and create a life that aligns with your deepest values and aspirations.",
        ar: "مهمتنا هي مساعدتك على اكتشاف إمكاناتك الحقيقية، والتغلب على العقبات، وخلق حياة تتماشى مع قيمك وتطلعاتك العميقة.",
      },
    ],
    image: "/placeholder.svg?height=800&width=800", // Replace with your image
  },

  qualifications: {
    title: {
      en: "Our Qualifications",
      ar: "مؤهلاتنا",
    },
    sections: [
      {
        title: { en: "Certifications", ar: "الشهادات" },
        items: [
          { en: "Certified Professional Coach (ICF)", ar: "مدرب محترف معتمد (ICF)" },
          { en: "Neuro-Linguistic Programming Practitioner", ar: "ممارس البرمجة اللغوية العصبية" },
          { en: "Emotional Intelligence Coach", ar: "مدرب الذكاء العاطفي" },
          { en: "Mindfulness-Based Stress Reduction", ar: "تقليل التوتر القائم على اليقظة الذهنية" },
        ],
      },
      {
        title: { en: "Education", ar: "التعليم" },
        items: [
          { en: "Master's in Psychology", ar: "ماجستير في علم النفس" },
          { en: "Bachelor's in Human Development", ar: "بكالوريوس في التنمية البشرية" },
          { en: "Advanced Training in Positive Psychology", ar: "تدريب متقدم في علم النفس الإيجابي" },
          { en: "Continuing Education in Coaching Techniques", ar: "التعليم المستمر في تقنيات التدريب" },
        ],
      },
      {
        title: { en: "Experience", ar: "الخبرة" },
        items: [
          { en: "10+ Years as a Professional Coach", ar: "+10 سنوات كمدرب محترف" },
          { en: "Worked with 500+ Clients", ar: "عملت مع أكثر من 500 عميل" },
          { en: "Corporate Wellness Programs", ar: "برامج الرفاهية للشركات" },
          { en: "Group and Individual Coaching", ar: "التدريب الجماعي والفردي" },
        ],
      },
    ],
  },

  philosophy: {
    title: {
      en: "Our Coaching Philosophy",
      ar: "فلسفتنا في التدريب",
    },
    description: {
      en: "We believe that everyone has the inner resources they need to create positive change in their lives. Our role is to help you access those resources and use them effectively.",
      ar: "نؤمن بأن كل شخص لديه الموارد الداخلية التي يحتاجها لإحداث تغيير إيجابي في حياته. دورنا هو مساعدتك في الوصول إلى تلك الموارد واستخدامها بفعالية.",
    },
    items: [
      {
        title: { en: "Client-Centered Approach", ar: "نهج يركز على العميل" },
        description: {
          en: "We tailor our coaching to your unique needs, goals, and learning style. There's no one-size-fits-all in our practice. Each session is designed specifically for you.",
          ar: "نصمم تدريبنا وفقًا لاحتياجاتك وأهدافك وأسلوب التعلم الفريد. لا يوجد حل واحد يناسب الجميع في ممارستنا. كل جلسة مصممة خصيصًا لك.",
        },
      },
      {
        title: { en: "Holistic Perspective", ar: "منظور شامل" },
        description: {
          en: "We consider all aspects of your life—career, relationships, health, personal growth—because they're all interconnected. Improvement in one area often leads to positive changes in others.",
          ar: "نحن ننظر في جميع جوانب حياتك - المهنة والعلاقات والصحة والنمو الشخصي - لأنها كلها مترابطة. التحسن في مجال واحد غالبًا ما يؤدي إلى تغييرات إيجابية في المجالات الأخرى.",
        },
      },
      {
        title: { en: "Action-Oriented", ar: "موجه نحو العمل" },
        description: {
          en: "While reflection is important, we emphasize taking concrete steps toward your goals. Each session ends with clear action items to maintain momentum.",
          ar: "في حين أن التفكير مهم، فإننا نؤكد على اتخاذ خطوات ملموسة نحو أهدافك. تنتهي كل جلسة بعناصر عمل واضحة للحفاظ على الزخم.",
        },
      },
      {
        title: { en: "Compassionate Accountability", ar: "المساءلة الرحيمة" },
        description: {
          en: "We provide a supportive environment while also holding you accountable to your commitments. This balance helps you stay motivated and make consistent progress.",
          ar: "نحن نوفر بيئة داعمة مع محاسبتك على التزاماتك. يساعدك هذا التوازن على البقاء متحمسًا وإحراز تقدم متسق.",
        },
      },
    ],
  },
}

// Services Page Content
export const servicesContent = {
  hero: {
    title: {
      en: "Coaching Services",
      ar: "خدمات التدريب",
    },
    description: {
      en: "Discover the transformative coaching services designed to help you achieve your goals and live a more fulfilling life.",
      ar: "اكتشف خدمات التدريب التحويلية المصممة لمساعدتك على تحقيق أهدافك والعيش حياة أكثر إشباعًا.",
    },
  },

  services: [
    {
      title: { en: "Personal Development", ar: "التطوير الشخصي" },
      subtitle: { en: "Discover your true potential", ar: "اكتشف إمكاناتك الحقيقية" },
      description: {
        en: "This coaching program focuses on self-discovery, building confidence, and developing a growth mindset. We'll work together to identify your strengths, overcome limiting beliefs, and create a personal development plan that aligns with your values.",
        ar: "يركز برنامج التدريب هذا على اكتشاف الذات، وبناء الثقة، وتطوير عقلية النمو. سنعمل معًا لتحديد نقاط قوتك، والتغلب على المعتقدات المحدودة، وإنشاء خطة تطوير شخصية تتماشى مع قيمك.",
      },
      features: [
        { en: "Self-awareness and emotional intelligence", ar: "الوعي الذاتي والذكاء العاطفي" },
        { en: "Confidence building and self-esteem", ar: "بناء الثقة واحترام الذات" },
        { en: "Overcoming limiting beliefs", ar: "التغلب على المعتقدات المحدودة" },
        { en: "Developing resilience and adaptability", ar: "تطوير المرونة والقدرة على التكيف" },
      ],
    },
    {
      title: { en: "Career Coaching", ar: "تدريب المهنة" },
      subtitle: { en: "Achieve professional success", ar: "حقق النجاح المهني" },
      description: {
        en: "Whether you're looking to advance in your current role, change careers, or start your own business, this coaching program will help you clarify your professional goals and develop strategies to achieve them.",
        ar: "سواء كنت تتطلع إلى التقدم في دورك الحالي، أو تغيير المهنة، أو بدء عملك الخاص، سيساعدك برنامج التدريب هذا على توضيح أهدافك المهنية وتطوير استراتيجيات لتحقيقها.",
      },
      features: [
        { en: "Career path clarification", ar: "توضيح المسار المهني" },
        { en: "Professional goal setting", ar: "تحديد الأهداف المهنية" },
        { en: "Leadership development", ar: "تطوير القيادة" },
        { en: "Work-life balance strategies", ar: "استراتيجيات التوازن بين العمل والحياة" },
      ],
    },
    {
      title: { en: "Life Transition Coaching", ar: "تدريب الانتقال في الحياة" },
      subtitle: { en: "Navigate change with confidence", ar: "تنقل التغيير بثقة" },
      description: {
        en: "Major life transitions can be challenging. This coaching program provides support and guidance as you navigate significant changes such as relocation, career shifts, relationship changes, or other life transitions.",
        ar: "يمكن أن تكون التحولات الكبيرة في الحياة صعبة. يوفر برنامج التدريب هذا الدعم والتوجيه أثناء تنقلك في التغييرات المهمة مثل الانتقال، وتحولات المهنة، وتغييرات العلاقة، أو غيرها من تحولات الحياة.",
      },
      features: [
        { en: "Adapting to change", ar: "التكيف مع التغيير" },
        { en: "Decision-making strategies", ar: "استراتيجيات صنع القرار" },
        { en: "Building support systems", ar: "بناء أنظمة الدعم" },
        { en: "Creating new routines and habits", ar: "إنشاء روتين وعادات جديدة" },
      ],
    },
  ],

  process: {
    title: {
      en: "How It Works",
      ar: "كيف يعمل",
    },
    description: {
      en: "Our coaching process is designed to provide you with clarity, support, and actionable steps to achieve your goals.",
      ar: "تم تصميم عملية التدريب لدينا لتزويدك بالوضوح والدعم وخطوات قابلة للتنفيذ لتحقيق أهدافك.",
    },
    steps: [
      {
        number: 1,
        title: { en: "Discovery", ar: "الاكتشاف" },
        description: {
          en: "We begin with a comprehensive assessment of your current situation, goals, and challenges.",
          ar: "نبدأ بتقييم شامل لوضعك الحالي وأهدافك وتحدياتك.",
        },
      },
      {
        number: 2,
        title: { en: "Planning", ar: "التخطيط" },
        description: {
          en: "Together, we create a personalized action plan with clear objectives and milestones.",
          ar: "معًا، نقوم بإنشاء خطة عمل مخصصة بأهداف ومعالم واضحة.",
        },
      },
      {
        number: 3,
        title: { en: "Implementation", ar: "التنفيذ" },
        description: {
          en: "You take action with ongoing support, guidance, and accountability from us.",
          ar: "تتخذ إجراءات مع الدعم المستمر والتوجيه والمساءلة منا.",
        },
      },
      {
        number: 4,
        title: { en: "Evaluation", ar: "التقييم" },
        description: {
          en: "We regularly review progress, celebrate successes, and adjust strategies as needed.",
          ar: "نراجع التقدم بانتظام، ونحتفل بالنجاحات، ونعدل الاستراتيجيات حسب الحاجة.",
        },
      },
    ],
  },

  pricing: {
    title: {
      en: "Pricing",
      ar: "الأسعار",
    },
    description: {
      en: "Invest in yourself with our coaching services.",
      ar: "استثمر في نفسك مع خدمات التدريب لدينا.",
    },
    plans: [
      {
        title: { en: "Single Session", ar: "جلسة واحدة" },
        description: { en: "One 60-minute coaching session", ar: "جلسة تدريب لمدة 60 دقيقة" },
        price: {
          egypt: "600 EGP",
          international: "$30",
        },
        period: { en: "per session", ar: "لكل جلسة" },
        features: [
          { en: "60-minute online session", ar: "جلسة عبر الإنترنت لمدة 60 دقيقة" },
          { en: "Session recording available", ar: "تسجيل الجلسة متاح" },
          { en: "Follow-up email with action items", ar: "متابعة البريد الإلكتروني مع عناصر العمل" },
          { en: "Email support for 1 week", ar: "دعم البريد الإلكتروني لمدة أسبوع واحد" },
        ],
        featured: false,
      },
      {
        title: { en: "Monthly Package", ar: "الباقة الشهرية" },
        description: { en: "Four 60-minute sessions", ar: "أربع جلسات لمدة 60 دقيقة" },
        price: {
          egypt: "2,000 EGP",
          international: "$100",
        },
        period: { en: "per month", ar: "شهريًا" },
        features: [
          { en: "4 weekly 60-minute sessions", ar: "4 جلسات أسبوعية لمدة 60 دقيقة" },
          { en: "Session recordings available", ar: "تسجيلات الجلسات متاحة" },
          { en: "Detailed action plan", ar: "خطة عمل مفصلة" },
          { en: "Unlimited email support", ar: "دعم البريد الإلكتروني غير المحدود" },
          { en: "Progress tracking", ar: "تتبع التقدم" },
        ],
        featured: true,
      },
      {
        title: { en: "3-Month Program", ar: "برنامج 3 أشهر" },
        description: { en: "Twelve 60-minute sessions", ar: "اثنتا عشرة جلسة لمدة 60 دقيقة" },
        price: {
          egypt: "5,400 EGP",
          international: "$270",
        },
        period: { en: "($90 per month)", ar: "(90$ شهريًا)" },
        features: [
          { en: "12 weekly 60-minute sessions", ar: "12 جلسة أسبوعية لمدة 60 دقيقة" },
          { en: "Session recordings available", ar: "تسجيلات الجلسات متاحة" },
          { en: "Comprehensive development plan", ar: "خطة تطوير شاملة" },
          { en: "Unlimited email support", ar: "دعم البريد الإلكتروني غير المحدود" },
          { en: "Priority scheduling", ar: "جدولة ذات أولوية" },
          { en: "Monthly progress reviews", ar: "مراجعات التقدم الشهرية" },
        ],
        featured: false,
      },
    ],
  },
}

// Workshops Page Content
export const workshopsContent = {
  hero: {
    title: {
      en: "Workshops & Events",
      ar: "ورش العمل والفعاليات",
    },
    description: {
      en: "Join our transformative workshops and events designed to help you grow and connect with like-minded individuals.",
      ar: "انضم إلى ورش العمل والفعاليات التحويلية المصممة لمساعدتك على النمو والتواصل مع أشخاص يفكرون بنفس الطريقة.",
    },
  },

  upcoming: [
    {
      title: { en: "Finding Your Purpose Workshop", ar: "ورشة عمل إيجاد هدفك" },
      date: { en: "June 15, 2024", ar: "15 يونيو 2024" },
      time: { en: "10:00 AM - 1:00 PM", ar: "10:00 صباحًا - 1:00 مساءً" },
      location: { en: "Online via Zoom", ar: "عبر الإنترنت عبر Zoom" },
      description: {
        en: "A 3-hour interactive workshop to help you discover your life purpose and align your goals with your core values.",
        ar: "ورشة عمل تفاعلية لمدة 3 ساعات لمساعدتك على اكتشاف هدف حياتك ومواءمة أهدافك مع قيمك الأساسية.",
      },
      price: {
        egypt: {
          student: "300 EGP",
          regular: "450 EGP",
        },
        international: "$25",
      },
      image: "/placeholder.svg?height=400&width=600",
      featured: true,
    },
    {
      title: { en: "Stress Management Masterclass", ar: "ماستر كلاس إدارة التوتر" },
      date: { en: "July 8, 2024", ar: "8 يوليو 2024" },
      time: { en: "6:00 PM - 8:00 PM", ar: "6:00 مساءً - 8:00 مساءً" },
      location: { en: "Online via Zoom", ar: "عبر الإنترنت عبر Zoom" },
      description: {
        en: "Learn practical techniques to manage stress and build resilience in your daily life.",
        ar: "تعلم تقنيات عملية لإدارة التوتر وبناء المرونة في حياتك اليومية.",
      },
      price: {
        egypt: {
          student: "250 EGP",
          regular: "350 EGP",
        },
        international: "$20",
      },
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    },
    {
      title: { en: "Goal Setting & Achievement Retreat", ar: "معتكف تحديد الأهداف وتحقيقها" },
      date: { en: "August 20-21, 2024", ar: "20-21 أغسطس 2024" },
      time: { en: "9:00 AM - 4:00 PM", ar: "9:00 صباحًا - 4:00 مساءً" },
      location: { en: "Cairo Marriott Hotel", ar: "فندق ماريوت القاهرة" },
      description: {
        en: "A two-day immersive retreat to set meaningful goals and create actionable plans for achievement.",
        ar: "معتكف غامر لمدة يومين لتحديد أهداف ذات معنى وإنشاء خطط قابلة للتنفيذ لتحقيقها.",
      },
      price: {
        egypt: {
          student: "1,200 EGP",
          regular: "1,800 EGP",
        },
        international: "$100",
      },
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    },
  ],

  past: [
    {
      title: { en: "Emotional Intelligence Workshop", ar: "ورشة عمل الذكاء العاطفي" },
      date: { en: "April 10, 2024", ar: "10 أبريل 2024" },
      description: {
        en: "A workshop focused on developing emotional intelligence for better relationships and self-awareness.",
        ar: "ورشة عمل تركز على تطوير الذكاء العاطفي لعلاقات أفضل والوعي الذاتي.",
      },
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: { en: "Career Transition Seminar", ar: "ندوة الانتقال المهني" },
      date: { en: "March 5, 2024", ar: "5 مارس 2024" },
      description: {
        en: "A seminar for professionals looking to make meaningful career changes.",
        ar: "ندوة للمحترفين الذين يتطلعون إلى إجراء تغييرات مهنية ذات معنى.",
      },
      image: "/placeholder.svg?height=300&width=400",
    },
  ],
}

// Booking Page Content
export const bookingContent = {
  hero: {
    title: {
      en: "Book Your Coaching Session",
      ar: "احجز جلسة التدريب الخاصة بك",
    },
    description: {
      en: "Schedule your 60-minute online coaching session with Hagar Moharam.",
      ar: "جدول جلسة التدريب عبر الإنترنت لمدة 60 دقيقة مع هاجر محرم.",
    },
  },

  // Available time slots for booking
  timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],

  // Form labels and placeholders
  form: {
    name: {
      label: { en: "Full Name", ar: "الاسم الكامل" },
      placeholder: { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
    },
    email: {
      label: { en: "Email", ar: "البريد الإلكتروني" },
      placeholder: { en: "Enter your email address", ar: "أدخل عنوان بريدك الإلكتروني" },
    },
    phone: {
      label: { en: "Phone Number", ar: "رقم الهاتف" },
      placeholder: { en: "Enter your phone number", ar: "أدخل رقم هاتفك" },
    },
    message: {
      label: { en: "What would you like to focus on in our session?", ar: "على ماذا تريد أن تركز في جلستنا؟" },
      placeholder: {
        en: "Please share any specific goals or challenges you'd like to address...",
        ar: "يرجى مشاركة أي أهداف أو تحديات محددة ترغب في معالجتها...",
      },
    },
    promoCode: {
      label: { en: "Promo Code (if applicable)", ar: "رمز الخصم (إن وجد)" },
      placeholder: { en: "Enter promo code", ar: "أدخل رمز الخصم" },
    },
  },

  // Button labels
  buttons: {
    next: { en: "Next", ar: "التالي" },
    back: { en: "Back", ar: "رجوع" },
    submit: { en: "Submit Booking", ar: "تأكيد الحجز" },
    processing: { en: "Processing...", ar: "جاري المعالجة..." },
    bookNow: { en: "Book Now", ar: "احجز الآن" },
    returnHome: { en: "Return to Homepage", ar: "العودة إلى الصفحة الرئيسية" },
    addToCalendar: { en: "Add to Google Calendar", ar: "أضف إلى تقويم Google" },
  },

  // Section titles
  sections: {
    bookingSummary: { en: "Booking Summary", ar: "ملخص الحجز" },
    paymentMethod: { en: "Payment Method", ar: "طريقة الدفع" },
    bookingDetails: { en: "Booking Details", ar: "تفاصيل الحجز" },
    nextSteps: { en: "Next Steps", ar: "الخطوات التالية" },
  },

  // Success messages
  success: {
    title: { en: "Booking Confirmed!", ar: "تم تأكيد الحجز!" },
    description: { en: "Thank you for booking a session with HM Wellness.", ar: "شكرًا لحجز جلسة مع إتش إم ويلنس." },
  },

  // Student discount message
  studentDiscount: {
    message: {
      en: "Are you a student? Contact us on WhatsApp to get a special discount code.",
      ar: "هل أنت طالب؟ تواصل معنا على واتساب للحصول على رمز خصم خاص.",
    },
  },
}

// Contact Page Content
export const contactContent = {
  hero: {
    title: {
      en: "Get in Touch",
      ar: "تواصل معنا",
    },
    description: {
      en: "Have questions or want to learn more? Reach out and we'll get back to you soon.",
      ar: "هل لديك أسئلة أو ترغب في معرفة المزيد؟ تواصل معنا وسنرد عليك قريبًا.",
    },
  },
  form: {
    name: {
      label: { en: "Name", ar: "الاسم" },
      placeholder: { en: "Your name", ar: "اسمك" },
    },
    email: {
      label: { en: "Email", ar: "البريد الإلكتروني" },
      placeholder: { en: "Your email", ar: "بريدك الإلكتروني" },
    },
    subject: {
      label: { en: "Subject", ar: "الموضوع" },
      placeholder: { en: "What is this regarding?", ar: "بخصوص ماذا؟" },
    },
    message: {
      label: { en: "Message", ar: "الرسالة" },
      placeholder: { en: "Your message", ar: "رسالتك" },
    },
    submit: { en: "Send Message", ar: "إرسال الرسالة" },
  },
  contactInfo: {
    title: { en: "Contact Information", ar: "معلومات الاتصال" },
    description: {
      en: "Feel free to reach out through any of the following channels.",
      ar: "لا تتردد في التواصل من خلال أي من القنوات التالية.",
    },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    phone: { en: "Phone", ar: "الهاتف" },
    office: { en: "Office", ar: "المكتب" },
    officeHours: { en: "Office Hours", ar: "ساعات العمل" },
  },
}

// Admin Dashboard Content
export const adminConfig = {
  username: "admin",
  password: "password", // Change this to a secure password
  sections: [
    { id: "dashboard", label: { en: "Dashboard", ar: "لوحة التحكم" }, icon: "LayoutDashboard" },
    { id: "appointments", label: { en: "Appointments", ar: "المواعيد" }, icon: "Calendar" },
    { id: "clients", label: { en: "Clients", ar: "العملاء" }, icon: "Users" },
    { id: "content", label: { en: "Website Content", ar: "محتوى الموقع" }, icon: "FileEdit" },
    { id: "workshops", label: { en: "Workshops", ar: "ورش العمل" }, icon: "Users2" },
    { id: "settings", label: { en: "Settings", ar: "الإعدادات" }, icon: "Settings" },
  ],
}

// Legal Pages Content
export const legalContent = {
  privacy: {
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    lastUpdated: { en: "May 1, 2024", ar: "1 مايو 2024" },
    sections: [
      {
        title: { en: "Introduction", ar: "مقدمة" },
        content: {
          en: "At HM Wellness, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.",
          ar: "في إتش إم ويلنس، نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. ستخبرك سياسة الخصوصية هذه عن كيفية رعايتنا لبياناتك الشخصية عند زيارة موقعنا الإلكتروني وتخبرك عن حقوق الخصوصية الخاصة بك وكيف يحميك القانون.",
        },
      },
      {
        title: { en: "Information We Collect", ar: "المعلومات التي نجمعها" },
        content: {
          en: "We collect personal information that you voluntarily provide to us when you register on our website, express an interest in obtaining information about us or our services, participate in activities on our website, or otherwise contact us.",
          ar: "نجمع المعلومات الشخصية التي تقدمها لنا طواعية عند التسجيل في موقعنا الإلكتروني، أو التعبير عن اهتمامك بالحصول على معلومات عنا أو عن خدماتنا، أو المشاركة في الأنشطة على موقعنا الإلكتروني، أو الاتصال بنا بطريقة أخرى.",
        },
      },
      {
        title: { en: "How We Use Your Information", ar: "كيف نستخدم معلوماتك" },
        content: {
          en: "We use the information we collect in various ways, including to: provide, operate, and maintain our website; improve, personalize, and expand our website; understand and analyze how you use our website; develop new products, services, features, and functionality; communicate with you to provide you with updates and other information relating to the website, and for marketing and promotional purposes.",
          ar: "نستخدم المعلومات التي نجمعها بطرق مختلفة، بما في ذلك: توفير وتشغيل وصيانة موقعنا الإلكتروني؛ تحسين وتخصيص وتوسيع موقعنا الإلكتروني؛ فهم وتحليل كيفية استخدامك لموقعنا الإلكتروني؛ تطوير منتجات وخدمات وميزات ووظائف جديدة؛ التواصل معك لتزويدك بالتحديثات والمعلومات الأخرى المتعلقة بالموقع الإلكتروني، ولأغراض التسويق والترويج.",
        },
      },
      {
        title: { en: "How We Share Your Information", ar: "كيف نشارك معلوماتك" },
        content: {
          en: "We do not share or sell your personal information to third parties. However, we may share information with service providers who perform services for us, such as payment processing, data analysis, email delivery, hosting services, and customer service.",
          ar: "نحن لا نشارك أو نبيع معلوماتك الشخصية لأطراف ثالثة. ومع ذلك، قد نشارك المعلومات مع مقدمي الخدمات الذين يؤدون خدمات لنا، مثل معالجة الدفع، وتحليل البيانات، وتسليم البريد الإلكتروني، وخدمات الاستضافة، وخدمة العملاء.",
        },
      },
      {
        title: { en: "Your Rights", ar: "حقوقك" },
        content: {
          en: "You have the right to access, update or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your personal information directly within your account settings section.",
          ar: "لديك الحق في الوصول إلى المعلومات التي لدينا عنك أو تحديثها أو حذفها. كلما كان ذلك ممكنًا، يمكنك الوصول إلى معلوماتك الشخصية أو تحديثها أو طلب حذفها مباشرة ضمن قسم إعدادات حسابك.",
        },
      },
    ],
  },
  terms: {
    title: { en: "Terms and Conditions", ar: "الشروط والأحكام" },
    lastUpdated: { en: "May 1, 2024", ar: "1 مايو 2024" },
    sections: [
      {
        title: { en: "Introduction", ar: "مقدمة" },
        content: {
          en: "These terms and conditions outline the rules and regulations for the use of HM Wellness's Website. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use HM Wellness's website if you do not accept all of the terms and conditions stated on this page.",
          ar: "توضح هذه الشروط والأحكام القواعد واللوائح لاستخدام موقع إتش إم ويلنس. من خلال الوصول إلى هذا الموقع، نفترض أنك تقبل هذه الشروط والأحكام بالكامل. لا تستمر في استخدام موقع إتش إم ويلنس إذا كنت لا تقبل جميع الشروط والأحكام المذكورة في هذه الصفحة.",
        },
      },
      {
        title: { en: "Intellectual Property Rights", ar: "حقوق الملكية الفكرية" },
        content: {
          en: "Other than the content you own, under these terms, HM Wellness and/or its licensors own all the intellectual property rights and materials contained in this website. You are granted a limited license only for purposes of viewing the material contained on this website.",
          ar: "بخلاف المحتوى الذي تملكه، بموجب هذه الشروط، تمتلك إتش إم ويلنس و/أو المرخصون لها جميع حقوق الملكية الفكرية والمواد الواردة في هذا الموقع. يتم منحك ترخيصًا محدودًا فقط لأغراض عرض المواد الموجودة على هذا الموقع.",
        },
      },
      {
        title: { en: "Restrictions", ar: "القيود" },
        content: {
          en: "You are specifically restricted from: publishing any website material in any other media; selling, sublicensing and/or otherwise commercializing any website material; publicly performing and/or showing any website material; using this website in any way that is or may be damaging to this website; using this website in any way that impacts user access to this website.",
          ar: "أنت مقيد بشكل خاص من: نشر أي مادة من الموقع في أي وسائط أخرى؛ بيع أو ترخيص من الباطن و/أو تسويق أي مادة من الموقع بطريقة أخرى؛ أداء و/أو عرض أي مادة من الموقع علنًا؛ استخدام هذا الموقع بأي طريقة تكون أو قد تكون ضارة بهذا الموقع؛ استخدام هذا الموقع بأي طريقة تؤثر على وصول المستخدم إلى هذا الموقع.",
        },
      },
      {
        title: { en: "Your Content", ar: "المحتوى الخاص بك" },
        content: {
          en: "In these terms and conditions, 'Your Content' shall mean any audio, video, text, images or other material you choose to display on this website. By displaying Your Content, you grant HM Wellness a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.",
          ar: "في هذه الشروط والأحكام، 'المحتوى الخاص بك' يعني أي صوت أو فيديو أو نص أو صور أو مواد أخرى تختار عرضها على هذا الموقع. من خلال عرض المحتوى الخاص بك، فإنك تمنح إتش إم ويلنس ترخيصًا غير حصري وعالميًا وغير قابل للإلغاء وخاليًا من حقوق الملكية وقابلًا للترخيص من الباطن لاستخدامه ونسخه وتكييفه ونشره وترجمته وتوزيعه في أي وجميع وسائل الإعلام.",
        },
      },
      {
        title: { en: "No Warranties", ar: "لا ضمانات" },
        content: {
          en: "This website is provided 'as is,' with all faults, and HM Wellness makes no express or implied representations or warranties, of any kind related to this website or the materials contained on this website.",
          ar: "يتم توفير هذا الموقع 'كما هو'، مع جميع العيوب، ولا تقدم إتش إم ويلنس أي تمثيلات أو ضمانات صريحة أو ضمنية، من أي نوع متعلق بهذا الموقع أو المواد الموجودة على هذا الموقع.",
        },
      },
    ],
  },
  refund: {
    title: { en: "Refund Policy", ar: "سياسة الاسترداد" },
    lastUpdated: { en: "May 1, 2024", ar: "1 مايو 2024" },
    sections: [
      {
        title: { en: "Coaching Sessions", ar: "جلسات التدريب" },
        content: {
          en: "We understand that circumstances may arise that prevent you from attending a scheduled coaching session. Our refund policy for coaching sessions is as follows:",
          ar: "نحن نتفهم أن الظروف قد تنشأ وتمنعك من حضور جلسة تدريب مجدولة. سياسة الاسترداد الخاصة بنا لجلسات التدريب هي كما يلي:",
        },
      },
      {
        title: { en: "Cancellation Policy", ar: "سياسة الإلغاء" },
        content: {
          en: "If you need to cancel a scheduled coaching session, please notify us at least 24 hours in advance to receive a full refund or to reschedule your session. Cancellations made less than 24 hours before the scheduled session will not be eligible for a refund but may be rescheduled at our discretion.",
          ar: "إذا كنت بحاجة إلى إلغاء جلسة تدريب مجدولة، يرجى إخطارنا قبل 24 ساعة على الأقل للحصول على استرداد كامل أو لإعادة جدولة جلستك. عمليات الإلغاء التي تتم قبل أقل من 24 ساعة من الجلسة المجدولة لن تكون مؤهلة للاسترداد ولكن قد يتم إعادة جدولتها وفقًا لتقديرنا.",
        },
      },
      {
        title: { en: "No-Show Policy", ar: "سياسة عدم الحضور" },
        content: {
          en: "If you fail to attend a scheduled coaching session without prior notice, it will be considered a 'no-show' and you will not be eligible for a refund or rescheduling.",
          ar: "إذا فشلت في حضور جلسة تدريب مجدولة دون إشعار مسبق، فسيتم اعتبارها 'عدم حضور' ولن تكون مؤهلاً للاسترداد أو إعادة الجدولة.",
        },
      },
      {
        title: { en: "Workshops and Events", ar: "ورش العمل والفعاليات" },
        content: {
          en: "For workshops and events, refunds are available up to 7 days before the scheduled date. Cancellations made less than 7 days before the event will not be eligible for a refund but may be transferred to another person or applied to a future event at our discretion.",
          ar: "بالنسبة لورش العمل والفعاليات، تتوفر المبالغ المستردة حتى 7 أيام قبل التاريخ المحدد. عمليات الإلغاء التي تتم قبل أقل من 7 أيام من الحدث لن تكون مؤهلة للاسترداد ولكن قد يتم نقلها إلى شخص آخر أو تطبيقها على حدث مستقبلي وفقًا لتقديرنا.",
        },
      },
      {
        title: { en: "Contact Us", ar: "اتصل بنا" },
        content: {
          en: "If you have any questions about our refund policy, please contact us at hagar@hmwellness.co.",
          ar: "إذا كانت لديك أي أسئلة حول سياسة الاسترداد الخاصة بنا، يرجى الاتصال بنا على hagar@hmwellness.co.",
        },
      },
    ],
  },
  email: "hagar@hmwellness.site",
}

// Colors - Edit these to change your website's color scheme
export const colors = {
  primary: "#8e44ad", // Purple - main color
  secondary: "#e67e22", // Orange - accent color
  background: {
    light: "#f9f0ff", // Light purple background
    medium: "#f3e5f5", // Medium purple background
    dark: "#d1c4e9", // Dark purple background
  },
  text: {
    dark: "#2c3e50", // Dark text
    medium: "#34495e", // Medium text
    light: "#7f8c8d", // Light text
  },
}

// Feature Flags
export const featureFlags = {
  mainSiteEnabled: false, // Set to false to only show the workshop page
  workshopPaymentEnabled: false, // Set to true when ready to enable payment
}

// Workshop Configuration
export const workshopConfig = {
  title: "Transformative Coaching Workshop",
  date: "Next Friday",
  location: "New Cairo",
  duration: "3 hours",
  price: {
    regular: 600,
    earlyBird: 450,
  },
  currency: "EGP",
  maxParticipants: 20,
}

// Translation helper
export function t(key: any, lang = "en") {
  if (!key) return ""
  if (typeof key === "string") return key
  return key[lang] || key["en"] || ""
}
