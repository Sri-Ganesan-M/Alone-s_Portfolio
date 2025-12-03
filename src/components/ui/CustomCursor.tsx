"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
    const { cursorType } = useCursor();

    // Mouse position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring for the outer viewfinder
    const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    // Variants for the Viewfinder (Outer Box)
    const viewfinderVariants = {
        default: {
            width: 40,
            height: 40,
            rotate: 0,
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1,
            opacity: 1,
            scale: 1,
        },
        pointer: {
            width: 60,
            height: 60,
            rotate: 45,
            borderColor: "rgba(0, 243, 255, 0.8)", // Neon Cyan
            borderWidth: 2,
            opacity: 1,
            scale: 1,
        },
        text: {
            width: 4,
            height: 30,
            rotate: 0,
            borderColor: "rgba(255, 255, 255, 0.8)",
            borderWidth: 2,
            opacity: 1,
            scale: 1,
        },
        video: {
            width: 80,
            height: 80,
            rotate: 0,
            borderColor: "rgba(255, 0, 0, 0.8)", // Red for REC
            borderWidth: 2,
            opacity: 1,
            scale: 1,
        }
    };

    return (
        <>
            {/* Center Crosshair (Always follows mouse exactly) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,1)]" />
            </motion.div>

            {/* Outer Viewfinder / Frame */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center border border-white/30"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                variants={viewfinderVariants}
                animate={cursorType}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* Corner Markers (Only visible in default/pointer/video) */}
                {cursorType !== 'text' && (
                    <>
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />
                    </>
                )}

                {/* Contextual Icons/Text */}
                <AnimatePresence mode="wait">
                    {cursorType === 'video' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-[10px] font-mono font-bold text-red-500 tracking-widest absolute -top-6"
                        >
                            REC
                        </motion.div>
                    )}
                    {cursorType === 'pointer' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-neon-cyan/5"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
