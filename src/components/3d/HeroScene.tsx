'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroScene() {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (sphereRef.current) {
            // Gentle rotation
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Environment preset="city" />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

            <Float
                speed={2}
                rotationIntensity={1}
                floatIntensity={1}
                floatingRange={[-0.1, 0.1]}
            >
                <Sphere args={[1.5, 64, 64]} ref={sphereRef}>
                    <MeshDistortMaterial
                        color="#1a1a1a"
                        emissive="#3b82f6"
                        emissiveIntensity={0.2}
                        roughness={0.1}
                        metalness={0.8}
                        distort={0.4}
                        speed={2}
                    />
                </Sphere>
            </Float>
        </>
    );
}

function PerspectiveCamera(props: any) {
    return <perspectiveCamera {...props} />;
}
