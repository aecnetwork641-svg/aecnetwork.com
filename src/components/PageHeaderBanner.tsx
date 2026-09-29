import Link from "next/link";

interface PageHeaderBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbCurrent: string;
  bgImage?: string;
}

export default function PageHeaderBanner({
  title,
  subtitle,
  badge,
  breadcrumbCurrent,
  bgImage = "/images/banner-2.jpg",
}: PageHeaderBannerProps) {
  return (
    <div className="relative overflow-hidden bg-[#0B1F3A] text-white">
      {/* Background Banner Image with Dark Navy & Teal Brand Overlay */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt={title}
          className="h-full w-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-[#0F766E]/70" />
      </div>

      {/* Main Heading Content (Head Banner) */}
      <div className="relative container-aec py-14 sm:py-20 text-center max-w-4xl mx-auto">
        {badge && (
          <span className="inline-block rounded-full bg-[#0F766E]/30 border border-[#0F766E]/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-200 mb-3 backdrop-blur-xs">
            {badge}
          </span>
        )}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Mentor Breadcrumbs Bar */}
      <div className="relative border-t border-white/10 bg-[#0F766E]/80 backdrop-blur-xs py-3 text-xs">
        <div className="container-aec flex items-center justify-between text-white/90">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white transition font-medium text-white/80">
                Home
              </Link>
            </li>
            <li className="text-white/50">/</li>
            <li className="font-bold text-white tracking-wide">
              {breadcrumbCurrent}
            </li>
          </ol>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-white/80 tracking-wider lowercase">
            aecnetwork
          </span>
        </div>
      </div>
    </div>
  );
}
