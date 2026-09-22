import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AICounselorWidget from "@/components/AICounselorWidget";

export const metadata: Metadata = {
  title: "AEC Network — Learn. Grow. Achieve.",
  description:
    "AEC Network (Akbar Education Communication Network) — accessible online education, qualified teachers, structured learning, and academic support."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <AICounselorWidget />
        <Footer />
      </body>
    </html>
  );
}
