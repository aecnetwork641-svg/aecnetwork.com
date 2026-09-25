import Link from "next/link";

const PROGRAM_DETAILS: Record<
  string,
  {
    title: string;
    category: string;
    level: string;
    delivery: string;
    description: string;
    outcomes: string[];
    curriculum: { module: string; topics: string[] }[];
    prerequisites: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  "quran-islamic-studies": {
    title: "Quran & Tajweed Mastery",
    category: "Islamic Disciplines",
    level: "Foundational to Advanced",
    delivery: "1-on-1 Mentorship or Small Cohorts",
    description:
      "A structured, teacher-guided program designed to establish accurate Quranic recitation from foundational letters through advanced Tajweed rules, fluent Nazra reading, and basic memorization.",
    outcomes: [
      "Mastery of Arabic letter articulation (Makharij) and phonetics via Noorani Qaida",
      "Application of core Tajweed rules: Noon Sakinah, Meem Sakinah, Madd, and Waqf",
      "Fluent and confident recitation of selected Juz and Surahs with proper rhythm",
      "Memorization of daily Adhkar, Masnoon Duas, and foundational Islamic etiquette"
    ],
    curriculum: [
      {
        module: "Module 1: Arabic Phonetics & Noorani Qaida",
        topics: [
          "Individual letters and sound points (Makharij)",
          "Compound letters (Murakkabat) and short vowels (Harakat)",
          "Long vowels (Maddah) and Tanween rules"
        ]
      },
      {
        module: "Module 2: Essential Tajweed Rules",
        topics: [
          "Noon Sakinah & Tanween: Izhar, Idgham, Iqlab, Ikhfa",
          "Meem Sakinah rules and Ghunnah practice",
          "Rules of Raa (Tafkheem and Tarqeeq) and Lam in Lafz-ul-Jalalah"
        ]
      },
      {
        module: "Module 3: Fluent Nazra Recitation",
        topics: [
          "Guided recitation of Juz 30 (Juz Amma)",
          "Stopping signs (Rumuz al-Awqaf) and breathing discipline",
          "Fluency building and pronunciation corrections"
        ]
      },
      {
        module: "Module 4: Islamic Foundations & Practical Fiqh",
        topics: [
          "Articles of Faith (Aqeedah) and Five Pillars",
          "Practical Salah demonstration and step-by-step Wudu",
          "Prophetic manners (Akhlaq) and daily morning/evening Duas"
        ]
      }
    ],
    prerequisites: ["No prior knowledge required for beginners; diagnostic test for intermediate students."],
    faqs: [
      {
        q: "Are the teachers certified in Tajweed?",
        a: "Yes. Our Quran faculty members hold recognized certifications (Sanad / Ijazah) and have extensive teaching experience."
      },
      {
        q: "Can my child learn at their own pace?",
        a: "Yes, our one-to-one tutoring track allows the instructor to adjust pacing specifically to your child's learning speed."
      }
    ]
  },

  "tajweed-course": {
    title: "Applied Tajweed Course",
    category: "Islamic Disciplines",
    level: "Beginner to Advanced",
    delivery: "1-on-1 & Small Group",
    description:
      "Intensive specialization in theoretical and applied Tajweed rules, correcting articulation flaws, and achieving melodious Quranic recitation.",
    outcomes: [
      "Exact pronunciation from the 17 Makharij points of articulation",
      "Complete theoretical mastery of Tajweed rules and exceptions",
      "Practical error correction in Surat Al-Fatiha and daily recitation",
      "Confidence in leading Salah and formal Quran recitation"
    ],
    curriculum: [
      {
        module: "Module 1: Makharij & Sifaat (Letter Characteristics)",
        topics: ["Throat, tongue, lips, and nasal cavity articulation points", "Permanent and temporary characteristics of letters", "Heavy vs light letters (Tafkheem & Tarqeeq)"]
      },
      {
        module: "Module 2: Rules of Noon & Meem Sakinah",
        topics: ["Four rules of Noon Sakinah & Tanween", "Three rules of Meem Sakinah", "Ghunnah duration and levels"]
      },
      {
        module: "Module 3: Madd (Elongation) Categories",
        topics: ["Natural Madd (Asli)", "Secondary Madd due to Hamzah or Sukoon (Far'i)", "Madd Lazim and its classifications"]
      },
      {
        module: "Module 4: Waqf (Stopping) & Ibtida (Starting)",
        topics: ["Punctuation and stopping symbols in the Mus'haf", "Permissible and prohibited stopping points", "Breathing techniques"]
      }
    ],
    prerequisites: ["Basic ability to read Arabic letters."],
    faqs: [
      {
        q: "How long does it take to complete the Tajweed course?",
        a: "Typically 12 to 16 weeks depending on student practice and class frequency."
      }
    ]
  },

  "qirat-course": {
    title: "Qirat & Melodic Recitation Course",
    category: "Islamic Disciplines",
    level: "Intermediate & Advanced",
    delivery: "1-on-1 Masterclass",
    description:
      "Specialized training in Quranic vocal art, breath management, melodious Maqamat scales (Bayati, Hijaz, Rast, Saba, Nahawand, Sikah, Ajam), and classical Qirat recitation.",
    outcomes: [
      "Vocal cord control, resonance, and breath extension techniques",
      "Mastery of classical Arabic Maqamat scales for Quran recitation",
      "Transitions between melodies without breaching Tajweed rules",
      "Stage confidence for public recitation, Azan, and Taraweeh leading"
    ],
    curriculum: [
      {
        module: "Module 1: Voice Calibration & Breath Management",
        topics: ["Diaphragmatic breathing exercises", "Voice warm-ups and pitch stabilization", "Eliminating vocal strain"]
      },
      {
        module: "Module 2: Foundational Maqamat (Bayati, Rast, Hijaz)",
        topics: ["Maqam Bayati melody patterns and emotional tone", "Maqam Rast dignity and structure", "Maqam Hijaz spiritual depth"]
      },
      {
        module: "Module 3: Advanced Maqamat & Modulation",
        topics: ["Maqam Saba, Nahawand, Sikah, and Ajam", "Smooth modulations between scales during recitation", "Maintaining pristine Tajweed under melody"]
      },
      {
        module: "Module 4: Recorded Performance & Ijazah Preparation",
        topics: ["Recording analysis and instructor feedback", "Practical Azan and Taraweeh recitation practice", "Final recitation showcase"]
      }
    ],
    prerequisites: ["Solid Tajweed foundation and fluent Quran reading ability."],
    faqs: [
      {
        q: "Who teaches the Qirat course?",
        a: "Qualified Qaris with recognized Sanad and professional recitation experience."
      }
    ]
  },

  "translation-of-quran": {
    title: "Islamic Studies & Translation of Quran",
    category: "Islamic Disciplines",
    level: "All Age Groups",
    delivery: "1-on-1 & Group Cohort",
    description:
      "Deepen your connection with the Book of Allah through word-by-word translation, contextual Tafseer, Hadith principles, and practical life applications.",
    outcomes: [
      "Understanding the direct meaning of common Quranic words and verses",
      "Historical contexts of revelation (Asbab al-Nuzul)",
      "Core Islamic morals, family values, and Prophetic Seerah lessons",
      "Ability to reflect on Quranic messages during daily Salah"
    ],
    curriculum: [
      {
        module: "Module 1: High-Frequency Quranic Vocabulary",
        topics: ["80% of Quranic word roots", "Pronouns, prepositions, and common verb patterns", "Translating Surat Al-Fatiha and short Surahs"]
      },
      {
        module: "Module 2: Thematic Tafseer (Selected Surahs)",
        topics: ["Surah Yaseen, Al-Mulk, Al-Rahman, and Al-Kahf", "Themes of resurrection, creation, and divine guidance", "Reflections and life lessons"]
      },
      {
        module: "Module 3: Hadith & Prophetic Seerah",
        topics: ["40 Hadith of Imam Nawawi essentials", "Key milestones of the Prophet's life in Makkah and Madinah", "Character building and Sunnah habits"]
      },
      {
        module: "Module 4: Practical Fiqh & Modern Challenges",
        topics: ["Fiqh of Taharah, Salah, Zakah, and Fasting", "Halal & Haram in contemporary daily life", "Islamic manners in family and digital society"]
      }
    ],
    prerequisites: ["Basic reading ability in English or Urdu."],
    faqs: [
      {
        q: "Is this course available in Urdu and English?",
        a: "Yes, we offer both English-medium and Urdu-medium instruction according to student preference."
      }
    ]
  },

  "hifz-quran": {
    title: "Hifz-ul-Quran (Quran Memorization)",
    category: "Islamic Disciplines",
    level: "Dedicated Memorization Track",
    delivery: "1-on-1 Daily Coaching",
    description:
      "A systematic and disciplined memorization program with individualized daily lessons, recent lesson consolidation, and regular full-Juz revision cycles.",
    outcomes: [
      "Complete or customized partial memorization of the Holy Quran",
      "Retention retention through daily Sabaq, Sabqi, and Manzil routines",
      "Impeccable Tajweed preservation while reciting from memory",
      "Preparation for Sanad certification upon complete memorization"
    ],
    curriculum: [
      {
        module: "Stage 1: Foundational Memorization & Rhythm",
        topics: ["Juz 30 (Amma) and Juz 29 (Tabarak)", "Establishing daily memorization habits", "Phonetic accuracy checks"]
      },
      {
        module: "Stage 2: Core Quranic Memorization",
        topics: ["Structured daily Sabaq assignments (half page to 1 page)", "Sabqi consolidation of recent 5-10 pages", "Weekly Juz testing"]
      },
      {
        module: "Stage 3: Comprehensive Daur & Retention",
        topics: ["Cumulative Manzil revision cycles", "Mutashabihat (similar verses) mastery", "Endurance recitation for Taraweeh"]
      }
    ],
    prerequisites: ["Fluent Nazra reading with Tajweed."],
    faqs: [
      {
        q: "How many days per week are Hifz classes held?",
        a: "Hifz classes are typically held 4 to 6 days per week for optimal retention."
      }
    ]
  },

  gcse: {
    title: "GCSE & IGCSE Tutoring",
    category: "School & Board Prep",
    level: "UK Curriculum (Years 10–11)",
    delivery: "1-on-1 & Small Group",
    description:
      "Expert tuition tailored to Pearson Edexcel, AQA, and OCR exam boards. We build strong subject mastery, exam technique, and confidence for top grades (7-9).",
    outcomes: [
      "Thorough syllabus coverage across Math, Sciences, English, and Humanities",
      "Mastery of mark schemes, command words, and examiner expectations",
      "Extensive past paper practice under timed exam conditions",
      "Proven revision notes, mind maps, and high-yield formula sheets"
    ],
    curriculum: [
      {
        module: "Module 1: Syllabus Diagnostics & Core Content",
        topics: ["Identifying knowledge gaps", "In-depth concept lectures", "Topic-by-topic worksheet practice"]
      },
      {
        module: "Module 2: Advanced Problem Solving & Mark Schemes",
        topics: ["Decoding multi-mark exam questions", "Structured 6-mark answers in Science/English", "Mathematical proof and multi-step methods"]
      },
      {
        module: "Module 3: Past Paper Marathons & Timed Mocks",
        topics: ["10-year past paper walkthroughs", "Timed full mock exams with detailed examiner feedback", "Exam day time management"]
      }
    ],
    prerequisites: ["Current enrollment in GCSE/IGCSE Year 9, 10, or 11."],
    faqs: [
      {
        q: "Do you cover Foundation and Higher tier?",
        a: "Yes, our subject specialists tutor both Foundation and Higher tier specifications."
      }
    ]
  },

  "o-a-levels": {
    title: "O / A Levels (Cambridge & Edexcel)",
    category: "School & Board Prep",
    level: "Secondary & College",
    delivery: "1-on-1 Mentorship",
    description:
      "Rigorous subject tutoring for Cambridge CAIE and Edexcel International O Levels and AS/A Levels in STEM, Business, and Humanities subjects.",
    outcomes: [
      "Deep understanding of advanced concepts in Physics, Chemistry, Biology, Math, and Economics",
      "Expertise in structured essay writing and analytical calculations",
      "Systematic past paper topical drills and yearly paper solving",
      "Preparation for competitive university entrance requirements"
    ],
    curriculum: [
      {
        module: "Module 1: AS & A2 Syllabus Mastery",
        topics: ["Comprehensive theoretical breakdown", "Mathematical derivations and scientific principles", "Topical question banks"]
      },
      {
        module: "Module 2: Practical & Alternative to Practical (ATP)",
        topics: ["Experimental design, data evaluation, and error analysis", "Handling Paper 3 / Paper 4 ATP formats", "Scientific diagram drawing techniques"]
      },
      {
        module: "Module 3: Full-Length Past Papers & Grade Booster",
        topics: ["Detailed grading against official marking rubrics", "Common student pitfalls and examiner report insights", "Predictive mock evaluations"]
      }
    ],
    prerequisites: ["Enrollment in Cambridge O Level, IGCSE, or AS/A Level courses."],
    faqs: [
      {
        q: "Can I take one-on-one sessions for specific difficult topics only?",
        a: "Yes, we offer flexible module packages focused on specific topics or full-syllabus revision."
      }
    ]
  },

  naplan: {
    title: "Naplan Preparation",
    category: "School & Board Prep",
    level: "Years 3, 5, 7 & 9 (Australia)",
    delivery: "1-on-1 & Small Group",
    description:
      "Structured coaching for the Australian National Assessment Program (NAPLAN) designed to develop student confidence, literacy, and numeracy skills.",
    outcomes: [
      "Excellence in Reading comprehension and inferential analysis",
      "Mastery of Persuasive and Narrative writing genres with correct structure",
      "Strong punctuation, spelling, and grammar conventions",
      "Numeracy problem-solving without and with calculator"
    ],
    curriculum: [
      {
        module: "Module 1: Reading Comprehension & Vocabulary",
        topics: ["Informational, narrative, and poetic texts", "Skimming, scanning, and identifying key themes", "Vocabulary in context"]
      },
      {
        module: "Module 2: Writing (Narrative & Persuasive)",
        topics: ["Structuring compelling arguments and ideas", "Descriptive language, paragraphing, and vocabulary", "Editing and self-correction drills"]
      },
      {
        module: "Module 3: Language Conventions & Spelling",
        topics: ["Grammar rules, sentence structures, and punctuation", "Spelling patterns and tricky word banks", "Error identification exercises"]
      },
      {
        module: "Module 4: Numeracy Problem Solving",
        topics: ["Number, algebra, measurement, space, and statistics", "Multi-step word problems", "Timed practice test simulations"]
      }
    ],
    prerequisites: ["Australian school students in Years 3, 5, 7, or 9."],
    faqs: [
      {
        q: "Is the tutoring aligned with the Australian Curriculum?",
        a: "Yes, our teachers use resources and rubrics directly mapped to ACARA standards."
      }
    ]
  },

  "sat-tutoring": {
    title: "SAT Tutoring (Digital SAT)",
    category: "School & Board Prep",
    level: "High School / College Prep",
    delivery: "1-on-1 Strategy Coaching",
    description:
      "Intensive preparation for the Digital SAT. Master adaptive testing modules, fast mathematical heuristics, and evidence-based reading passages to target 1500+ scores.",
    outcomes: [
      "Mastery of the Digital SAT adaptive test structure and Bluebook interface",
      "Algebra, Advanced Math, Problem Solving, and Geometry shortcut methods",
      "Critical reading strategies for rhetoric, craft, and data reasoning passages",
      "Time management techniques and error elimination strategies"
    ],
    curriculum: [
      {
        module: "Module 1: Digital SAT Math Mastery",
        topics: ["Heart of Algebra, Passport to Advanced Math, Problem Solving & Data", "Desmos graphing calculator mastery and shortcuts", "Grid-in and multiple choice tactics"]
      },
      {
        module: "Module 2: Reading & Writing Strategy",
        topics: ["Information and Ideas, Craft and Structure, Expression of Ideas", "Standard English conventions, punctuation, and transitions", "Command of textual and quantitative evidence"]
      },
      {
        module: "Module 3: Adaptive Module 2 Drills & Timed Mocks",
        topics: ["Tackling the harder adaptive second module", "Full-length timed practice tests", "Detailed performance analytics and score improvement plan"]
      }
    ],
    prerequisites: ["High school students preparing for US and international college admissions."],
    faqs: [
      {
        q: "How many practice tests are included?",
        a: "Students complete multiple official Digital SAT practice tests with in-depth question-by-question reviews."
      }
    ]
  },

  "gre-tutoring": {
    title: "GRE Tutoring (Graduate Prep)",
    category: "School & Board Prep",
    level: "Graduates & Post-Grad Candidates",
    delivery: "1-on-1 Specialist",
    description:
      "Targeted preparation for the shortened GRE General Test covering Quantitative Reasoning, Verbal Reasoning, and Analytical Writing to help you gain admission into top grad schools.",
    outcomes: [
      "High-accuracy mathematical strategies in arithmetic, algebra, geometry, and data analysis",
      "Verbal mastery in Text Completion, Sentence Equivalence, and Reading Comprehension",
      "High-scoring Analytical Writing essay frameworks",
      "Pacing strategies to achieve 320+ scores"
    ],
    curriculum: [
      {
        module: "Module 1: GRE Quantitative Reasoning",
        topics: ["Quantitative comparison strategies", "Arithmetic, algebra, coordinate geometry, probability, and combinatorics", "Data interpretation graphs and tables"]
      },
      {
        module: "Module 2: GRE Verbal Reasoning",
        topics: ["High-frequency GRE vocabulary and root words", "Text Completion (1, 2, 3 blanks) logic and tone", "Sentence Equivalence paired synonyms and active reading"]
      },
      {
        module: "Module 3: Analytical Writing & Full Mocks",
        topics: ["'Analyze an Issue' essay blueprints and scoring criteria", "Timed practice sections", "Full mock exams with scaled score breakdown"]
      }
    ],
    prerequisites: ["University students and professionals applying for Master's or PhD programs."],
    faqs: [
      {
        q: "How long is the GRE prep course?",
        a: "Usually 8 to 12 weeks of focused coaching based on your diagnostic baseline score."
      }
    ]
  },

  science: {
    title: "Science (Physics, Chemistry & Biology)",
    category: "STEM & Languages",
    level: "Grades 4 through 10",
    delivery: "1-on-1 & Cohort",
    description:
      "Interactive, inquiry-based science education that connects theoretical principles to real-world phenomena, fostering curiosity, critical thinking, and academic excellence.",
    outcomes: [
      "Conceptual clarity in physical, chemical, and biological systems",
      "Ability to interpret scientific diagrams, data tables, and graphs",
      "Practical understanding of the scientific method and experimentation",
      "Top marks in school science assessments and term exams"
    ],
    curriculum: [
      {
        module: "Module 1: Physics Fundamentals",
        topics: ["Forces, motion, speed, and Newton's laws", "Energy forms, work, power, and electricity", "Light, sound, and thermal physics"]
      },
      {
        module: "Module 2: Chemistry Fundamentals",
        topics: ["States of matter, atoms, elements, and compounds", "Periodic table trends and chemical bonding", "Chemical reactions, acids, bases, and salts"]
      },
      {
        module: "Module 3: Biology & Living Systems",
        topics: ["Cell structure, plant and animal biology", "Human organ systems (respiratory, circulatory, digestive)", "Ecology, genetics, and environment"]
      }
    ],
    prerequisites: ["Grade-appropriate school level."],
    faqs: [
      {
        q: "Can the instructor help with school science lab reports and projects?",
        a: "Yes, our teachers assist students with experimental design, hypothesis formulation, and lab report write-ups."
      }
    ]
  },

  "computer-science": {
    title: "Computer Science",
    category: "IT & Programming",
    level: "Beginner to Intermediate",
    delivery: "1-on-1 & Cohort",
    description:
      "Comprehensive computer science foundations covering computer architecture, binary logic, algorithms, networking, databases, and cybersecurity principles.",
    outcomes: [
      "Understanding CPU architecture, memory (RAM/ROM), and storage systems",
      "Binary, hexadecimal, and boolean logic operations",
      "Algorithm design with flowcharts and pseudocode",
      "Knowledge of computer networks, protocols, and data security"
    ],
    curriculum: [
      {
        module: "Module 1: Computer Systems & Hardware",
        topics: ["Von Neumann architecture, CPU fetch-decode-execute cycle", "Primary and secondary memory", "Input/output devices and embedded systems"]
      },
      {
        module: "Module 2: Data Representation & Logic",
        topics: ["Binary addition, subtraction, two's complement", "Hexadecimal conversions and character encoding (ASCII/Unicode)", "Logic gates (AND, OR, NOT, XOR, NAND) and truth tables"]
      },
      {
        module: "Module 3: Networks, Security & Databases",
        topics: ["LAN/WAN, topologies, IP addressing, DNS", "Cybersecurity threats (malware, phishing) and cryptography", "Relational database concepts and SQL queries"]
      }
    ],
    prerequisites: ["No prior experience required; suitable for school students and adults."],
    faqs: [
      {
        q: "Does this follow the IGCSE/GCSE Computer Science curriculum?",
        a: "Yes, it can be aligned directly with Cambridge (0478), Edexcel, or general high school computer science."
      }
    ]
  },

  "computer-programming": {
    title: "Computer Programming (Coding)",
    category: "IT & Programming",
    level: "Beginner to Advanced",
    delivery: "Hands-on Project Based",
    description:
      "Practical programming course focused on writing clean, efficient code in Python, C++, or JavaScript. Build real projects, games, and automation tools.",
    outcomes: [
      "Mastery of core programming constructs: variables, loops, conditionals, functions",
      "Object-Oriented Programming (OOP): classes, objects, inheritance, polymorphism",
      "Data structures: lists, dictionaries, stacks, queues, and search/sort algorithms",
      "Building terminal applications, games, and portfolio coding projects"
    ],
    curriculum: [
      {
        module: "Module 1: Programming Fundamentals (Python)",
        topics: ["Syntax, data types, arithmetic operators", "Conditional logic (if/else), for/while loops", "Functions, parameters, and scope"]
      },
      {
        module: "Module 2: Data Structures & File Handling",
        topics: ["Lists, tuples, dictionaries, and sets", "String manipulation and regex", "Reading/writing files and JSON data handling"]
      },
      {
        module: "Module 3: Object-Oriented Programming (OOP)",
        topics: ["Classes, constructors, and encapsulation", "Inheritance and modular code design", "Exception handling and debugging techniques"]
      },
      {
        module: "Module 4: Real-World Projects & Algorithms",
        topics: ["Linear and binary search, sorting algorithms", "Building interactive games & GUI apps", "Version control with Git and GitHub basics"]
      }
    ],
    prerequisites: ["Basic computer literacy."],
    faqs: [
      {
        q: "Which programming language will my child learn first?",
        a: "We recommend Python for beginners due to its readable syntax, with options to learn C++ or JavaScript as they advance."
      }
    ]
  },

  "web-designing": {
    title: "Web Designing & UI/UX",
    category: "IT & Programming",
    level: "Beginner to Intermediate",
    delivery: "Interactive Cohort",
    description:
      "Learn to design stunning, modern, responsive websites using HTML5, CSS3, Tailwind CSS, Bootstrap, and Figma UI/UX design tools.",
    outcomes: [
      "Proficiency in modern semantic HTML5 and CSS3 styling",
      "Mastery of Flexbox and CSS Grid layouts for responsive web pages",
      "Styling fast with Tailwind CSS and Bootstrap component libraries",
      "Wireframing, prototyping, and UI design in Figma"
    ],
    curriculum: [
      {
        module: "Module 1: HTML5 Semantics & CSS3 Fundamentals",
        topics: ["Document structure, typography, images, audio, video", "Box model, colors, shadows, gradients, and CSS transitions", "Forms, buttons, and custom inputs"]
      },
      {
        module: "Module 2: Responsive Layouts with Flexbox & Grid",
        topics: ["CSS Flexbox container and item properties", "CSS Grid template columns, rows, and responsive areas", "Media queries and mobile-first design strategy"]
      },
      {
        module: "Module 3: Tailwind CSS & Modern Frameworks",
        topics: ["Utility-first styling with Tailwind CSS", "Responsive utility classes and dark mode", "Bootstrap 5 components and rapid layout builds"]
      },
      {
        module: "Module 4: UI/UX Prototyping with Figma & Portfolio",
        topics: ["Figma wireframing, color schemes, and component sets", "Interactive prototyping and user experience principles", "Publishing live website projects on GitHub Pages"]
      }
    ],
    prerequisites: ["Basic computer usage skills."],
    faqs: [
      {
        q: "Will I build real websites during this course?",
        a: "Yes, students build 3-5 real, responsive website projects to include in their portfolio."
      }
    ]
  },

  "web-development": {
    title: "Full Stack Web Development",
    category: "IT & Programming",
    level: "Intermediate to Pro",
    delivery: "Project Cohort & Mentorship",
    description:
      "Become a job-ready full stack web developer. Master JavaScript/TypeScript, React, Next.js, Node.js, Express, databases (PostgreSQL/MongoDB), and cloud deployment.",
    outcomes: [
      "Modern JavaScript ES6+ and TypeScript for production web apps",
      "Building interactive frontend UIs with React and Next.js App Router",
      "Developing RESTful APIs and backend microservices with Node.js & Express",
      "Database design, Prisma ORM, user authentication (JWT/NextAuth), and cloud hosting"
    ],
    curriculum: [
      {
        module: "Module 1: Advanced JavaScript & TypeScript",
        topics: ["ES6+ syntax, closures, promises, async/await", "DOM manipulation, events, and API fetch calls", "TypeScript types, interfaces, and generics"]
      },
      {
        module: "Module 2: React & Next.js Modern Frontend",
        topics: ["React components, hooks (useState, useEffect, custom hooks)", "Next.js App Router, server components, and routing", "State management, form handling, and Tailwind integration"]
      },
      {
        module: "Module 3: Backend APIs & Database Engineering",
        topics: ["Node.js, Express server setup, middleware", "Relational databases (PostgreSQL) and Prisma ORM", "Authentication, password hashing, and session tokens"]
      },
      {
        module: "Module 4: Full Stack Capstone Project & Cloud Deployment",
        topics: ["Connecting full stack CRUD operations", "Deployment on Vercel, Railway, and Neon DB", "Security best practices, environment variables, and Git CI/CD"]
      }
    ],
    prerequisites: ["Basic knowledge of HTML and CSS."],
    faqs: [
      {
        q: "What kind of project will I build?",
        a: "You will build a full-stack web application (such as an e-commerce platform or learning portal) complete with auth and live database."
      }
    ]
  },

  "social-media-marketing-smm": {
    title: "Social Media Marketing (SMM) & Digital Growth",
    category: "IT & Programming",
    level: "All Levels",
    delivery: "Practical Workshop",
    description:
      "Master digital marketing campaigns across Meta (Facebook & Instagram), Google Ads, YouTube, and LinkedIn. Learn content creation, ad targeting, ROI analytics, and brand scaling.",
    outcomes: [
      "Running profitable paid ad campaigns using Meta Ads Manager",
      "Audience targeting, lookalike audiences, and retargeting funnels",
      "Content strategy, copywriting, Canva graphic creation, and video reels",
      "Search Engine Optimization (SEO) basics and Google Analytics tracking"
    ],
    curriculum: [
      {
        module: "Module 1: Digital Marketing Strategy & Branding",
        topics: ["Defining target customer avatars and market positioning", "Brand identity, tone of voice, and content pillars", "Social media profile optimization"]
      },
      {
        module: "Module 2: Meta Ads (Facebook & Instagram)",
        topics: ["Meta Business Suite and Ads Manager setup", "Campaign objectives: Awareness, Traffic, Leads, Sales", "Ad copy, creative formats (Carousel, Video, Stories), and A/B split testing"]
      },
      {
        module: "Module 3: Google Ads & YouTube Marketing",
        topics: ["Google Search Ads, keyword research, and bidding strategies", "YouTube video advertising and channel growth", "Conversion tracking and Google Tag Manager"]
      },
      {
        module: "Module 4: Analytics, Freelancing & Client Acquisition",
        topics: ["Measuring ROAS (Return on Ad Spend), CTR, and CPA", "Building marketing reports and dashboards", "Freelancing on Upwork/Fiverr and pitching to business clients"]
      }
    ],
    prerequisites: ["No marketing experience needed; computer and internet connection."],
    faqs: [
      {
        q: "Is this course practical with live ad budget demonstrations?",
        a: "Yes, you will see real ad accounts, live campaign setups, and real-time optimization strategies."
      }
    ]
  },

  "digital-marketing": {
    title: "Digital Marketing Mastery",
    category: "IT & Programming",
    level: "All Levels",
    delivery: "Practical Workshop & Mentorship",
    description:
      "Comprehensive digital marketing training covering Search Engine Optimization (SEO), pay-per-click advertising (Google Ads & Meta Ads), content marketing, email funnels, and data analytics.",
    outcomes: [
      "End-to-end multi-channel marketing campaigns that drive leads and conversions",
      "On-page and technical SEO strategies to rank high on Google search",
      "Paid advertising mastery across Google Search, Display, and Meta networks",
      "Data-driven marketing analytics, conversion tracking, and ROI measurement"
    ],
    curriculum: [
      {
        module: "Module 1: Search Engine Optimization (SEO)",
        topics: ["Keyword research & competitive analysis", "On-page optimization & internal linking", "Technical SEO audits and backlink building"]
      },
      {
        module: "Module 2: Paid Ads (PPC & Social)",
        topics: ["Google Ads search & display campaigns", "Meta Ads targeting, pixel setup & lookalikes", "Ad copywriting & high-converting landing pages"]
      },
      {
        module: "Module 3: Inbound Marketing & Automation",
        topics: ["Email marketing funnels & lead nurturing", "Content marketing strategies and blogging", "Marketing automation tools (Mailchimp, HubSpot)"]
      },
      {
        module: "Module 4: Analytics & Client Acquisition",
        topics: ["Google Analytics 4 (GA4) setup & dashboards", "Conversion rate optimization (CRO)", "Freelancing, client proposals & agency scaling"]
      }
    ],
    prerequisites: ["Basic computer and internet browsing skills."],
    faqs: [
      {
        q: "Do I get a certificate upon completion?",
        a: "Yes, you will receive an AEC Network Certificate of Completion in Digital Marketing."
      }
    ]
  },

  english: {
    title: "English Language Mastery",
    category: "Linguistics & Communication",
    level: "Primary, Secondary & Adult",
    delivery: "1-on-1 & Interactive Cohorts",
    description:
      "Comprehensive English instruction designed to cultivate spoken fluency, grammatical precision, active reading comprehension, and structured writing for academic and everyday success.",
    outcomes: [
      "Confident oral communication and pronunciation accuracy",
      "Strong grammatical foundation in sentence structures, tenses, and punctuation",
      "Enhanced reading comprehension of informational and literary passages",
      "Structured essay and paragraph writing competence"
    ],
    curriculum: [
      {
        module: "Module 1: Grammar Foundations & Mechanics",
        topics: ["Parts of speech and sentence architecture", "Verb tenses, modals, and subject-verb agreement", "Punctuation and clause construction"]
      },
      {
        module: "Module 2: Conversational & Spoken Fluency",
        topics: ["Daily dialogues and situational roleplay", "Pronunciation clarity, stress, and intonation", "Public speaking and structured presentation skills"]
      },
      {
        module: "Module 3: Reading Comprehension & Vocabulary",
        topics: ["Contextual vocabulary acquisition", "Active reading strategies (skimming, scanning, inferring)", "Critical text analysis"]
      },
      {
        module: "Module 4: Academic & Structured Writing",
        topics: ["Paragraph unity and topic sentences", "Descriptive, narrative, and persuasive essays", "Formal emails, reports, and summary writing"]
      }
    ],
    prerequisites: ["Placement evaluation to determine student proficiency level."],
    faqs: [
      {
        q: "Is this program suitable for school exam support?",
        a: "Yes, our instructors can align lesson modules with specific school curricula."
      }
    ]
  },

  arabic: {
    title: "Arabic Studies (Classical & Modern)",
    category: "Linguistics & Islamic Studies",
    level: "Beginner to Advanced",
    delivery: "1-on-1 & Group Cohorts",
    description:
      "A systematic Arabic program bridging classical Quranic grammar (Nahw & Sarf) with Modern Standard Arabic (MSA) for both reading comprehension and conversational fluency.",
    outcomes: [
      "Arabic script mastery and accurate reading",
      "Core vocabulary of high-frequency Quranic and daily terms",
      "Understanding of nominal and verbal sentence syntax",
      "Ability to hold basic conversations and comprehend classical texts"
    ],
    curriculum: [
      {
        module: "Module 1: Arabic Reading & Core Vocabulary",
        topics: ["Alphabet, vowelization, and word connection", "High-frequency Quranic nouns and verbs", "Greetings and basic conversational phrases"]
      },
      {
        module: "Module 2: Applied Grammar (Nahw Foundations)",
        topics: ["Noun types, definiteness, and gender", "Idafa (possessive constructs) and prepositions", "Nominal sentences (Mubtada and Khabar)"]
      },
      {
        module: "Module 3: Morphology (Sarf Foundations)",
        topics: ["Three-letter root systems (Thulathi Mujarrad)", "Past, present, and imperative verb conjugations", "Pronoun attachments and variations"]
      },
      {
        module: "Module 4: Text Comprehension & Dialogue",
        topics: ["Reading short classical stories and Quranic passages", "Situational Arabic conversation drills", "Written sentence composition"]
      }
    ],
    prerequisites: ["Open to absolute beginners; placement test for students with prior reading ability."],
    faqs: [
      {
        q: "Does this program focus on Quranic Arabic or Spoken Arabic?",
        a: "The curriculum balances Quranic vocabulary and classical grammar foundations with modern standard spoken fluency."
      }
    ]
  },

  mathematics: {
    title: "Mathematics & Analytical Thinking",
    category: "STEM",
    level: "Grades 1 through 12",
    delivery: "1-on-1 & Small Groups",
    description:
      "Concept-first mathematics instruction designed to eliminate math anxiety, develop problem-solving reasoning, and ensure mastery across school grade levels.",
    outcomes: [
      "Deep conceptual clarity in number sense, operations, and arithmetic",
      "Proficiency in algebraic manipulation, linear equations, and polynomials",
      "Geometric reasoning, spatial geometry, and coordinate proofs",
      "Confidence in solving multi-step word problems and applied mathematical challenges"
    ],
    curriculum: [
      {
        module: "Module 1: Number Sense & Foundational Operations",
        topics: ["Integers, fractions, decimals, and percentages", "Order of operations (PEMDAS/BODMAS)", "Ratios, proportions, and unit rates"]
      },
      {
        module: "Module 2: Algebraic Concepts & Equations",
        topics: ["Linear equations and inequalities in one variable", "Simultaneous equations and graphical solutions", "Quadratic equations and factoring techniques"]
      },
      {
        module: "Module 3: Geometry & Trigonometry",
        topics: ["Angles, parallel lines, and triangle properties", "Perimeter, area, surface area, and volume formulas", "Right-triangle trigonometry (SOH CAH TOA)"]
      },
      {
        module: "Module 4: Data Analysis & Advanced Topics",
        topics: ["Probability, mean, median, mode, and charts", "Functions, graphs, and transformations", "Calculus foundations (for senior grade levels)"]
      }
    ],
    prerequisites: ["Diagnostic assessment to match the student with their appropriate grade-level module."],
    faqs: [
      {
        q: "Can the teacher help with my child's daily school homework?",
        a: "Yes. In the one-to-one track, teachers regularly dedicate portion of each session to homework concepts and exam preparation."
      }
    ]
  }
};

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const details = PROGRAM_DETAILS[params.slug] || {
    title: params.slug
      .split("-")
      .map((w) => w[0]?.toUpperCase() + w.slice(1))
      .join(" "),
    category: "Academic Program",
    level: "Structured Pacing",
    delivery: "1-on-1 & Group Options",
    description:
      "AEC Network provides structured online education led by qualified, vetted instructors with personalized timetables, modular curricula, and regular parental progress reporting.",
    outcomes: [
      "Comprehensive syllabus coverage aligned with academic goals",
      "Regular assessments, quizzes, and constructive teacher feedback",
      "Flexible schedule tailored to your family's time zone",
      "Official certificate upon successful completion"
    ],
    curriculum: [
      {
        module: "Module 1: Fundamentals & Baseline Concepts",
        topics: ["Intake evaluation and diagnostic review", "Core principles and foundational methodology", "Guided practice exercises"]
      },
      {
        module: "Module 2: Applied Skills & Practice",
        topics: ["Interactive problem solving and practical drills", "Peer review and teacher-guided corrections", "Formative quiz evaluations"]
      },
      {
        module: "Module 3: Advanced Application & Mastery",
        topics: ["Complex topic reinforcement", "Capstone milestone assessment", "Final term progress review"]
      }
    ],
    prerequisites: ["Diagnostic evaluation with our academic advisory team."],
    faqs: [
      {
        q: "How do I enroll in this program?",
        a: "You can begin by booking a free trial class. Our team will evaluate student level and set up an initial schedule with an assigned teacher."
      }
    ]
  };

  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      {/* Breadcrumbs & Header */}
      <div>
        <Link href="/programs" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to All Programs
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="badge badge-info">{details.category}</span>
          <span className="badge badge-neutral">{details.level}</span>
          <span className="badge badge-warning">{details.delivery}</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          {details.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-aec-navy/75 leading-relaxed">
          {details.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/admissions/free-trial" className="btn-primary">
            Book a Free Trial Class
          </Link>
          <Link href="/admissions/apply" className="btn-secondary">
            Submit Admission Form
          </Link>
          <Link href="/courses" className="btn-secondary">
            View LMS Courses
          </Link>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="card bg-white space-y-4">
        <h2 className="font-display text-xl font-bold text-aec-navy">What Students Will Learn</h2>
        <ul className="grid gap-3 sm:grid-cols-2 pt-2">
          {details.outcomes.map((outcome, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-aec-navy/80">
              <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Curriculum Outline */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-aec-navy">Structured Curriculum Outline</h2>
        <div className="space-y-4">
          {details.curriculum.map((mod, idx) => (
            <div key={idx} className="card border-l-4 border-l-aec-teal">
              <h3 className="font-display text-base font-bold text-aec-navy">{mod.module}</h3>
              <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-aec-navy/70">
                {mod.topics.map((topic, tIdx) => (
                  <li key={tIdx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-aec-teal shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Format & Prerequisites */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <h3 className="font-display text-base font-bold text-aec-navy">Prerequisites & Admission</h3>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-aec-navy/70">
            {details.prerequisites.map((p, idx) => (
              <li key={idx}>• {p}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="font-display text-base font-bold text-aec-navy">Parent & Student Support</h3>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-aec-navy/70">
            <li>• Live attendance & absence notifications</li>
            <li>• Downloadable worksheets & lesson summaries</li>
            <li>• Dedicated Parent Portal access</li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-aec-navy">Program FAQs</h2>
        <div className="space-y-3">
          {details.faqs.map((faq, idx) => (
            <details key={idx} className="card group cursor-pointer">
              <summary className="font-semibold text-aec-navy flex items-center justify-between list-none">
                <span>{faq.q}</span>
                <span className="text-aec-teal group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-sm text-aec-navy/70 pt-2 border-t border-aec-navy/5">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl border border-aec-teal/30 bg-gradient-to-r from-aec-navy to-slate-900 text-white p-8 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold">Start Learning {details.title}</h2>
        <p className="text-sm text-white/75 max-w-lg mx-auto">
          Book a free trial class today to meet an assigned instructor and experience our pedagogical approach.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/admissions/free-trial" className="btn-primary">
            Book a Free Trial Class
          </Link>
          <Link href="/contact" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
            Speak with an Advisor
          </Link>
        </div>
      </div>
    </div>
  );
}
