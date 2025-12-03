"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";
import { Camera, Clapperboard, Aperture, Video } from "lucide-react";
import StudioBackground from "./StudioBackground";
import AnimatedClapperboard from "./AnimatedClapperboard";

export default function Preloader() {
    const { isLoading, setIsLoading } = useLoading();
    const [stage, setStage] = useState(0); // 0: Lights, 1: Camera, 2: Rolling, 3: Action

    useEffect(() => {
        if (!isLoading) return;

        const timings = [1500, 1500, 2000, 1500]; // Duration for each stage
        let currentStage = 0;

        const nextStage = () => {
            if (currentStage < 3) {
                currentStage++;
                setStage(currentStage);
                setTimeout(nextStage, timings[currentStage]);
            } else {
                // End of sequence
                setTimeout(() => setIsLoading(false), 500);
            }
        };

        // Start sequence
        setTimeout(nextStage, timings[0]);

        return () => { };
    }, [isLoading, setIsLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                >
                    {/* 3D Parallax Studio Background */}
                    <StudioBackground visible={stage >= 0} />

                    {/* STAGE 0+: LIGHTS (Persist) */}
                    {stage >= 0 && (
                        <>
                            {/* Top Left Spotlight */}
                            <motion.div
                                className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
                                style={{ background: "radial-gradient(circle at top left, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.8, 1] }} // Flicker on
                                transition={{ duration: 0.5, times: [0, 0.6, 0.8, 1] }}
                            />
                            {/* Top Right Spotlight */}
                            <motion.div
                                className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
                                style={{ background: "radial-gradient(circle at top right, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.8, 1] }}
                                transition={{ duration: 0.5, delay: 0.2, times: [0, 0.6, 0.8, 1] }}
                            />
                            {/* Bottom Left Spotlight */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
                                style={{ background: "radial-gradient(circle at bottom left, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.8, 1] }}
                                transition={{ duration: 0.5, delay: 0.4, times: [0, 0.6, 0.8, 1] }}
                            />
                            {/* Bottom Right Spotlight */}
                            <motion.div
                                className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
                                style={{ background: "radial-gradient(circle at bottom right, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.8, 1] }}
                                transition={{ duration: 0.5, delay: 0.6, times: [0, 0.6, 0.8, 1] }}
                            />

                            {/* Text for Stage 0 only */}
                            {stage === 0 && (
                                <motion.h1
                                    className="text-6xl md:text-9xl font-bold text-white tracking-tighter absolute z-10"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5 }}
                                >
                                    LIGHTS
                                </motion.h1>
                            )}
                        </>
                    )}

                    {/* STAGE 1+: CAMERA (Persist) */}
                    {stage >= 1 && (
                        <>
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                                    className="relative"
                                >
                                    <Aperture size={240} className="text-white/20" />
                                    {/* Lens Flare Reflection */}
                                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/30 rounded-full blur-md" />
                                </motion.div>
                            </motion.div>

                            {/* Text for Stage 1 only */}
                            {stage === 1 && (
                                <motion.h1
                                    className="text-6xl md:text-8xl font-bold text-white tracking-tighter absolute z-30"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                                >
                                    CAMERA
                                </motion.h1>
                            )}
                        </>
                    )}

                    {/* STAGE 2+: ROLLING (Persist) */}
                    {stage >= 2 && (
                        <>
                            {/* Viewfinder Overlay */}
                            <motion.div
                                className="absolute inset-4 md:inset-12 border-2 border-white/30 rounded-lg flex flex-col justify-between p-6 z-40 pointer-events-none"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, type: "spring" }}
                            >
                                {/* Top Bar */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                                            animate={{ opacity: [1, 0.3, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        <span className="font-mono text-red-600 font-bold text-xl tracking-widest drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">REC</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="font-mono text-white text-lg">BAT 85%</div>
                                        <div className="font-mono text-white/50 text-sm">4K 60FPS</div>
                                    </div>
                                </div>

                                {/* Center Crosshair */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-t-2 border-l-2 border-white/50" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-b-2 border-r-2 border-white/50" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />

                                {/* Bottom Bar */}
                                <div className="flex justify-between items-end">
                                    <div className="font-mono text-white text-2xl md:text-4xl tracking-widest">
                                        00:00:04:12
                                    </div>
                                    <div className="flex gap-4 font-mono text-white/70 text-sm md:text-base">
                                        <span>ISO 800</span>
                                        <span>f/2.8</span>
                                        <span>1/50</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Text for Stage 2 only */}
                            {stage === 2 && (
                                <motion.h1
                                    className="text-6xl md:text-8xl font-bold text-white tracking-tighter absolute z-30"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                >
                                    ROLLING
                                </motion.h1>
                            )}
                        </>
                    )}

                    {/* STAGE 3: ACTION (Trigger) */}
                    {stage === 3 && (
                        <motion.div
                            key="action"
                            className="absolute inset-0 flex flex-col items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="text-white flex flex-col items-center bg-black/80 backdrop-blur-md p-12 rounded-xl border border-white/20 shadow-2xl"
                            >
                                <div className="mb-6">
                                    <AnimatedClapperboard />
                                </div>
                                <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic drop-shadow-lg">ACTION!</h1>
                            </motion.div>

                            {/* Flash Effect */}
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.2, delay: 0.4 }} // Sync with clap (0.2 delay + 0.2 spring ~ 0.4s)
                            />
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
