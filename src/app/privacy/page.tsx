import Link from "next/link";
import PageHeaderBanner from "@/components/PageHeaderBanner";

export const metadata = {
  title: "Privacy Policy | AEC Network",
  description: "Privacy policy regarding data collection, protection, and student privacy at AEC Network.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50/50 pb-20">
      <PageHeaderBanner
        title="Privacy Policy"
        subtitle="We are committed to safeguarding student data, parent privacy, and secure communication."
        badge="Data Protection"
        breadcrumbCurrent="Privacy Policy"
        bgImage="/images/banner-2.png"
      />

      <div className="container-aec max-w-4xl py-12 md:py-16">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">1. Information We Collect</h2>
            <p>
              When you enroll in our courses, register for a free trial, or contact AEC Network, we collect necessary contact information (such as name, email, phone number, and student learning level) solely for the purpose of delivering educational instruction and scheduling classes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">2. How We Use Your Information</h2>
            <p>
              We use collected information to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Coordinate and schedule 1-on-1 and cohort learning sessions.</li>
              <li>Provide progress reports, assessments, and attendance records to parents.</li>
              <li>Deliver administrative notices, course updates, and trial confirmations.</li>
              <li>Ensure safe and vetted interactions across our learning platforms.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">3. Student Safety & Child Protection</h2>
            <p>
              The safety of our students is paramount. We implement strict child protection policies, background checks for educators, and monitored sessions to ensure a safe, nurturing learning environment. We do not sell or rent personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">4. Contact Our Privacy Officer</h2>
            <p>
              For privacy inquiries or data requests, please contact:
            </p>
            <p className="font-medium text-aec-navy">
              Email: <a href="mailto:info@aecnetwork.com" className="text-[#4DA3D9] hover:underline">info@aecnetwork.com</a><br />
              WhatsApp: <a href="https://wa.me/923435999397" target="_blank" rel="noopener noreferrer" className="text-[#4DA3D9] hover:underline">+92 343 5999397</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
