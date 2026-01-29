import { projects } from '@/lib/data';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, ExternalLink, Github, Layers, Trophy, Cpu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Header */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

                <Container>
                    <div className="mb-8">
                        <Link href="/#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-6">
                            <ArrowLeft size={16} /> Retour aux projets
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">{project.title}</h1>
                        <p className="text-xl text-gray-400 max-w-2xl">{project.subtitle}</p>
                    </div>

                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <Button size="lg" icon={<ExternalLink size={18} />} onClick={() => { }}>
                            Voir le site live
                        </Button>
                        <Button variant="outline" size="lg" icon={<Github size={18} />} onClick={() => { }}>
                            Code source
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Details Grid */}
            <section className="py-16">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-2 flex flex-col gap-12">
                            <div>
                                <h3 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2">
                                    <Layers className="text-primary" size={24} /> Contexte
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    {project.context} {project.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2">
                                    <Cpu className="text-primary" size={24} /> Solution Technique
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    {project.solution}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2">
                                    <Trophy className="text-primary" size={24} /> Résultats
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    {project.results}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 sticky top-24">
                                <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Informations</h4>

                                <div className="space-y-6">
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-1">Client</span>
                                        <span className="font-medium text-white">{project.client}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-1">Année</span>
                                        <span className="font-medium text-white">{project.year}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-1">Technologies</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>

            {/* Gallery */}
            <section className="py-16 bg-secondary/20">
                <Container>
                    <h3 className="text-2xl font-bold font-heading mb-8">Galerie</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.screenshots.map((shot, index) => (
                            <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-white/5">
                                <Image src={shot} alt="Screenshot" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <Footer />
        </main>
    );
}
