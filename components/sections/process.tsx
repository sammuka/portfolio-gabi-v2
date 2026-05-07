'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MonoTag } from '@/components/primitives/mono-tag';
import { getPortfolioData } from '@/content/get-portfolio-data';

/**
 * Process — Passo 18.
 *
 * Desktop (≥ md) com motion: sticky + translateX via motion/react useScroll.
 * Substitui o GSAP pin para evitar mutação de DOM que causa removeChild.
 *
 * Desktop (≥ md) com reduced-motion: overflow-x scroll nativo.
 * Mobile (< md): timeline vertical.
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

function StepCards({
  steps,
  copy,
  totalLabel,
}: {
  steps: ReturnType<typeof getPortfolioData>['process'];
  copy: { eyebrow: string; chip: string; title: string; subtitle: string; stepLabel: string };
  totalLabel: string;
}) {
  return (
    <>
      {steps.map((step, i) => {
        const chipIndex = String(i + 1).padStart(2, '0');
        return (
          <article
            key={step.index}
            className="flex w-[320px] shrink-0 flex-col rounded-[var(--radius-lg)] border border-[var(--hairline-strong)] bg-[var(--surface-2)] p-6 lg:w-[360px]"
          >
            {/* row 1: tag + step label */}
            <div className="flex items-center justify-between gap-4">
              <MonoTag
                index={chipIndex}
                label={`${copy.chip} · ${chipIndex}/${totalLabel}`}
                tone="accent"
              />
              <span className="mono-meta shrink-0">
                {copy.stepLabel} {chipIndex}
              </span>
            </div>
            {/* row 2: número — altura fixa 120px, alinhado ao topo */}
            <div className="flex items-start" style={{ height: '120px', paddingTop: '16px' }}>
              <span
                aria-hidden="true"
                className="display-xl font-[family-name:var(--font-display)] text-[var(--accent)]"
                style={{ lineHeight: 1 }}
              >
                {step.index}
              </span>
            </div>
            {/* row 3: título + descrição */}
            <div className="flex flex-col gap-2 border-t border-[var(--hairline)] pt-4 mt-auto">
              <h3 className="display-sm text-[var(--fg)]">{step.title}</h3>
              <p className="body-sm text-[var(--fg-soft)]">{step.description}</p>
            </div>
          </article>
        );
      })}
    </>
  );
}

function ProcessStickyDesktop({
  steps,
  copy,
  totalLabel,
}: {
  steps: ReturnType<typeof getPortfolioData>['process'];
  copy: { eyebrow: string; chip: string; title: string; subtitle: string; stepLabel: string };
  totalLabel: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // 5 cards × 360px + 4 gaps × 24px = 1896px total; container ~1380px visível
  // → precisa mover ~520px para revelar o último card
  const translateX = useTransform(scrollYProgress, [0, 1], ['0px', '-520px']);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    /* outer div sets the total scroll travel; position:relative required by useScroll */
    <div ref={wrapperRef} className="relative" style={{ height: 'calc(100vh + 3000px)' }}>
      {/* sticky panel stays fixed in viewport while user scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* progress bar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[2px]"
        >
          <motion.div
            className="h-full bg-[var(--accent)] origin-left"
            style={{ width: progressWidth }}
          />
        </div>

        {/* header */}
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

        {/* horizontal scrolling track
            - padding-left alinhado ao header (mesmo px-6/lg:px-10 + max-w offset)
            - mask-image para fade nos dois lados (cards "somem" simetricamente)  */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0px, black max(40px, calc((100vw - 1440px) / 2 + 40px)), black calc(100% - max(40px, calc((100vw - 1440px) / 2 + 40px))), transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black max(40px, calc((100vw - 1440px) / 2 + 40px)), black calc(100% - max(40px, calc((100vw - 1440px) / 2 + 40px))), transparent 100%)',
          }}
        >
          <motion.div
            className="flex items-stretch gap-6 will-change-transform pb-16"
            style={{
              translateX,
              paddingLeft: 'max(40px, calc((100vw - 1440px) / 2 + 40px))',
              paddingRight: 'max(40px, calc((100vw - 1440px) / 2 + 40px))',
            }}
          >
            <StepCards steps={steps} copy={copy} totalLabel={totalLabel} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Process({ locale }: ProcessProps) {
  const copy = COPY[locale];
  const data = getPortfolioData(locale);
  const steps = data.process;
  const total = steps.length;
  const totalLabel = String(total).padStart(2, '0');

  return (
    <section id="process" aria-labelledby="process-title" className="relative">
      {/* ── Mobile: vertical timeline (always) ── */}
      <div className="md:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[2px]"
        />
        <div className="mx-auto w-full max-w-[1440px] px-6 pt-24 pb-10 lg:px-10">
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
        <ol className="flex flex-col px-6 pb-24 lg:px-10">
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
      </div>

      {/* ── Desktop: sticky horizontal scrub (sempre, inclusive com reduced-motion) ── */}
      {/* useScroll/useTransform é scroll-driven (posição), não animação — não viola reduced-motion */}
      <div className="hidden md:block">
        <ProcessStickyDesktop steps={steps} copy={copy} totalLabel={totalLabel} />
      </div>
    </section>
  );
}

export default Process;
