"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { CursorProvider } from "@/context/CursorContext";
import { LoadingProvider } from "@/context/LoadingContext";

// Dynamic imports for heavy components
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/ui/SmoothScroll"), { ssr: false });
const CinematicOverlay = dynamic(() => import("@/components/ui/CinematicOverlay"), { ssr: false });
const Preloader = dynamic(() => import("@/components/ui/Preloader"), { ssr: false });
const CyberpunkBackground = dynamic(() => import("@/components/background/CyberpunkBackground"), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");

    useEffect(() => {
        if (isStudio) {
            document.body.style.cursor = "auto";
            document.body.style.overflow = "auto";
        } else {
            document.body.style.cursor = "none";
            // Overflow is handled by Lenis/CSS usually, but ensuring reset
        }

        return () => {
            document.body.style.cursor = "";
            document.body.style.overflow = "";
        };
    }, [isStudio]);

    if (isStudio) {
        return <>{children}</>;
    }

    return (
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
    );
}
