import Link from "next/link";

const COURSES_DATA: Record<
  string,
  {
    title: string;
    category: string;
    level: string;
    deliveryMode: string;
    durationWeeks: number;
    description: string;
    learningObjectives: string[];
    prerequisites: string[];
    modules: {
      title: string;
      lessons: { title: string; type: "VIDEO" | "PDF" | "QUIZ" | "ASSIGNMENT" | "TEXT" }[];
    }[];
    instructor: {
      name: string;
      bio: string;
    };
    faqs: { question: string; answer: string }[];
  }
> = {
  "tajweed-course": {
    title: "Tajweed Course",
    category: "Islamic Disciplines",
    level: "All Levels",
    deliveryMode: "1-on-1 & Group Sessions",
    durationWeeks: 12,
    description:
      "A comprehensive course focusing on Arabic phonetics, correct articulation points (Makharij), rules of Noon & Meem Sakinah, Madd prolongations, and proper stopping (Waqf) for accurate recitation of the Holy Quran.",
    learningObjectives: [
      "Master the 17 Makharij (points of articulation) with exact tongue and throat placement",
      "Apply Izhar, Idgham, Iqlab, and Ikhfa across Quranic text",
      "Recognize all varieties of Madd (Natural, Connected, Disconnected, and Compulsory)",
      "Recite with proper rhythm, breath pacing, and correct stopping conventions"
    ],
    prerequisites: ["Ability to identify Arabic letters and read basic words."],
    modules: [
      {
        title: "Module 1: Articulation Points & Phonetics (Makharij)",
        lessons: [
          { title: "Introduction to Tajweed & Etiquette", type: "VIDEO" },
          { title: "Throat & Tongue Articulation Points", type: "VIDEO" },
          { title: "Lips & Nasal Cavity Rules", type: "TEXT" },
          { title: "Makharij Identification Quiz", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2: Rules of Noon Sakinah & Tanween",
        lessons: [
          { title: "Izhar & Iqlab Explained", type: "VIDEO" },
          { title: "Idgham with and without Ghunnah", type: "VIDEO" },
          { title: "Ikhfa Haqiqi Practice Sheet", type: "PDF" },
          { title: "Noon Sakinah Rules Assignment", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Rules of Meem Sakinah & Madd",
        lessons: [
          { title: "Meem Sakinah Rules (Ikhfa, Idgham, Izhar Shafawi)", type: "VIDEO" },
          { title: "Types of Madd (Asli & Far'i)", type: "VIDEO" },
          { title: "Madd Lazim & Counting Beats", type: "TEXT" },
          { title: "Mid-Term Tajweed Assessment", type: "QUIZ" }
        ]
      },
      {
        title: "Module 4: Applied Recitation & Waqf",
        lessons: [
          { title: "Rules of Waqf (Stopping Signs)", type: "VIDEO" },
          { title: "Guided Recitation of Juz Amma", type: "VIDEO" },
          { title: "Practical Recitation Submission", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Qari Ahmad Al-Azhari",
      bio: "Sanad-certified Quran instructor with over 12 years of experience teaching Tajweed and recitation to students worldwide."
    },
    faqs: [
      { question: "Is this suitable for adults as well as children?", answer: "Yes, our instructors personalize lessons to suit all age groups from young learners to adult beginners." },
      { question: "Will I receive feedback on my recitation?", answer: "Yes, every live session includes real-time individual correction, plus recorded assignment reviews." }
    ]
  },

  "translation-of-quran": {
    title: "Islamic Studies & Translation of Quran",
    category: "Islamic Disciplines",
    level: "All Levels",
    deliveryMode: "1-on-1 & Cohort",
    durationWeeks: 16,
    description:
      "Understand the divine message of the Holy Quran through word-by-word translation, contextual Tafseer, Prophetic Hadith, Islamic jurisprudence (Fiqh), and moral teachings.",
    learningObjectives: [
      "Understand high-frequency Quranic words that constitute 80% of the text",
      "Grasp the historical background and life lessons from selected Surahs",
      "Learn fundamental Islamic beliefs (Aqeedah), Fiqh of Taharah and Salah",
      "Apply Islamic ethics and Prophetic Sunnah in contemporary life"
    ],
    prerequisites: ["None. Open to everyone."],
    modules: [
      {
        title: "Module 1: Quranic Vocabulary Foundations",
        lessons: [
          { title: "High Frequency Quranic Words", type: "VIDEO" },
          { title: "Pronouns and Prepositions in the Quran", type: "PDF" },
          { title: "Vocabulary Mastery Check", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2: Tafseer of Selected Surahs",
        lessons: [
          { title: "Surah Al-Fatiha In-Depth Tafseer", type: "VIDEO" },
          { title: "Surah Yaseen: Heart of the Quran", type: "VIDEO" },
          { title: "Surah Al-Mulk: Protection & Reflection", type: "TEXT" },
          { title: "Tafseer Reflection Essay", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Hadith & Islamic Jurisprudence",
        lessons: [
          { title: "Foundations of Fiqh (Taharah & Salah)", type: "VIDEO" },
          { title: "Essential 40 Hadith of Imam Nawawi", type: "VIDEO" },
          { title: "Hadith Principles & Applications", type: "QUIZ" }
        ]
      }
    ],
    instructor: {
      name: "Dr. Mufti Tariq Mahmood",
      bio: "Graduate of Islamic University of Madinah specializing in Quranic Exegesis (Tafseer) and comparative Fiqh."
    },
    faqs: [
      { question: "Can I learn in English or Urdu?", answer: "Yes, we provide bilingual instruction in both English and Urdu." }
    ]
  },

  "qirat-course": {
    title: "Qirat Course",
    category: "Islamic Disciplines",
    level: "Intermediate & Advanced",
    deliveryMode: "1-on-1 Mentorship",
    durationWeeks: 14,
    description:
      "Specialized masterclass in melodious Quran recitation, Maqamat scales, vocal resonance, and breathing stamina taught by certified international Qaris.",
    learningObjectives: [
      "Master the classic Maqamat scales: Bayati, Rast, Hijaz, Saba, Nahawand, Sikah, Ajam",
      "Develop vocal pitch control, diaphragm breathing, and projection",
      "Perform smooth transitions between melodic maqams without breaching Tajweed rules",
      "Prepare for public recitation, Azan, and Taraweeh leading"
    ],
    prerequisites: ["Fluent Quran reading with solid Tajweed understanding."],
    modules: [
      {
        title: "Module 1: Voice Calibration & Diaphragm Control",
        lessons: [
          { title: "Vocal Anatomy & Breathing Techniques", type: "VIDEO" },
          { title: "Daily Vocal Warm-Up Exercises", type: "TEXT" },
          { title: "Pitch Stabilization Check", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 2: The Core Maqamat (Bayati, Rast, Hijaz)",
        lessons: [
          { title: "Maqam Bayati: The Foundation Scale", type: "VIDEO" },
          { title: "Maqam Rast: Dignity and Precision", type: "VIDEO" },
          { title: "Maqam Hijaz: Emotional Depth", type: "VIDEO" },
          { title: "Core Maqamat Recitation Submission", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Advanced Scales & Azan Mastery",
        lessons: [
          { title: "Maqam Nahawand, Saba & Sikah", type: "VIDEO" },
          { title: "The Art of Melodious Azan", type: "VIDEO" },
          { title: "Final Qirat Performance Assessment", type: "QUIZ" }
        ]
      }
    ],
    instructor: {
      name: "Qari Muhammad Bilal",
      bio: "Award-winning Qari and international reciter with multiple Sanad certifications in the 10 Qira'at."
    },
    faqs: [
      { question: "Will this help me improve my voice for leading prayers?", answer: "Yes! The vocal coaching and pitch modulation techniques are specifically designed for leading Salah and Taraweeh." }
    ]
  },

  "noorani-qaida": {
    title: "Noorani Qaida & Quran Reading",
    category: "Islamic Disciplines",
    level: "Complete Beginner",
    deliveryMode: "1-on-1 Live Instruction",
    durationWeeks: 10,
    description:
      "The gold standard foundational course for kids and adults to learn Quranic Arabic reading from scratch with accurate phonetics and letter connections.",
    learningObjectives: [
      "Recognize all 29 Arabic alphabet letters in their individual and joined shapes",
      "Master short vowels (Fatha, Kasra, Damma) and long vowels (Maddah)",
      "Read compound words with Sukoon, Tanween, and Tashdeed",
      "Transition seamlessly into reciting from the Quranic Mus'haf"
    ],
    prerequisites: ["None."],
    modules: [
      {
        title: "Module 1: Arabic Alphabet & Sounds",
        lessons: [
          { title: "The 29 Individual Letters", type: "VIDEO" },
          { title: "Letter Recognition & Audio Drills", type: "TEXT" },
          { title: "Alphabet Assessment", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2: Connected Letters & Short Vowels",
        lessons: [
          { title: "Initial, Medial, and Final Letter Forms", type: "VIDEO" },
          { title: "Fatha, Kasra, and Damma (Harakat)", type: "VIDEO" },
          { title: "Two-Letter Word Reading", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Advanced Rules & Transition to Quran",
        lessons: [
          { title: "Tanween & Sukoon (Jazm)", type: "VIDEO" },
          { title: "Tashdeed (Shaddah) and Maddah", type: "VIDEO" },
          { title: "First Quranic Surah (Surat Al-Fatiha)", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Ustadha Fatima Zahra",
      bio: "Dedicated early childhood educator specializing in beginner Arabic reading pedagogy and friendly student mentorship."
    },
    faqs: [
      { question: "What is the minimum age for kids to start?", answer: "Children as young as 4.5 years old can start with our interactive, visually engaging lessons." }
    ]
  },

  "hifz-quran": {
    title: "Hifz-ul-Quran (Quran Memorization)",
    category: "Islamic Disciplines",
    level: "Dedicated Memorization Track",
    deliveryMode: "1-on-1 Daily Coaching",
    durationWeeks: 52,
    description:
      "A systematic, structured Quran memorization program featuring daily live recitation (Sabaq), recent revision (Sabqi), and cumulative retention cycles (Manzil).",
    learningObjectives: [
      "Memorize selected Juz or the complete Holy Quran with high retention",
      "Maintain flawless Tajweed and pronunciation under memory recall",
      "Learn techniques for overcoming Mutashabihat (similar verses)",
      "Establish lifelong daily revision routines"
    ],
    prerequisites: ["Fluent Nazra reading with Tajweed."],
    modules: [
      {
        title: "Phase 1: Juz Amma & Short Surahs",
        lessons: [
          { title: "Daily Sabaq & Sabqi Method", type: "VIDEO" },
          { title: "Juz 30 Memorization Tracker", type: "PDF" },
          { title: "Juz 30 Evaluation", type: "QUIZ" }
        ]
      },
      {
        title: "Phase 2: Progressive Quranic Hifz",
        lessons: [
          { title: "Daily 1-Page Memorization Strategy", type: "VIDEO" },
          { title: "Mutashabihat Verse Comparison Guide", type: "PDF" },
          { title: "Quarterly Juz Review", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Hafiz Qari Zeeshan",
      bio: "Sanad-certified Hafiz-ul-Quran who has guided over 150 students through successful Quran memorization and retention."
    },
    faqs: [
      { question: "Can adults join the Hifz program?", answer: "Yes! We offer tailored part-time Hifz schedules for working professionals and university students." }
    ]
  },

  "computer-science": {
    title: "Computer Science",
    category: "IT & Programming",
    level: "Beginner to Intermediate",
    deliveryMode: "1-on-1 & Cohort",
    durationWeeks: 14,
    description:
      "Core computing foundations: binary representation, computer architecture, boolean logic, algorithms, networking protocols, databases, and cybersecurity basics.",
    learningObjectives: [
      "Understand hardware architecture, Von Neumann model, CPU cycle, and memory hierarchy",
      "Perform binary arithmetic, two's complement, hexadecimal, and logic gate truth tables",
      "Design algorithms using pseudocode and flowchart methodology",
      "Master network topologies, TCP/IP protocols, SQL queries, and cybersecurity threats"
    ],
    prerequisites: ["Basic general computer literacy."],
    modules: [
      {
        title: "Module 1: Systems Architecture & Data Representation",
        lessons: [
          { title: "CPU Architecture & The Fetch-Decode-Execute Cycle", type: "VIDEO" },
          { title: "Binary, Hexadecimal & Two's Complement", type: "VIDEO" },
          { title: "Binary Math Problem Set", type: "PDF" },
          { title: "Data Representation Quiz", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2: Logic Gates & Algorithm Design",
        lessons: [
          { title: "Boolean Logic: AND, OR, NOT, XOR, NAND", type: "VIDEO" },
          { title: "Algorithm Flowcharts and Pseudocode", type: "VIDEO" },
          { title: "Logic Circuit Design Assignment", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Networks, Security & Databases",
        lessons: [
          { title: "Network Topologies, IP/MAC Addresses, DNS", type: "VIDEO" },
          { title: "Relational Database Design & SQL", type: "VIDEO" },
          { title: "Cybersecurity Threats & Defense", type: "TEXT" },
          { title: "Computer Science Comprehensive Exam", type: "QUIZ" }
        ]
      }
    ],
    instructor: {
      name: "Engr. Salman Farooq",
      bio: "Senior Software Engineer and Computer Science Lecturer with 10+ years teaching IGCSE, GCSE, and University CS curricula."
    },
    faqs: [
      { question: "Does this course help with school CS exams?", answer: "Yes, the syllabus maps directly to Cambridge (0478), Edexcel, and AQA Computer Science boards." }
    ]
  },

  "computer-programming": {
    title: "Computer Programming (Coding)",
    category: "IT & Programming",
    level: "Beginner to Advanced",
    deliveryMode: "Hands-on Project Based",
    durationWeeks: 16,
    description:
      "Learn practical programming from scratch in Python, C++, and JavaScript. Build games, automate tasks, solve algorithmic problems, and build a coding portfolio.",
    learningObjectives: [
      "Master variables, conditional branching, loops, and modular functions",
      "Implement Object-Oriented Programming (OOP) with classes, inheritance, and encapsulation",
      "Use data structures like lists, dictionaries, stacks, and search/sort algorithms",
      "Build real-world terminal utilities, GUI apps, and games"
    ],
    prerequisites: ["None. Complete beginners welcome."],
    modules: [
      {
        title: "Module 1: Python Fundamentals",
        lessons: [
          { title: "Introduction to Python & IDE Setup", type: "VIDEO" },
          { title: "Data Types, Variables & Operations", type: "VIDEO" },
          { title: "Conditionals (if/elif/else) & Loops", type: "VIDEO" },
          { title: "Logic Building Coding Exercises", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 2: Data Structures & File I/O",
        lessons: [
          { title: "Lists, Tuples, Sets, and Dictionaries", type: "VIDEO" },
          { title: "Functions, Parameters, and Return Values", type: "VIDEO" },
          { title: "Reading and Writing Files & JSON", type: "TEXT" },
          { title: "Data Structures Practical Quiz", type: "QUIZ" }
        ]
      },
      {
        title: "Module 3: Object-Oriented Programming & Projects",
        lessons: [
          { title: "Classes, Objects, and __init__ Methods", type: "VIDEO" },
          { title: "Inheritance, Polymorphism & Error Handling", type: "VIDEO" },
          { title: "Capstone Project: Interactive Game / Utility", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Hamza Tariq",
      bio: "Full Stack Developer and Lead Python Educator with extensive experience mentoring students in modern software engineering."
    },
    faqs: [
      { question: "Will I receive source code and project reviews?", answer: "Yes, all projects are reviewed line-by-line with constructive instructor feedback on GitHub." }
    ]
  },

  "web-designing": {
    title: "Web Designing",
    category: "IT & Programming",
    level: "Beginner to Intermediate",
    deliveryMode: "Interactive Cohort",
    durationWeeks: 12,
    description:
      "Master modern responsive web design using HTML5, CSS3, Flexbox, CSS Grid, Tailwind CSS, Bootstrap, and Figma UI/UX prototyping.",
    learningObjectives: [
      "Code semantic HTML5 and clean CSS3 with responsive viewport controls",
      "Build complex responsive layouts with Flexbox and CSS Grid",
      "Rapidly build production designs using Tailwind CSS and Bootstrap 5",
      "Create interactive UI/UX wireframes and mockups in Figma"
    ],
    prerequisites: ["Basic computer usage."],
    modules: [
      {
        title: "Module 1: Semantic HTML5 & Modern CSS3",
        lessons: [
          { title: "HTML5 Document Structure & Elements", type: "VIDEO" },
          { title: "CSS Box Model, Colors, Typography & Shadows", type: "VIDEO" },
          { title: "Landing Page Markup Challenge", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 2: Responsive Flexbox, Grid & Tailwind CSS",
        lessons: [
          { title: "CSS Flexbox in Practice", type: "VIDEO" },
          { title: "CSS Grid Masterclass", type: "VIDEO" },
          { title: "Tailwind CSS Utility-First Styling", type: "VIDEO" },
          { title: "Responsive Portfolio Layout Build", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Figma UI/UX & Live Deployment",
        lessons: [
          { title: "Figma Prototyping & Design Systems", type: "VIDEO" },
          { title: "Deploying to GitHub Pages & Vercel", type: "TEXT" },
          { title: "Final Design Portfolio Showcase", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Ayesha Malik",
      bio: "Senior UI/UX Designer and Frontend Specialist with a portfolio of award-winning digital experiences."
    },
    faqs: [
      { question: "Do I need any prior coding experience?", answer: "No, this course starts from absolute ground zero and builds up to complete professional websites." }
    ]
  },

  "web-development": {
    title: "Web Development",
    category: "IT & Programming",
    level: "Intermediate to Pro",
    deliveryMode: "Project Cohort",
    durationWeeks: 18,
    description:
      "Full-stack web application development: React, Next.js App Router, TypeScript, Node.js, Express, PostgreSQL/MongoDB, Prisma ORM, and cloud hosting.",
    learningObjectives: [
      "Master modern JavaScript ES6+ and TypeScript for robust applications",
      "Build component-driven frontend UIs with React and Next.js",
      "Create secure backend REST APIs, authentication (JWT/NextAuth), and middleware",
      "Design database models with Prisma and deploy to Vercel/Neon"
    ],
    prerequisites: ["Basic understanding of HTML and CSS."],
    modules: [
      {
        title: "Module 1: Modern JS & TypeScript",
        lessons: [
          { title: "Async/Await, Promises & Fetch APIs", type: "VIDEO" },
          { title: "TypeScript Types, Interfaces & Generics", type: "VIDEO" },
          { title: "TypeScript Exercise Workbook", type: "PDF" }
        ]
      },
      {
        title: "Module 2: React & Next.js Frontend",
        lessons: [
          { title: "React State, Props, Hooks & Context", type: "VIDEO" },
          { title: "Next.js 14 App Router & Server Components", type: "VIDEO" },
          { title: "Interactive Web App UI Build", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Backend, Database & Cloud Deployment",
        lessons: [
          { title: "Node.js, Express & REST API Architecture", type: "VIDEO" },
          { title: "PostgreSQL & Prisma ORM Data Modeling", type: "VIDEO" },
          { title: "Authentication, Hashing & Production Launch", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Zain Ul Abideen",
      bio: "Principal Full Stack Architect with extensive experience in cloud-native SaaS and high-performance web systems."
    },
    faqs: [
      { question: "Will I build a full stack portfolio project?", answer: "Yes, you will engineer a complete full-stack web application with user authentication and database storage." }
    ]
  },

  "social-media-marketing-smm": {
    title: "Social Media Marketing (SMM)",
    category: "IT & Programming",
    level: "All Levels",
    deliveryMode: "Practical Workshop",
    durationWeeks: 8,
    description:
      "Master paid and organic digital marketing campaigns across Meta (Facebook & Instagram), Google Ads, YouTube, TikTok, and LinkedIn. Drive traffic, leads, and sales.",
    learningObjectives: [
      "Run profitable ad campaigns with Meta Ads Manager and Google Ads",
      "Define audience personas, lookalike audiences, and retargeting funnels",
      "Craft high-converting ad copy, visual assets, and viral video reels",
      "Track ROAS, conversion metrics, and start client freelancing"
    ],
    prerequisites: ["Basic computer and internet skills."],
    modules: [
      {
        title: "Module 1: Strategy, Personas & Content Marketing",
        lessons: [
          { title: "Digital Marketing Landscape & Strategy", type: "VIDEO" },
          { title: "Creating Customer Avatars & Brand Positioning", type: "VIDEO" },
          { title: "Content Calendar & Copywriting Frameworks", type: "PDF" }
        ]
      },
      {
        title: "Module 2: Meta Ads & Campaign Scaling",
        lessons: [
          { title: "Meta Ads Manager Setup & Pixel Tracking", type: "VIDEO" },
          { title: "Targeting, Custom Audiences & Lookalikes", type: "VIDEO" },
          { title: "Live Campaign Setup & A/B Testing", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Google Ads, Analytics & Client Freelancing",
        lessons: [
          { title: "Google Search Ads & Keyword Bidding", type: "VIDEO" },
          { title: "Conversion Tracking with Google Tag Manager", type: "VIDEO" },
          { title: "Freelancing Proposals & Client Acquisition", type: "TEXT" },
          { title: "Final SMM Campaign Audit Project", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Ali Raza",
      bio: "Growth Marketer and Media Buyer managing 6-figure monthly digital ad budgets across international markets."
    },
    faqs: [
      { question: "Is this suitable for someone starting a freelancing career?", answer: "Yes, we include dedicated training on winning marketing clients on Upwork, Fiverr, and LinkedIn." }
    ]
  },

  gcse: {
    title: "GCSE & IGCSE Tutoring",
    category: "School & Board Prep",
    level: "Years 10–11 (UK)",
    deliveryMode: "1-on-1 & Small Group",
    durationWeeks: 16,
    description:
      "Specialized tutoring for UK GCSE and International IGCSE (Edexcel, AQA, OCR, Cambridge) in Mathematics, Sciences, English, and Humanities for top grades (7-9).",
    learningObjectives: [
      "Thorough comprehension of all curriculum syllabus modules",
      "Exam technique: command word interpretation and mark scheme rubrics",
      "Extensive past paper practice under real timed conditions",
      "Proven formula sheets, revision cards, and model answers"
    ],
    prerequisites: ["GCSE/IGCSE students in Years 9, 10, or 11."],
    modules: [
      {
        title: "Module 1: Core Content Mastery & Diagnostics",
        lessons: [
          { title: "Syllabus Diagnostic Evaluation", type: "QUIZ" },
          { title: "Key Conceptual Breakdowns", type: "VIDEO" },
          { title: "Topical Practice Question Packs", type: "PDF" }
        ]
      },
      {
        title: "Module 2: Past Paper Strategy & Extended Responses",
        lessons: [
          { title: "Tackling 6-Mark Questions in Sciences/English", type: "VIDEO" },
          { title: "Step-by-Step Past Paper Walkthroughs", type: "VIDEO" },
          { title: "Past Paper Timed Submission", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Full Mock Exam Marathon",
        lessons: [
          { title: "Full-Length Mock Paper", type: "ASSIGNMENT" },
          { title: "Examiner Feedback & Score Booster", type: "VIDEO" },
          { title: "Final Preparation Checklist", type: "TEXT" }
        ]
      }
    ],
    instructor: {
      name: "Dr. Rachel Evans",
      bio: "Experienced UK educator and former GCSE examiner with 15+ years tutoring Cambridge & Edexcel candidates."
    },
    faqs: [
      { question: "Do you provide past paper answer keys?", answer: "Yes, all past paper exercises include official mark scheme breakdowns and examiner commentary." }
    ]
  },

  "o-a-levels": {
    title: "O / A Levels (Cambridge & Edexcel)",
    category: "School & Board Prep",
    level: "Secondary & College",
    deliveryMode: "1-on-1 Specialist",
    durationWeeks: 20,
    description:
      "Advanced coaching for Cambridge CAIE and Edexcel International O & A Levels in Physics, Chemistry, Biology, Mathematics, and Economics.",
    learningObjectives: [
      "Master complex mathematical and scientific derivations",
      "Excel in Theory, Multiple Choice (P1), and Alternative to Practical (P4/P6) papers",
      "Structured problem solving matched against examiner marking rubrics",
      "Achieve straight A* and A grades for competitive university admissions"
    ],
    prerequisites: ["Enrollment in O Level, IGCSE, or AS/A Level courses."],
    modules: [
      {
        title: "Module 1: AS / A Level Theoretical Foundations",
        lessons: [
          { title: "Advanced Theoretical Principles", type: "VIDEO" },
          { title: "Topical Problem Sets & Formulae", type: "PDF" },
          { title: "Concept Mastery Quiz", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2: Practical Skills & Experimental Design",
        lessons: [
          { title: "Alternative to Practical (ATP) Techniques", type: "VIDEO" },
          { title: "Experimental Error Analysis & Graphs", type: "TEXT" },
          { title: "Past Paper Practical Assignment", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Yearly Past Papers & High-Yield Revisions",
        lessons: [
          { title: "10-Year Past Paper Solving Sessions", type: "VIDEO" },
          { title: "Full Mock Exam Evaluation", type: "ASSIGNMENT" },
          { title: "Grade A* Strategy Masterclass", type: "VIDEO" }
        ]
      }
    ],
    instructor: {
      name: "Prof. Tariq Jamil",
      bio: "Renowned A Level faculty mentor whose students consistently secure top positions and admissions to Ivy League and Russell Group universities."
    },
    faqs: [
      { question: "Can I choose specific subjects only?", answer: "Yes, you can enroll in individual subjects or multiple subject bundles." }
    ]
  },

  naplan: {
    title: "Naplan Preparation",
    category: "School & Board Prep",
    level: "Years 3, 5, 7, 9 (Australia)",
    deliveryMode: "1-on-1 & Small Group",
    durationWeeks: 12,
    description:
      "Coaching for the Australian National Assessment Program (NAPLAN) in Reading, Writing, Language Conventions, and Numeracy mapped to ACARA standards.",
    learningObjectives: [
      "Analyze informational and narrative texts with speed and accuracy",
      "Master persuasive argument and narrative story writing frameworks",
      "Sharpen spelling, punctuation, and grammar convention rules",
      "Solve non-calculator and calculator numeracy questions with confidence"
    ],
    prerequisites: ["Australian school students in Years 3, 5, 7, or 9."],
    modules: [
      {
        title: "Module 1: Reading & Writing Genre Mastery",
        lessons: [
          { title: "Reading Comprehension Techniques", type: "VIDEO" },
          { title: "Persuasive Writing Structure Guide", type: "PDF" },
          { title: "Narrative Writing Practice Submission", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 2: Language Conventions & Numeracy",
        lessons: [
          { title: "Spelling Patterns & Punctuation Rules", type: "VIDEO" },
          { title: "Numeracy Multi-Step Word Problems", type: "VIDEO" },
          { title: "NAPLAN Full Practice Simulation", type: "QUIZ" }
        ]
      }
    ],
    instructor: {
      name: "Sarah Jenkins (M.Ed Sydney)",
      bio: "Certified Australian primary and secondary educator with extensive experience preparing students for NAPLAN and Selective School tests."
    },
    faqs: [
      { question: "Are test formats updated for NAPLAN online?", answer: "Yes, practice tests replicate the NAPLAN Online computer-based assessment format." }
    ]
  },

  "sat-tutoring": {
    title: "SAT Tutoring (Digital SAT)",
    category: "School & Board Prep",
    level: "High School / College Prep",
    deliveryMode: "1-on-1 Strategy Coaching",
    durationWeeks: 12,
    description:
      "Intensive coaching for the Digital SAT covering adaptive module tactics, Desmos graphing calculator mastery, fast math formulas, and critical reading analysis.",
    learningObjectives: [
      "Master the College Board Bluebook testing interface and adaptive scoring",
      "Achieve 750+ on Digital SAT Math through shortcut heuristics and Desmos tricks",
      "Master craft, structure, and evidence-based questions in Reading & Writing",
      "Target 1500+ composite scores for top university scholarships"
    ],
    prerequisites: ["High school students preparing for US and global university admissions."],
    modules: [
      {
        title: "Module 1: Digital SAT Math Mastery",
        lessons: [
          { title: "Heart of Algebra & Advanced Math", type: "VIDEO" },
          { title: "Desmos Graphing Calculator Power Tricks", type: "VIDEO" },
          { title: "Math High-Yield Practice Drill", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 2: Reading & Writing Precision",
        lessons: [
          { title: "Craft, Structure & Information Analysis", type: "VIDEO" },
          { title: "Standard English Conventions & Transitions", type: "VIDEO" },
          { title: "Verbal Timed Practice Section", type: "QUIZ" }
        ]
      },
      {
        title: "Module 3: Full Bluebook Practice Mocks",
        lessons: [
          { title: "Adaptive Module 2 Strategy Breakdown", type: "VIDEO" },
          { title: "Full Practice Test & Scaled Score Analysis", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "David Miller (99th Percentile Scorer)",
      bio: "Expert SAT strategist who has coached over 500 students to 1500+ scores and Ivy League admissions."
    },
    faqs: [
      { question: "How many points can I expect to improve?", answer: "Students consistently achieve an average score increase of 150-250+ points with dedicated practice." }
    ]
  },

  "gre-tutoring": {
    title: "GRE Tutoring",
    category: "School & Board Prep",
    level: "Graduates / Post-Grad",
    deliveryMode: "1-on-1 Specialist",
    durationWeeks: 10,
    description:
      "Fast-track preparation for the shortened GRE General Test covering Quantitative Comparison, Advanced Algebra/Geometry, Text Completion, and Analytical Writing.",
    learningObjectives: [
      "Master GRE quantitative shortcuts, probability, combinatorics, and data interpretation",
      "Learn high-frequency GRE vocabulary and contextual sentence clues",
      "Write high-scoring essays using proven analytical issue templates",
      "Pacing strategies to achieve 325+ composite scores"
    ],
    prerequisites: ["College graduates and professionals applying for Master's/PhD programs."],
    modules: [
      {
        title: "Module 1: GRE Quantitative Reasoning",
        lessons: [
          { title: "Quantitative Comparison Shortcuts", type: "VIDEO" },
          { title: "Advanced Algebra, Geometry & Combinatorics", type: "VIDEO" },
          { title: "Quant Problem Set & Analytics", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 2: GRE Verbal Reasoning & Writing",
        lessons: [
          { title: "Text Completion & Sentence Equivalence Clues", type: "VIDEO" },
          { title: "Reading Comprehension Inference Strategies", type: "VIDEO" },
          { title: "Analytical Writing Issue Template", type: "TEXT" },
          { title: "Full GRE Timed Mock Exam", type: "QUIZ" }
        ]
      }
    ],
    instructor: {
      name: "Dr. Farhan Siddiqui",
      bio: "GRE Quantitative specialist with a perfect 170 Quant score and 12 years of graduate admissions coaching."
    },
    faqs: [
      { question: "Is the curriculum updated for the new shorter GRE format?", answer: "Yes, all lessons and mock exams reflect the modern, shortened 2-hour GRE format." }
    ]
  },

  science: {
    title: "Science (Physics, Chemistry & Biology)",
    category: "STEM & Languages",
    level: "Grades 4 through 10",
    deliveryMode: "1-on-1 & Cohort",
    durationWeeks: 14,
    description:
      "Concept-first science tutoring connecting theoretical physics, chemical reactions, and biological systems with interactive visual experiments and school exam prep.",
    learningObjectives: [
      "Understand core physical laws: motion, forces, energy, electricity, and light",
      "Master chemistry concepts: atomic structure, periodic table, reactions, and bonding",
      "Explore biological systems: cells, human anatomy, ecology, and genetics",
      "Excel in school assessments, lab report write-ups, and end-of-term exams"
    ],
    prerequisites: ["Grade-appropriate school level."],
    modules: [
      {
        title: "Module 1: Physics Principles",
        lessons: [
          { title: "Forces, Motion & Newton's Laws", type: "VIDEO" },
          { title: "Energy Transformations & Electricity", type: "VIDEO" },
          { title: "Physics Concept Assessment", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2: Chemistry in Action",
        lessons: [
          { title: "Atoms, Elements & The Periodic Table", type: "VIDEO" },
          { title: "Chemical Reactions, Acids & Bases", type: "VIDEO" },
          { title: "Chemistry Formula Worksheet", type: "PDF" }
        ]
      },
      {
        title: "Module 3: Biology & Living Organisms",
        lessons: [
          { title: "Cellular Biology & Organ Systems", type: "VIDEO" },
          { title: "Genetics, Reproduction & Ecosystems", type: "TEXT" },
          { title: "Science Term Capstone Quiz", type: "QUIZ" }
        ]
      }
    ],
    instructor: {
      name: "Dr. Maria Qasim",
      bio: "Senior Science Lecturer and STEM Educator with extensive experience in making complex scientific concepts intuitive."
    },
    faqs: [
      { question: "Can the instructor help with school homework and lab reports?", answer: "Yes, dedicated homework and lab guidance is integrated into every weekly session." }
    ]
  },

  "mathematics-foundations": {
    title: "Mathematics & Analytical Thinking",
    category: "STEM & Languages",
    level: "Grades 1 through 12",
    deliveryMode: "1-on-1 & Group",
    durationWeeks: 16,
    description:
      "Comprehensive mathematics curriculum designed to build bulletproof numeracy, algebra mastery, geometric logic, trigonometry, and calculus confidence.",
    learningObjectives: [
      "Master arithmetic, fractions, decimals, ratios, and mental math shortcuts",
      "Solve linear, quadratic, and simultaneous algebraic equations with ease",
      "Apply geometric formulas, spatial proofs, and trigonometric ratios (SOH CAH TOA)",
      "Develop analytical thinking for word problems and school board exams"
    ],
    prerequisites: ["Diagnostic placement test."],
    modules: [
      {
        title: "Module 1: Number Systems & Arithmetic Mastery",
        lessons: [
          { title: "Integers, Fractions & Decimal Operations", type: "VIDEO" },
          { title: "Percentages, Ratios & Rates", type: "VIDEO" },
          { title: "Arithmetic Speed Drills", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2: Algebra & Equation Solving",
        lessons: [
          { title: "Linear Equations & Inequalities", type: "VIDEO" },
          { title: "Quadratic Equations & Polynomials", type: "VIDEO" },
          { title: "Algebra Problem Solving Assignment", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Geometry, Trigonometry & Data",
        lessons: [
          { title: "Plane & Solid Geometry Principles", type: "VIDEO" },
          { title: "Trigonometric Ratios in Action", type: "VIDEO" },
          { title: "Probability & Statistics Basics", type: "TEXT" },
          { title: "Comprehensive Mathematics Evaluation", type: "QUIZ" }
        ]
      }
    ],
    instructor: {
      name: "Engr. Imran Khan",
      bio: "Mathematics educator with a passion for concept-driven problem solving and competition math coaching."
    },
    faqs: [
      { question: "Can we align lessons with my child's current school textbook?", answer: "Yes, our teachers customize exercises to match your school syllabus and pace." }
    ]
  },

  "english-foundations": {
    title: "English Language Foundations & Fluency",
    category: "STEM & Languages",
    level: "Beginner to Advanced",
    deliveryMode: "Group / 1-on-1",
    durationWeeks: 12,
    description:
      "Complete English language training covering conversational speaking confidence, grammar accuracy, reading comprehension, vocabulary, and structured writing.",
    learningObjectives: [
      "Speak fluently with proper pronunciation, intonation, and reduced accent barriers",
      "Understand English grammar: tenses, clauses, punctuation, and sentence architecture",
      "Read and analyze complex articles, essays, and literary texts",
      "Write formal essays, business emails, and creative narratives"
    ],
    prerequisites: ["Placement evaluation."],
    modules: [
      {
        title: "Module 1: Grammar & Mechanics",
        lessons: [
          { title: "Mastering Verb Tenses & Modals", type: "VIDEO" },
          { title: "Sentence Structures & Punctuation Rules", type: "TEXT" },
          { title: "Grammar Diagnostic Quiz", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2: Conversational Fluency & Listening",
        lessons: [
          { title: "Pronunciation Clarity & Daily Dialogues", type: "VIDEO" },
          { title: "Public Speaking & Discussion Skills", type: "VIDEO" },
          { title: "Spoken English Presentation Submission", type: "ASSIGNMENT" }
        ]
      },
      {
        title: "Module 3: Reading Comprehension & Formal Writing",
        lessons: [
          { title: "Active Reading & Contextual Vocabulary", type: "VIDEO" },
          { title: "Structured Essay & Email Writing", type: "VIDEO" },
          { title: "Final Writing Assessment", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Claire Thompson (CELTA Certified)",
      bio: "ESL specialist and Cambridge certified English instructor with 14 years teaching international learners."
    },
    faqs: [
      { question: "Is this course helpful for IELTS or TOEFL prep?", answer: "Yes, this foundational course provides the grammatical and vocabulary bedrock needed for IELTS/TOEFL." }
    ]
  },

  "arabic-conversation": {
    title: "Arabic Grammar & Spoken Conversation",
    category: "STEM & Languages",
    level: "Beginner to Intermediate",
    deliveryMode: "1-on-1 & Cohort",
    durationWeeks: 14,
    description:
      "Learn Classical Arabic grammar (Nahw & Sarf) and Modern Standard Arabic conversation to comprehend the Quran and speak with confidence.",
    learningObjectives: [
      "Master the Arabic root system (Thulathi) and verb conjugations",
      "Understand sentence syntax (Mubtada, Khabar, Fa'il, Maf'ul)",
      "Build a rich vocabulary of Quranic and daily conversational Arabic words",
      "Engage in everyday Arabic dialogues and comprehend classical texts"
    ],
    prerequisites: ["Ability to read Arabic script."],
    modules: [
      {
        title: "Module 1: Basic Arabic Grammar (Nahw Foundations)",
        lessons: [
          { title: "Nouns, Verbs & Particles (Ism, Fi'l, Harf)", type: "VIDEO" },
          { title: "Nominal & Verbal Sentences", type: "VIDEO" },
          { title: "Nahw Core Practice Worksheet", type: "PDF" }
        ]
      },
      {
        title: "Module 2: Verb Conjugation & Morphology (Sarf)",
        lessons: [
          { title: "Past, Present & Imperative Conjugations", type: "VIDEO" },
          { title: "Attached & Detached Pronouns", type: "TEXT" },
          { title: "Sarf Verb Tables Quiz", type: "QUIZ" }
        ]
      },
      {
        title: "Module 3: Spoken Arabic & Quranic Passages",
        lessons: [
          { title: "Daily Conversational Dialogues", type: "VIDEO" },
          { title: "Translating Classical Stories & Quranic Verses", type: "VIDEO" },
          { title: "Arabic Dialogue Audio Submission", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Sheikh Omar Al-Yamani",
      bio: "Native Arabic speaker and Classical Arabic lecturer specializing in teaching non-native speakers."
    },
    faqs: [
      { question: "Do you teach modern spoken dialects or Classical Arabic?", answer: "We focus on Modern Standard Arabic (Fusha) and Classical Quranic Arabic, which is understood across the entire Arab world." }
    ]
  }
};

function getCourseData(slug: string) {
  if (COURSES_DATA[slug]) {
    return COURSES_DATA[slug];
  }

  // Fallback dynamic generator
  const title = slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title,
    category: "Academic & Professional Program",
    level: "All Levels",
    deliveryMode: "1-on-1 & Interactive Group",
    durationWeeks: 12,
    description: `Comprehensive modular curriculum for ${title}. Featuring live interactive lessons with certified faculty, downloadable practice resources, assignments, and verifiable completion certification.`,
    learningObjectives: [
      `Comprehensive mastery of core concepts in ${title}`,
      "Interactive problem-solving drills and live teacher corrections",
      "Hands-on project development and practical skills application",
      "Verifiable digital credential upon successful completion"
    ],
    prerequisites: ["Diagnostic evaluation with our academic team."],
    modules: [
      {
        title: "Module 1: Core Fundamentals & Baseline Concepts",
        lessons: [
          { title: "Course Introduction & Syllabus Overview", type: "VIDEO" as const },
          { title: "Fundamental Theory & Foundations", type: "VIDEO" as const },
          { title: "Baseline Knowledge Assessment", type: "QUIZ" as const }
        ]
      },
      {
        title: "Module 2: Applied Skills & Interactive Practice",
        lessons: [
          { title: "Guided Exercises & Deep-Dive Lessons", type: "VIDEO" as const },
          { title: "Downloadable Practice Worksheets", type: "PDF" as const },
          { title: "Mid-Term Project Submission", type: "ASSIGNMENT" as const }
        ]
      },
      {
        title: "Module 3: Advanced Applications & Mastery",
        lessons: [
          { title: "Advanced Problem Solving & Case Studies", type: "VIDEO" as const },
          { title: "Final Term Capstone Exam", type: "QUIZ" as const }
        ]
      }
    ],
    instructor: {
      name: "AEC Certified Faculty Member",
      bio: "Experienced subject specialist and qualified instructor with dedicated pedagogical training."
    },
    faqs: [
      { question: `How are ${title} classes conducted?`, answer: "Classes are held via live 1-on-1 or group video sessions with full teacher support and access to the AEC Learning Portal." },
      { question: "How can I get started?", answer: "Book a free trial class to meet an instructor and evaluate your personalized curriculum schedule." }
    ]
  };
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseData(params.slug);

  return (
    <div className="pb-16">
      {/* HERO */}
      <section className="border-b border-aec-navy/10 bg-gradient-to-b from-aec-cream/50 via-white to-white py-12 lg:py-16">
        <div className="container-aec grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div>
            <Link href="/courses" className="text-xs font-semibold text-aec-teal hover:underline mb-3 inline-block">
              ← Back to All Courses
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-info">{course.category}</span>
              <span className="badge badge-neutral">{course.level}</span>
              <span className="badge badge-warning">{course.deliveryMode}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-aec-navy sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-aec-navy/75 leading-relaxed">{course.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-aec-navy/70">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <span>⏱️</span>
                <span>{course.durationWeeks} Weeks Duration</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <span>📚</span>
                <span>{course.modules.length} Modules</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <span>🎓</span>
                <span>Verifiable Certificate</span>
              </div>
            </div>
          </div>

          {/* ENROLLMENT CARD */}
          <div className="card shadow-lg border border-aec-teal/20 bg-white">
            <h3 className="font-display font-bold text-lg text-aec-navy">Enroll in this Course</h3>
            <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
              Join live classes with certified educators. Flexible scheduling, 1-on-1 pacing, and full access to LMS materials.
            </p>
            <div className="mt-5 space-y-2.5">
              <Link href="/admissions/free-trial" className="btn-primary w-full text-center block">
                Book a Free Trial Session
              </Link>
              <Link href="/admissions/apply" className="btn-secondary w-full text-center block">
                Submit Online Admission
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div>✓ 100% Satisfaction Guarantee</div>
              <div>✓ Flexible timetable for all time zones</div>
              <div>✓ Dedicated parent/student dashboard</div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY CONTENT */}
      <div className="container-aec grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          {/* WHAT YOU'LL LEARN */}
          <section className="card bg-white space-y-4">
            <h2 className="font-display text-xl font-bold text-aec-navy">What You&apos;ll Learn</h2>
            <ul className="grid gap-3 sm:grid-cols-2 pt-1">
              {course.learningObjectives.map((o, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-aec-navy/80">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CURRICULUM OUTLINE */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-aec-navy">Course Curriculum Outline</h2>
            <div className="space-y-4">
              {course.modules.map((m, i) => (
                <div key={m.title} className="rounded-2xl border border-aec-navy/10 overflow-hidden bg-white shadow-2xs">
                  <div className="border-b border-aec-navy/10 bg-slate-50 px-5 py-3.5 flex items-center justify-between">
                    <p className="font-bold text-sm text-aec-navy">
                      Module {i + 1}: {m.title}
                    </p>
                    <span className="text-xs text-slate-500 font-semibold">{m.lessons.length} Lessons</span>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {m.lessons.map((l, lIdx) => (
                      <li key={lIdx} className="flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-2.5">
                          <span className="text-slate-400 font-mono text-xs">{i + 1}.{lIdx + 1}</span>
                          <span className="text-slate-800 font-medium">{l.title}</span>
                        </div>
                        <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          l.type === "VIDEO"
                            ? "bg-blue-50 text-blue-700"
                            : l.type === "QUIZ"
                            ? "bg-amber-50 text-amber-700"
                            : l.type === "ASSIGNMENT"
                            ? "bg-purple-50 text-purple-700"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {l.type}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* PREREQUISITES */}
          <section className="card bg-white">
            <h2 className="font-display text-lg font-bold text-aec-navy mb-2">Requirements & Prerequisites</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-aec-navy/70">
              {course.prerequisites.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-aec-teal shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQS */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-aec-navy">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {course.faqs.map((f, idx) => (
                <details key={idx} className="card group cursor-pointer">
                  <summary className="font-semibold text-aec-navy flex items-center justify-between list-none text-xs sm:text-sm">
                    <span>{f.question}</span>
                    <span className="text-aec-teal group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-2 text-xs sm:text-sm text-aec-navy/70 pt-2 border-t border-slate-100">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR: INSTRUCTOR & CTA */}
        <aside className="space-y-6">
          <div className="card bg-white space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-aec-gold">Assigned Faculty</p>
            <p className="font-display font-bold text-base text-aec-navy">{course.instructor.name}</p>
            <p className="text-xs text-aec-navy/70 leading-relaxed">{course.instructor.bio}</p>
          </div>

          <div className="rounded-2xl border border-aec-navy/10 bg-aec-navy text-white p-6 text-center space-y-3 shadow-md">
            <h3 className="font-display font-bold text-base">Ready to Get Started?</h3>
            <p className="text-xs text-white/70">
              Join students across the globe receiving world-class instruction.
            </p>
            <Link href="/admissions/free-trial" className="btn-primary w-full block text-center text-xs">
              Start Free Trial Class
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
