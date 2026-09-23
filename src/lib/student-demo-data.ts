export interface StudentProfileData {
  id: string;
  studentCode: string;
  fullName: string;
  avatar: string;
  email: string;
  phone: string;
  country: string;
  enrolledSince: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  primaryProgram: string;
  attendanceRate: number;
  completedLessons: number;
  totalLessons: number;
  overallGrade: string;
  gpa: number;
}

export const DEMO_STUDENT: StudentProfileData = {
  id: "stu-001",
  studentCode: "AEC-STU-2026-001",
  fullName: "Abdullah Akbar",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  email: "abdullah.akbar@example.com",
  phone: "+92 343 5999397",
  country: "Pakistan",
  enrolledSince: "January 2026",
  guardianName: "Muhammad Akbar",
  guardianPhone: "+92 343 5999397",
  guardianEmail: "aecnetwork641@gmail.com",
  primaryProgram: "Quran & Tajweed (Intensive) + Spoken Arabic",
  attendanceRate: 96,
  completedLessons: 28,
  totalLessons: 36,
  overallGrade: "A+",
  gpa: 3.92,
};

export const DEMO_ENROLLED_COURSES = [
  {
    id: "course-1",
    slug: "quran-tajweed-advanced",
    title: "Quran Recitation & Applied Tajweed Rules",
    instructor: "Ustadh Muhammad Qasim (Al-Azhar Certified)",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    progress: 78,
    completedLessons: 18,
    totalLessons: 24,
    nextLesson: "Madd (Elongation) Rules & Practical Exercises",
    nextClassTime: "Today at 5:00 PM PKT",
    status: "Active",
    meetingLink: "https://meet.google.com/aec-live-class",
    meetingPlatform: "Google Meet",
  },
  {
    id: "course-2",
    slug: "spoken-arabic-foundations",
    title: "Conversational & Spoken Arabic for Beginners",
    instructor: "Ustadh Tariq Al-Mansoor",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    progress: 60,
    completedLessons: 12,
    totalLessons: 20,
    nextLesson: "Everyday Dialogues: At the Market & Travel",
    nextClassTime: "Tomorrow at 6:00 PM PKT",
    status: "Active",
    meetingLink: "https://zoom.us/j/923435999397",
    meetingPlatform: "Zoom",
  },
  {
    id: "course-3",
    slug: "english-grammar-composition",
    title: "English Grammar, Vocabulary & Essay Writing",
    instructor: "Sister Amina Siddiqui (M.A. English)",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    progress: 85,
    completedLessons: 17,
    totalLessons: 20,
    nextLesson: "Argumentative Essay Structuring",
    nextClassTime: "Thursday at 4:00 PM PKT",
    status: "Active",
    meetingLink: "https://meet.google.com/aec-english-class",
    meetingPlatform: "Google Meet",
  },
];

export const DEMO_TODAYS_CLASSES = [
  {
    id: "cls-101",
    courseTitle: "Quran Recitation & Applied Tajweed",
    instructor: "Ustadh Muhammad Qasim",
    time: "5:00 PM - 5:45 PM (PKT)",
    status: "upcoming",
    room: "Online Room 1",
    meetingPlatform: "Google Meet",
    joinUrl: "https://meet.google.com/aec-live-class",
    isLiveNow: true,
  },
  {
    id: "cls-102",
    courseTitle: "Conversational Arabic",
    instructor: "Ustadh Tariq Al-Mansoor",
    time: "6:30 PM - 7:15 PM (PKT)",
    status: "scheduled",
    room: "Online Room 3",
    meetingPlatform: "Zoom",
    joinUrl: "https://zoom.us/j/923435999397",
    isLiveNow: false,
  },
];

export const DEMO_TIMETABLE = [
  { day: "Monday", time: "5:00 PM - 5:45 PM", course: "Quran & Tajweed", teacher: "Ustadh Qasim", platform: "Google Meet" },
  { day: "Monday", time: "6:30 PM - 7:15 PM", course: "Spoken Arabic", teacher: "Ustadh Tariq", platform: "Zoom" },
  { day: "Tuesday", time: "5:00 PM - 5:45 PM", course: "English Grammar", teacher: "Sister Amina", platform: "Google Meet" },
  { day: "Wednesday", time: "5:00 PM - 5:45 PM", course: "Quran & Tajweed", teacher: "Ustadh Qasim", platform: "Google Meet" },
  { day: "Wednesday", time: "6:30 PM - 7:15 PM", course: "Spoken Arabic", teacher: "Ustadh Tariq", platform: "Zoom" },
  { day: "Thursday", time: "4:00 PM - 4:45 PM", course: "English Grammar", teacher: "Sister Amina", platform: "Google Meet" },
  { day: "Friday", time: "5:00 PM - 5:45 PM", course: "Quran & Tajweed (Revision & Oral Quiz)", teacher: "Ustadh Qasim", platform: "Google Meet" },
  { day: "Saturday", time: "11:00 AM - 12:00 PM", course: "Islamic Studies & Seerah Workshop", teacher: "Sheikh Bilal", platform: "Zoom" },
];

export const DEMO_ASSIGNMENTS = [
  {
    id: "asg-1",
    course: "Quran & Applied Tajweed",
    title: "Surah Al-Mulk (Ayat 1-10) Recitation Audio Recording",
    dueDate: "Tomorrow (Sept 24, 2026)",
    status: "pending",
    maxMarks: 50,
    instructions: "Record a clear 3-minute MP3/M4A audio reciting Surah Al-Mulk with proper Ikhfa and Ghunnah rules applied.",
  },
  {
    id: "asg-2",
    course: "English Grammar",
    title: "500-Word Descriptive Essay: 'A Memorable Journey'",
    dueDate: "Sept 26, 2026",
    status: "pending",
    maxMarks: 100,
    instructions: "Submit a PDF document focusing on compound sentences and descriptive adjectives.",
  },
  {
    id: "asg-3",
    course: "Spoken Arabic",
    title: "Arabic Pronoun & Verb Conjugation Worksheet #4",
    dueDate: "Submitted (Under Review)",
    status: "submitted",
    maxMarks: 50,
    submittedAt: "Sept 21, 2026",
  },
  {
    id: "asg-4",
    course: "Quran & Applied Tajweed",
    title: "Noon Saakinah & Tanween Quiz & Recording",
    dueDate: "Completed",
    status: "graded",
    score: 48,
    maxMarks: 50,
    grade: "A+",
    feedback: "MashaAllah excellent pronunciation and clear Makharij of letters Qaaf and Khaa.",
  },
];

export const DEMO_RESULTS = [
  {
    id: "res-1",
    term: "Term 2 Evaluation (2026)",
    course: "Quran & Applied Tajweed",
    examTitle: "Mid-Term Comprehensive Oral & Theory Exam",
    score: 96,
    maxScore: 100,
    grade: "A+",
    date: "Aug 2026",
    remarks: "Outstanding mastery of Tajweed rules and fluent Tarteel recitation.",
  },
  {
    id: "res-2",
    term: "Term 2 Evaluation (2026)",
    course: "Spoken Arabic Foundations",
    examTitle: "Vocabulary & Dialogue Assessment",
    score: 91,
    maxScore: 100,
    grade: "A",
    date: "Aug 2026",
    remarks: "Very good conversational fluency and quick response in Arabic dialogue.",
  },
  {
    id: "res-3",
    term: "Term 2 Evaluation (2026)",
    course: "English Grammar & Writing",
    examTitle: "Mid-Term Essay & Grammar Assessment",
    score: 89,
    maxScore: 100,
    grade: "A-",
    date: "Aug 2026",
    remarks: "Strong essay structure. Focus slightly more on punctuation rules.",
  },
];

export const DEMO_ATTENDANCE = [
  { date: "2026-09-22", course: "Quran & Tajweed", time: "5:00 PM", status: "Present" },
  { date: "2026-09-22", course: "Spoken Arabic", time: "6:30 PM", status: "Present" },
  { date: "2026-09-21", course: "English Grammar", time: "5:00 PM", status: "Present" },
  { date: "2026-09-19", course: "Quran & Tajweed", time: "5:00 PM", status: "Present" },
  { date: "2026-09-18", course: "Spoken Arabic", time: "6:30 PM", status: "Late (5 mins)" },
  { date: "2026-09-17", course: "English Grammar", time: "5:00 PM", status: "Present" },
  { date: "2026-09-15", course: "Quran & Tajweed", time: "5:00 PM", status: "Present" },
  { date: "2026-09-14", course: "Spoken Arabic", time: "6:30 PM", status: "Excused (Doctor appt)" },
];

export const DEMO_INVOICES = [
  {
    id: "INV-2026-098",
    title: "Monthly Tuition Fee — September 2026",
    amount: "USD $65.00",
    pkrAmount: "PKR 18,200",
    dueDate: "Sept 10, 2026",
    status: "Paid",
    paidDate: "Sept 05, 2026",
    method: "Bank Transfer / Card",
    receiptUrl: "#",
  },
  {
    id: "INV-2026-085",
    title: "Monthly Tuition Fee — August 2026",
    amount: "USD $65.00",
    pkrAmount: "PKR 18,200",
    dueDate: "Aug 10, 2026",
    status: "Paid",
    paidDate: "Aug 06, 2026",
    method: "Bank Transfer / Card",
    receiptUrl: "#",
  },
  {
    id: "INV-2026-072",
    title: "Monthly Tuition Fee — July 2026",
    amount: "USD $65.00",
    pkrAmount: "PKR 18,200",
    dueDate: "July 10, 2026",
    status: "Paid",
    paidDate: "July 04, 2026",
    method: "Bank Transfer / Card",
    receiptUrl: "#",
  },
];

export const DEMO_CERTIFICATES = [
  {
    id: "CERT-2026-QRN-889",
    title: "Certificate of Completion: Intermediate Tajweed & Quran Recitation",
    recipient: "Abdullah Akbar",
    instructor: "Ustadh Muhammad Qasim",
    issuedDate: "August 15, 2026",
    credentialId: "AEC-CRD-8891-2026",
    grade: "Distinction (96%)",
    status: "Verified",
    verifyUrl: "/verify-certificate/AEC-CRD-8891-2026",
  },
];
