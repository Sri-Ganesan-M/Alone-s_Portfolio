"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function CinematicOverlay() {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

    // Transform scroll progress (0-1) to timecode (00:00:00:00 - 00:01:00:00)
    // Let's assume the whole page is "1 minute" of footage for effect
    const [timecode, setTimecode] = useState("00:00:00:00");

    useEffect(() => {
        return smoothProgress.on("change", (latest) => {
            const totalFrames = Math.floor(latest * 3600); // 60 seconds * 60 fps = 3600 frames

            const hours = Math.floor(totalFrames / 216000);
            const minutes = Math.floor((totalFrames % 216000) / 3600);
            const seconds = Math.floor((totalFrames % 3600) / 60);
            const frames = Math.floor(totalFrames % 60);

            const fmt = (n: number) => n.toString().padStart(2, "0");
            setTimecode(`${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}:${fmt(frames)}`);
        });
    }, [smoothProgress]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
            {/* Film Grain */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

            {/* Scroll Timecode (Bottom Right) */}
            <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1 mix-blend-difference">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-red-500 tracking-widest uppercase">REC</span>
                </div>
                <div className="font-mono text-2xl md:text-4xl font-bold text-white tracking-widest tabular-nums opacity-80">
                    {timecode}
                </div>
                <div className="h-1 w-32 bg-white/20 rounded-full mt-2 overflow-hidden">
                    <motion.div
                        className="h-full bg-neon-cyan"
                        style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                    />
                </div>
            </div>

            {/* Safe Area Guides (Subtle corners) */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/20" />
            <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white/20" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-white/20" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/20" />
        </div>
    );
}
