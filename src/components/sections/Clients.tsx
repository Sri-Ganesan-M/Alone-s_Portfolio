"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import clientsData from "@/data/clients.json";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";

export default function Clients() {
    const { setCursorType } = useCursor();

    return (
        <section id="clients" className="py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title="EDITED FOR"
                    subtitle="TRUSTED BY CREATORS"
                    className="mb-12"
                />
            </div>

            {/* Timeline Container */}
            <div className="relative w-full max-w-6xl mx-auto px-4">

                {/* Timecode Ruler */}
                <div className="flex justify-between text-xs font-mono text-gray-600 mb-2 border-b border-white/10 pb-1 select-none">
                    <span>00:00:00</span>
                    <span>00:00:15</span>
                    <span>00:00:30</span>
                    <span>00:00:45</span>
                    <span>00:01:00</span>
                </div>

                {/* Playhead */}
                <motion.div
                    className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-30 pointer-events-none shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    initial={{ left: "0%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute -top-1 -left-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500" />
                    <div className="absolute top-0 left-2 text-[10px] font-mono text-red-500 bg-black/50 px-1 rounded">PLAY</div>
                </motion.div>

                {/* Tracks */}
                <div className="space-y-4 relative">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="h-px bg-white/10" />
                        <div className="h-px bg-white/10" />
                        <div className="h-px bg-white/10" />
                        <div className="h-px bg-white/10" />
                    </div>

                    {clientsData.map((client, index) => (
                        <motion.div
                            key={client.id}
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            <a
                                href={client.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                onMouseEnter={() => setCursorType("pointer")}
                                onMouseLeave={() => setCursorType("default")}
                            >
                                <div
                                    className={`
                                        relative h-24 md:h-28 rounded-lg border border-white/10 
                                        flex items-center gap-6 px-6 overflow-hidden transition-all duration-300
                                        hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:bg-white/10
                                        ${index % 2 === 0 ? 'bg-white/5 ml-0 md:ml-12 w-[90%]' : 'bg-white/5 ml-auto w-[85%]'}
                                    `}
                                >
                                    {/* Clip Handle (Left) */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />

                                    {/* Clip Handle (Right) */}
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20" />

                                    {/* Logo */}
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-black z-10">
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow z-10">
                                        <h3 className="text-xl font-bold text-white mb-1">{client.name}</h3>
                                        <p className="text-sm text-gray-400 font-mono">{client.category}</p>
                                    </div>

                                    {/* Animated Waveform Visual */}
                                    <div className="hidden md:flex items-center gap-1 h-12 opacity-40 absolute right-12 bottom-1/2 translate-y-1/2 z-0">
                                        {Array.from({ length: 30 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-neon-cyan rounded-full"
                                                animate={{ height: ["20%", "80%", "20%"] }}
                                                transition={{
                                                    duration: 0.5 + Math.random() * 0.5,
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    delay: Math.random() * 0.5
                                                }}
                                                style={{ height: "40%" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
