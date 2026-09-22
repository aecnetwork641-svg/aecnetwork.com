import Link from "next/link";

export default function IslamicResourcesPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/resources" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to Resources Hub
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Islamic & Quranic Study Resources
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Comprehensive study guides covering Tajweed rules, Quranic phonetics, and Islamic moral foundations.
        </p>
      </div>

      <div className="space-y-6">
        <div className="card">
          <span className="badge badge-info">Tajweed Rules</span>
          <h2 className="mt-2 font-display text-lg font-bold text-aec-navy">Rules of Noon Sakinah & Tanween</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-4 text-xs text-aec-navy/80">
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <strong>Izhar (Clear Pronunciation):</strong> Applied before the 6 throat letters (Hamzah, Haa, Ayn, Haa, Ghayn, Khaa).
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <strong>Idgham (Merging):</strong> Applied before the letters of Yarmaloon (Yaa, Raa, Meem, Laam, Wow, Noon).
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <strong>Iqlab (Conversion):</strong> Converting Noon Sakinah to Meem with Ghunnah when followed by the letter Baa.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <strong>Ikhfa (Concealment):</strong> Light nasal concealment applied before the remaining 15 letters.
            </div>
          </div>
        </div>

        <div className="card">
          <span className="badge badge-info">Quranic Recitation</span>
          <h2 className="mt-2 font-display text-lg font-bold text-aec-navy">Rules of Meem Sakinah & Madd</h2>
          <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
            Covers Ikhfa Shafawi (before Baa), Idgham Shafawi / Mithlayn Sagheer (before Meem), and Izhar Shafawi (before all other letters), along with duration rules for Natural Madd (2 counts) and Derived Madd (4 to 6 counts).
          </p>
        </div>

        <div className="card">
          <span className="badge badge-warning">Islamic Foundations</span>
          <h2 className="mt-2 font-display text-lg font-bold text-aec-navy">Daily Adhkar & Essential Duas</h2>
          <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
            Essential prayers including Du&apos;a Qunoot, Ayat al-Kursi, Du&apos;as for entering and leaving the mosque, traveling, and after Salah.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/resources/academic" className="btn-secondary">
          Academic Resources →
        </Link>
        <Link href="/programs/quran-islamic-studies" className="btn-primary">
          Join Quran Program
        </Link>
      </div>
    </div>
  );
}
