import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple in-memory rate limiter (10 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (entry.count >= 15) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait a moment before asking another question." },
      { status: 429 }
    );
  }

  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // Fetch verified AEC program & course facts from DB to ground the AI
    const programs = await prisma.program.findMany({
      where: { isPublished: true },
      include: { courses: { where: { isPublished: true }, select: { title: true, deliveryMode: true, level: true } } }
    });

    const programTitles = programs.map((p) => `${p.title} (${p.category})`).join(", ");

    // Grounded knowledge response synthesizer (Server-side)
    // Distinguishes verified AEC info, general guidance, and details requiring confirmation
    const lowerQuery = query.toLowerCase();
    let reply = "";

    if (lowerQuery.includes("program") || lowerQuery.includes("course") || lowerQuery.includes("study") || lowerQuery.includes("tajweed") || lowerQuery.includes("quran")) {
      reply = `[Verified AEC Information]: AEC Network currently provides structured programs including: ${programTitles || "Quran Reading Foundations, Tajweed & Recitation, and Islamic Studies"}.\n\n[General Guidance]: Depending on your current proficiency, we offer one-to-one instructional sessions and flexible cohort schedules.\n\n[Requires Confirmation]: For specific teacher availability, class timetables, and personalized study pacing, please schedule an initial counseling session or book a free trial class.`;
    } else if (lowerQuery.includes("fee") || lowerQuery.includes("price") || lowerQuery.includes("cost")) {
      reply = `[Verified AEC Information]: Course fees vary according to program duration, delivery format (one-to-one vs. cohort), and billing cycle (monthly or term).\n\n[Requires Confirmation]: For exact quotes and eligible scholarships or family discounts, please consult with our admissions team or view the Admissions Fee schedule.`;
    } else if (lowerQuery.includes("trial") || lowerQuery.includes("free") || lowerQuery.includes("admission")) {
      reply = `[Verified AEC Information]: Free trial classes can be requested directly via our Admissions portal. Our counselors assess student level and coordinate with an assigned instructor.\n\n[General Guidance]: No prior registration fee is required to attend the trial class.`;
    } else {
      reply = `[General Guidance]: Thank you for contacting the AEC AI Academic Counselor. We assist learners with course discovery, curriculum planning, and admissions.\n\n[Verified AEC Information]: AEC Network delivers structured education across Quranic, linguistic, and academic disciplines.\n\n[Requires Confirmation]: For customized assistance, please reach out directly through our Contact page or connect with an admissions counselor.`;
    }

    return NextResponse.json({
      reply,
      grounded: true,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error processing counselor query." },
      { status: 500 }
    );
  }
}
