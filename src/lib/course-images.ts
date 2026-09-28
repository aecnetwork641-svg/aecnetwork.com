export function getCourseImage(category?: string, slug?: string): string {
  const cat = (category || "").toLowerCase();
  const s = (slug || "").toLowerCase();

  // 1. Mathematics & Analytical Thinking -> math.jpg
  if (s === "mathematics" || s === "mathematics-foundations" || s.includes("math")) {
    return "/images/courses/math.jpg";
  }

  // 2. Science (Physics, Chemistry & Biology) -> 13.jpg
  if (s.includes("science") || s.includes("physics") || s.includes("chemistry") || s.includes("biology")) {
    return "/images/courses/13.jpg";
  }

  // 3. Computer Science Foundations -> CSFHR-6240-1200x796-4a9452d.jpg
  if (s === "computer-science" || s.includes("computer-science")) {
    return "/images/courses/CSFHR-6240-1200x796-4a9452d.jpg";
  }

  // 4. Web Development (Full Stack) -> Become-a-full-stack-web-developer_Blog-scaled.jpeg
  if (s === "web-development" || s.includes("web-development")) {
    return "/images/courses/Become-a-full-stack-web-developer_Blog-scaled.jpeg";
  }

  // 5. Social Media Marketing (SMM) -> Gemini_Generated_Image_osjjjjosjjjjosjj.jfif
  if (s.includes("social-media") || s.includes("smm") || s.includes("marketing")) {
    return "/images/courses/Gemini_Generated_Image_osjjjjosjjjjosjj.jfif";
  }

  // 6. Computer Programming (Coding) -> untitled-design-1.png
  if (s.includes("programming") || s.includes("coding")) {
    return "/images/courses/untitled-design-1.png";
  }

  // 7. Web Designing & UI/UX -> untitled-design-2.png
  if (s.includes("web-designing") || s.includes("ui") || s.includes("ux")) {
    return "/images/courses/untitled-design-2.png";
  }

  // 8. Naplan Preparation -> naplan.png
  if (s.includes("naplan")) {
    return "/images/courses/naplan.png";
  }

  // 9. SAT & Digital SAT Tutoring -> sat.jpg
  if (s.includes("sat") && !s.includes("academic")) {
    return "/images/courses/sat.jpg";
  }

  // 10. GRE Tutoring -> gre.jpg
  if (s.includes("gre")) {
    return "/images/courses/gre.jpg";
  }

  // 11. English Language Mastery / Foundations -> english.jpg
  if (s.includes("english")) {
    return "/images/courses/english.jpg";
  }

  // 12. Arabic Studies (Classical & Modern) -> arabic.jpg
  if (s.includes("arabic")) {
    return "/images/courses/arabic.jpg";
  }

  // 13. Qirat & Melodic Recitation -> qirat.jpg
  if (s === "qirat-course" || s.includes("qirat")) {
    return "/images/courses/qirat.jpg";
  }

  // 14. Translation & Islamic Studies -> translation.jpg
  if (s === "translation-of-quran" || s.includes("translation")) {
    return "/images/courses/translation.jpg";
  }

  // 15. Hifz-ul-Quran (Memorization) -> hifz.jpg
  if (s === "hifz-quran" || s.includes("hifz") || s.includes("memorization")) {
    return "/images/courses/hifz.jpg";
  }

  // 16. GCSE & IGCSE Tutoring -> gcse.png
  if (s === "gcse" || s.includes("gcse") || s.includes("igcse")) {
    return "/images/courses/gcse.png";
  }

  // 17. O & A Levels (Cambridge / Edexcel) -> o-a-levels.png
  if (s === "o-a-levels" || s.includes("o-a-levels") || s.includes("a-level") || s.includes("o-level")) {
    return "/images/courses/o-a-levels.png";
  }

  // 18. Quran & Tajweed Mastery / Noorani Qaida -> 3.png
  if (
    s.includes("quran") ||
    s.includes("tajweed") ||
    s.includes("qaida") ||
    s.includes("noorani") ||
    cat.includes("islamic")
  ) {
    return "/images/courses/3.png";
  }

  return "/images/courses/math.jpg";
}
