export function getCourseImage(category?: string, slug?: string): string {
  const cat = (category || "").toLowerCase();
  const s = (slug || "").toLowerCase();

  if (
    cat.includes("islamic") ||
    cat.includes("quran") ||
    s.includes("quran") ||
    s.includes("tajweed") ||
    s.includes("qirat") ||
    s.includes("hifz") ||
    s.includes("islamic") ||
    s.includes("qaida") ||
    s.includes("noorani") ||
    s.includes("translation")
  ) {
    return "/images/courses/islamic.svg";
  }

  if (
    cat.includes("school") ||
    cat.includes("exam") ||
    cat.includes("prep") ||
    s.includes("gcse") ||
    s.includes("sat") ||
    s.includes("gre") ||
    s.includes("naplan") ||
    s.includes("levels") ||
    s.includes("igcse")
  ) {
    return "/images/courses/exam-prep.svg";
  }

  if (
    cat.includes("stem") ||
    cat.includes("language") ||
    s.includes("science") ||
    s.includes("math") ||
    s.includes("english") ||
    s.includes("arabic")
  ) {
    return "/images/courses/stem.svg";
  }

  if (
    cat.includes("it") ||
    cat.includes("programming") ||
    cat.includes("coding") ||
    s.includes("computer") ||
    s.includes("web") ||
    s.includes("code") ||
    s.includes("programming") ||
    s.includes("marketing") ||
    s.includes("smm")
  ) {
    return "/images/courses/programming.svg";
  }

  return "/images/dummy-program.jpg";
}
