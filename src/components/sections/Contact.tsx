"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import { Mail, Instagram, Youtube, Send, Clapperboard, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import profileData from "@/data/profile.json";
import ClientDate from "@/components/ui/ClientDate";

export default function Contact() {
    const { setCursorType } = useCursor();
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus("sending");

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
        // You can find these in your EmailJS dashboard: https://dashboard.emailjs.com/
        const SERVICE_ID = "YOUR_SERVICE_ID";
        const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
        const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then(() => {
                setStatus("success");
                if (formRef.current) formRef.current.reset();
                setTimeout(() => setStatus("idle"), 5000);
            }, (error) => {
                console.error("EmailJS Error:", error);
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            });
    };

    return (
        <section id="contact" className="py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Info & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            LET'S <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple">
                                COLLABORATE
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-12 max-w-md">
                            Got a vision? Let's bring it to life. From viral reels to cinematic masterpieces, I'm ready to cut.
                        </p>

                        <div className="space-y-6">
                            <SocialLink
                                href={`mailto:${profileData.socialLinks.email}`}
                                icon={<Mail size={24} />}
                                label={profileData.socialLinks.email}
                                color="hover:text-neon-cyan"
                                setCursorType={setCursorType}
                            />
                            <SocialLink
                                href={profileData.socialLinks.instagram}
                                icon={<Instagram size={24} />}
                                label="Instagram"
                                color="hover:text-pink-500"
                                setCursorType={setCursorType}
                            />
                            <SocialLink
                                href={profileData.socialLinks.youtube}
                                icon={<Youtube size={24} />}
                                label="YouTube"
                                color="hover:text-red-500"
                                setCursorType={setCursorType}
                            />
                        </div>
                    </motion.div>

                    {/* Right: Clapperboard Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Clapperboard Top (Hinge Animation) */}
                        <motion.div
                            className="absolute -top-12 left-0 right-0 h-16 bg-[#1a1a1a] border-b-4 border-white flex items-center overflow-hidden origin-bottom-left z-20 rounded-t-lg"
                            initial={{ rotate: -20 }}
                            whileInView={{ rotate: 0 }}
                            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                        >
                            {/* Stripes */}
                            <div className="flex w-full h-full transform -skew-x-12 scale-110">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-[#1a1a1a]'}`} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Clapperboard Body (Form) */}
                        <div className="bg-[#111] border-2 border-white/10 rounded-b-lg p-8 pt-12 relative shadow-2xl">
                            <div className="absolute top-0 left-0 right-0 h-4 bg-white/5" /> {/* Top groove */}

                            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Production</label>
                                        <input
                                            type="text"
                                            name="user_name"
                                            required
                                            placeholder="YOUR NAME"
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-white font-mono focus:outline-none focus:border-neon-cyan transition-colors placeholder:text-gray-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Scene</label>
                                        <input
                                            type="email"
                                            name="user_email"
                                            required
                                            placeholder="YOUR EMAIL"
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-white font-mono focus:outline-none focus:border-neon-cyan transition-colors placeholder:text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Action</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="TELL ME ABOUT YOUR PROJECT..."
                                        className="w-full bg-white/5 border border-white/10 rounded p-4 text-white font-mono focus:outline-none focus:border-neon-cyan transition-colors placeholder:text-gray-700 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "sending" || status === "success"}
                                    className={`w-full py-4 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 rounded ${status === "success"
                                        ? "bg-green-500 text-black"
                                        : status === "error"
                                            ? "bg-red-500 text-white"
                                            : "bg-white text-black hover:bg-neon-cyan"
                                        }`}
                                    onMouseEnter={() => setCursorType("pointer")}
                                    onMouseLeave={() => setCursorType("default")}
                                >
                                    {status === "idle" && <>Take 1: Send It <Clapperboard size={18} /></>}
                                    {status === "sending" && "Rolling..."}
                                    {status === "success" && <>It's a Wrap! <CheckCircle size={18} /></>}
                                    {status === "error" && <>Cut! Try Again <AlertCircle size={18} /></>}
                                </button>
                            </form>

                            {/* Decorative Metadata */}
                            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-[10px] font-mono text-gray-600">
                                <ClientDate />
                                <span>FPS: 60</span>
                                <span>ISO: 800</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <footer className="mt-24 border-t border-white/10 pt-8 pb-8 text-center text-gray-500 text-sm font-mono">
                <p>© {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
                <p className="mt-2 text-xs">DESIGNED FOR CREATORS</p>
            </footer>
        </section>
    );
}

function SocialLink({ href, icon, label, color, setCursorType }: any) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-6 group ${color} transition-colors`}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
        >
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-current transition-colors">
                {icon}
            </div>
            <span className="text-lg font-medium">{label}</span>
        </a>
    );
}
