import { SectionConfig } from "./cms-types";

export interface TemplateDefinition {
  type: string;
  name: string;
  category: "hero" | "content" | "education" | "media" | "marketing" | "utility" | "custom";
  description: string;
  iconName: string;
  defaultData: Record<string, any>;
  defaultDesign?: Record<string, any>;
}

export const SECTION_TEMPLATES: TemplateDefinition[] = [
  // --- HERO SECTIONS ---
  {
    type: "hero-slider",
    name: "Hero Slider",
    category: "hero",
    description: "Multi-slide dynamic hero with progress timer, primary/secondary buttons and custom images.",
    iconName: "Sliders",
    defaultData: {
      slides: [
        {
          id: "slide-1",
          title: "Inspire Your Learning Journey",
          subtitle: "Explore high standard Islamic and academic tutoring online with native scholars.",
          image: "/images/banner-1",
          imageExt: "png",
          accentColor: "#4DA3D9",
          glowColor: "#EAF5FC",
          primaryBtn: { label: "Enroll Now", href: "/admissions/apply" },
          secondaryBtn: { label: "Free Trial", href: "/admissions/free-trial" }
        }
      ]
    },
    defaultDesign: { bgColor: "#0B1F3A", textColor: "#FFFFFF" }
  },
  {
    type: "hero-video",
    name: "Hero with Video",
    category: "hero",
    description: "High impact hero with background or inline video player, overlay and call to action.",
    iconName: "Video",
    defaultData: {
      heading: "Experience the Future of Interactive Learning",
      subheading: "Live, dedicated teacher-led classes with comprehensive digital resources.",
      videoUrl: "/images/hero-video.mp4",
      primaryBtn: { label: "Watch Demo & Trial", href: "/admissions/free-trial" },
      secondaryBtn: { label: "Browse Courses", href: "/courses" }
    },
    defaultDesign: { bgColor: "#0B1F3A", bgOverlay: true, bgOverlayOpacity: 60 }
  },
  {
    type: "hero-split",
    name: "Split Hero (Image + Text)",
    category: "hero",
    description: "Classic 50/50 hero layout featuring prominent text on one side and showcase visual on the other.",
    iconName: "Columns",
    defaultData: {
      heading: "Master Quranic & Academic Excellence",
      subheading: "Structured 1-on-1 tutoring designed for kids and adults around the globe.",
      imageUrl: "/images/about-aec.jpg",
      primaryBtn: { label: "Start Free Class", href: "/admissions/free-trial" },
      secondaryBtn: { label: "Explore Curriculum", href: "/programs" }
    },
    defaultDesign: { bgColor: "#0B1F3A", textColor: "#FFFFFF", paddingTop: "py-20", paddingBottom: "pb-20" }
  },
  {
    type: "hero-fullscreen",
    name: "Full Screen Hero",
    category: "hero",
    description: "Full viewport height centered hero with bold title, subtitle and dual CTA buttons.",
    iconName: "Maximize",
    defaultData: {
      heading: "Global Education for Curious Minds",
      subheading: "Join thousands of learners achieving high grades and spiritual growth from home.",
      primaryBtn: { label: "Book Free Assessment", href: "/admissions/free-trial" },
      secondaryBtn: { label: "Contact Counselor", href: "/contact" }
    },
    defaultDesign: { bgColor: "#0B1F3A", bgGradient: "linear-gradient(135deg, #0B1F3A 0%, #1e3a8a 100%)", textAlign: "center" }
  },

  // --- CONTENT SECTIONS ---
  {
    type: "mentor-about",
    name: "About AEC Overview",
    category: "content",
    description: "Structured split view with image, badge, dual paragraphs, checkmarks and CTA link.",
    iconName: "Info",
    defaultData: {
      headingBadge: "About AEC Network",
      title: "Quality Online Education Designed for Every Learner",
      paragraph1: "We are committed to delivering tailored education combining academic rigor and moral values.",
      paragraph2: "Students benefit from certified teachers, individual pacing, and modern curriculum tools.",
      image: "/images/about-aec.jpg",
      bulletPoints: ["Sanad-Certified Instructors", "1-on-1 Flexible Scheduling", "Parent Monitoring Portal"],
      ctaButton: { label: "Learn More", href: "/about" }
    },
    defaultDesign: { bgColor: "#FFFFFF", paddingTop: "py-16" }
  },
  {
    type: "mentor-counts",
    name: "Statistics & Counter",
    category: "content",
    description: "Four animated statistic counter boxes with customizable numbers and labels.",
    iconName: "BarChart3",
    defaultData: {
      stats: [
        { end: 1250, label: "Active Students" },
        { end: 68, label: "Certified Courses" },
        { end: 45, label: "Live Workshops" },
        { end: 28, label: "Specialist Instructors" }
      ]
    },
    defaultDesign: { bgColor: "#F8FAFC", paddingTop: "py-12", paddingBottom: "pb-12" }
  },
  {
    type: "what-sets-us-apart",
    name: "What Sets Us Apart / Features",
    category: "content",
    description: "Feature grid highlighting unique benefits, high reliability, and educational advantages.",
    iconName: "CheckCircle2",
    defaultData: {
      badge: "Why Choose AEC",
      title: "What Sets Us Apart",
      features: [
        { id: "f1", title: "Personalized Learning Plan", description: "Pacing customized to each student's unique learning curve." },
        { id: "f2", title: "24/7 Academic Support", description: "Dedicated counselors always ready to assist students and parents." },
        { id: "f3", title: "Affordable Global Rates", description: "Top-tier quality education with family discount packages." },
        { id: "f4", title: "Transparent Portals", description: "Track attendance, homework, and reports in real time." }
      ]
    },
    defaultDesign: { bgColor: "#FFFFFF", paddingTop: "py-16" }
  },
  {
    type: "rich-text",
    name: "Rich Text Section",
    category: "content",
    description: "Custom heading, lead paragraph and formatted rich text block for announcements or articles.",
    iconName: "FileText",
    defaultData: {
      title: "A Message from Academic Leadership",
      subtitle: "Our Commitment to Educational Excellence",
      contentHtml: "<p>At AEC Network, we believe that education extends beyond textbook memorization. Our interactive environment nurtures critical thinking, curiosity, and ethical principles.</p><p>Every teacher is thoroughly vetted and trained to inspire confidence in learners of all ages.</p>"
    },
    defaultDesign: { bgColor: "#FFFFFF", paddingTop: "py-16", textAlign: "left" }
  },

  // --- EDUCATION SECTIONS ---
  {
    type: "popular-courses",
    name: "Popular Courses Grid",
    category: "education",
    description: "Interactive cards displaying course titles, categories, pricing, badges, and teacher info.",
    iconName: "GraduationCap",
    defaultData: {
      badge: "Curated Curricula",
      title: "Popular & In-Demand Programs",
      subtitle: "Explore our most sought-after programs designed to cultivate mastery and character.",
      courses: [
        {
          title: "Quran & Tajweed Mastery",
          category: "Islamic Studies",
          price: "$45",
          image: "/images/courses/quran.jpg",
          blurb: "Structured, teacher-led learning of Noorani Qaida, Tajweed rules, and Nazra recitation.",
          trainer: { name: "Qari Ahmad", avatar: "/images/courses/qirat.jpg", students: 120, likes: 98 }
        },
        {
          title: "GCSE & A Levels Prep",
          category: "School & Exam Prep",
          price: "$55",
          image: "/images/courses/gcse.jpg",
          blurb: "Expert subject coaching in Math, Sciences, and Humanities with 10-year past paper walkthroughs.",
          trainer: { name: "Dr. Sarah", avatar: "/images/team/member-02.jpg", students: 140, likes: 96 }
        }
      ]
    },
    defaultDesign: { bgColor: "#F8FAFC", paddingTop: "py-16" }
  },
  {
    type: "one-to-one",
    name: "One-to-One Showcase",
    category: "education",
    description: "Dedicated section highlighting private 1-on-1 tutoring benefits with floating visual.",
    iconName: "UserCheck",
    defaultData: {
      badge: "Exclusive 1-on-1 Format",
      title: "Personalized Tutoring Tailored to Each Learner",
      description: "Direct instructor focus ensuring full clarity, customized exercises, and zero distractions.",
      image: "/images/about-one-on-one.jpg",
      features: [
        { title: "Individual attention", desc: "Single-student focus for maximum engagement." },
        { title: "Customized pace", desc: "Spend extra time on challenging topics." },
        { title: "Flexible timetable", desc: "Choose hours that fit your home routine." },
        { title: "Live feedback", desc: "Instant teacher corrections on live digital board." }
      ],
      ctaBtn: { label: "Book Free 1-on-1 Trial", href: "/admissions/free-trial" }
    },
    defaultDesign: { bgColor: "#FFFFFF", paddingTop: "py-16" }
  },

  // --- MEDIA SECTIONS ---
  {
    type: "image-gallery",
    name: "Image Gallery",
    category: "media",
    description: "Responsive multi-column visual showcase grid with image captions and light hover effects.",
    iconName: "Image",
    defaultData: {
      badge: "Campus & Community",
      title: "Life at AEC Network",
      images: [
        { url: "/images/banner-1.png", title: "Digital Classrooms" },
        { url: "/images/about-aec.jpg", title: "Dedicated Study" },
        { url: "/images/banner-2.png", title: "Interactive Whiteboards" },
        { url: "/images/about-one-on-one.jpg", title: "1-on-1 Consultations" }
      ]
    },
    defaultDesign: { bgColor: "#FFFFFF", paddingTop: "py-16" }
  },
  {
    type: "testimonials",
    name: "Student & Parent Testimonials",
    category: "media",
    description: "Review cards featuring student/parent quotes, ratings, avatars, and location tags.",
    iconName: "Quote",
    defaultData: {
      badge: "Parent & Student Feedback",
      title: "What Families Say About AEC",
      testimonials: [
        {
          quote: "The one-on-one Tajweed classes transformed my son's recitation within 2 months. Truly exceptional teachers!",
          author: "Fatima K.",
          role: "Parent, UK",
          rating: 5
        },
        {
          quote: "Our daughter improved two grade letters in GCSE Mathematics thanks to her tutor's step-by-step patience.",
          author: "Tariq M.",
          role: "Parent, Canada",
          rating: 5
        },
        {
          quote: "Flexible class rescheduling made it possible to learn alongside my university schedule without any hassle.",
          author: "Zainab A.",
          role: "Student, Australia",
          rating: 5
        }
      ]
    },
    defaultDesign: { bgColor: "#F8FAFC", paddingTop: "py-16" }
  },

  // --- MARKETING SECTIONS ---
  {
    type: "pricing",
    name: "Pricing & Fee Structure",
    category: "marketing",
    description: "Interactive multi-currency pricing plans grid with class frequencies and inclusions.",
    iconName: "CreditCard",
    defaultData: {
      badge: "Transparent Plans",
      title: "Flexible Learning Packages",
      subtitle: "Choose the timetable that best fits your goals. Zero admission fees.",
      showCurrencies: true
    },
    defaultDesign: { bgColor: "#F8FAFC", paddingTop: "py-16" }
  },
  {
    type: "cta-banner",
    name: "Call to Action Banner",
    category: "marketing",
    description: "Attention-grabbing full-width banner with heading, description, and dual action buttons.",
    iconName: "Megaphone",
    defaultData: {
      heading: "Ready to Accelerate Your Child's Academic & Islamic Journey?",
      subheading: "Book a 1-on-1 free trial session with our certified instructors today. No credit card required.",
      primaryBtn: { label: "Book Free Trial Class", href: "/admissions/free-trial" },
      secondaryBtn: { label: "Explore All Courses", href: "/courses" }
    },
    defaultDesign: {
      bgColor: "#0B1F3A",
      bgGradient: "linear-gradient(135deg, #0B1F3A 0%, #1e3a8a 100%)",
      textColor: "#FFFFFF",
      paddingTop: "py-16",
      paddingBottom: "pb-16",
      textAlign: "center"
    }
  },
  {
    type: "newsletter",
    name: "Newsletter / Announcement Banner",
    category: "marketing",
    description: "Compact high-converting bar for updates, discount alerts, and academic newsletters.",
    iconName: "Mail",
    defaultData: {
      title: "Join AEC Network Academic Circle",
      description: "Receive monthly educational resources, Tajweed guides, and trial workshop invites.",
      buttonLabel: "Subscribe Free",
      placeholder: "Enter your email address..."
    },
    defaultDesign: { bgColor: "#F1F5F9", paddingTop: "py-12", paddingBottom: "pb-12" }
  },

  // --- UTILITY SECTIONS ---
  {
    type: "scholar-team",
    name: "Instructors & Faculty",
    category: "utility",
    description: "Faculty grid with profile photos, specializations, and bios.",
    iconName: "Users",
    defaultData: {
      badge: "Our Faculty",
      title: "Our Expert Instructors & Scholars",
      subtitle: "Sanad-certified Islamic scholars and credentialed STEM educators.",
      members: [
        { name: "Sophia Rose", role: "UX & Tech Tutor", image: "/images/team/member-01.jpg" },
        { name: "Cindy Walker", role: "Science Specialist", image: "/images/team/member-02.jpg" },
        { name: "David Hutson", role: "Coding & Logic Instructor", image: "/images/team/member-03.jpg" },
        { name: "Stella Blair", role: "Language Coach", image: "/images/team/member-04.jpg" }
      ]
    },
    defaultDesign: { bgColor: "#FFFFFF", paddingTop: "py-16" }
  },
  {
    type: "faqs",
    name: "Frequently Asked Questions",
    category: "utility",
    description: "Accordion FAQ with smooth expand/collapse and searchable answers.",
    iconName: "HelpCircle",
    defaultData: {
      badge: "Clear Answers",
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How does the AEC Network Free Trial class work?",
          a: "You can request a free trial class by filling out our short booking form. An academic counselor will review your preferred subject and coordinate a scheduled live session with an assigned qualified instructor with no financial commitment."
        },
        {
          q: "What is the difference between One-to-One and Group Classes?",
          a: "One-to-One tutoring pairs a student with a dedicated teacher for personalized pacing, customized curriculum focus, and flexible scheduling. Group Classes offer interactive peer discussions and a structured cohort timetable."
        },
        {
          q: "How do parents monitor attendance and academic progress?",
          a: "Parents receive access to the dedicated Parent Portal, which features a multi-child switcher, real-time class attendance logs, automated absence alerts, assignment grades, teacher evaluation notes, and fee payment invoices."
        }
      ]
    },
    defaultDesign: { bgColor: "#FFFFFF", paddingTop: "py-16" }
  },
  {
    type: "contact-box",
    name: "Contact & Counselor Form",
    category: "utility",
    description: "Interactive consultation booking form with email, WhatsApp link and office timings.",
    iconName: "PhoneCall",
    defaultData: {
      badge: "Get In Touch",
      title: "Speak with an Academic Counselor",
      description: "We are available 24/7 to guide you on syllabus placement, class schedules, and teacher pairing.",
      email: "info@aecnetwork.com",
      phone: "+44 20 7946 0912",
      buttonLabel: "Send Message",
      address: "London, UK & Worldwide Digital Campus"
    },
    defaultDesign: { bgColor: "#F8FAFC", paddingTop: "py-16" }
  },

  // --- CUSTOM SECTION ---
  {
    type: "custom",
    name: "Custom Multi-Column Section",
    category: "custom",
    description: "Freeform section builder: add rows, configure column layouts, and insert headings, text, buttons, images, and videos.",
    iconName: "Layers",
    defaultData: {
      badge: "Custom Content",
      title: "Your Custom Section Title",
      subtitle: "Add headings, columns, media, buttons, and styled text directly from the builder.",
      rows: [
        {
          id: "row-1",
          columns: [
            {
              id: "col-1",
              width: "col-span-12 md:col-span-6",
              elements: [
                { id: "el-1", type: "heading", content: "Empower Your Potential", level: 3 },
                { id: "el-2", type: "paragraph", content: "Write custom copy, format paragraphs, or embed links with complete freedom." },
                { id: "el-3", type: "button", buttons: [{ label: "Get Started", href: "/admissions/apply", variant: "primary" }] }
              ]
            },
            {
              id: "col-2",
              width: "col-span-12 md:col-span-6",
              elements: [
                { id: "el-4", type: "image", url: "/images/banner-1.png", alt: "Custom Image Showcase" }
              ]
            }
          ]
        }
      ]
    },
    defaultDesign: { bgColor: "#FFFFFF", paddingTop: "py-16", paddingBottom: "pb-16" }
  }
];

export function createSectionFromTemplate(template: TemplateDefinition, order: number): SectionConfig {
  const uniqueId = `sec-${template.type}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  return {
    id: uniqueId,
    type: template.type,
    name: template.name,
    category: template.category,
    isVisible: true,
    order,
    design: template.defaultDesign ? { ...template.defaultDesign } : { bgColor: "#FFFFFF", paddingTop: "py-14" },
    data: JSON.parse(JSON.stringify(template.defaultData)),
  };
}
