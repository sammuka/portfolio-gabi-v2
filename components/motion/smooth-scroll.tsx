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
 * SmoothScroll — wrapper Lenis.
 *
 * ReactLenis sempre monta (estrutura DOM estável entre SSR e client),
 * evitando o removeChild de reconciliação.
 * Quando prefers-reduced-motion está ativo, o Lenis é desabilitado via
 * `options.autoRaf = false` e não emite nenhum tick — scroll volta ao
 * comportamento nativo do browser.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    ScrollTrigger.normalizeScroll(false);
  }, [reduced]);

  return (
    <ReactLenis
      root
      options={
        reduced
          ? { autoRaf: false }
          : {
              duration: 1.1,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              smoothWheel: true,
              lerp: 0.085,
            }
      }
    >
      {!reduced && <LenisScrollTriggerBridge />}
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
