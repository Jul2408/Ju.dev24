import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
            <h2 className="text-4xl font-bold mb-4">404 - Page Non Trouvée</h2>
            <p className="text-gray-400 mb-8">La page que vous recherchez n'existe pas.</p>
            <Link href="/" className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
                Retour à l'accueil
            </Link>
        </div>
    );
}
