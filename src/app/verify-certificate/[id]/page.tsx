import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 via-sky-50/70 to-slate-200/80 overflow-hidden">
      {/* Ambient luminous crystal orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#4DA3D9]/20 blur-[90px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-aec-navy/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-sky-200/25 blur-[110px]" />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/80 bg-white/65 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(11,31,58,0.15),0_0_0_1px_rgba(255,255,255,0.7)_inset] overflow-hidden text-center">
        {/* Top Crystal Highlight */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

        {/* Top Official Brand Logo */}
        <div className="flex justify-center pb-5 mb-5 border-b border-slate-200/50">
          <Link href="/" className="inline-block hover:opacity-90 transition">
            <Image
              src="/images/aec-network-logo-horizontal.svg"
              alt="AEC Network - A Project by AEC Network"
              width={280}
              height={82}
              className="w-auto h-11 sm:h-12 object-contain mx-auto"
              priority
            />
          </Link>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold font-display text-aec-navy">Certificate Authenticity Verification</h1>
        <p className="mt-1 text-xs text-slate-500">
          Official AEC Network Credential Validation Portal
        </p>

        {certificate ? (
          <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 backdrop-blur-md p-6 text-left space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-600 p-1 text-white text-xs">✓</span>
              <span className="font-bold text-emerald-800 text-sm">Verified Authentic Credential</span>
            </div>

            <div className="mt-4 divide-y divide-emerald-100/80 text-xs text-aec-navy">
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-500">Recipient Student:</span>
                <span className="font-bold text-slate-900">{certificate.student.user.name}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-500">Certificate Title:</span>
                <span className="font-semibold text-slate-900">{certificate.title}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-500">Credential Code:</span>
                <span className="font-mono font-bold text-[#4DA3D9]">{certificate.credentialCode}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-500">Date Issued:</span>
                <span className="text-slate-900">{certificate.issuedAt.toLocaleDateString()}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-500">Authorized Issuer:</span>
                <span className="font-semibold text-aec-navy">AEC Network Academic Board</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/70 backdrop-blur-md p-6 text-center space-y-2 shadow-xs">
            <p className="font-bold text-rose-800 text-sm">Certificate Record Not Found</p>
            <p className="text-xs text-rose-600">
              No matching verified certificate was found for credential code: <span className="font-mono font-bold">{credentialCode}</span>.
            </p>
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-xl bg-aec-navy px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-aec-navy/90 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
