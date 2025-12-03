"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";


import toolsData from "@/data/tools.json";
import Image from "next/image";

export default function Tools() {
    return (
        <section id="tools" className="py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SectionTitle
                        title="THE ARSENAL"
                        subtitle="SOFTWARE & GEAR"
                    />
                </motion.div>
            </div>

            {/* Film Roll Animation */}
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20" />

                <motion.div
                    className="flex gap-8 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[...toolsData, ...toolsData].map((tool, index) => (
                        <div
                            key={`${tool.id}-${index}`}
                            className="relative w-80 h-56 bg-black border-y-[12px] border-black flex flex-col items-center justify-center p-8 group transition-all duration-300 shadow-2xl"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, transparent 50%, rgba(255,255,255,0.05) 50%),
                                    linear-gradient(to bottom, #111 0%, #000 100%)
                                `,
                                backgroundSize: "4px 100%, 100% 100%"
                            }}
                        >
                            {/* Film Sprockets (Top) */}
                            <div className="absolute -top-3 left-0 right-0 h-3 flex justify-between px-2">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="w-4 h-2 bg-white/20 rounded-sm" />
                                ))}
                            </div>

                            {/* Film Sprockets (Bottom) */}
                            <div className="absolute -bottom-3 left-0 right-0 h-3 flex justify-between px-2">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="w-4 h-2 bg-white/20 rounded-sm" />
                                ))}
                            </div>

                            {/* Glass/Gloss Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10" />

                            {/* Frame Number */}
                            <div className="absolute top-2 right-3 text-[10px] font-mono text-yellow-500/50 tracking-widest z-20">
                                {`FRAME-${String(index + 1).padStart(3, '0')}`}
                            </div>

                            <div className="relative w-20 h-20 mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 z-20">
                                <Image
                                    src={tool.logo}
                                    alt={tool.name}
                                    fill
                                    className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                />
                            </div>
                            <h3 className="font-bold text-white text-xl mb-1 relative z-20 tracking-wide">{tool.name}</h3>
                            <p className="text-xs text-neon-cyan uppercase tracking-widest relative z-20">{tool.type}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
