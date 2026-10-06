import { SectionConfig, GlobalSettings } from "./cms-types";

export const DEFAULT_HOMEPAGE_SECTIONS: SectionConfig[] = [
  {
    id: "sec-hero-slider",
    type: "hero-slider",
    name: "Hero Banner Slider",
    category: "hero",
    isVisible: true,
    order: 0,
    design: {
      bgColor: "#0B1F3A",
      textColor: "#FFFFFF",
      animation: "fade"
    },
    data: {
      slides: [
        {
          id: "s1",
          title: "Welcome to AEC Network",
          subtitle: "Where Learning Inspires Growth, Knowledge Builds Confidence, and Every Student Matters.",
          image: "/images/banner-1",
          imageExt: "png",
          accentColor: "#4DA3D9",
          glowColor: "#EAF5FC",
          primaryBtn: { label: "Start Learning Today", href: "/admissions/apply" },
          secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" }
        },
        {
          id: "s2",
          title: "Where Knowledge Meets Opportunity",
          subtitle: "A modern learning experience designed to inspire growth, excellence, and lifelong success.",
          image: "/images/banner-2",
          imageExt: "png",
          accentColor: "#4DA3D9",
          glowColor: "#EAF5FC",
          primaryBtn: { label: "Explore All Courses", href: "/courses" },
          secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" }
        },
        {
          id: "s3",
          title: "Empowering Minds, Shaping Futures",
          subtitle: "Where Knowledge Inspires Growth, Skills Build Confidence, and Learning Creates New Opportunities.",
          image: "/images/banner-3",
          imageExt: "png",
          accentColor: "#4DA3D9",
          glowColor: "#EAF5FC",
          primaryBtn: { label: "View All Courses", href: "/courses" },
          secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" }
        }
      ]
    }
  },
  {
    id: "sec-mentor-counts",
    type: "mentor-counts",
    name: "Key Statistics / Metrics",
    category: "content",
    isVisible: true,
    order: 1,
    design: {
      bgColor: "#F8FAFC",
      paddingTop: "py-10",
      paddingBottom: "pb-10"
    },
    data: {
      stats: [
        { end: 1232, label: "Students", icon: "Users" },
        { end: 64, label: "Courses", icon: "BookOpen" },
        { end: 42, label: "Events", icon: "Calendar" },
        { end: 24, label: "Trainers", icon: "Award" }
      ]
    }
  },
  {
    id: "sec-mentor-about",
    type: "mentor-about",
    name: "About AEC Network Deliverables",
    category: "content",
    isVisible: true,
    order: 2,
    design: {
      bgColor: "#FFFFFF",
      paddingTop: "py-14",
      paddingBottom: "pb-14"
    },
    data: {
      headingBadge: "About AEC Network",
      title: "Empowering Students Through Holistic & Quality Online Education",
      paragraph1: "AEC Network is a forward-thinking educational ecosystem built to offer comprehensive, high-standard learning journeys for students of all ages worldwide.",
      paragraph2: "We specialize in personalized one-to-one learning environments, structured Islamic studies, school curriculum support, STEM mastery, and modern technical skills.",
      image: "/images/about-aec.jpg",
      bulletPoints: [
        "Certified Native & Sanad-Holder Instructors",
        "Individual 1-on-1 Class Pacing & Focused Mentorship",
        "Interactive Digital Classrooms with Live Support",
        "Transparent Parent Portal Progress & Attendance Tracking"
      ],
      ctaButton: { label: "Learn More About Us", href: "/about" }
    }
  },
  {
    id: "sec-popular-courses",
    type: "popular-courses",
    name: "Popular & Featured Courses",
    category: "education",
    isVisible: true,
    order: 3,
    design: {
      bgColor: "#F8FAFC",
      paddingTop: "py-16"
    },
    data: {
      badge: "Curated Curricula",
      title: "Popular & In-Demand Programs",
      subtitle: "Explore our most sought-after programs designed to cultivate mastery, character, and academic success.",
      courses: [
        {
          title: "Quran & Tajweed Mastery",
          slug: "tajweed-course",
          category: "Islamic Studies",
          price: "$45",
          image: "/images/courses/quran.jpg",
          blurb: "Structured, teacher-led learning of Noorani Qaida, Tajweed rules, fluent Nazra recitation, and articulation points.",
          trainer: { name: "Qari Ahmad", avatar: "/images/courses/qirat.jpg", students: 120, likes: 98 }
        },
        {
          title: "Islamic Studies & Translation of Quran",
          slug: "translation-of-quran",
          category: "Islamic Studies",
          price: "$50",
          image: "/images/courses/translation.jpg",
          blurb: "Word-by-word Quran translation, contextual Tafseer comprehension, foundational Aqeedah, and practical daily Fiqh.",
          trainer: { name: "Sheikh Bilal", avatar: "/images/team/member-01.jpg", students: 95, likes: 88 }
        },
        {
          title: "Hifz-ul-Quran (Quran Memorization)",
          slug: "hifz-quran",
          category: "Islamic Studies",
          price: "$55",
          image: "/images/courses/hifz.jpg",
          blurb: "Structured daily memorization (Sabaq), revision (Sabqi), and retention (Manzil) under Sanad-certified Huffaz.",
          trainer: { name: "Hafiz Usman", avatar: "/images/courses/qirat.jpg", students: 85, likes: 92 }
        },
        {
          title: "Computer Programming & Coding",
          slug: "computer-programming",
          category: "IT & Programming",
          price: "$60",
          image: "/images/courses/computer-programming.jpg",
          blurb: "Practical hands-on coding in Python, C++, and JavaScript with real-world game development and logic building.",
          trainer: { name: "Engr. Hamza", avatar: "/images/team/member-03.jpg", students: 110, likes: 99 }
        },
        {
          title: "Web Designing & Development",
          slug: "web-development",
          category: "IT & Programming",
          price: "$65",
          image: "/images/courses/web-development.jpg",
          blurb: "Learn modern responsive UI/UX, HTML5, CSS3, Tailwind, React, Next.js, and backend database systems.",
          trainer: { name: "Ali Raza", avatar: "/images/team/member-03.jpg", students: 78, likes: 84 }
        },
        {
          title: "GCSE & A Levels Prep",
          slug: "gcse",
          category: "School & Exam Prep",
          price: "$55",
          image: "/images/courses/gcse.jpg",
          blurb: "Expert subject coaching in Math, Sciences, and Humanities with 10-year past paper walkthroughs and grade boosters.",
          trainer: { name: "Dr. Sarah", avatar: "/images/team/member-02.jpg", students: 140, likes: 96 }
        }
      ]
    }
  },
  {
    id: "sec-one-to-one",
    type: "one-to-one",
    name: "One-to-One Showcase",
    category: "education",
    isVisible: true,
    order: 4,
    design: {
      bgColor: "#FFFFFF",
      paddingTop: "py-16"
    },
    data: {
      badge: "Exclusive 1-on-1 Format",
      title: "Personalized Tutoring Tailored to Each Learner",
      description: "Experience high-engagement tutoring where certified instructors cater directly to your child's pace, questions, and personal goals.",
      image: "/images/about-one-on-one.jpg",
      features: [
        { title: "Dedicated individual instructor", desc: "Single-student focus ensuring 100% attention without classroom distractions." },
        { title: "Pacing customized to student capability", desc: "Accelerate through strengths or spend extra sessions mastering difficult concepts." },
        { title: "Flexible rescheduling options", desc: "Coordinate class timings that comfortably fit around school, work, and family schedules." },
        { title: "Interactive instruction & immediate feedback", desc: "Live digital whiteboard, screen sharing, practical drills, and instant teacher corrections." }
      ],
      ctaBtn: { label: "Book Free 1-on-1 Trial", href: "/admissions/free-trial" }
    }
  },
  {
    id: "sec-pricing",
    type: "pricing",
    name: "Pricing & Fee Structure",
    category: "marketing",
    isVisible: true,
    order: 5,
    design: {
      bgColor: "#F8FAFC",
      paddingTop: "py-16"
    },
    data: {
      badge: "Affordable & Transparent",
      title: "Flexible Learning Plans",
      subtitle: "Choose the package that aligns with your educational goals. No contracts, cancel anytime.",
      showCurrencies: true
    }
  },
  {
    id: "sec-what-sets-us-apart",
    type: "what-sets-us-apart",
    name: "What Sets Us Apart",
    category: "content",
    isVisible: true,
    order: 6,
    design: {
      bgColor: "#FFFFFF",
      paddingTop: "py-16"
    },
    data: {
      badge: "Why Choose AEC",
      title: "What Sets Us Apart from Traditional Schools",
      features: [
        {
          id: "f1",
          title: "Personalized learning plan",
          description: "Customized learning roadmaps that hone focus and accelerate understanding according to individual student strengths."
        },
        {
          id: "f2",
          title: "24/7 Academic Support & Communication",
          description: "Have a query or need rescheduling? Reach our academic counselors round-the-clock without waiting for office hours."
        },
        {
          id: "f3",
          title: "Global Affordability & High Standard",
          description: "World-class education made accessible with transparent rates, family discounts, and verified Sanad-holder educators."
        },
        {
          id: "f4",
          title: "Real-Time Parent Dashboard",
          description: "Complete transparency with live attendance logging, teacher remarks, homework scores, and automated reports."
        }
      ]
    }
  },
  {
    id: "sec-scholar-team",
    type: "scholar-team",
    name: "Expert Instructors & Scholars",
    category: "utility",
    isVisible: true,
    order: 7,
    design: {
      bgColor: "#F8FAFC",
      paddingTop: "py-16"
    },
    data: {
      badge: "Our Faculty",
      title: "With Scholar Teachers, Everything Is Easier",
      subtitle: "Meet our certified instructors, Hafiz scholars, and credentialed subject matter specialists.",
      members: [
        { name: "Sophia Rose", role: "UX Teacher", image: "/images/team/member-01.jpg" },
        { name: "Cindy Walker", role: "Graphic Teacher", image: "/images/team/member-02.jpg" },
        { name: "David Hutson", role: "Full Stack Master", image: "/images/team/member-03.jpg" },
        { name: "Stella Blair", role: "Digital Animator", image: "/images/team/member-04.jpg" }
      ]
    }
  },
  {
    id: "sec-faqs",
    type: "faqs",
    name: "Frequently Asked Questions",
    category: "utility",
    isVisible: true,
    order: 8,
    design: {
      bgColor: "#FFFFFF",
      paddingTop: "py-16"
    },
    data: {
      badge: "Clear Answers",
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How does the AEC Network Free Trial class work?",
          a: "You can request a free trial class by filling out our short booking form. An academic counselor will review your preferred subject, assess proficiency level, and coordinate a scheduled live session with an assigned qualified instructor with no financial commitment."
        },
        {
          q: "What is the difference between One-to-One and Group Classes?",
          a: "One-to-One tutoring pairs a student with a dedicated teacher for personalized pacing, customized curriculum focus, and flexible scheduling. Group Classes offer interactive peer discussions, collaborative learning, and a structured cohort timetable."
        },
        {
          q: "How do parents monitor attendance and academic progress?",
          a: "Parents receive access to the dedicated Parent Portal, which features a multi-child switcher, real-time class attendance logs, automated absence alerts, assignment grades, teacher evaluation notes, and fee payment invoices."
        },
        {
          q: "What meeting platforms are used for live classes?",
          a: "Classes are conducted over verified platforms such as Zoom, Google Meet, or Microsoft Teams. Join links are protected and accessible directly from the authenticated Student and Teacher portal dashboards."
        },
        {
          q: "What are the fee payment terms and schedule?",
          a: "Fees are billed according to your selected billing plan (typically monthly or per-term). Invoices are generated automatically and can be settled via digital bank transfer or card with itemized payment receipts."
        }
      ]
    }
  },
  {
    id: "sec-cta-banner",
    type: "cta-banner",
    name: "Call to Action Banner",
    category: "marketing",
    isVisible: true,
    order: 9,
    design: {
      bgColor: "#0B1F3A",
      bgGradient: "linear-gradient(135deg, #0B1F3A 0%, #1e3a8a 100%)",
      textColor: "#FFFFFF",
      paddingTop: "py-14",
      paddingBottom: "pb-14",
      textAlign: "center"
    },
    data: {
      heading: "Ready to Accelerate Your Child's Academic & Islamic Journey?",
      subheading: "Book a 1-on-1 free evaluation trial with our certified instructors today. No credit card required.",
      primaryBtn: { label: "Book Free Trial Class", href: "/admissions/free-trial" },
      secondaryBtn: { label: "Explore Full Catalog", href: "/courses" }
    }
  }
];

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  siteTitle: "AEC Network — Online Islamic & Academic Education",
  tagline: "Where Learning Inspires Growth, Knowledge Builds Confidence",
  primaryColor: "#0B1F3A",
  secondaryColor: "#4DA3D9",
  accentColor: "#D4AF37",
  fontFamily: "Inter, sans-serif"
};
