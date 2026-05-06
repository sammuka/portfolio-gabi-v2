"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Boot Intro — Seção 00 (Cold Archive V2)
 *
 * Preloader full-screen carbono com:
 *  - Monograma "GG" desenhando-se via SVG stroke-dashoffset (azul royal).
 *  - Contador mono `(000) → (100)` em azul.
 *  - Duração ~1.4s (safety net 2.5s).
 *  - Skip via ESC / Enter / Space / clique no overlay.
 *  - Flag em sessionStorage — não aparece 2x na mesma sessão.
 *  - Kill-switch reduced-motion: retorna null e marca a flag.
 */

const STORAGE_KEY = "boot-done";
const DURATION_MS = 1400;
const SAFETY_MS = 2500;
const FADE_OUT_MS = 260;

// Path length aproximado do monograma — ver <style> inline.
// Cada "G" tem ~520 de perímetro estimado no viewBox 200x120.

export default function BootIntro() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  const dismiss = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false);
    try {
      document.body.style.overflow = "";
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop — SSR / privacy modes */
    }
  }, []);

  // Monta no client. SSR-safe: sessionStorage só é acessado dentro deste effect.
  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    let already = false;
    try {
      already = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* noop */
    }

    if (already) {
      doneRef.current = true;
      return;
    }

    if (reduced) {
      // Kill-switch reduced-motion: marca a flag e não renderiza o overlay.
      doneRef.current = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* noop */
      }
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();

    // Contador via setInterval (robusto contra throttling de rAF em tab bg).
    const tick = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / DURATION_MS);
      setProgress(p);
      if (p >= 1) {
        window.clearInterval(tick);
        window.setTimeout(() => dismiss(), FADE_OUT_MS);
      }
    }, 32);

    // Safety net — nunca trava mais que SAFETY_MS.
    const safety = window.setTimeout(() => dismiss(), SAFETY_MS);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dismiss();
      }
    };

    const onVisible = () => {
      if (
        document.visibilityState === "visible" &&
        performance.now() - start >= DURATION_MS
      ) {
        dismiss();
      }
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(safety);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisible);
      document.body.style.overflow = "";
    };
  }, [reduced, dismiss]);

  if (!mounted) return null;

  const pct = Math.round(progress * 100);
  const pctLabel = `(${String(pct).padStart(3, "0")})`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="boot-intro"
          type="button"
          onClick={dismiss}
          aria-label="Pular intro de carregamento"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] text-left cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* ========== Monograma GG (SVG stroke-draw) ========== */}
          <div
            aria-hidden
            className="relative flex items-center justify-center"
            style={{
              filter: "drop-shadow(0 0 32px var(--accent-soft))",
            }}
          >
            <svg
              viewBox="0 0 220 120"
              width="min(42vw, 320px)"
              height="auto"
              fill="none"
              stroke="var(--accent)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block"
            >
              {/* G #1 — esquerda */}
              <path
                className="gg-path gg-path-1"
                d="M 80 20 Q 55 20 40 35 Q 25 50 25 65 Q 25 85 45 95 Q 65 105 85 95 Q 95 88 95 70 L 95 62 L 70 62"
              />
              {/* G #2 — direita, levemente sobreposto */}
              <path
                className="gg-path gg-path-2"
                d="M 175 20 Q 150 20 135 35 Q 120 50 120 65 Q 120 85 140 95 Q 160 105 180 95 Q 190 88 190 70 L 190 62 L 165 62"
              />
            </svg>
          </div>

          {/* ========== Contador + label ========== */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <div
              className="display-md font-mono tabular-nums text-[var(--accent)]"
              aria-live="polite"
            >
              {pctLabel}
            </div>
            <div className="mono-meta">Boot · Cold Archive v2</div>
          </div>

          {/* ========== Hint de skip (canto inferior) ========== */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center">
            <span className="mono-meta text-[var(--fg-mute)]">
              [ ESC to skip ]
            </span>
          </div>

          {/* ========== Stroke-draw animation ========== */}
          <style>{`
            .gg-path {
              /* comprimento estimado ≈ 320 por path; margem de segurança */
              stroke-dasharray: 360;
              stroke-dashoffset: 360;
              animation: gg-draw 1.2s var(--ease-soft) forwards;
            }
            .gg-path-2 {
              animation-delay: 0.15s;
            }
            @keyframes gg-draw {
              to { stroke-dashoffset: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
              .gg-path {
                animation: none;
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
