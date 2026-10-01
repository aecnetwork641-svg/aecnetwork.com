import Link from "next/link";
import PricingSection from "@/components/PricingSection";

export const metadata = {
  title: "Fee Structure & Tuition Plans | AEC Network",
  description: "Transparent and affordable tuition fee structure for online Quran, Tajweed, Islamic Studies, and Academic Tutoring across UK, USA, Australia, and Canada."
};

export default function FeesPage() {
  return (
    <div className="flex flex-col gap-12 py-12">
      {/* Header */}
      <div className="container-aec text-center max-w-3xl">
        <span className="badge bg-aec-teal/10 text-aec-teal border-aec-teal/30 font-semibold px-3 py-1">
          AEC Admissions & Finance
        </span>
        <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-aec-navy">
          Fee Structure & Pricing Plans
        </h1>
        <p className="mt-4 text-sm sm:text-base text-aec-navy/70 leading-relaxed">
          At AEC Network, we believe in high-quality, transparent, and affordable education with no hidden registration costs. Choose your preferred currency, select a weekly class frequency, and claim your <span className="font-bold text-aec-navy">3-Day Free Trial</span>.
        </p>
      </div>

      {/* Main Interactive Pricing Section */}
      <div className="container-aec">
        <PricingSection isStandalonePage={true} />
      </div>

      {/* Comparison & Policy Details */}
      <div className="container-aec">
        <div className="rounded-2xl border border-aec-navy/10 bg-white p-6 sm:p-10 shadow-sm">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-aec-navy mb-6">
            Comprehensive Fee Policy & Terms
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-aec-navy/10 p-5 bg-aec-cream/30">
              <h3 className="font-display text-sm font-bold text-aec-navy">📅 Billing Cycle & Invoices</h3>
              <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
                Fees are billed in advance on a monthly basis starting from your official enrollment date after the 3-day free trial. Invoices are generated automatically and sent to the parent email and Parent Portal dashboard.
              </p>
            </div>

            <div className="rounded-xl border border-aec-navy/10 p-5 bg-aec-cream/30">
              <h3 className="font-display text-sm font-bold text-aec-navy">🔄 Missed & Makeup Classes</h3>
              <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
                If a student cannot attend a scheduled class and gives at least 4 hours prior notice to the teacher or supervisor, a makeup class will be arranged within the same month at a convenient time.
              </p>
            </div>

            <div className="rounded-xl border border-aec-navy/10 p-5 bg-aec-cream/30">
              <h3 className="font-display text-sm font-bold text-aec-navy">👨‍👩‍👧‍👦 Sibling & Multi-Course Discounts</h3>
              <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
                We offer a 10% discount on the second enrolled child and a 15% discount on the third child or subsequent academic courses taken simultaneously.
              </p>
            </div>

            <div className="rounded-xl border border-aec-navy/10 p-5 bg-aec-cream/30">
              <h3 className="font-display text-sm font-bold text-aec-navy">🛡️ Refund & Cancellation Policy</h3>
              <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
                You can pause or cancel your subscription at any time with no lock-in contract. If you are unsatisfied during the first week of paid classes, we issue a 100% money-back refund.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-aec-navy/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold text-aec-navy">Have specific scheduling requirements?</p>
              <p className="text-xs text-aec-navy/60">Our admissions coordinators can design a customized schedule for your family.</p>
            </div>
            <Link href="/admissions/free-trial" className="btn-primary">
              Book a Free Trial Class
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
