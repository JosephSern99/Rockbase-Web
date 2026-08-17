"use client";

import { motion, type Variants } from "motion/react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — each step adds 80ms of delay. */
  index?: number;
}

/**
 * Fades + slides content in once it scrolls into view. `viewport={{ once:
 * true }}` means it never re-triggers on scroll-back — a distraction, not a
 * feature, on a marketing page. Respects prefers-reduced-motion globally via
 * the MotionConfig in app/providers.tsx.
 */
export function Reveal({ children, className, index = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
