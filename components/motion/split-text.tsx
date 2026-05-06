'use client';

import SplitType from 'split-type';
import { useEffect, useRef, type CSSProperties } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: 'char' | 'word';
  style?: CSSProperties;
  once?: boolean;
}

/**
 * SplitText — quebra o texto em palavras ou chars via `split-type` e aplica
 * uma reveal animation (y: 110% → 0 + opacity) com stagger por item.
 *
 * Substitui a versão V1 baseada em Motion/React tokenization por uma baseada
 * em `split-type`, por ser o caminho canônico (evita dependência do SplitText
 * premium da GSAP). A animação em si usa CSS transitions para manter o DOM
 * leve.
 *
 * API compatível com V1: `text`, `className`, `delay`, `stagger`, `by`,
 * `style`, `once`.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  by = 'char',
  style,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const playedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    if (reduced) {
      // sem motion: garante que o texto permanece em estado final visível
      ref.current.textContent = text;
      ref.current.style.opacity = '1';
      return;
    }

    // Garante o texto atual antes do split
    ref.current.textContent = text;

    const split = new SplitType(ref.current, {
      types: by === 'char' ? 'chars' : 'words',
      tagName: 'span',
    });

    const items =
      (by === 'char' ? split.chars : split.words) ?? [];

    items.forEach((el) => {
      const node = el as HTMLElement;
      node.style.display = 'inline-block';
      node.style.willChange = 'transform, opacity';
      node.style.transform = 'translateY(110%)';
      node.style.opacity = '0';
      node.style.transition =
        'transform 0.8s var(--ease-soft, cubic-bezier(0.22,1,0.36,1)), opacity 0.8s var(--ease-soft, cubic-bezier(0.22,1,0.36,1))';
    });

    const play = () => {
      if (playedRef.current && once) return;
      playedRef.current = true;
      items.forEach((el, i) => {
        const node = el as HTMLElement;
        const d = delay + i * stagger;
        node.style.transitionDelay = `${d}s`;
        requestAnimationFrame(() => {
          node.style.transform = 'translateY(0)';
          node.style.opacity = '1';
        });
      });
    };

    const reset = () => {
      if (once) return;
      items.forEach((el) => {
        const node = el as HTMLElement;
        node.style.transitionDelay = '0s';
        node.style.transform = 'translateY(110%)';
        node.style.opacity = '0';
      });
      playedRef.current = false;
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            play();
          } else {
            reset();
          }
        });
      },
      { rootMargin: '-20%' },
    );

    io.observe(ref.current);

    return () => {
      io.disconnect();
      split.revert();
    };
  }, [text, by, stagger, delay, once, reduced]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      aria-label={text}
    >
      {text}
    </span>
  );
}

export default SplitText;
