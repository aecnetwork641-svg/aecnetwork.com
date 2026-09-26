import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Logo from "@/components/Logo";

interface Props {
  params: { id: string };
}

export default async function VerifyCertificatePage({ params }: Props) {
  const credentialCode = params.id;

  const certificate = await prisma.certificate.findFirst({
    where: {
      OR: [
        { credentialCode },
        { id: credentialCode }
      ]
    },
    include: {
      student: { include: { user: true } }
    }
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="card text-center">
        <div className="flex justify-center mb-4">
          <Logo variant="compact" size="md" />
        </div>
        <h1 className="text-xl font-bold text-aec-navy">Certificate Authenticity Verification</h1>
        <p className="mt-1 text-xs text-aec-navy/60">
          Official AEC Network Credential Validation Portal
        </p>

        {certificate ? (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50/50 p-6 text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-600 p-1 text-white text-xs">✓</span>
              <span className="font-bold text-emerald-800 text-sm">Verified Authentic Credential</span>
            </div>

            <div className="mt-4 divide-y divide-emerald-100 text-xs text-aec-navy">
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-aec-navy/70">Recipient Student:</span>
                <span className="font-bold">{certificate.student.user.name}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-aec-navy/70">Certificate Title:</span>
                <span>{certificate.title}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-aec-navy/70">Credential Code:</span>
                <span className="font-mono font-bold text-aec-blue">{certificate.credentialCode}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-aec-navy/70">Date Issued:</span>
                <span>{certificate.issuedAt.toLocaleDateString()}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-aec-navy/70">Authorized Issuer:</span>
                <span>AEC Network Academic Board</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50/50 p-6 text-center space-y-2">
            <p className="font-bold text-rose-800 text-sm">Certificate Record Not Found</p>
            <p className="text-xs text-rose-600">
              No matching verified certificate was found for credential code: <span className="font-mono">{credentialCode}</span>.
            </p>
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/"
            className="inline-block rounded bg-aec-navy px-4 py-2 text-xs font-semibold text-white hover:bg-aec-navy/90"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
