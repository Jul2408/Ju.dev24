'use client';

import { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Projets', href: '#projects' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Detect active section based on scroll position
            const sections = navItems.map(item => item.href.substring(1));
            let currentSection = 'hero';

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Section is considered active if it's in the top half of viewport
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = sectionId;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
                }`}
        >
            <Container className="flex items-center justify-between h-20">
                {/* Logo */}
                <Logo size="md" />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <button
                                key={link.label}
                                onClick={() => scrollToSection(link.href)}
                                className={`text-sm font-medium transition-all duration-300 relative ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                                    }`}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-foreground p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </Container>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-4">
                            {navItems.map((link) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <button
                                        key={link.label}
                                        onClick={() => scrollToSection(link.href)}
                                        className={`text-lg font-medium transition-colors text-left ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
