"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px" }); // Removed once: true to allow replay
    const [displayText, setDisplayText] = useState(title); // Initial state matches server render
    const [isDecoding, setIsDecoding] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isInView) {
            setIsDecoding(true);
            let iteration = -5; // Start with a delay of pure scrambling
            const intervalTime = 30; // Shuffle speed (ms)

            interval = setInterval(() => {
                setDisplayText(prev =>
                    title
                        .split("")
                        .map((letter, index) => {
                            // If we've passed the iteration for this character, show the real letter
                            if (index < iteration) {
                                return title[index];
                            }
                            // Otherwise show a random character
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= title.length) {
                    clearInterval(interval);
                    setDisplayText(title);
                    setIsDecoding(false); // Animation finished
                }

                iteration += 0.2; // Lock-in speed: 0.2 chars per 30ms = ~150ms per char
            }, intervalTime);

        } else {
            // Reset to initial state when out of view
            if (isDecoding) { // Only clear if an animation was in progress
                clearInterval(interval!); // Clear any running interval
            }
            setDisplayText(title);
            setIsDecoding(false);
        }

        return () => clearInterval(interval); // Cleanup on unmount or re-run
    }, [isInView, title]); // Removed isDecoding from dependencies as it's managed internally

    return (
        <div ref={ref} className={`mb-16 ${className}`}>
            <motion.h2
                className="text-4xl md:text-6xl font-bold mb-4 font-mono tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
            >
                {displayText.split("").map((char, index) => (
                    <span
                        key={index}
                        className={`${char !== title[index] ? "text-neon-cyan" : "text-white"
                            }`}
                    >
                        {char}
                    </span>
                ))}
                <motion.span
                    className="inline-block w-3 h-8 ml-2 bg-neon-cyan align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                />
            </motion.h2>

            {subtitle && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex items-center gap-4"
                >
                    <div className="h-px w-12 bg-neon-cyan" />
                    <p className="text-neon-cyan font-mono text-sm tracking-widest uppercase">
                        {subtitle}
                    </p>
                </motion.div>
            )}
        </div>
    );
}
