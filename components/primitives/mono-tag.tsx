import type { CSSProperties } from 'react';

/**
 * MonoTag — tag mono-espaçada padronizada no formato `[ 001 — BIO_DATA ]`.
 *
 * Uso:
 * ```tsx
 * <MonoTag index="001" label="BIO_DATA" />
 * <MonoTag index="004" label="CURRENT" tone="accent" />
 * ```
 *
 * Visual: 10px mono, uppercase, letter-spacing 0.22em (classe `.mono-meta`).
 * Por default herda `var(--fg-mute)`; com `tone="accent"` vira `var(--accent)`.
 *
 * Server component — puramente decorativo/estático.
 */
export interface MonoTagProps {
  /** Índice numérico (ex.: "001"). */
  index: string;
  /** Rótulo da tag (ex.: "BIO_DATA"). Será exibido em uppercase via CSS. */
  label: string;
  /** Cor da tag. `mute` (default) usa `--fg-mute`; `accent` usa `--accent`. */
  tone?: 'mute' | 'accent';
  /** Classes Tailwind extras. */
  className?: string;
  /** Estilo inline adicional — evite uso salvo casos decorativos. */
  style?: CSSProperties;
}

export function MonoTag({
  index,
  label,
  tone = 'mute',
  className,
  style,
}: MonoTagProps) {
  const toneClass = tone === 'accent' ? 'text-accent' : 'text-fg-mute';

  return (
    <span
      className={['mono-meta', 'inline-block', toneClass, className]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      [ {index} — {label} ]
    </span>
  );
}

export default MonoTag;
