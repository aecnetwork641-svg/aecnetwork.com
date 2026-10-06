import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="relative text-white">
      {/* Animated Liquid Wave Divider */}
      <div className="wave-divider w-full overflow-hidden leading-none pointer-events-none -mb-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          style={{ color: "#0B1F3A" }}
        >
          <defs>
            <path
              id="wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
              style={{ color: "#0B1F3A" }}
            />
          </defs>
          <g>
            <use href="#wave" x="50" y="3" fill="currentColor" style={{ color: "#0B1F3A" }} />
            <use href="#wave" x="50" y="0" fill="currentColor" style={{ color: "#0B1F3A" }} />
            <use href="#wave" x="50" y="9" fill="currentColor" style={{ color: "#0B1F3A" }} />
            <use href="#wave" x="50" y="6" fill="currentColor" style={{ color: "#0B1F3A" }} />
          </g>
        </svg>
      </div>

      <div className="bg-[#0B1F3A]">
        <div className="container-aec py-14 sm:py-16">
          <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Brand Logo & Intro */}
            <div className="space-y-4">
              <Link href="/" className="inline-block transition hover:opacity-95">
                <Logo variant="full" theme="dark" size="md" />
              </Link>
              <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 max-w-sm">
                Welcome to AEC Network! We are dedicated to bridging educational gaps and creating global learning opportunities.
              </p>
            </div>

            {/* Column 2: About Us Links */}
            <div>
              <h3 className="font-display text-base font-bold text-white tracking-wide">
                About Us
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-[13px] text-slate-300">
                <li>
                  <Link href="/" className="hover:text-[#4DA3D9] transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#4DA3D9] transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-[#4DA3D9] transition">
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#4DA3D9] transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href={"/terms" as never} className="hover:text-[#4DA3D9] transition">
                    Term Of Services
                  </Link>
                </li>
                <li>
                  <Link href={"/privacy" as never} className="hover:text-[#4DA3D9] transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href={"/refund" as never} className="hover:text-[#4DA3D9] transition">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Flexible Learning & World Map */}
            <div>
              <h3 className="font-display text-base font-bold text-white tracking-wide">
                Flexible learning
              </h3>
              <div className="mt-4">
                <Image
                  src="/images/footer-map.png"
                  alt="Flexible Learning - Global Locations"
                  width={300}
                  height={175}
                  className="w-full max-w-[280px] h-auto object-contain opacity-95 hover:opacity-100 transition"
                />
              </div>
            </div>

            {/* Column 4: Office Address */}
            <div>
              <h3 className="font-display text-base font-bold text-white tracking-wide">
                office Address
              </h3>
              <div className="mt-4 space-y-4 text-xs sm:text-[13px]">
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-wider">UK</p>
                  <p className="text-slate-300 leading-relaxed mt-1">
                    106 Whitehall Road East, Bradford, BD11 2ER<br />
                    West Yorkshire United Kingdom
                  </p>
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-wider">USA</p>
                  <p className="text-slate-300 leading-relaxed mt-1">
                    425 5th Ave, New York, New York, 10016<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/25 py-5">
          <div className="container-aec flex flex-col items-center justify-between gap-4 text-xs text-slate-400 sm:flex-row">
            <p>
              © {new Date().getFullYear()} AEC Network — Akbar Educational Communication Network. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href={"/privacy" as never} className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href={"/terms" as never} className="hover:text-white transition">
                Terms of Service
              </Link>
              <Link href={"/refund" as never} className="hover:text-white transition">
                Refund Policy
              </Link>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
              <a
                href="https://wa.me/923435999397"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4DA3D9] hover:text-white font-semibold transition"
              >
                Chat with AEC Network
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
