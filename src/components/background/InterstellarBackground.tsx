"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

function ParticleField(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

export default function InterstellarBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) - 0.5;
            const y = (e.clientY / innerHeight) - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax transforms
    const moveBackground = useTransform(springX, [-0.5, 0.5], [20, -20]);
    const moveYBackground = useTransform(springY, [-0.5, 0.5], [20, -20]);

    const moveStars = useTransform(springX, [-0.5, 0.5], [40, -40]);
    const moveYStars = useTransform(springY, [-0.5, 0.5], [40, -40]);

    return (
        <div className="absolute inset-0 overflow-hidden bg-black z-0">
            {/* Layer 1: Deep Space Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#0a0a0a]" />

            {/* Layer 2: Nebula Background Image (Parallax) */}
            <motion.div
                className="absolute inset-[-5%] w-[110%] h-[110%]"
                style={{ x: moveBackground, y: moveYBackground }}
            >
                <div
                    className="absolute inset-0 bg-[url('/nebula-bg.png')] bg-cover bg-center opacity-60"
                />
            </motion.div>

            {/* Layer 3: Extra Star Layers (Parallax) */}
            <motion.div
                className="absolute inset-[-10%] w-[120%] h-[120%]"
                style={{ x: moveStars, y: moveYStars }}
            >
                <div className="absolute inset-0 bg-[url('/stars-bg.png')] opacity-40 bg-repeat" style={{ backgroundSize: "400px" }} />
            </motion.div>

            {/* Layer 4: 3D Particles (Foreground) */}
            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                    <ParticleField />
                </Canvas>
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-50 pointer-events-none" />
        </div>
    );
}

