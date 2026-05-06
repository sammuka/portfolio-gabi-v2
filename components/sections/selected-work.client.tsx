"use client";

import { motion, type Variants } from "motion/react";
import { Chip } from "@/components/primitives/chip";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface FeaturedWorkCardProps {
  title: string;
  summary: string;
  tags: string[];
  primaryUrl: string;
  primaryLabel: string;
  referenceUrl?: string;
  referenceLabel?: string;
  publishedChip: string;
  collabChip: string;
}

/**
 * FeaturedWorkCard — client wrapper do Slot 1 (publishedWork).
 *
 * Animação:
 *  - clip-path reveal `inset(100% 0 0 0) -> inset(0)` on viewport enter.
 *  - stagger interno via delayChildren.
 *  - Hover: outline `--accent` + lift (-4px) + sombra sutil.
 *
 * Respeita `prefers-reduced-motion` devolvendo o card estático.
 */
export function FeaturedWorkCard({
  title,
  summary,
  tags,
  primaryUrl,
  primaryLabel,
  referenceUrl,
  referenceLabel,
  publishedChip,
  collabChip,
}: FeaturedWorkCardProps) {
  const reduced = useReducedMotion();

  const container: Variants = reduced
    ? {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
      }
    : {
        hidden: {
          clipPath: "inset(100% 0 0 0)",
          opacity: 0,
        },
        show: {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delayChildren: 0.2,
            staggerChildren: 0.08,
          },
        },
      };

  const child: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.article
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -4,
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            }
      }
      className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border p-6"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--hairline-strong)",
        outlineOffset: "-1px",
        transition:
          "outline-color 240ms ease, box-shadow 240ms ease, border-color 240ms ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.outline =
          "1px solid var(--accent)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.outline = "1px solid transparent";
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--hairline-strong)";
      }}
    >
      {/* Topo — chips */}
      <motion.div variants={child} className="flex flex-wrap items-center gap-2">
        <Chip tone="accent">{publishedChip}</Chip>
        <Chip tone="mute">{collabChip}</Chip>
      </motion.div>

      {/* Meio — título + summary */}
      <motion.div variants={child} className="flex flex-col gap-4">
        <h3
          className="display-sm font-display"
          style={{ color: "var(--fg)" }}
        >
          {title}
        </h3>
        <p className="body-base" style={{ color: "var(--fg-soft)" }}>
          {summary}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((t) => (
              <span
                key={t}
                className="mono-meta rounded-full border px-2.5 py-1"
                style={{
                  borderColor: "var(--hairline-strong)",
                  color: "var(--fg-soft)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Rodapé — CTAs */}
      <motion.div variants={child} className="flex flex-col gap-2">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mono-meta inline-flex items-center gap-2 underline-offset-4 hover:underline"
          style={{ color: "var(--accent)" }}
        >
          {primaryLabel}
          <span aria-hidden>&#8599;</span>
        </a>
        {referenceUrl && referenceLabel && (
          <a
            href={referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-meta inline-flex items-center gap-2 underline-offset-4 hover:underline"
            style={{ color: "var(--fg-mute)" }}
          >
            {referenceLabel}
            <span aria-hidden>&#8599;</span>
          </a>
        )}
      </motion.div>
    </motion.article>
  );
}

export default FeaturedWorkCard;
