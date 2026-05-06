'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollProps {
  children: ReactNode;
}

function LenisScrollTriggerBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

/**
 * SmoothScroll — wrapper Lenis (duration 1.1, lerp 0.085).
 * LenisScrollTriggerBridge sincroniza cada tick do Lenis com o GSAP ScrollTrigger,
 * permitindo que o pin horizontal do Process funcione com smooth scroll ativo.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Desabilita o tick automático do GSAP para o ScrollTrigger não duplicar eventos.
    // O Lenis vai chamar ScrollTrigger.update() a cada frame via useLenis.
    ScrollTrigger.normalizeScroll(false);
  }, [reduced]);

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
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
