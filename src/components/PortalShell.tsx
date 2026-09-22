import Link from "next/link";
import type { ReactNode } from "react";

export default function PortalShell({
  role,
  navItems,
  title,
  children
}: {
  role: string;
  navItems: { label: string; href: string }[];
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="container-aec grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-wide text-aec-gold">{role}</p>
        <nav className="mt-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as never}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-aec-navy/80 hover:bg-aec-cream hover:text-aec-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>
        <h1 className="font-display text-2xl font-bold text-aec-navy">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
