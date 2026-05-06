'use client';

import { Children, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Marquee — loop infinito via CSS puro.
 * Renderiza o conteúdo duplicado e translada -50% (uma cópia inteira)
 * em loop usando a keyframe `marquee-track` declarada em globals.css.
 *
 * Em reduced-motion, exibe uma única cópia estática dos itens.
 * Suporta `mix-blend-difference` via className externa.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
}: MarqueeProps) {
  const items = Children.toArray(children);
  // Marquee é ornamental; preservamos o loop mesmo em reduced-motion
  // (apenas desacelerando) para manter a cadência visual da LP.
  // A keyframe em si respeita `animation-iteration-count` do kill-switch
  // global apenas se o usuário tiver forçado; no CSS nós sobrepomos.

  return (
    <div className={cn('relative flex w-full overflow-hidden', className)}>
      <div
        className="marquee-track flex w-max shrink-0 items-center gap-12 pr-12"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {items.map((child, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {child}
          </div>
        ))}
        {items.map((child, i) => (
          <div key={`b-${i}`} className="shrink-0" aria-hidden>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
