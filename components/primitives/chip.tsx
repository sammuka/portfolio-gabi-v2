import type { ReactNode } from 'react';

/**
 * Chip — pílula pequena para rotular verticais/categorias (ex.: "SaaS B2B & AI",
 * "Design System", "EM CURADORIA").
 *
 * Uso:
 * ```tsx
 * <Chip tone="accent">SaaS B2B & AI</Chip>
 * <Chip tone="mute">Design System</Chip>
 * <Chip tone="warning">EM CURADORIA</Chip>
 * ```
 *
 * Server component — puramente estático.
 */
export interface ChipProps {
  children: ReactNode;
  /**
   * Tom do chip:
   * - `accent` → wash azul (`--accent-soft` / `--accent`).
   * - `mute` (default) → transparente com texto em `--fg-mute`.
   * - `warning` → transparente com border dashed em `--fg-mute` (uso: "EM CURADORIA").
   */
  tone?: 'accent' | 'mute' | 'warning' | 'inverted';
  className?: string;
}

const toneClasses: Record<NonNullable<ChipProps['tone']>, string> = {
  accent: 'bg-accent-soft text-accent border-hairline-strong',
  mute: 'bg-transparent text-fg-mute border-hairline-strong',
  warning: 'bg-transparent text-fg-mute border-fg-mute border-dashed',
  // Para uso sobre bg accent (ex.: seção Contact)
  inverted: 'bg-bg text-accent border-bg',
};

export function Chip({ children, tone = 'mute', className }: ChipProps) {
  return (
    <span
      className={[
        'mono-meta',
        'inline-flex items-center',
        'px-3 py-1',
        'rounded-sm',
        'border border-solid',
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}

export default Chip;
