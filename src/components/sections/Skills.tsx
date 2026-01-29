'use client';

import Container from '../ui/Container';
import { motion } from 'framer-motion';
import { Layout, Server, Wrench, Code2, Database, Terminal } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

const skillCategories = [
    {
        title: 'Frontend',
        icon: <Layout className="w-8 h-8 text-blue-400" />,
        description: 'Interfaces réactives et interactives',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js']
    },
    {
        title: 'Backend',
        icon: <Server className="w-8 h-8 text-purple-400" />,
        description: 'Logique serveur et bases de données',
        skills: ['Node.js', 'Python', 'PostgreSQL', 'Supabase', 'API REST', 'GraphQL']
    },
    {
        title: 'Outils & DevOps',
        icon: <Wrench className="w-8 h-8 text-green-400" />,
        description: 'Workflow et architecture',
        skills: ['Git', 'Docker', 'Figma', 'Vercel', 'AWS', 'CI/CD']
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

            <Container>
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold font-heading mb-4"
                    >
                        Expertise Technique
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Une stack moderne pour des performances optimales.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <SpotlightCard
                            key={category.title}
                            className="p-8 h-full group"
                            spotlightColor="rgba(59, 130, 246, 0.2)"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                {category.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-white">{category.title}</h3>
                            <p className="text-sm text-gray-400 mb-6">{category.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 group-hover:border-primary/30 group-hover:text-white transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </Container>
        </section>
    );
}
