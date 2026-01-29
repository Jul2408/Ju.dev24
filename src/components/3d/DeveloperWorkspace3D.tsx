'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface PlanetData {
    group: THREE.Group;
    mesh: THREE.Mesh;
    inner: THREE.Mesh;
    distance: number;
    speed: number;
    angle: number;
    tilt: number;
    name: string;
    color: number;
}

export interface DataStream {
    mesh: THREE.Mesh;
    speed: number;
    angle: number;
    radius: number;
    height: number;
}

export interface ConnectionLine {
    line: THREE.Line;
    fromPlanet: number;
}

export default function TechPlanetarySystem3D() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050510);
        scene.fog = new THREE.FogExp2(0x050510, 0.015);

        // Camera with cinematic settings
        const camera = new THREE.PerspectiveCamera(
            50,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        // Initial camera position will be set by handleResize
        camera.position.set(0, 8, 25);
        camera.lookAt(0, 0, 0);

        // Renderer with ultra-high quality settings
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mountRef.current.appendChild(renderer.domElement);

        // Advanced lighting setup for cinematic look
        // Main key light (soft white)
        const keyLight = new THREE.SpotLight(0xffffff, 100);
        keyLight.position.set(-10, 15, 10);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.far = 100;
        keyLight.angle = Math.PI / 4;
        keyLight.penumbra = 0.5;
        keyLight.decay = 2;
        scene.add(keyLight);

        // Rim light (cyan)
        const rimLight1 = new THREE.SpotLight(0x00ffff, 80);
        rimLight1.position.set(15, 10, -10);
        rimLight1.angle = Math.PI / 3;
        rimLight1.penumbra = 0.7;
        rimLight1.decay = 2;
        scene.add(rimLight1);

        // Rim light (magenta)
        const rimLight2 = new THREE.SpotLight(0xff00ff, 70);
        rimLight2.position.set(-15, 10, -10);
        rimLight2.angle = Math.PI / 3;
        rimLight2.penumbra = 0.7;
        rimLight2.decay = 2;
        scene.add(rimLight2);

        // Fill lights
        const fillLight1 = new THREE.PointLight(0x4a90e2, 30);
        fillLight1.position.set(0, 20, 0);
        scene.add(fillLight1);

        const fillLight2 = new THREE.PointLight(0xff6b9d, 25);
        fillLight2.position.set(0, -10, 15);
        scene.add(fillLight2);

        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x1a1a2e, 4);
        scene.add(ambientLight);

        // Create central core sphere with glowing energy
        const coreGroup = new THREE.Group();

        // Inner glowing core
        const coreGeometry = new THREE.IcosahedronGeometry(1.5, 4);
        const coreMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00ffff,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x00ffff,
            emissiveIntensity: 2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transmission: 0.3,
            thickness: 0.5
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        core.castShadow = true;
        coreGroup.add(core);

        // Outer glass shell
        const shellGeometry = new THREE.IcosahedronGeometry(1.8, 3);
        const shellMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 0.95,
            thickness: 0.5,
            transparent: true,
            opacity: 0.3,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        coreGroup.add(shell);

        // Energy rings around core
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.TorusGeometry(2 + i * 0.3, 0.02, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: [0x00ffff, 0xff00ff, 0x00ff88][i],
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2 + (i * Math.PI / 6);
            ring.rotation.z = i * Math.PI / 4;
            coreGroup.add(ring);
        }

        scene.add(coreGroup);

        // Create orbiting planets with different materials
        const planets: PlanetData[] = [];

        // Planet 1: Transparent Glass Planet
        const planet1Group = new THREE.Group();
        const planet1Geometry = new THREE.IcosahedronGeometry(0.8, 3);
        const planet1Material = new THREE.MeshPhysicalMaterial({
            color: 0xaaaaff,
            metalness: 0.0,
            roughness: 0.0,
            transmission: 0.98,
            thickness: 1.0,
            transparent: true,
            opacity: 0.4,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            ior: 1.5
        });
        const planet1 = new THREE.Mesh(planet1Geometry, planet1Material);
        planet1.castShadow = true;
        planet1Group.add(planet1);

        // Inner structure
        const innerGeometry1 = new THREE.OctahedronGeometry(0.4);
        const innerMaterial1 = new THREE.MeshPhysicalMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1.5,
            metalness: 1.0,
            roughness: 0.2
        });
        const inner1 = new THREE.Mesh(innerGeometry1, innerMaterial1);
        planet1Group.add(inner1);

        scene.add(planet1Group);
        planets.push({
            group: planet1Group,
            mesh: planet1,
            inner: inner1,
            distance: 6,
            speed: 0.3,
            angle: 0,
            tilt: Math.PI / 6,
            name: 'Next.js',
            color: 0x00ffff
        });

        // Planet 2: Brushed Metal Planet
        const planet2Group = new THREE.Group();
        const planet2Geometry = new THREE.IcosahedronGeometry(1.0, 4);
        const planet2Material = new THREE.MeshPhysicalMaterial({
            color: 0xcccccc,
            metalness: 1.0,
            roughness: 0.3,
            clearcoat: 0.5,
            clearcoatRoughness: 0.4,
            envMapIntensity: 1.5
        });
        const planet2 = new THREE.Mesh(planet2Geometry, planet2Material);
        planet2.castShadow = true;
        planet2Group.add(planet2);

        // Surface details
        const detailsGeometry = new THREE.TorusGeometry(1.1, 0.05, 8, 32);
        const detailsMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 1.0,
            roughness: 0.2
        });
        const details2 = new THREE.Mesh(detailsGeometry, detailsMaterial);
        details2.rotation.x = Math.PI / 2;
        planet2Group.add(details2);

        scene.add(planet2Group);
        planets.push({
            group: planet2Group,
            mesh: planet2,
            inner: details2,
            distance: 9,
            speed: 0.2,
            angle: Math.PI / 3,
            tilt: Math.PI / 4,
            name: 'Django',
            color: 0x00ff00
        });

        // Planet 3: Liquid Metal Planet
        const planet3Group = new THREE.Group();
        const planet3Geometry = new THREE.SphereGeometry(0.9, 64, 64);
        const planet3Material = new THREE.MeshPhysicalMaterial({
            color: 0xff6b9d,
            metalness: 1.0,
            roughness: 0.05,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            reflectivity: 1.0,
            emissive: 0xff006b,
            emissiveIntensity: 0.3
        });
        const planet3 = new THREE.Mesh(planet3Geometry, planet3Material);
        planet3.castShadow = true;
        planet3Group.add(planet3);

        // Flowing liquid effect (torus around)
        const liquidRing = new THREE.Mesh(
            new THREE.TorusGeometry(1.2, 0.08, 16, 100),
            new THREE.MeshPhysicalMaterial({
                color: 0xff00ff,
                metalness: 1.0,
                roughness: 0.1,
                emissive: 0xff00ff,
                emissiveIntensity: 0.8,
                transparent: true,
                opacity: 0.7
            })
        );
        liquidRing.rotation.x = Math.PI / 3;
        planet3Group.add(liquidRing);

        scene.add(planet3Group);
        planets.push({
            group: planet3Group,
            mesh: planet3,
            inner: liquidRing,
            distance: 12,
            speed: 0.15,
            angle: 2 * Math.PI / 3,
            tilt: -Math.PI / 5,
            name: 'Python',
            color: 0x306998
        });

        // Planet 4: Holographic Planet
        const planet4Group = new THREE.Group();
        const planet4Geometry = new THREE.IcosahedronGeometry(0.7, 2);
        const planet4Material = new THREE.MeshPhysicalMaterial({
            color: 0x00ff88,
            metalness: 0.3,
            roughness: 0.1,
            transmission: 0.8,
            thickness: 0.3,
            transparent: true,
            opacity: 0.5,
            emissive: 0x00ff88,
            emissiveIntensity: 1.0,
            clearcoat: 1.0
        });
        const planet4 = new THREE.Mesh(planet4Geometry, planet4Material);
        planet4.castShadow = true;
        planet4Group.add(planet4);

        // Holographic grid
        const gridHelper = new THREE.GridHelper(1.4, 10, 0x00ff88, 0x00ff88);
        if (gridHelper.material instanceof THREE.Material) {
            gridHelper.material.transparent = true;
            gridHelper.material.opacity = 0.3;
        }
        planet4Group.add(gridHelper);

        scene.add(planet4Group);
        planets.push({
            group: planet4Group,
            mesh: planet4,
            inner: gridHelper as unknown as THREE.Mesh,
            distance: 8,
            speed: 0.25,
            angle: Math.PI,
            tilt: Math.PI / 8,
            name: 'MySQL',
            color: 0x00758f
        });

        // Planet 5: Energy Core Planet
        const planet5Group = new THREE.Group();
        const planet5Geometry = new THREE.DodecahedronGeometry(0.85, 2);
        const planet5Material = new THREE.MeshPhysicalMaterial({
            color: 0xffaa00,
            metalness: 0.5,
            roughness: 0.2,
            emissive: 0xffaa00,
            emissiveIntensity: 1.5,
            transmission: 0.4,
            thickness: 0.5,
            clearcoat: 1.0
        });
        const planet5 = new THREE.Mesh(planet5Geometry, planet5Material);
        planet5.castShadow = true;
        planet5Group.add(planet5);

        // Energy particles inside
        const particleGeo = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMat = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.8
        });
        for (let i = 0; i < 8; i++) {
            const particle = new THREE.Mesh(particleGeo, particleMat);
            particle.position.set(
                (Math.random() - 0.5) * 1.2,
                (Math.random() - 0.5) * 1.2,
                (Math.random() - 0.5) * 1.2
            );
            planet5Group.add(particle);
        }

        scene.add(planet5Group);
        planets.push({
            group: planet5Group,
            mesh: planet5,
            inner: planet5,
            distance: 10,
            speed: 0.18,
            angle: 4 * Math.PI / 3,
            tilt: -Math.PI / 6,
            name: 'Tailwind',
            color: 0x38bdf8
        });

        // Create orbital paths (luminous rings)
        planets.forEach(planet => {
            const orbitGeometry = new THREE.TorusGeometry(planet.distance, 0.01, 8, 128);
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: planet.color,
                transparent: true,
                opacity: 0.2,
                blending: THREE.AdditiveBlending
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            scene.add(orbit);
        });

        // Energy connections between planets (lines)
        const connectionLines: ConnectionLine[] = [];
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3,
            linewidth: 2,
            blending: THREE.AdditiveBlending
        });

        for (let i = 0; i < planets.length; i++) {
            const points = [];
            points.push(new THREE.Vector3(0, 0, 0));
            points.push(new THREE.Vector3(0, 0, 0));
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
            connectionLines.push({ line, fromPlanet: i });
        }

        // Floating data stream particles
        const dataStreams: DataStream[] = [];
        const streamParticleCount = 50;

        for (let i = 0; i < streamParticleCount; i++) {
            const streamGeometry = new THREE.SphereGeometry(0.03, 8, 8);
            const streamMaterial = new THREE.MeshBasicMaterial({
                color: [0x00ffff, 0xff00ff, 0x00ff88, 0xffaa00][i % 4],
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            const particle = new THREE.Mesh(streamGeometry, streamMaterial);

            const angle = (i / streamParticleCount) * Math.PI * 2;
            const radius = 4 + Math.random() * 10;
            particle.position.set(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 8,
                Math.sin(angle) * radius
            );

            scene.add(particle);
            dataStreams.push({
                mesh: particle,
                speed: 0.02 + Math.random() * 0.03,
                angle: angle,
                radius: radius,
                height: particle.position.y
            });
        }

        // Background star field
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 300;
        const starPositions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i++) {
            starPositions[i] = (Math.random() - 0.5) * 100;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Animation variables
        let time = 0;
        let autoRotate = true;
        let animationId: number;

        // Animation loop
        function animate() {
            animationId = requestAnimationFrame(animate);
            time += 0.01;

            // Rotate core
            coreGroup.rotation.y += 0.005;
            coreGroup.rotation.x = Math.sin(time * 0.3) * 0.1;

            // Core energy pulse
            core.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
            coreMaterial.emissiveIntensity = 2 + Math.sin(time * 3) * 0.5;

            // Rotate planets and update positions
            planets.forEach((planet, index) => {
                planet.angle += planet.speed * 0.01;

                const x = Math.cos(planet.angle) * planet.distance;
                const z = Math.sin(planet.angle) * planet.distance;
                const y = Math.sin(planet.angle * 2) * 0.5;

                planet.group.position.set(x, y, z);
                planet.group.rotation.y += 0.01;
                planet.mesh.rotation.y += 0.02;
                planet.inner.rotation.y += 0.015;

                // Update connection lines
                const positions = connectionLines[index].line.geometry.attributes.position.array;
                positions[0] = 0;
                positions[1] = 0;
                positions[2] = 0;
                positions[3] = x;
                positions[4] = y;
                positions[5] = z;
                connectionLines[index].line.geometry.attributes.position.needsUpdate = true;

                // Pulse effect
                const scale = 1 + Math.sin(time * 2 + index) * 0.03;
                planet.mesh.scale.setScalar(scale);
            });

            // Animate data streams
            dataStreams.forEach((stream, index) => {
                stream.angle += stream.speed;
                stream.mesh.position.x = Math.cos(stream.angle) * stream.radius;
                stream.mesh.position.z = Math.sin(stream.angle) * stream.radius;
                stream.mesh.position.y = stream.height + Math.sin(time * 2 + index) * 0.5;

                // Fade in/out
                stream.mesh.material.opacity = 0.3 + Math.sin(time * 3 + index) * 0.3;
            });

            // Subtle camera movement
            if (autoRotate) {
                camera.position.x = Math.sin(time * 0.1) * 25;
                camera.position.z = Math.cos(time * 0.1) * 25;
                camera.position.y = 8 + Math.sin(time * 0.15) * 2;
                camera.lookAt(0, 0, 0);
            }

            // Animate lights
            fillLight1.intensity = 30 + Math.sin(time * 2) * 10;
            rimLight1.intensity = 80 + Math.cos(time * 1.5) * 20;

            // Rotate stars slowly
            stars.rotation.y = time * 0.02;

            renderer.render(scene, camera);
        }

        animate();
        setLoading(false);

        // Handle window resize logic including mobile adjustments
        function handleResize() {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);

            // Responsive camera: Zoom out on small screens to keep spheres visible
            if (width < 768) {
                camera.position.set(0, 12, 40); // Further back
            } else {
                camera.position.set(0, 8, 25);
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        function onMouseMove(event: MouseEvent) {
            if (!autoRotate) {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

                camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
                camera.position.y += (mouseY * 5 + 8 - camera.position.y) * 0.05;
            }
        }
        window.addEventListener('mousemove', onMouseMove);

        // Touch interaction for mobile
        function onTouchMove(event: TouchEvent) {
            if (!autoRotate && event.touches.length > 0) {
                const touch = event.touches[0];
                mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;

                camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
                camera.position.y += (mouseY * 5 + 8 - camera.position.y) * 0.05;
            }
        }
        window.addEventListener('touchmove', onTouchMove, { passive: true });

        // Click/Tap to toggle auto-rotate
        function onClick() {
            autoRotate = !autoRotate;
        }
        window.addEventListener('click', onClick);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('click', onClick);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            scene.clear();
            renderer.dispose();
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="relative w-full h-full min-h-[500px] overflow-hidden rounded-2xl bg-black border border-indigo-500/20 shadow-2xl">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <div className="text-center space-y-6">
                        <div className="relative">
                            <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-cyan-400"></div>
                            <div className="absolute inset-0 inline-block animate-spin rounded-full h-20 w-20 border-l-2 border-r-2 border-purple-400" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-mono text-lg font-bold animate-pulse">
                                INITIALIZING PLANETARY SYSTEM
                            </p>
                            <p className="text-gray-500 text-xs font-mono">Rendering ultra-HD materials...</p>
                        </div>
                    </div>
                </div>
            )}

            <div ref={mountRef} className="w-full h-full" />

            {/* Header with title */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 space-y-3 max-w-[70vw] md:max-w-md transform scale-75 origin-top-left md:scale-100 md:transform-none select-none pointer-events-none z-10">
                <div className="backdrop-blur-xl bg-black/40 px-6 py-4 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                            TECH PLANETARY SYSTEM
                        </h1>
                    </div>
                    <p className="text-gray-400 text-sm font-mono">Futuristic Digital Universe</p>
                </div>

                <div className="backdrop-blur-xl bg-black/30 px-5 py-3 rounded-xl border border-purple-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-cyan-400 text-xs font-mono">CENTRAL CORE</span>
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-purple-400 text-xs font-mono">5 ORBITAL PLANETS</span>
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-pink-400 text-xs font-mono">ENERGY STREAMS</span>
                        <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Planet info cards */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 space-y-2 max-w-[35vw] md:max-w-xs transform scale-75 origin-top-right md:scale-100 md:transform-none z-10 pointer-events-none">
                <div className="backdrop-blur-xl bg-black/40 px-4 py-2 rounded-lg border border-cyan-500/30">
                    <p className="text-cyan-400 text-xs font-mono font-bold">ACTIVE PLANETS</p>
                </div>

                <div className="space-y-1">
                    {[
                        { name: 'Glass Tech', color: 'cyan' },
                        { name: 'Metal Core', color: 'gray' },
                        { name: 'Liquid Chrome', color: 'pink' },
                        { name: 'Holo-Sphere', color: 'green' },
                        { name: 'Energy Node', color: 'orange' }
                    ].map((planet, idx) => (
                        <div key={idx} className="backdrop-blur-xl bg-black/30 px-3 py-2 rounded-lg border border-white/10 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300 text-xs font-mono">{planet.name}</span>
                                <div className={`w-2 h-2 rounded-full bg-${planet.color}-400 animate-pulse`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Material specs */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 space-y-2 transform scale-75 origin-bottom-left md:scale-100 md:transform-none z-10 pointer-events-none hidden sm:block">
                <div className="backdrop-blur-xl bg-black/40 px-4 py-2 rounded-lg border border-purple-500/30">
                    <p className="text-purple-400 text-xs font-mono font-bold">MATERIAL SPECS</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { name: 'Glass', icon: '◇' },
                        { name: 'Metal', icon: '◆' },
                        { name: 'Liquid', icon: '◉' },
                        { name: 'Hologram', icon: '◈' }
                    ].map((material, idx) => (
                        <div key={idx} className="backdrop-blur-xl bg-black/30 px-3 py-2 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2">
                                <span className="text-cyan-400 text-sm">{material.icon}</span>
                                <span className="text-gray-400 text-xs font-mono">{material.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech stack info */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 space-y-2 transform scale-75 origin-bottom-right md:scale-100 md:transform-none z-10 pointer-events-none">
                <div className="backdrop-blur-xl bg-black/40 px-4 py-3 rounded-xl border border-white/20">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                            <span className="text-gray-400 text-xs font-mono">Three.js • React</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                            <span className="text-gray-400 text-xs font-mono">Next.js • Tailwind</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                            <span className="text-gray-400 text-xs font-mono">Global Illumination</span>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-lg border border-white/30">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-xs font-mono font-bold">
                        ULTRA-HD 4K
                    </p>
                </div>
            </div>

            {/* Interaction hint */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="backdrop-blur-sm bg-black/20 px-6 py-3 rounded-full border border-white/10 animate-pulse">
                    <p className="text-gray-500 text-xs font-mono text-center">
                        TAP TO EXPLORE
                    </p>
                </div>
            </div>

            {/* Overlay Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>
    );
}
