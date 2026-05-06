import type { CSSProperties } from 'react';

/**
 * DotGrid — fundo SVG decorativo com padrão de pontos espaçados.
 *
 * Uso (consumidor posiciona via parent `relative`):
 * ```tsx
 * <section className="relative">
 *   <DotGrid />
 *   ...conteúdo...
 * </section>
 * ```
 *
 * Cor dos pontos herdada de `var(--fg-mute)`. O consumidor controla opacidade
 * via prop `opacity` ou via classe Tailwind em `className`.
 *
 * Server component — puramente decorativo, `aria-hidden` + `pointer-events-none`.
 */
export interface DotGridProps {
  /** Espaçamento entre pontos (px). Default: 32. */
  size?: number;
  /** Raio do ponto (px). Default: 1. */
  dotSize?: number;
  /** Opacidade global (0–1). Default: 0.04. */
  opacity?: number;
  /** Classes extras (posicionamento, z-index, máscara, etc). */
  className?: string;
  /** Estilo inline adicional. */
  style?: CSSProperties;
}

export function DotGrid({
  size = 32,
  dotSize = 1,
  opacity = 0.04,
  className,
  style,
}: DotGridProps) {
  const patternId = `dot-grid-pattern-${size}-${dotSize}`;

  return (
    <div
      aria-hidden
      className={[
        'pointer-events-none',
        'absolute inset-0',
        'text-fg-mute',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ opacity, ...style }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        focusable="false"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSize}
              cy={dotSize}
              r={dotSize}
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

export default DotGrid;
