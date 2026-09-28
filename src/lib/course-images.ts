export function getCourseImage(category?: string, slug?: string): string {
  const cat = (category || "").toLowerCase();
  const s = (slug || "").toLowerCase();

  // 1. Science (Physics, Chemistry & Biology) -> 2.png / science.jpg
  if (s.includes("science") || s.includes("physics") || s.includes("chemistry") || s.includes("biology")) {
    return "/images/courses/2.png";
  }

  // 2. Quran & Tajweed Mastery (Islamic, Qirat, Translation, Hifz, Noorani) -> 3.png / quran.jpg
  if (
    s.includes("quran") ||
    s.includes("tajweed") ||
    s.includes("qirat") ||
    s.includes("hifz") ||
    s.includes("islamic") ||
    s.includes("qaida") ||
    s.includes("noorani") ||
    s.includes("translation") ||
    cat.includes("islamic")
  ) {
    return "/images/courses/3.png";
  }

  // 3. Computer Programming (Coding) & Computer Science -> untitled-design-1.png / coding.png
  if (s.includes("programming") || s.includes("coding") || s.includes("computer-science")) {
    return "/images/courses/untitled-design-1.png";
  }

  // 4. Web Designing & UI/UX, Web Development, SMM -> untitled-design-2.png / web-design.png
  if (s.includes("web-designing") || s.includes("web-development") || s.includes("marketing") || s.includes("smm") || s.includes("ui") || s.includes("ux")) {
    return "/images/courses/untitled-design-2.png";
  }

  // 5. Mathematics & Analytical Thinking (and other academic/exam prep: English, GCSE, SAT, GRE, Naplan) -> 6.png / academic.jpg
  if (
    s.includes("math") ||
    s.includes("english") ||
    s.includes("arabic") ||
    s.includes("gcse") ||
    s.includes("sat") ||
    s.includes("gre") ||
    s.includes("naplan") ||
    s.includes("levels") ||
    s.includes("igcse") ||
    cat.includes("stem") ||
    cat.includes("school") ||
    cat.includes("exam")
  ) {
    return "/images/courses/6.png";
  }

  return "/images/courses/6.png";
}
