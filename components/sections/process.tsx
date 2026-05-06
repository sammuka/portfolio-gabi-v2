'use client';

import { useCallback, useState } from 'react';
import { MonoTag } from '@/components/primitives/mono-tag';
import { ScrollScrub } from '@/components/motion/scroll-scrub';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { getPortfolioData } from '@/content/get-portfolio-data';

/**
 * Process — Passo 18.
 *
 * Seção `#process`: cinco etapas do processo de design. No desktop, o track
 * horizontal é pinado via `ScrollScrub` (GSAP ScrollTrigger) e recebe um
 * `translateX` proporcional ao progress (0 → -80%). Um filete azul no topo
 * da seção acompanha o mesmo progress. No mobile (`md:below`) e em
 * `prefers-reduced-motion`, a seção renderiza como uma timeline vertical
 * simples, sem pin nem scrub.
 *
 * Skills: pin-sections, scrolltrigger-scrub, parallax-data-speed.
 */
export interface ProcessProps {
  locale: 'pt' | 'en';
}

const COPY = {
  pt: {
    eyebrow: 'PROCESS',
    chip: 'PROCESS',
    title: 'Cinco etapas. Uma mesma bússola.',
    subtitle:
      'Role para percorrer horizontalmente cada etapa. Em telas menores, a timeline se apresenta vertical.',
    stepLabel: 'ETAPA',
  },
  en: {
    eyebrow: 'PROCESS',
    chip: 'PROCESS',
    title: 'Five steps. One compass.',
    subtitle:
      'Scroll to move horizontally through each step. On smaller screens, the timeline becomes vertical.',
    stepLabel: 'STEP',
  },
} as const;

export function Process({ locale }: ProcessProps) {
  const copy = COPY[locale];
  const data = getPortfolioData(locale);
  const steps = data.process;
  const total = steps.length;
  const totalLabel = String(total).padStart(2, '0');

  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const handleUpdate = useCallback((p: number) => {
    setProgress(p);
  }, []);

  // Track moves from 0 to -80% as progress goes 0 -> 1.
  const translatePercent = -80 * progress;

  // Vertical timeline — mobile e reduced-motion.
  const VerticalTimeline = (
    <ol className="flex flex-col">
      {steps.map((step, i) => {
        const chipIndex = String(i + 1).padStart(2, '0');
        return (
          <li
            key={step.index}
            className="relative border-t border-[var(--hairline-strong)] py-10 first:border-t-0 first:pt-0"
          >
            <div className="mb-4">
              <MonoTag
                index={chipIndex}
                label={`${copy.chip} · ${chipIndex}/${totalLabel}`}
                tone="accent"
              />
            </div>
            <div className="grid grid-cols-[auto_1fr] items-start gap-6">
              <span
                aria-hidden="true"
                className="display-xxl font-[family-name:var(--font-display)] text-[var(--accent)]"
                style={{ lineHeight: 0.85 }}
              >
                {step.index}
              </span>
              <div className="flex flex-col gap-3 pt-2">
                <h3 className="display-md text-[var(--fg)]">{step.title}</h3>
                <p className="body-base text-[var(--fg-soft)]">{step.description}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );

  return (
    <section
      id="process"
      className="relative"
      aria-labelledby="process-title"
    >
      {/* Filete azul de progresso — topo da seção */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[2px]"
      >
        <div
          className="h-full bg-[var(--accent)] origin-left"
          style={{
            width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
            transition: reduced ? 'none' : 'width 120ms linear',
          }}
        />
      </div>

      {/* Header fixo acima do track */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-24 pb-10 md:pt-32 lg:px-10">
        <MonoTag index="005" label={copy.eyebrow} tone="accent" />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2
            id="process-title"
            className="display-lg max-w-[28ch] text-[var(--fg)]"
          >
            {copy.title}
          </h2>
          <p className="body-base max-w-sm text-[var(--fg-soft)]">{copy.subtitle}</p>
        </div>
      </div>

      {/* Mobile / reduced-motion: vertical sem pin */}
      <div className={reduced ? 'px-6 pb-24 lg:px-10' : 'px-6 pb-24 md:hidden lg:px-10'}>
        {VerticalTimeline}
      </div>

      {/* Desktop: pin horizontal scrubado */}
      {!reduced && (
        <div className="hidden md:block">
          <ScrollScrub
            pin
            start="top top"
            end="+=3000"
            scrub={1}
            onUpdate={handleUpdate}
          >
            <div className="relative h-screen w-full overflow-hidden">
              <div
                className="flex h-screen items-center gap-8 pl-[8vw] pr-[8vw] will-change-transform"
                style={{
                  transform: `translate3d(${translatePercent}%, 0, 0)`,
                }}
              >
                {steps.map((step, i) => {
                  const chipIndex = String(i + 1).padStart(2, '0');
                  return (
                    <article
                      key={step.index}
                      className="flex min-w-[70vw] shrink-0 flex-col justify-between gap-10 rounded-[var(--radius-lg)] border border-[var(--hairline-strong)] bg-[var(--surface-2)] p-10 md:min-w-[50vw] md:p-14"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <MonoTag
                          index={chipIndex}
                          label={`${copy.chip} · ${chipIndex}/${totalLabel}`}
                          tone="accent"
                        />
                        <span className="mono-meta">
                          {copy.stepLabel} {chipIndex}
                        </span>
                      </div>

                      <div className="grid grid-cols-[auto_1fr] items-end gap-8">
                        <span
                          aria-hidden="true"
                          className="display-xxl font-[family-name:var(--font-display)] text-[var(--accent)]"
                          style={{ lineHeight: 0.85 }}
                        >
                          {step.index}
                        </span>
                        <div className="flex flex-col gap-4 pb-2">
                          <h3 className="display-md text-[var(--fg)]">{step.title}</h3>
                          <p className="body-base text-[var(--fg-soft)]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </ScrollScrub>
        </div>
      )}
    </section>
  );
}

export default Process;
