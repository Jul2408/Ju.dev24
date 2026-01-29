'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
    const sizes = {
        sm: { image: 32, text: 'text-lg' },
        md: { image: 40, text: 'text-xl' },
        lg: { image: 48, text: 'text-2xl' }
    };

    const currentSize = sizes[size];

    return (
        <a href="/" className="flex items-center gap-3 group">
            {/* Photo Profile with Glow Effect */}
            <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
            >
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
                    style={{
                        width: currentSize.image + 8,
                        height: currentSize.image + 8,
                        left: -4,
                        top: -4
                    }}
                />
                <div
                    className="relative rounded-full border-2 border-primary/30 group-hover:border-primary transition-colors overflow-hidden"
                    style={{ width: currentSize.image, height: currentSize.image }}
                >
                    <Image
                        src="/images/profile.jpeg"
                        alt="Jul"
                        fill
                        className="object-cover"
                    />
                </div>
            </motion.div>

            {/* Text Logo */}
            {showText && (
                <div className="flex items-center">
                    <span className={`${currentSize.text} font-bold font-heading tracking-tighter text-white`}>
                        Jul
                    </span>
                    <span className={`${currentSize.text} font-bold font-heading tracking-tighter text-primary`}>
                        .
                    </span>
                    <span className={`${currentSize.text} font-light font-heading tracking-tight text-gray-400 ml-1`}>
                        dev
                    </span>
                </div>
            )}
        </a>
    );
}
