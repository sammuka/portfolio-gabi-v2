'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, registerGsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export interface ScrollScrubProps {
  children: ReactNode;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  onUpdate?: (progress: number) => void;
  className?: string;
}

/**
 * Generic GSAP ScrollTrigger wrapper with scrub support.
 * Lenis–ScrollTrigger sync is handled globally in SmoothScroll via useLenis.
 */
export function ScrollScrub({
  children,
  start = 'top bottom',
  end = 'bottom top',
  scrub = true,
  pin = false,
  onUpdate,
  className,
}: ScrollScrubProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    if (reduced) {
      onUpdate?.(1);

      if (!pin) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        pin: true,
        scrub: false,
      });

      return () => {
        trigger.kill();
      };
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start,
        end,
        scrub,
        pin,
        onUpdate: (self) => {
          onUpdate?.(self.progress);
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [start, end, scrub, pin, onUpdate, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default ScrollScrub;
