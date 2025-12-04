import type { Metadata } from "next";
import { Inter, Roboto_Mono, Cinzel } from "next/font/google";

import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "alone.dvd | Punithan A | Viral Short-Form Video Editor",
  description: "Punithan A (alone.dvd) is a professional video editor specializing in viral reels, cinematic short films, and high-energy social media content. Expert in Premiere Pro, After Effects, and visual storytelling.",
  keywords: [
    "alone.dvd", "punithan a", "viral editor", "editor", "short flim editor", "video editor",
    "professional video editor", "freelance video editor", "viral video editor", "short film editor",
    "reels video editor", "youtube video editor", "cinematic video editor", "creative video editor",
    "film editor", "motion video editor", "social media video editor", "alone.dvd editor",
    "alone.dvd video editor", "alone.dvd short film editor", "alone.dvd viral editor",
    "punithan a editor", "punithan a video editor", "punithan a film editor",
    "punithan a short film editor", "punithan a viral editor", "cinematic short film editor",
    "indie film editor", "student short film editor", "short movie editor", "low budget film editor",
    "award short film editor", "drama short film editor", "thriller short film editor",
    "romantic short film editor", "instagram reels editor", "youtube shorts editor",
    "tiktok video editor", "social media editor", "viral content editor", "trend video editor",
    "meme video editor", "influencer video editor", "podcast video editor", "vlog editor",
    "gaming video editor", "educational video editor", "tech youtube editor", "reaction video editor",
    "faceless youtube editor", "youtube automation editor", "premiere pro editor",
    "after effects editor", "davinci resolve editor", "final cut pro editor", "capcut editor",
    "mobile video editor", "pc video editor", "4k video editor", "hdr video editor",
    "cinematic color grading", "smooth transitions editor", "sound design editor",
    "beat sync editor", "subtitle editor", "caption video editor", "green screen editor",
    "vfx video editor", "slow motion editor", "speed ramping editor", "video editor in india",
    "video editor in tamil nadu", "chennai video editor", "coimbatore video editor",
    "madurai video editor", "freelance video editor india", "tamil video editor",
    "south india video editor", "best viral editor", "top short film editor",
    "trending reels editor", "professional cinematic editor", "cheap video editor india",
    "expert youtube editor", "instagram growth editor"
  ],
  authors: [{ name: "Punithan A", url: "https://alone-dvd.com" }],
  creator: "Punithan A",
  publisher: "alone.dvd",
  icons: {
    icon: "/alones-data/logo.png",
    shortcut: "/alones-data/logo.png",
    apple: "/alones-data/logo.png",
  },
  openGraph: {
    title: "alone.dvd | Punithan A | Viral Video Editor",
    description: "Transforming raw footage into viral masterpieces. Punithan A (alone.dvd) - Professional Video Editor for Reels, Short Films & Social Media.",
    type: "website",
    locale: "en_US",
    siteName: "alone.dvd Portfolio",
    images: [
      {
        url: "/alones-data/logo.png",
        width: 1200,
        height: 630,
        alt: "alone.dvd - Viral Video Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "alone.dvd | Punithan A | Viral Video Editor",
    description: "Transforming raw footage into viral masterpieces. Punithan A (alone.dvd) - Professional Video Editor for Reels, Short Films & Social Media.",
    images: ["/alones-data/logo.png"],
    creator: "@alone_dvd", // Assuming handle, can be updated
  },
  verification: {
    google: "F2ldu_YePW5h9tN-ag-R3yBwSKxpOO8mVXvTeR8BWv4",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} ${cinzel.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
