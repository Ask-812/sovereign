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
  title: "Sovereign — The Operating System for Independent Operators",
  description:
    "One person + AI = full economic entity. Legal, financial, trust, and operational infrastructure for the post-corporate era. Set up in 60 seconds.",
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
    title: "Sovereign — One person. Full company. Zero overhead.",
    description:
      "AI made building easy. Running a business is still hell. Sovereign gives you the legal, financial, and operational infrastructure of a company — set up in 60 seconds, run entirely by AI.",
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
