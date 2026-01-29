'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export default function Button({
    children,
    className,
    variant = 'primary',
    size = 'md',
    icon,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
        primary: "bg-primary text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-transparent",
        secondary: "bg-white text-black hover:bg-gray-100 border border-transparent",
        outline: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "text-sm px-4 py-2 gap-2",
        md: "text-sm px-6 py-3 gap-2.5",
        lg: "text-base px-8 py-4 gap-3",
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
            {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
        </motion.button>
    );
}
