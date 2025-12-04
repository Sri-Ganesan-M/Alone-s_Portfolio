"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import Image from "next/image";

export default function About({ profile }: { profile: any }) {
    const { setCursorType } = useCursor();

    // Fallback data
    const name = profile?.name || "PUNITHAN A";
    const title = profile?.aboutTitle || "The Editor Behind The Viral Cut";
    const description = profile?.aboutDescription || "Crafting visual narratives that captivate and engage. With a keen eye for rhythm and a passion for storytelling, I transform raw footage into compelling content that resonates with audiences.";
    const profileImage = profile?.profileImage || "/alones-data/profile_photo.jpeg";
    const stats = profile?.stats || [
        { label: "Years Experience", value: "4+" },
        { label: "Projects Completed", value: "150+" },
        { label: "Happy Clients", value: "50+" }
    ];

    return (
        <section id="about" className="py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            {title.split(" ").slice(0, 3).join(" ")} <br />
                            <span className="text-neon-cyan">{title.split(" ").slice(3).join(" ")}</span>
                        </h2>

                        <div className="relative mb-8 p-6 border-l-4 border-neon-cyan bg-white/5 backdrop-blur-sm rounded-r-xl">
                            <p className="text-lg text-gray-300 leading-relaxed font-mono">
                                "{description}"
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            {stats.map((stat: any, index: number) => (
                                <div key={index} className="text-center md:text-left">
                                    <h3 className="text-3xl font-bold text-electric-purple mb-1">{stat.value}</h3>
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Profile Image - Director's Monitor Style */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-black border-4 border-gray-800 rounded-lg p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 group">
                            {/* Monitor Frame */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900">
                                <Image
                                    src={profileImage}
                                    alt={name}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />

                                {/* Overlay UI */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* REC Indicator */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                        <span className="text-red-500 font-mono text-xs font-bold">REC</span>
                                    </div>

                                    {/* Battery & Time */}
                                    <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                                        <div className="flex items-center gap-1">
                                            <div className="w-6 h-3 border border-white/50 rounded-sm relative">
                                                <div className="absolute inset-0.5 bg-green-500 w-[80%]" />
                                            </div>
                                        </div>
                                        <span className="text-white/70 font-mono text-xs">ISO 800</span>
                                    </div>

                                    {/* Focus Brackets */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-50">
                                        <div className="w-16 h-16 border-2 border-white/30 rounded-lg relative">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-white/50" />
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-2 bg-white/50" />
                                            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-white/50" />
                                            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-white/50" />
                                        </div>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div>
                                            <h3 className="text-white font-bold text-xl uppercase tracking-widest">{name}</h3>
                                            <p className="text-neon-cyan text-xs font-mono">DIRECTOR / EDITOR</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/50 text-[10px] font-mono">4K 60FPS</p>
                                            <p className="text-white/50 text-[10px] font-mono">LOG-C</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-electric-purple/20 rounded-2xl transform -rotate-3 blur-xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
