'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

/**
 * AboutPortrait — Passo 17 (client).
 *
 * Retrato circular (clip-path: circle(50%)), B&W via filter,
 * outline sutil em `--accent-mute` e parallax vertical via
 * Motion `useScroll` + `useTransform` (y: -30px → 30px).
 *
 * Kill-switch: se `prefers-reduced-motion`, renderiza sem parallax.
 */
export interface AboutPortraitProps {
  alt: string;
  src?: string;
}

export function AboutPortrait({
  alt,
  src = '/images/gabriella-portrait.jpg',
}: AboutPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[480px]"
    >
      <motion.div
        style={{
          y: reduced ? 0 : y,
          clipPath: 'circle(50% at 50% 50%)',
          filter: 'grayscale(1) contrast(1.1)',
        }}
        className="relative h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          quality={92}
          sizes="(max-width: 768px) 80vw, 40vw"
          className="object-cover"
        />
      </motion.div>

      {/* Outline azul sutil — círculo decorativo em ring accent-mute */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow:
            '0 0 0 2px var(--accent-mute), 0 0 0 6px var(--bg)',
        }}
      />
    </div>
  );
}

export default AboutPortrait;
