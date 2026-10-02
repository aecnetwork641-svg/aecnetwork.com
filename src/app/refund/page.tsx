import Link from "next/link";
import PageHeaderBanner from "@/components/PageHeaderBanner";

export const metadata = {
  title: "Refund Policy | AEC Network",
  description: "Learn about AEC Network 100% satisfaction guarantee and refund terms.",
};

export default function RefundPage() {
  return (
    <div className="bg-slate-50/50 pb-20">
      <PageHeaderBanner
        title="Refund Policy"
        subtitle="Transparent policies designed with our 100% satisfaction and student-first guarantee."
        badge="Satisfaction Guarantee"
        breadcrumbCurrent="Refund Policy"
        bgImage="/images/banner-3.png"
      />

      <div className="container-aec max-w-4xl py-12 md:py-16">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">1. 100% Free 3-Day Trial Period</h2>
            <p>
              To ensure complete confidence, AEC Network offers a 100% Free 3-Day Trial with dedicated certified teachers before any tuition fee is paid. No credit card is required to begin.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">2. 30-Day Satisfaction & Money-Back Guarantee</h2>
            <p>
              If within the first 30 days of paid enrollment you are not satisfied with your instructor or academic progression, we will promptly reassign a preferred instructor or provide a prorated refund for uncompleted classes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">3. Cancellation & Pausing Tuition</h2>
            <p>
              Families may pause or cancel their monthly tuition at any time with 7 days advance notice before the next monthly billing cycle. There are no long-term lock-in contracts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-aec-navy">4. How to Request a Refund or Tutor Reassignment</h2>
            <p>
              Please contact our admissions and finance coordination team:
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
