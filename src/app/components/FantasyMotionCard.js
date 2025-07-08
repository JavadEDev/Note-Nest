'use client'
import { motion } from 'framer-motion';

export default function FantasyMotionCard({
    children,
    className = '',
    initial = { opacity: 0, scale: 0.2, y: 60 },
    animate = { opacity: 1, scale: 1, y: 0 },
    transition = { duration: 0.8, ease: 'easeOut' },
    ...props
}) {
    return (
        <motion.div
            className={className}
            initial={initial}
            animate={animate}
            transition={transition}
            {...props}
        >
            {children}
        </motion.div>
    );
} 