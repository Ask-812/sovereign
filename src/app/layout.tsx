import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sovereign — We handle the boring parts of running a business",
  description:
    "Entity formation, banking, contracts, taxes, insurance, trust — everything after you make your first dollar. $49/mo.",
  keywords: [
    "freelancer infrastructure",
    "solo founder",
    "AI business",
    "indie hacker",
    "one person company",
    "automated business",
    "AI operations",
    "business formation",
    "trust profile",
  ],
  openGraph: {
    title: "Sovereign — You build it. We run it.",
    description:
      "Building is easy now. Running a business is still hell. Sovereign handles entity formation, banking, contracts, taxes, and insurance for $49/mo.",
    type: "website",
    locale: "en_US",
    siteName: "Sovereign",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign — One person. Full company. Zero overhead.",
    description:
      "The operating system for independent operators. Legal entity, banking, insurance, contracts, taxes, trust — all automated by AI. $49/mo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
