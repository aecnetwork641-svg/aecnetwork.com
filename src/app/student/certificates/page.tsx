import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentCertificatesPage() {
  const scope = await getCurrentStudentScope();

  const certificates = scope
    ? await prisma.certificate.findMany({
        where: { studentId: scope.studentId },
        orderBy: { issuedAt: "desc" }
      })
    : [];

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Certificates">
      <div className="card">
        {!scope && <p className="text-sm text-aec-navy/50">Sign in as a student to view this page.</p>}
        {scope && certificates.length === 0 && (
          <p className="text-sm text-aec-navy/50">No certificates issued yet.</p>
        )}
        {certificates.length > 0 && (
          <ul className="space-y-3">
            {certificates.map((c) => (
              <li key={c.id} className="flex items-center justify-between border-t border-aec-navy/5 pt-3 first:border-t-0 first:pt-0">
                <div>
                  <p className="font-medium text-aec-navy">{c.title}</p>
                  <p className="text-xs text-aec-navy/50">Issued {c.issuedAt.toDateString()} · {c.credentialCode}</p>
                </div>
                {c.fileUrl && (
                  <a href={c.fileUrl} className="text-sm font-medium text-aec-teal">Download</a>
                )}
              </li>
            ))}
          </ul>
        )}
        <ScopedDataNote text="Only certificates issued to your own Student.id are listed." />
      </div>
    </PortalShell>
  );
}
