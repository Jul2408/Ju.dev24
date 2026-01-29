'use client';

import Container from '../ui/Container';
import Button from '../ui/Button';
import { Send, Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormState('success');
            setTimeout(() => setFormState('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 relative">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                            Parlons de votre <br />
                            <span className="text-gradient-primary">prochain projet.</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-md">
                            Vous avez une idée ? Un projet en tête ? Ou simplement envie de dire bonjour ? Je suis toujours à l'écoute.
                        </p>

                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-full text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Email</h3>
                                    <a href="mailto:mbeleglaurent0@gmail.com" className="text-gray-400 hover:text-white transition-colors">mbeleglaurent0@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-full text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Localisation</h3>
                                    <p className="text-gray-400">Douala, Cameroun</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-12">
                            <a href="https://github.com/Jul2408" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-colors"><Github size={20} /></a>
                            <a href="https://www.linkedin.com/in/laurent-mbeleg-663038387?" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                            <a href="https://x.com/MbelegLaurent" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110">
                                {/* X Logo SVG (Simple geometric representation) */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Nom</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Sujet</label>
                                <input
                                    type="text"
                                    id="subject"
                                    required
                                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                    placeholder="Proposition de projet"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                                    placeholder="Dites m'en plus sur votre projet..."
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full mt-2"
                                disabled={formState !== 'idle'}
                            >
                                {formState === 'idle' && (
                                    <>Envoyer le message <Send size={18} /></>
                                )}
                                {formState === 'submitting' && 'Envoi en cours...'}
                                {formState === 'success' && 'Message envoyé !'}
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
}
