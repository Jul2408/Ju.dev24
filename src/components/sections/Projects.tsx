'use client';

import React, { useState, useRef } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import ProjectModal from '../ui/ProjectModal';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/lib/data';

function ProjectCard({ project, index, onOpenModal }: { project: typeof projects[0], index: number, onOpenModal: (project: typeof projects[0]) => void }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.2 1"]
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    // Check if project has valid links
    const hasLiveLink = project.link && project.link !== '#';
    const hasRepo = project.repo && project.repo !== '#';
    const isInDevelopment = !hasLiveLink && !hasRepo;

    return (
        <motion.div
            ref={ref}
            style={{
                scale: scaleProgress,
                opacity: opacityProgress,
            }}
            className="group mb-24 last:mb-0"
        >
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>

                {/* Image Section */}
                <div className="w-full lg:w-3/5 overflow-hidden rounded-2xl border border-white/10 relative">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-video"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Development Badge */}
                    {isInDevelopment && (
                        <div className="absolute top-4 right-4 px-4 py-2 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 rounded-full">
                            <span className="text-yellow-400 text-xs font-mono font-bold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                En développement
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-2/5 flex flex-col gap-4">
                    <h3 className="text-3xl font-bold font-heading">{project.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-primary border border-primary/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {hasLiveLink ? (
                            <Button
                                size="sm"
                                icon={<ArrowUpRight size={16} />}
                                onClick={() => window.open(project.link, '_blank')}
                            >
                                Voir le projet
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                icon={<ArrowUpRight size={16} />}
                                onClick={() => onOpenModal(project)}
                            >
                                Voir les détails
                            </Button>
                        )}

                        {hasRepo && (
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<Github size={16} />}
                                onClick={() => window.open(project.repo, '_blank')}
                            >
                                Code
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


export default function Projects() {
    const [showAll, setShowAll] = useState(false);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const displayedProjects = showAll ? projects : projects.slice(0, 3);

    const handleOpenModal = (project: typeof projects[0]) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <>
            <section id="projects" className="py-24 bg-background relative">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">Projets Sélectionnés</h2>
                        <div className="h-1 w-20 bg-primary rounded-full" />
                    </motion.div>

                    <div className="flex flex-col">
                        {displayedProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onOpenModal={handleOpenModal}
                            />
                        ))}
                    </div>

                    {projects.length > 3 && (
                        <div className="mt-16 text-center">
                            <Button
                                variant="ghost"
                                className="text-lg"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? '← Voir moins' : 'Voir tous les projets →'}
                            </Button>
                        </div>
                    )}
                </Container>
            </section>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
