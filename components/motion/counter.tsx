'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, registerGsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export interface CounterProps {
  /**
   * Starting value. Defaults to `0`.
   */
  from?: number;
  /**
   * Target value the counter animates to when scrolled into view.
   */
  to: number;
  /**
   * Optional suffix appended to the rendered number (e.g. `"+"`, `"%"`).
   */
  suffix?: string;
  /**
   * Optional prefix prepended to the rendered number (e.g. `"$"`).
   */
  prefix?: string;
  /**
   * Tween duration in seconds. Defaults to `1.2`.
   */
  duration?: number;
  className?: string;
}

/**
 * Animated numeric counter that runs once when its container enters the
 * viewport. Uses GSAP ScrollTrigger for consistency with `ScrollScrub`.
 * Honors `prefers-reduced-motion` by rendering the final value immediately.
 */
export function Counter({
  from = 0,
  to,
  suffix = '',
  prefix = '',
  duration = 1.2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const [value, setValue] = useState<number>(reduced ? to : from);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }

    const el = ref.current;
    if (!el) return;

    registerGsap();

    const state = { n: from };
    setValue(from);

    const ctx = gsap.context(() => {
      const tween = gsap.to(state, {
        n: to,
        duration,
        ease: 'power2.out',
        paused: true,
        onUpdate: () => {
          setValue(Math.round(state.n));
        },
      });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          tween.play();
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [from, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default Counter;
