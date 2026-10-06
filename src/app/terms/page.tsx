import Link from "next/link";
import PageHeaderBanner from "@/components/PageHeaderBanner";

export const metadata = {
  title: "Terms of Service | AEC Network",
  description: "Terms and conditions governing the use of AEC Network educational platform and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50/50 pb-20">
      <PageHeaderBanner
        title="Terms of Service"
        subtitle="Please review the terms and conditions that govern your enrollment and interaction with AEC Network."
        badge="Legal & Compliance"
        breadcrumbCurrent="Terms of Service"
        bgImage="/images/banner-1.png"
      />

      <div className="container-aec max-w-4xl py-12 md:py-16">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">1. Acceptance of Terms</h2>
            <p>
              By accessing or enrolling in courses offered by Akbar Educational Communication (AEC) Network (&quot;AEC Network&quot;, &quot;we&quot;, &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">2. Educational Services & Tutoring</h2>
            <p>
              AEC Network provides structured online learning, 1-on-1 tutoring, group cohorts, and examination preparation across Islamic Studies, STEM, GCSE, and professional tracks. We strive to maintain the highest quality of instruction and vetted teacher standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">3. Free Trial & Admissions</h2>
            <p>
              All new students are eligible for a 100% Free 3-Day Trial with no credit card required. Following the trial, continued tuition requires standard monthly enrollment as per the selected fee package.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">4. Attendance, Rescheduling & Conduct</h2>
            <p>
              Students and tutors are expected to adhere to scheduled class times. Rescheduling requests must be submitted at least 12 hours in advance through the portal or administrative support. Respectful conduct between tutors and students is strictly enforced.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">5. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="font-medium text-aec-navy">
              Email: <a href="mailto:info@aecnetwork.com" className="text-[#4DA3D9] hover:underline">info@aecnetwork.com</a><br />
              WhatsApp: <a href="https://wa.me/923435999397" target="_blank" rel="noopener noreferrer" className="text-[#4DA3D9] hover:underline">+92 343 5999397</a><br />
              UK Office: 106 Whitehall Road East, Bradford, BD11 2ER, United Kingdom<br />
              USA Office: 425 5th Ave, New York, New York, 10016, United States
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
