import HomepageBuilder from "@/components/cms/HomepageBuilder";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { redirect } from "next/navigation";
import { isOneOf } from "@/lib/permissions";

export const metadata = {
  title: "Homepage Builder & Visual CMS — Super Admin | AEC Network",
  description: "Visual Homepage Editor and Content Management System for Super Admin.",
};

export default async function HomepageBuilderPage() {
  const { userId, role } = await getCurrentUserSession();

  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  return <HomepageBuilder />;
}
