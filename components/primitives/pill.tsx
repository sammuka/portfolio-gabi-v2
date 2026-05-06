import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /**
   * Exibe um ponto animado (ping) à esquerda — usado para indicar "live"/status ativo.
   * V2: usa `var(--accent)` (azul royal) em vez do accent-soft warm da V1.
   */
  dot?: boolean;
}

/**
 * Pill — badge inline com borda hairline e dot animado opcional.
 *
 * API idêntica à V1 para drop-in replacement. Cold Archive:
 *  - dot agora é azul (`--accent`) em vez de warm.
 *  - background `--bg` com alpha baixo + backdrop-blur.
 *  - tipografia: classe canônica `.mono-meta` (uppercase + tracking).
 */
export function Pill({ children, dot = false, className, ...rest }: PillProps) {
  return (
    <span
      {...rest}
      className={cn(
        "mono-meta inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm",
        "border-[var(--hairline-strong)] bg-[color-mix(in_oklab,var(--bg),transparent_40%)] text-[var(--fg)]",
        className
      )}
    >
      {dot && (
        <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        </span>
      )}
      {children}
    </span>
  );
}
