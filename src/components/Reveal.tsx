import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Animation delay in seconds. */
  delay?: number;
  /** Vertical offset to animate from, in px. */
  y?: number;
  /** Optional className for the wrapper. */
  className?: string;
}

/**
 * Fade-and-rise scroll reveal. Honors `prefers-reduced-motion` by rendering
 * children statically (no transform/opacity animation) when the user has
 * requested reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
