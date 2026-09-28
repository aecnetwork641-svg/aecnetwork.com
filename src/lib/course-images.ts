export function getCourseImage(category?: string, slug?: string): string {
  const cat = (category || "").toLowerCase();
  const s = (slug || "").toLowerCase();

  // 1. Qirat & Melodic Recitation -> Gemini_Generated_Image_ca4pocca4pocca4p.jfif / qirat.jpg
  if (s === "qirat-course" || s.includes("qirat")) {
    return "/images/courses/qirat.jpg";
  }

  // 2. Translation & Islamic Studies -> how-to-improve-qirat-of-quran-1024x683.jpg / translation.jpg
  if (s === "translation-of-quran" || s.includes("translation")) {
    return "/images/courses/translation.jpg";
  }

  // 3. Hifz-ul-Quran (Memorization) -> image1.png / hifz.jpg
  if (s === "hifz-quran" || s.includes("hifz") || s.includes("memorization")) {
    return "/images/courses/hifz.jpg";
  }

  // 4. GCSE & IGCSE Tutoring -> image23.png / gcse.png
  if (s === "gcse" || s.includes("gcse") || s.includes("igcse")) {
    return "/images/courses/gcse.png";
  }

  // 5. O & A Levels (Cambridge / Edexcel) -> image3.png / o-a-levels.png
  if (s === "o-a-levels" || s.includes("o-a-levels") || s.includes("a-level") || s.includes("o-level")) {
    return "/images/courses/o-a-levels.png";
  }

  // 6. Science (Physics, Chemistry & Biology) -> 2.png / science.jpg
  if (s.includes("science") || s.includes("physics") || s.includes("chemistry") || s.includes("biology")) {
    return "/images/courses/2.png";
  }

  // 7. Quran & Tajweed Mastery / Noorani Qaida / general Quran -> 3.png / quran.jpg
  if (
    s.includes("quran") ||
    s.includes("tajweed") ||
    s.includes("qaida") ||
    s.includes("noorani") ||
    cat.includes("islamic")
  ) {
    return "/images/courses/3.png";
  }

  // 8. Computer Programming (Coding) & Computer Science -> untitled-design-1.png / coding.png
  if (s.includes("programming") || s.includes("coding") || s.includes("computer-science")) {
    return "/images/courses/untitled-design-1.png";
  }

  // 9. Web Designing & UI/UX, Web Development, SMM -> untitled-design-2.png / web-design.png
  if (s.includes("web-designing") || s.includes("web-development") || s.includes("marketing") || s.includes("smm") || s.includes("ui") || s.includes("ux")) {
    return "/images/courses/untitled-design-2.png";
  }

  // 10. Mathematics & Analytical Thinking, SAT, GRE, Naplan, English, Arabic -> 6.png / academic.jpg
  return "/images/courses/6.png";
}
