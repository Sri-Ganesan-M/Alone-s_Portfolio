"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

function ParticleField(props: any) {
    const ref = useRef<any>(null);
    // Reduced particle count for better performance
    const [sphere] = useState(() => random.inSphere(new Float32Array(2000), { radius: 1.5 }));

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
                    size={0.005} // Increased size for visibility
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function ParticlesBackground() {
    return (
        <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <ParticleField />
            </Canvas>
        </div>
    );
}
