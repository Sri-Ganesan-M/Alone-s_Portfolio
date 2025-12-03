import type { Metadata } from "next";
import { Inter, Roboto_Mono, Cinzel } from "next/font/google";

import "./globals.css";
import { CursorProvider } from "@/context/CursorContext";
import { LoadingProvider } from "@/context/LoadingContext";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CinematicOverlay from "@/components/ui/CinematicOverlay";
import Preloader from "@/components/ui/Preloader";
import CyberpunkBackground from "@/components/background/CyberpunkBackground";

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
  title: "alone.dvd | Punithan A | Short-Form Video Editor",
  description: "Punithan A (alone.dvd) is a professional short-form video editor specialized in high-energy reels, promos, and social media content. Expert in cinematic storytelling and visual effects.",
  keywords: ["Punithan A", "alone.dvd", "Video Editor", "Short-Form Editor", "Reels Editor", "VFX", "Cinematic Editing", "India"],
  icons: {
    icon: "/alones-data/logo.png",
    shortcut: "/alones-data/logo.png",
    apple: "/alones-data/logo.png",
  },
  openGraph: {
    title: "alone.dvd | Punithan A | Video Editor",
    description: "Punithan A (alone.dvd) - Professional Video Editor for Reels, Promos & Social Media.",
    type: "website",
    locale: "en_US",
    siteName: "alone.dvd Portfolio",
    images: [
      {
        url: "/alones-data/logo.png",
        width: 800,
        height: 800,
        alt: "alone.dvd Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "alone.dvd | Punithan A | Video Editor",
    description: "Punithan A (alone.dvd) - Professional Video Editor for Reels, Promos & Social Media.",
    images: ["/alones-data/logo.png"],
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
        <LoadingProvider>
          <Preloader />
          <CyberpunkBackground />
          <CursorProvider>
            <CinematicOverlay />
            <CustomCursor />
            <SmoothScroll>
              <main className="relative z-10 min-h-screen bg-transparent text-white">
                {children}
              </main>
            </SmoothScroll>
          </CursorProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
