'use client';

import Container from '../ui/Container';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Projets réalisés', value: '20+' },
    { label: 'Années d\'expérience', value: '4+' },
    { label: 'Clients satisfaits', value: '15+' },
    { label: 'Technologies', value: '10+' },
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-secondary/30 relative">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                            Plus qu'un développeur, <br />
                            <span className="text-primary">un partenaire créatif.</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Je suis un développeur full-stack passionné par la création d'expériences numériques qui marquent les esprits.
                            Mon approche combine une rigueur technique sans faille avec une sensibilité esthétique moderne.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            J'accorde autant d'importance à l'architecture du code qu'à la fluidité de l'interface utilisateur.
                            Mon objectif est de simplifier la complexité pour offrir des produits clairs, rapides et maintenables.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group"
                            >
                                <div className="text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
