'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Chip } from '@/components/primitives/chip';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface CapabilityCardProps {
  token: string;
  title: string;
  description: string;
}

/**
 * CapabilityCard — ficha técnica individual da seção Capabilities (Passo 16).
 *
 * Comportamento:
 * - Default: fundo `surface-2`, borda transparente, descrição oculta (max-height 0).
 * - Hover: fundo vira `accent-soft`, borda `accent-mute`, descrição expande via
 *   `AnimatePresence` (`height: auto` + fade).
 * - Mobile/reduced-motion: descrição sempre visível, sem animação de expand.
 */
export function CapabilityCard({
  token,
  title,
  description,
}: CapabilityCardProps) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const alwaysOpen = reduced;
  const open = alwaysOpen || hovered;

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label={title}
      className={cn(
        'group relative flex h-full min-h-[260px] flex-col justify-between p-8',
        'border border-solid transition-colors duration-500',
        open
          ? 'bg-accent-soft border-accent-mute'
          : 'bg-surface-2 border-transparent'
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <Chip tone="accent">{token}</Chip>
        <span
          aria-hidden
          className={cn(
            'mt-1 h-1.5 w-1.5 rounded-full transition-colors duration-500',
            open ? 'bg-accent' : 'bg-hairline-strong'
          )}
        />
      </header>

      <div className="mt-10 flex flex-col gap-3">
        <h3 className="display-sm text-fg" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>

        {alwaysOpen ? (
          <p className="body-base text-fg-soft">{description}</p>
        ) : (
          <AnimatePresence initial={false}>
            {hovered && (
              <motion.p
                key="desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="body-base overflow-hidden text-fg-soft"
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.article>
  );
}

export default CapabilityCard;
