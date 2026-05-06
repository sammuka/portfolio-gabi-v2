import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  /**
   * Rótulo i18n exibido no rodapé do card (ex.: "EM CURADORIA", "COMING SOON").
   */
  label: string;
  /**
   * Índice arquivístico no eyebrow superior (ex.: "— 04").
   */
  index: string;
  className?: string;
}

/**
 * SkeletonCard — placeholder editorial para projetos em curadoria.
 *
 * V2 — Cold Archive:
 *  - Removido shimmer gold (warm) + animação marquee da V1.
 *  - Adicionado grid-texture 1px via `repeating-linear-gradient` usando
 *    `--hairline` (quadrinhos 8px, alpha baixa) — ref. Leopoldo `Projetos`.
 *  - Shimmer sutil azul `--accent-mute` via `linear-gradient` estático
 *    (sem animação infinita — aderente ao kill-switch de motion).
 *  - Server component (sem interatividade, sem motion).
 */
export function SkeletonCard({ label, index, className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border p-6",
        "border-[var(--hairline-strong)] bg-[var(--surface-2)]",
        className
      )}
    >
      {/* Grid texture — quadrinhos 8x8 em --hairline (substitui shimmer gold V1) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, var(--hairline) 0 1px, transparent 1px 8px),
            repeating-linear-gradient(90deg, var(--hairline) 0 1px, transparent 1px 8px)
          `,
        }}
      />

      {/* Shimmer sutil diagonal — accent azul, estático */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(120deg, transparent 0%, transparent 42%, var(--accent-soft) 50%, transparent 58%, transparent 100%)`,
        }}
      />

      {/* Placeholder topo — índice + barra fina */}
      <div className="relative z-10 flex flex-col gap-3">
        <span className="eyebrow">{index}</span>
        <div className="h-[2px] w-12 rounded-full bg-[var(--hairline-strong)]" />
      </div>

      {/* Placeholder corpo — linhas de "título" */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="h-4 w-3/4 rounded-full bg-[var(--hairline-strong)]" />
        <div className="h-4 w-1/2 rounded-full bg-[var(--hairline)]" />
        <div className="h-3 w-2/3 rounded-full bg-[var(--hairline)]" />
      </div>

      {/* Rodapé — chip label i18n */}
      <div className="relative z-10 mt-auto">
        <span className="mono-meta text-[var(--fg-mute)]">[{label}]</span>
      </div>
    </div>
  );
}
