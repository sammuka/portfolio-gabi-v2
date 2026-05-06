'use client';

import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span' | 'li';
  once?: boolean;
}

/**
 * Reveal — fade + subtle blur-in + translate-Y on scroll.
 * Respeita `prefers-reduced-motion` devolvendo children sem motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: 'blur(6px)' },
    show: (d: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
      custom={delay}
      variants={variants}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
