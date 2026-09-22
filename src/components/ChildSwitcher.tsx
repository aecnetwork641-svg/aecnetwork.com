"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type ChildItem = { id: string; name: string };

/**
 * Lets a parent with multiple children switch which child's data the
 * current portal page shows. Selection is passed as a `?child=<id>`
 * query param; the server-side page then validates that id against the
 * parent's own children via getCurrentParentScope() before using it.
 */
export default function ChildSwitcher({
  items,
  selectedId
}: {
  items: ChildItem[];
  selectedId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (items.length <= 1) return null;

  function onChange(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("child", id);
    router.push(`${pathname}?${params.toString()}` as any);
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-aec-navy/50">Viewing Child:</span>
      {items.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            c.id === selectedId
              ? "bg-aec-teal text-white shadow-sm"
              : "border border-aec-navy/15 bg-white text-aec-navy/70 hover:border-aec-navy/30"
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
