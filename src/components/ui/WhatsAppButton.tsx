'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false);
    const phoneNumber = '237698961910'; // Cameroon country code + your number

    const handleClick = () => {
        const message = encodeURIComponent("Bonjour Jul, je vous contacte depuis votre portfolio !");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <motion.button
                onClick={handleClick}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
                aria-label="Contactez-moi sur WhatsApp"
            >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

                {/* Main button */}
                <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-shadow">
                    {/* WhatsApp Logo SVG */}
                    <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-9 h-9"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.2386 30.3854 13.4494 31 15.8 31H16ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4575 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4575 4.15385 17C4.15385 19.5423 4.9308 21.8993 6.24716 23.8429L5.23077 27.7692L9.35897 26.8141C11.2179 27.9987 13.5286 28.8462 16 28.8462Z"
                            fill="white"
                        />
                        <path
                            d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
                            fill="white"
                        />
                    </svg>

                    {/* Pulse animation */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#25D366]"
                        animate={{
                            scale: [1, 1.4, 1.4],
                            opacity: [0.7, 0, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />
                </div>

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : 10
                    }}
                    className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                >
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl border border-green-500/20">
                        <p className="text-sm font-medium">Discutons sur WhatsApp !</p>
                    </div>
                    {/* Arrow */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-green-500/20" />
                </motion.div>
            </motion.button>
        </motion.div>
    );
}
