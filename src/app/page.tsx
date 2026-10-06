import { getPublishedHomepage } from "@/lib/cms-service";
import SectionRenderer from "@/components/cms/SectionRenderer";

// Keep ISR or on-demand revalidation
export const revalidate = 0; // Ensures fresh content when published

export default async function HomePage() {
  const { sections } = await getPublishedHomepage();

  // Filter only visible sections, ordered by their order field
  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {visibleSections.map((section) => (
        <SectionRenderer key={section.id} section={section} isEditor={false} />
      ))}
    </div>
  );
}
