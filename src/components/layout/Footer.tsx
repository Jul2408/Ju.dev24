'use client';

import Container from '../ui/Container';
import Logo from '../ui/Logo';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black border-t border-white/5 pt-20 pb-10 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/5 pb-12">

                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="mb-6">
                            <Logo size="lg" />
                        </div>
                        <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                            Création d'expériences numériques immersives et performantes.
                            Transformons vos idées en réalité digitale d'exception.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/Jul2408" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/laurent-mbeleg-663038387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://x.com/MbelegLaurent" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110">
                                {/* X Logo SVG (Simple geometric representation) */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="mailto:mbeleglaurent0@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">À propos</a></li>
                            <li><a href="#projects" className="text-gray-400 hover:text-primary transition-colors">Projets</a></li>
                            <li><a href="#skills" className="text-gray-400 hover:text-primary transition-colors">Compétences</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Legal / Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Informations</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Mentions Légales</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Politique de confidentialité</a></li>
                            <li><span className="text-gray-500">Basé à Douala, Cameroun</span></li>
                            <li className="pt-2">
                                <div className="flex items-center gap-2 text-green-400 text-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Disponible pour freelance
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-600">
                        © {currentYear} Jul. Conçu et développé avec passion.
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Retour en haut
                        <span className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                            <ArrowUp size={16} />
                        </span>
                    </button>
                </div>
            </Container>
        </footer>
    );
}
