"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface StudioBackgroundProps {
    visible: boolean;
}

export default function StudioBackground({ visible }: StudioBackgroundProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) - 0.5;
            const y = (e.clientY / innerHeight) - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax transforms
    const moveBackground = useTransform(springX, [-0.5, 0.5], [20, -20]);
    const moveMidground = useTransform(springX, [-0.5, 0.5], [40, -40]);
    const moveForeground = useTransform(springX, [-0.5, 0.5], [60, -60]);

    const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
    const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);

    return (
        <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none perspective-1000 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            {/* Ambient Atmosphere - Darker start */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-[#101010]" />

            {/* 3D Container */}
            <motion.div
                className="relative w-full h-full transform-style-3d"
                style={{ rotateX, rotateY }}
            >
                {/* Background: Studio Walls & Grid */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-40"
                    style={{ x: moveBackground }}
                >
                    {/* Perspective Grid Floor - Brighter lines */}
                    <div
                        className="absolute bottom-0 w-[200%] h-[50%] origin-bottom"
                        style={{
                            backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)",
                            backgroundSize: "60px 60px",
                            transform: "rotateX(60deg) translateY(100px)"
                        }}
                    />
                </motion.div>

                {/* Midground: Desk & Monitors & Chair */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-[60%] flex items-end justify-center"
                    style={{ x: moveMidground }}
                >
                    {/* Chair Silhouette (Behind Desk) */}
                    <div className="absolute bottom-0 w-[120px] h-[200px] bg-black border border-white/5 rounded-t-xl mb-10 transform translate-y-10 blur-[2px]" />

                    {/* Left Vertical Monitor */}
                    <div className="w-[140px] h-[280px] border border-white/20 rounded-lg bg-[#0a0a0a] relative mb-24 -rotate-12 transform origin-bottom-right shadow-[0_0_20px_rgba(0,243,255,0.1)] overflow-hidden">
                        {/* Fake Code/Timeline */}
                        <div className="absolute inset-2 bg-white/5 flex flex-col gap-2 p-2">
                            <div className="w-full h-2 bg-white/10 rounded" />
                            <div className="w-3/4 h-2 bg-white/10 rounded" />
                            <div className="w-1/2 h-2 bg-white/10 rounded" />
                            <div className="mt-4 w-full h-full bg-gradient-to-b from-transparent to-neon-cyan/10" />
                        </div>
                    </div>

                    {/* Main Monitor */}
                    <div className="w-[450px] h-[280px] border border-white/20 rounded-lg bg-[#0a0a0a] relative mb-24 mx-2 z-10 shadow-[0_0_30px_rgba(0,243,255,0.15)] overflow-hidden">
                        {/* Fake Timeline Interface */}
                        <div className="absolute inset-0 flex flex-col">
                            <div className="h-2/3 bg-black/50 border-b border-white/10 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neon-cyan/5 to-transparent opacity-50" />
                            </div>
                            <div className="h-1/3 bg-[#111] p-2 flex flex-col gap-1">
                                <div className="flex gap-1 h-1/3">
                                    <div className="w-1/4 bg-blue-500/30 rounded-sm" />
                                    <div className="w-1/2 bg-purple-500/30 rounded-sm" />
                                </div>
                                <div className="flex gap-1 h-1/3">
                                    <div className="w-1/3 bg-green-500/30 rounded-sm ml-8" />
                                    <div className="w-1/4 bg-yellow-500/30 rounded-sm" />
                                </div>
                            </div>
                        </div>
                        {/* Stand */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-6 h-12 bg-[#111]" />
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#111] rounded-full" />
                    </div>

                    {/* Right Monitor */}
                    <div className="w-[300px] h-[200px] border border-white/20 rounded-lg bg-[#0a0a0a] relative mb-24 rotate-12 transform origin-bottom-left shadow-[0_0_20px_rgba(0,243,255,0.1)] overflow-hidden">
                        <div className="absolute inset-2 bg-white/5 grid grid-cols-2 gap-2 p-2">
                            <div className="bg-white/10 rounded" />
                            <div className="bg-white/10 rounded" />
                            <div className="bg-white/10 rounded" />
                            <div className="bg-white/10 rounded" />
                        </div>
                    </div>
                </motion.div>

                {/* Foreground: Desk Elements */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-[30%] flex items-end justify-center opacity-60"
                    style={{ x: moveForeground }}
                >
                    {/* Desk Surface Reflection */}
                    <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-t from-black to-transparent" />

                    {/* Keyboard */}
                    <div className="w-[320px] h-[12px] bg-[#222] rounded mb-12 shadow-lg flex gap-[2px] px-1 items-center justify-center">
                        {/* Keys glow */}
                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent blur-[1px]" />
                    </div>
                    {/* Mouse */}
                    <div className="w-[24px] h-[14px] bg-[#222] rounded-full mb-12 ml-12 shadow-lg relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[6px] bg-neon-cyan/50 blur-[1px]" />
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
