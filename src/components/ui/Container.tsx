import clsx from 'clsx';
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={clsx("max-w-7xl mx-auto px-6 sm:px-8", className)}>
            {children}
        </div>
    );
}
