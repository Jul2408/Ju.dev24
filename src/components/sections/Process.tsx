'use client';

import Container from '../ui/Container';
import { motion } from 'framer-motion';
import { Search, PenTool, Code, CheckCircle, Rocket } from 'lucide-react';

const steps = [
    {
        icon: <Search className="w-6 h-6" />,
        title: 'Analyse & Stratégie',
        description: 'Compréhension approfondie de vos besoins, de votre audience et définition des objectifs techniques.'
    },
    {
        icon: <PenTool className="w-6 h-6" />,
        title: 'Design & UX/UI',
        description: 'Création de maquettes interactives et prototypage axé sur l\'expérience utilisateur et l\'esthétique.'
    },
    {
        icon: <Code className="w-6 h-6" />,
        title: 'Développement',
        description: 'Architecture propre, code modulaire et respect des bonnes pratiques (SEO, Accessibilité).'
    },
    {
        icon: <CheckCircle className="w-6 h-6" />,
        title: 'Tests & Optimisation',
        description: 'Vérification rigorous sur différents terminaux, optimisation des performances et de la sécurité.'
    },
    {
        icon: <Rocket className="w-6 h-6" />,
        title: 'Déploiement & Suivi',
        description: 'Mise en ligne, configuration du domaine et maintenance évolutive.'
    }
];

export default function Process() {
    return (
        <section id="process" className="py-24 bg-secondary/20 overflow-hidden">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Mon Processus</h2>
                    <p className="text-gray-400">De l'idée au produit final, une méthodologie éprouvée.</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

                    <div className="flex flex-col gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-start relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Icon Marker */}
                                <div className="absolute left-[4px] md:left-1/2 top-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-background border border-primary/50 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-primary">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                    <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                </div>

                                {/* Empty space for the other side */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
