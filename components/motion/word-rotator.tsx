'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface WordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * WordRotator — cicla entre `words` com crossfade (y: 110% → 0).
 * Reduced-motion: mostra a primeira palavra estática.
 */
export function WordRotator({
  words,
  interval = 2400,
  className,
}: WordRotatorProps) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setI((v) => (v + 1) % words.length),
      interval,
    );
    return () => clearInterval(id);
  }, [words, interval, reduced]);

  const current = words[i] ?? '';

  if (reduced) {
    return <span className={className}>{words[0] ?? ''}</span>;
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        position: 'relative',
        verticalAlign: 'baseline',
      }}
    >
      <span style={{ visibility: 'hidden', pointerEvents: 'none' }}>
        {longest(words)}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            whiteSpace: 'nowrap',
          }}
          initial={{ y: '110%', opacity: 0, skewY: 4 }}
          animate={{ y: 0, opacity: 1, skewY: 0 }}
          exit={{ y: '-110%', opacity: 0, skewY: -4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function longest(arr: string[]): string {
  return arr.reduce((a, b) => (b.length > a.length ? b : a), '');
}

export default WordRotator;
