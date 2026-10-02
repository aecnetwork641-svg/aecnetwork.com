"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    programSlug: "Tajweed Course",
    country: "Pakistan",
    guardianName: "",
    dateOfBirth: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    whatsappUrl: string;
    applicationId: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admissions/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit admission application.");
      }

      setSuccessData({
        whatsappUrl: data.whatsappUrl,
        applicationId: data.applicationId,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while submitting your application. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] py-12 md:py-20 overflow-hidden bg-gradient-to-br from-slate-100 via-sky-50/70 to-slate-200/80">
      {/* Ambient Crystal Light Orbs */}
      <div className="absolute top-12 left-1/4 w-[420px] h-[420px] bg-[#4DA3D9]/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-[460px] h-[460px] bg-aec-navy/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-200/25 rounded-full blur-[110px] pointer-events-none" />

      <div className="container-aec max-w-2xl relative z-10">
        {/* Crystal Glass Card Container */}
        <div className="rounded-3xl border border-white/80 bg-white/60 backdrop-blur-2xl p-6 sm:p-8 md:p-11 shadow-[0_25px_60px_-15px_rgba(11,31,58,0.15),0_0_0_1px_rgba(255,255,255,0.7)_inset] relative overflow-hidden transition-all duration-300">
          {/* Top Crystal Highlight */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

          {successData ? (
            <div className="text-center py-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-semibold text-emerald-700 mb-3 shadow-xs">
                Application Submitted Successfully
              </span>

              <h2 className="font-display text-2xl md:text-3xl font-bold text-aec-navy">
                Thank You, {formData.applicantName}!
              </h2>

              <p className="mt-3 text-slate-600 max-w-md mx-auto leading-relaxed text-sm">
                Your admission application for <strong>{formData.programSlug}</strong> has been submitted. Our admissions team has been notified via Email & WhatsApp.
              </p>

              <div className="mt-8 p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 text-left space-y-2 text-sm text-slate-700 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-900">{formData.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Program:</span>
                  <span className="font-semibold text-slate-900">{formData.programSlug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-900">{formData.email}</span>
                </div>
                {formData.phone && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone/WhatsApp:</span>
                    <span className="font-semibold text-slate-900">{formData.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={successData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 font-semibold shadow-lg hover:shadow-xl transition duration-200 text-base"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Chat on WhatsApp (+92 343 5999397)</span>
                </a>

                <Link
                  href="/"
                  className="block w-full text-center py-2.5 text-sm font-medium text-slate-600 hover:text-aec-navy transition"
                >
                  Return to Home
                </Link>
              </div>

              {/* Official AEC Network Accreditation Banner */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col items-center justify-center">
                <div className="w-full max-w-[320px] rounded-2xl overflow-hidden shadow-lg border border-white/60">
                  <Image
                    src="/images/aec-network-banner.svg"
                    alt="AEC Network - A Project by AEC Network"
                    width={1640}
                    height={624}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2.5 font-medium">
                  Akbar Education Communication (AEC) Network • Verified Admissions
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Form Header */}
              <div className="border-b border-slate-200/50 pb-5">
                <span className="inline-block rounded-full bg-aec-navy/10 border border-aec-navy/15 px-3.5 py-1 text-xs font-semibold text-aec-navy backdrop-blur-sm shadow-xs">
                  Online Admission Application
                </span>
                <h1 className="font-display text-2xl md:text-3xl font-extrabold text-aec-navy mt-3 tracking-tight">
                  Enroll in AEC Network
                </h1>
                <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                  Fill in your admission details to register for your chosen program. Our admissions officer will review and finalize your enrollment.
                </p>
              </div>

              {error && (
                <div className="mt-6 rounded-2xl bg-rose-50/80 backdrop-blur-md border border-rose-200 p-4 text-sm text-rose-700 flex items-start gap-3 shadow-xs">
                  <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Crystal Glass Input Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700/90 mb-1.5">
                    Applicant Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    placeholder="e.g. Abdullah Khan"
                    className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:ring-4 focus:ring-[#4DA3D9]/20 focus:outline-none transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700/90 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@example.com"
                      className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:ring-4 focus:ring-[#4DA3D9]/20 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700/90 mb-1.5">
                      WhatsApp / Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 343 1234567"
                      className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:ring-4 focus:ring-[#4DA3D9]/20 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700/90 mb-1.5">
                      Program / Course <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.programSlug}
                      onChange={(e) => setFormData({ ...formData, programSlug: e.target.value })}
                      className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-slate-900 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:ring-4 focus:ring-[#4DA3D9]/20 focus:outline-none transition-all duration-200 text-sm"
                    >
                      <optgroup label="📖 Islamic & Quranic Studies">
                        <option value="Tajweed Course">Tajweed Course</option>
                        <option value="Translation of Quran & Islamic Studies">Translation of Quran & Islamic Studies</option>
                        <option value="Qirat Course">Qirat Course</option>
                        <option value="Noorani Qaida & Quran Reading">Noorani Qaida & Quran Reading</option>
                        <option value="Hifz-ul-Quran (Memorization)">Hifz-ul-Quran (Memorization)</option>
                        <option value="Tafseer & Hadith Studies">Tafseer & Hadith Studies</option>
                        <option value="Islamic Supplications & Daily Duas">Islamic Supplications & Daily Duas</option>
                      </optgroup>
                      <optgroup label="🎓 School & Board Exam Preparation">
                        <option value="GCSE & IGCSE Tutoring">GCSE & IGCSE Tutoring (UK)</option>
                        <option value="O & A Levels (Cambridge/Edexcel)">O & A Levels (Cambridge/Edexcel)</option>
                        <option value="Naplan Preparation">Naplan Preparation (Australia)</option>
                        <option value="SAT Tutoring">SAT Tutoring (Digital SAT)</option>
                        <option value="GRE Tutoring">GRE Tutoring</option>
                        <option value="IB Prep">IB (International Baccalaureate) Prep</option>
                      </optgroup>
                      <optgroup label="🔬 Academic STEM & Languages">
                        <option value="Science (Physics, Chemistry, Biology)">Science (Physics, Chemistry, Biology)</option>
                        <option value="Mathematics & Analytical Thinking">Mathematics & Analytical Thinking</option>
                        <option value="English Language & Literature">English Language & Literature</option>
                        <option value="Arabic Studies & Grammar">Arabic Studies & Grammar</option>
                        <option value="Urdu & Regional Languages">Urdu & Regional Languages</option>
                      </optgroup>
                      <optgroup label="💻 IT, Programming & Digital Skills">
                        <option value="Computer Science Fundamentals">Computer Science Fundamentals</option>
                        <option value="Computer Programming (Python, C++, JS)">Computer Programming (Python, C++, JS)</option>
                        <option value="Web Designing & UI/UX">Web Designing & UI/UX</option>
                        <option value="Full Stack Web Development">Full Stack Web Development</option>
                        <option value="Social Media Marketing (SMM)">Social Media Marketing (SMM)</option>
                        <option value="Data Analytics & AI Basics">Data Analytics & AI Basics</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700/90 mb-1.5">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Pakistan, UK, UAE, USA"
                      className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:ring-4 focus:ring-[#4DA3D9]/20 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700/90 mb-1.5">
                      Parent / Guardian Name (If Minor)
                    </label>
                    <input
                      type="text"
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:ring-4 focus:ring-[#4DA3D9]/20 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700/90 mb-1.5">
                      Date of Birth / Age
                    </label>
                    <input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      placeholder="e.g. 15 years old"
                      className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:ring-4 focus:ring-[#4DA3D9]/20 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700/90 mb-1.5">
                    Previous Learning Background & Objectives (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Finished Nazra, want to start Hifz with Tajweed..."
                    className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2 text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:ring-4 focus:ring-[#4DA3D9]/20 focus:outline-none transition-all duration-200 text-sm"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl py-3.5 px-6 text-base font-bold text-white bg-gradient-to-r from-aec-navy via-[#0B1F3A] to-[#1E3A8A] hover:from-[#0B1F3A] hover:to-[#4DA3D9] shadow-lg shadow-aec-navy/20 hover:shadow-xl hover:shadow-[#4DA3D9]/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <span>Submit Admission Application</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Official AEC Network Accreditation Logo Banner Below the Form Fields */}
              <div className="mt-8 pt-6 border-t border-slate-200/50 flex flex-col items-center justify-center">
                <div className="w-full max-w-[340px] rounded-2xl overflow-hidden shadow-lg border border-white/80 hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/images/aec-network-banner.svg"
                    alt="AEC Network - A Project by AEC Network"
                    width={1640}
                    height={624}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2.5 font-medium tracking-wide">
                  Akbar Education Communication (AEC) Network • Official Admissions
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
