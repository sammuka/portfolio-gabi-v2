'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * SmoothScroll — wrapper Lenis (duration 1.1, lerp 0.085).
 * Kill-switch: quando `prefers-reduced-motion: reduce`, desliga o Lenis
 * e devolve o scroll nativo do browser.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        lerp: 0.085,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
