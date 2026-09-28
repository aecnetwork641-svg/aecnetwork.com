export function getCourseImage(category?: string, slug?: string): string {
  const cat = (category || "").toLowerCase();
  const s = (slug || "").toLowerCase();

  // 1. Naplan Preparation -> naplan.png / image7.png
  if (s.includes("naplan")) {
    return "/images/courses/naplan.png";
  }

  // 2. SAT & Digital SAT Tutoring -> sat.jpg / Gemini_Generated_Image_ocwtaxocwtaxocwt.jfif
  if (s.includes("sat") && !s.includes("academic")) {
    return "/images/courses/sat.jpg";
  }

  // 3. GRE Tutoring -> gre.jpg / Gemini_Generated_Image_fl06xkfl06xkfl06.jfif
  if (s.includes("gre")) {
    return "/images/courses/gre.jpg";
  }

  // 4. English Language Mastery / Foundations -> english.jpg / Gemini_Generated_Image_wy3nsswy3nsswy3n.jfif
  if (s.includes("english")) {
    return "/images/courses/english.jpg";
  }

  // 5. Arabic Studies (Classical & Modern) / Conversation -> arabic.jpg / Gemini_Generated_Image_8fp2b28fp2b28fp2.jfif
  if (s.includes("arabic")) {
    return "/images/courses/arabic.jpg";
  }

  // 6. Qirat & Melodic Recitation -> qirat.jpg / Gemini_Generated_Image_ca4pocca4pocca4p.jfif
  if (s === "qirat-course" || s.includes("qirat")) {
    return "/images/courses/qirat.jpg";
  }

  // 7. Translation & Islamic Studies -> translation.jpg / how-to-improve-qirat-of-quran-1024x683.jpg
  if (s === "translation-of-quran" || s.includes("translation")) {
    return "/images/courses/translation.jpg";
  }

  // 8. Hifz-ul-Quran (Memorization) -> hifz.jpg / image1.png
  if (s === "hifz-quran" || s.includes("hifz") || s.includes("memorization")) {
    return "/images/courses/hifz.jpg";
  }

  // 9. GCSE & IGCSE Tutoring -> gcse.png / image23.png
  if (s === "gcse" || s.includes("gcse") || s.includes("igcse")) {
    return "/images/courses/gcse.png";
  }

  // 10. O & A Levels (Cambridge / Edexcel) -> o-a-levels.png / image3.png
  if (s === "o-a-levels" || s.includes("o-a-levels") || s.includes("a-level") || s.includes("o-level")) {
    return "/images/courses/o-a-levels.png";
  }

  // 11. Science (Physics, Chemistry & Biology) -> 2.png / science.jpg
  if (s.includes("science") || s.includes("physics") || s.includes("chemistry") || s.includes("biology")) {
    return "/images/courses/2.png";
  }

  // 12. Quran & Tajweed Mastery / Noorani Qaida / general Quran -> 3.png / quran.jpg
  if (
    s.includes("quran") ||
    s.includes("tajweed") ||
    s.includes("qaida") ||
    s.includes("noorani") ||
    cat.includes("islamic")
  ) {
    return "/images/courses/3.png";
  }

  // 13. Computer Programming (Coding) & Computer Science -> untitled-design-1.png / coding.png
  if (s.includes("programming") || s.includes("coding") || s.includes("computer-science")) {
    return "/images/courses/untitled-design-1.png";
  }

  // 14. Web Designing & UI/UX, Web Development, SMM -> untitled-design-2.png / web-design.png
  if (s.includes("web-designing") || s.includes("web-development") || s.includes("marketing") || s.includes("smm") || s.includes("ui") || s.includes("ux")) {
    return "/images/courses/untitled-design-2.png";
  }

  // 15. Mathematics & Analytical Thinking -> 6.png / academic.jpg
  return "/images/courses/6.png";
}
