"use client";

import { motion } from "framer-motion";

export default function AnimatedClapperboard() {
    return (
        <div className="relative w-40 h-40 flex items-center justify-center">
            <svg
                width="160"
                height="160"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]"
            >
                {/* Bottom Board */}
                <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z" fill="black" stroke="white" />
                <path d="M4 16h16" stroke="white" strokeOpacity="0.5" />
                <path d="M12 11v10" stroke="white" strokeOpacity="0.5" />

                {/* Top Arm (Animated) */}
                <motion.g
                    initial={{ rotate: -35, x: -2, y: -2 }}
                    animate={{ rotate: 0, x: 0, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.2 // Wait a tiny bit after appearing before clapping
                    }}
                    style={{ originX: "4px", originY: "11px" }} // Pivot point at the hinge
                >
                    <path d="M4 11h16a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z" fill="black" stroke="white" />
                    {/* Stripes on Arm */}
                    <path d="M7 5l-3 6" stroke="white" strokeWidth="2" />
                    <path d="M13 5l-3 6" stroke="white" strokeWidth="2" />
                    <path d="M19 5l-3 6" stroke="white" strokeWidth="2" />
                </motion.g>
            </svg>

            {/* Impact Spark/Flash */}
            <motion.div
                className="absolute top-[45%] left-1/2 -translate-x-1/2 w-20 h-1 bg-white rounded-full blur-sm"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 1, 0], scaleX: [0.5, 1.5, 0.5] }}
                transition={{ duration: 0.2, delay: 0.3 }} // Sync with clap impact
            />
        </div>
    );
}
