"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedContainer({ children, path }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
