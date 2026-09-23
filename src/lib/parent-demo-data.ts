export interface ChildProfile {
  id: string;
  code: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  enrolledProgram: string;
  attendanceRate: number;
  completedLessons: number;
  totalLessons: number;
  gpa: number;
  overallGrade: string;
  primaryTeacher: string;
  nextClass: string;
  nextClassTime: string;
  joinUrl: string;
}

export const DEMO_PARENT = {
  id: "par-001",
  fullName: "Muhammad Akbar",
  email: "aecnetwork641@gmail.com",
  phone: "+92 343 5999397",
  address: "Islamabad, Pakistan",
  children: [
    {
      id: "child-1",
      code: "AEC-STU-2026-001",
      name: "Abdullah Akbar",
      age: 14,
      grade: "Grade 8 / Quran Hifz & Tajweed",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      enrolledProgram: "Quran & Applied Tajweed + Spoken Arabic",
      attendanceRate: 96,
      completedLessons: 28,
      totalLessons: 36,
      gpa: 3.92,
      overallGrade: "A+",
      primaryTeacher: "Ustadh Muhammad Qasim",
      nextClass: "Quran Recitation & Applied Tajweed",
      nextClassTime: "Today at 5:00 PM PKT",
      joinUrl: "https://meet.google.com/aec-live-class",
    },
    {
      id: "child-2",
      code: "AEC-STU-2026-042",
      name: "Fatima Akbar",
      age: 10,
      grade: "Grade 5 / Nazra & English",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
      enrolledProgram: "Nazra Quran with Noorani Qaida + English Fluency",
      attendanceRate: 98,
      completedLessons: 20,
      totalLessons: 24,
      gpa: 3.95,
      overallGrade: "A+",
      primaryTeacher: "Ustaza Maryam Bint Bilal",
      nextClass: "English Phonics & Vocabulary",
      nextClassTime: "Tomorrow at 4:30 PM PKT",
      joinUrl: "https://zoom.us/j/923435999397",
    },
  ] as ChildProfile[],
};

export const DEMO_PARENT_INVOICES = [
  {
    id: "INV-2026-SEP-01",
    childName: "Abdullah Akbar & Fatima Akbar",
    month: "September 2026",
    tuitionFee: "$110.00",
    pkrAmount: "PKR 30,800",
    status: "Paid",
    paidDate: "Sept 05, 2026",
    method: "Bank Transfer",
  },
  {
    id: "INV-2026-AUG-01",
    childName: "Abdullah Akbar & Fatima Akbar",
    month: "August 2026",
    tuitionFee: "$110.00",
    pkrAmount: "PKR 30,800",
    status: "Paid",
    paidDate: "Aug 05, 2026",
    method: "Online Card",
  },
];

export const DEMO_PARENT_FEEDBACK = [
  {
    id: "fb-1",
    childName: "Abdullah Akbar",
    teacher: "Ustadh Muhammad Qasim",
    date: "Sept 20, 2026",
    subject: "Quran & Applied Tajweed",
    comment: "Abdullah has memorized Surah Al-Mulk ayat 1-10 with very accurate Tajweed pronunciation. Keep encouraging him to do 15 minutes of revision daily at home.",
    rating: 5,
  },
  {
    id: "fb-2",
    childName: "Fatima Akbar",
    teacher: "Ustaza Maryam Bint Bilal",
    date: "Sept 18, 2026",
    subject: "Noorani Qaida & Nazra",
    comment: "Fatima is doing exceptionally well. She recognized all compound letters easily today and recited with high confidence.",
    rating: 5,
  },
];
