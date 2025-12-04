"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import type { Work } from "@/types/work";
import { Play, ExternalLink } from "lucide-react";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";

export default function Works({ works = [] }: { works: Work[] }) {
    const { setCursorType } = useCursor();
    const [filter, setFilter] = useState("All");
    // Use the Work type for selectedWork for better type safety
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);

    const categories = ["All", "Reels", "Promos", "Brand Work"];

    // Dummy filtering logic since JSON doesn't have categories yet
    // In a real app, you'd filter based on a category field in the Work object
    const filteredWorks: Work[] = filter === "All"
        ? works
        : works.filter((_, i) => i % categories.length === categories.indexOf(filter)); // Placeholder logic

    return (
        <section id="works" className="py-24 relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <SectionTitle
                        title="SELECTED WORKS"
                        subtitle="A COLLECTION OF MY BEST CUTS"
                        className="mb-0"
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-4 overflow-x-auto pb-2 md:pb-0"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap ${filter === cat
                                    ? "bg-neon-cyan text-black border-neon-cyan font-bold"
                                    : "bg-transparent border-white/20 text-gray-400 hover:border-white/50"
                                    } `}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredWorks.map((work) => (
                            <WorkCard key={work.id} work={work} setSelectedWork={setSelectedWork} setCursorType={setCursorType} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal / Lightbox */}
            <AnimatePresence>
                {selectedWork && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedWork(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#111] border border-white/10 rounded-2xl overflow-y-auto max-w-4xl w-full max-h-[90vh] flex flex-col custom-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative aspect-video bg-black flex items-center justify-center">
                                {/* Video Preview */}
                                <video
                                    src={selectedWork.media}
                                    poster={selectedWork.thumbnail}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain rounded-lg"
                                    preload="metadata"
                                    onError={(e) => { (e.target as HTMLVideoElement).poster = '/alones-data/logo.png'; }}
                                >
                                    Sorry, your browser does not support embedded videos.
                                </video>
                                <button
                                    onClick={() => setSelectedWork(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start gap-8">
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-2">{selectedWork.title}</h3>
                                        <p className="text-gray-300 text-lg leading-relaxed">{selectedWork.description}</p>
                                    </div>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                        {selectedWork.contentType && (
                                            <div>
                                                <h4 className="text-neon-cyan text-xs font-mono uppercase tracking-wider mb-1">Content Type</h4>
                                                <p className="text-white font-medium">{selectedWork.contentType}</p>
                                            </div>
                                        )}
                                        {selectedWork.subjectMatter && (
                                            <div>
                                                <h4 className="text-neon-cyan text-xs font-mono uppercase tracking-wider mb-1">Subject Matter</h4>
                                                <p className="text-white font-medium">{selectedWork.subjectMatter}</p>
                                            </div>
                                        )}
                                        {selectedWork.editingStyle && (
                                            <div>
                                                <h4 className="text-neon-cyan text-xs font-mono uppercase tracking-wider mb-1">Editing Style</h4>
                                                <p className="text-white font-medium">{selectedWork.editingStyle}</p>
                                            </div>
                                        )}
                                        {selectedWork.software && selectedWork.software.length > 0 && (
                                            <div>
                                                <h4 className="text-neon-cyan text-xs font-mono uppercase tracking-wider mb-1">Software</h4>
                                                <div className="flex gap-3 mt-1">
                                                    {selectedWork.software.map((tool, idx) => (
                                                        <div key={idx} className="relative group/tool">
                                                            <div className="w-8 h-8 relative bg-white/10 rounded-lg p-1.5 border border-white/10 hover:border-neon-cyan/50 transition-colors">
                                                                <Image
                                                                    src={tool.logo}
                                                                    alt={tool.name}
                                                                    width={32}
                                                                    height={32}
                                                                    className="object-contain w-full h-full"
                                                                />
                                                            </div>
                                                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tool:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                                                {tool.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 min-w-[200px]">
                                    <a
                                        href={selectedWork.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-4 bg-neon-cyan text-black font-bold rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                                        onMouseEnter={() => setCursorType("pointer")}
                                        onMouseLeave={() => setCursorType("default")}
                                    >
                                        Watch Full <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function WorkCard({ work, setSelectedWork, setCursorType }: { work: Work, setSelectedWork: (w: Work) => void, setCursorType: (t: any) => void }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setCursorType("default");
        setIsVideoPlaying(false);
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative group rounded-xl overflow-hidden cursor-none bg-gray-900 border border-white/5 hover:border-neon-cyan/50 transition-colors duration-300 ${work.orientation === "vertical" ? "row-span-2 aspect-[9/16]" : "aspect-video"}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                setCursorType("video");
                setIsVideoPlaying(true);
            }}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedWork(work)}
        >
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

            {/* Thumbnail Image */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                    src={work.thumbnail}
                    alt={work.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Background Video Preview */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'} `}>
                <video
                    src={work.media}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    ref={(el) => {
                        if (el) {
                            isVideoPlaying ? el.play().catch(() => { }) : el.pause();
                        }
                    }}
                />
            </div>

            {/* Editor UI Overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none z-30 transform translate-z-10">
                {/* Top Info Bar */}
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="flex gap-2">
                        <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                            {work.orientation === "vertical" ? "9:16" : "16:9"}
                        </div>
                        <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-white/70 border border-white/10">
                            4K
                        </div>
                    </div>
                    <div className="bg-red-500/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-white animate-pulse">
                        REC
                    </div>
                </div>

                {/* Center Crosshair (Subtle) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-white" />
                </div>

                {/* Bottom Info & Scrubber */}
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">{work.title}</h3>
                    <p className="text-xs text-gray-300 mb-3 line-clamp-2 drop-shadow-md">{work.description}</p>

                    {/* Scrubber Bar */}
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                            initial={{ width: "0%" }}
                            animate={{ width: isVideoPlaying ? "100%" : "0%" }}
                            transition={{ duration: 10, ease: "linear" }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-1">
                        <span>00:00</span>
                        <span className="text-neon-cyan">00:15</span>
                    </div>
                </div>
            </div>

            {/* Center Play Icon (Initial State) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-0 z-10">
                <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
                    <Play size={20} className="fill-white text-white ml-1" />
                </div>
            </div>
        </motion.div>
    );
}
