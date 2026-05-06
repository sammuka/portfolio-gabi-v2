'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, registerGsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export interface ScrollScrubProps {
  children: ReactNode;
  /**
   * ScrollTrigger `start` value (e.g. `"top bottom"`, `"top top"`).
   * Defaults to `"top bottom"`.
   */
  start?: string;
  /**
   * ScrollTrigger `end` value (e.g. `"bottom top"`, `"+=100%"`).
   * Defaults to `"bottom top"`.
   */
  end?: string;
  /**
   * Scrub behavior. `true` ties progress 1:1 to scroll; a number smooths
   * the scrub over that many seconds. Defaults to `true`.
   */
  scrub?: boolean | number;
  /**
   * Pin the wrapper element while the trigger is active.
   * Defaults to `false`.
   */
  pin?: boolean;
  /**
   * Callback invoked on every scrub tick with the current progress `[0, 1]`.
   */
  onUpdate?: (progress: number) => void;
  className?: string;
}

/**
 * Generic GSAP ScrollTrigger wrapper with scrub support. Registers plugins
 * lazily on the client via `registerGsap()`. Honors `prefers-reduced-motion`:
 * when reduced motion is requested, `pin` is still applied but scrub is
 * disabled and the final state is delivered immediately via `onUpdate(1)`.
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
      // Emit the final state once so consumers can settle their UI.
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
