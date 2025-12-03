"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import { useLoading } from "@/context/LoadingContext";
import { Instagram, Youtube, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    const { setCursorType } = useCursor();
    const { isLoading } = useLoading();

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">
            {/* Floating Neon/Glassmorphism Elements */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />

            {/* Content */}
            <div className="container mx-auto px-4 text-center z-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    {/* Site Logo (replace src with actual logo path) */}
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 relative flex items-center justify-center">
                        <Image
                            src="/alones-data/logo.png" // <-- Update if logo asset changes
                            alt="Alone Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_20px_var(--neon-cyan)] rounded-full bg-white/5 border border-white/10"
                            priority
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                        <motion.span
                            className="text-white font-cinzel block"
                            initial={{ letterSpacing: "0.5em", opacity: 0, filter: "blur(10px)" }}
                            animate={!isLoading ? { letterSpacing: "0.1em", opacity: 1, filter: "blur(0px)" } : {}}
                            transition={{ duration: 2.5, ease: "easeOut" }}
                        >
                            PUNITHAN A
                        </motion.span>
                        <motion.div
                            className="flex items-center justify-center gap-4 mt-2"
                            animate={!isLoading ? { opacity: [1, 0.8, 1, 0.5, 1, 0.9, 1] } : { opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1] }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple text-6xl md:text-8xl font-mono">
                                alone
                            </span>
                            <span className="w-4 h-4 md:w-6 md:h-6 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--neon-cyan)]" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-neon-cyan text-6xl md:text-8xl font-mono">
                                DVD
                            </span>
                        </motion.div>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={!isLoading ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm md:text-base text-gray-400 mt-4 mb-8 font-mono"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            INDIA
                        </span>
                        <span className="hidden md:inline text-white/20">|</span>
                        <span>ENGLISH & TAMIL</span>
                    </motion.div>

                    <motion.p
                        className="text-2xl md:text-4xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light"
                        initial={{ opacity: 0 }}
                        animate={!isLoading ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        <span className="block mb-2">Short-Form Video Editor</span>
                        <motion.span
                            className="text-gray-400 text-xl md:text-2xl block"
                            initial={{ width: 0 }}
                            animate={!isLoading ? { width: "100%" } : {}}
                            transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
                            style={{ overflow: "hidden", whiteSpace: "nowrap", margin: "0 auto", display: "inline-block" }}
                        >
                            Specializing in reels, promos & social-ready edits.
                        </motion.span>
                        <motion.span
                            className="block text-lg md:text-xl text-gray-500 mt-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 3.5, duration: 1 }}
                        >
                            Bringing fast cuts, clean transitions, and storytelling that hooks in seconds.
                        </motion.span>
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col md:flex-row gap-6 justify-center mt-12"
                >
                    <button
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neon-cyan hover:text-black transition-colors duration-300 shadow-lg shadow-neon-cyan/20"
                    >
                        View Showreel
                    </button>
                    <button
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-colors duration-300 backdrop-blur-sm shadow-lg shadow-electric-purple/20"
                    >
                        Book an Edit
                    </button>
                </motion.div>
            </div>

            {/* Floating Social Links */}
            <motion.div
                className="absolute left-6 md:left-12 bottom-0 top-0 flex flex-col justify-center gap-6 z-30 hidden md:flex"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-white/20 mx-auto" />
                <a
                    href="https://www.instagram.com/alone.dvd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon-cyan transition-colors transform hover:scale-110"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                >
                    <Instagram size={36} />
                </a>
                <a
                    href="https://www.youtube.com/@Alone.2k3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                >
                    <Youtube size={36} />
                </a>
                <a
                    href="mailto:alonework2k3@gmail.com"
                    className="text-gray-400 hover:text-electric-purple transition-colors transform hover:scale-110"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                >
                    <Mail size={36} />
                </a>
                <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-white/20 mx-auto" />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
