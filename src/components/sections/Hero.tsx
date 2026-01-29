'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { Suspense } from 'react';
import TechPlanetarySystem3D from '../3d/DeveloperWorkspace3D';

export default function Hero() {
    return (
        <section id="hero" className="min-h-screen relative flex items-center pt-48 pb-32 overflow-visible">
            {/* Background Wrappers to prevent overflow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Background Gradient Blob */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
                        >
                            <span className="text-primary font-mono text-sm">👋 Bienvenue sur mon portfolio</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
                            Je suis <span className="text-primary">Jul</span>,<br />
                            Full Stack Developer
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Passionné par la création d'expériences numériques innovantes et performantes.
                            Spécialisé en développement web moderne avec React, Next.js et Python.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                            Voir mes projets
                            <ArrowRight size={18} />
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Me contacter
                            <Mail size={18} />
                        </Button>
                    </div>
                </motion.div>

                {/* 3D Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-[500px] w-full relative flex flex-col items-center"
                >
                    <div className="w-full h-full relative">
                        <TechPlanetarySystem3D />
                    </div>

                    {/* Profile Image Placement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="absolute -bottom-12 md:-bottom-24 z-20"
                    >
                        <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-cyan-500/30 p-1 bg-black/50 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                            <div className="w-full h-full rounded-full overflow-hidden relative group">
                                <img
                                    src="/images/profile.jpeg"
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Orbital Ring Animation */}
                            <div className="absolute -inset-2 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute -inset-2 border-t border-cyan-400 rounded-full animate-[spin_10s_linear_infinite]" />
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
