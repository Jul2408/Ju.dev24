'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink, Github, Calendar, User } from 'lucide-react';
import Button from './Button';

interface ProjectModalProps {
    project: {
        id: string;
        title: string;
        subtitle: string;
        description: string;
        context: string;
        solution: string;
        results: string;
        tags: string[];
        image: string;
        screenshots: string[];
        link: string;
        repo: string;
        year: string;
        client: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!project) return null;

    const hasLiveLink = project.link && project.link !== '#';
    const hasRepo = project.repo && project.repo !== '#';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="min-h-screen px-4 flex items-center justify-center py-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: 'spring', duration: 0.5 }}
                                className="relative w-full max-w-5xl bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110"
                                >
                                    <X size={24} className="text-white" />
                                </button>

                                {/* Header Image */}
                                <div className="relative h-80 w-full overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                                    {/* Title Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-2 text-white">
                                                {project.title}
                                            </h2>
                                            <p className="text-xl text-primary font-medium">{project.subtitle}</p>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-12 space-y-8">
                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-6 pb-6 border-b border-white/10">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Calendar size={18} className="text-primary" />
                                            <span className="text-sm">{project.year}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <User size={18} className="text-primary" />
                                            <span className="text-sm">{project.client}</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-3 text-white">Vue d'ensemble</h3>
                                            <p className="text-gray-300 leading-relaxed text-lg">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                                <h4 className="text-primary font-bold mb-2 text-sm uppercase tracking-wider">Contexte</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">{project.context}</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                                <h4 className="text-primary font-bold mb-2 text-sm uppercase tracking-wider">Solution</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                                <h4 className="text-primary font-bold mb-2 text-sm uppercase tracking-wider">Résultats</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">{project.results}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-4 pt-6">
                                        {hasLiveLink && (
                                            <Button
                                                icon={<ExternalLink size={18} />}
                                                onClick={() => window.open(project.link, '_blank')}
                                            >
                                                Voir le projet live
                                            </Button>
                                        )}
                                        {hasRepo && (
                                            <Button
                                                variant="outline"
                                                icon={<Github size={18} />}
                                                onClick={() => window.open(project.repo, '_blank')}
                                            >
                                                Voir le code source
                                            </Button>
                                        )}
                                        {!hasLiveLink && !hasRepo && (
                                            <div className="px-6 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                                <span className="text-yellow-400 text-sm font-medium flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                                    Projet en cours de développement
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
