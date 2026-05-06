import type { CSSProperties } from 'react';
import { getPortfolioData, type Locale } from '@/content/get-portfolio-data';
import { MonoTag } from '@/components/primitives/mono-tag';
import { Pill } from '@/components/primitives/pill';
import { LiveClock } from '@/components/primitives/live-clock';
import { DotGrid } from '@/components/primitives/dot-grid';
import { Reveal } from '@/components/motion/reveal';
import { WordRotator } from '@/components/motion/word-rotator';
import { Marquee } from '@/components/motion/marquee';
import { Magnetic } from '@/components/motion/magnetic';
import { GrainBackdropLazy } from '@/components/webgl/grain-backdrop-lazy';

/**
 * Hero — "Cold Archive" opening viewport.
 *
 * Server component: consulta `getPortfolioData(locale)` e compõe o layout.
 * Sub-componentes interativos (WordRotator, Marquee, Magnetic, LiveClock,
 * Reveal, GrainBackdropLazy) já declaram `'use client'` internamente.
 *
 * Regra dura V2: Dancing Script NÃO aparece aqui — "GONÇALVES." é
 * renderizado em Space Grotesk com stroke outlined (cor transparente +
 * `-webkit-text-stroke`). Script é reservado exclusivamente ao colophon.
 *
 * Layout:
 *   [ 001 — BIO_DATA ]                         [ Pill · Location · Clock ]
 *
 *                UX/UI
 *                DESIGNER.              (accent)
 *                GONÇALVES.             (outlined, stroke fg-mute)
 *
 *   Experiências digitais <rotator>
 *   {subtitle}
 *
 *   [ Ver capacidades → ]   [ Falar com Gabriella ↗ ]
 *
 *   ─────── Marquee skills (mix-blend-difference) ───────
 *
 * Camadas de fundo (z-index crescente):
 *   z-[-30] GrainBackdropLazy    (next/dynamic, ssr:false)
 *   z-[-20] DotGrid opacity 0.05
 *   z-[-10] radial gradient accent-soft
 */
export interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const data = getPortfolioData(locale);
  const t = i18n[locale];

  const outlinedStyle: CSSProperties = {
    WebkitTextStroke: '1.5px var(--fg-soft)',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    paintOrder: 'stroke fill',
  };

  const radialStyle: CSSProperties = {
    background:
      'radial-gradient(ellipse at 20% 10%, var(--accent-soft), transparent 50%)',
  };

  return (
    <section
      id="hero"
      aria-label={t.sectionLabel}
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden pt-24 pb-12"
    >
      {/* --- Background layers -------------------------------------- */}
      <GrainBackdropLazy className="pointer-events-none absolute inset-0 -z-30" />
      <DotGrid
        opacity={0.05}
        className="-z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={radialStyle}
      />

      {/* --- Conteúdo ------------------------------------------------ */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-6 py-10 lg:px-10">
        {/* Top meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <MonoTag index="001" label="BIO_DATA" />
          <div className="flex flex-wrap items-center gap-4">
            <Pill dot>{t.available}</Pill>
            <div className="mono-meta hidden items-center gap-4 md:flex">
              <span className="body-sm text-[var(--fg-mute)] normal-case tracking-normal">
                {data.location}
              </span>
              <span
                aria-hidden
                className="h-px w-6 bg-[var(--hairline-strong)]"
              />
              <LiveClock timeZone={data.locationTimezone} />
            </div>
          </div>
        </div>

        {/* Display massivo */}
        <div className="relative my-12 flex flex-col gap-8">
          <Reveal delay={0.3}>
            <p className="eyebrow">{t.eyebrow}</p>
          </Reveal>

          <h1 className="font-display display-xxl text-[var(--fg)]">
            <Reveal as="span" delay={0.45} y={48} className="block">
              UX/UI
            </Reveal>
            <Reveal
              as="span"
              delay={0.6}
              y={48}
              className="block text-[var(--accent)]"
            >
              DESIGNER.
            </Reveal>
            <Reveal as="span" delay={0.85} y={48} className="block">
              <span className="inline-block" style={outlinedStyle}>
                GONÇALVES.
              </span>
            </Reveal>
          </h1>

          <Reveal delay={1.1}>
            <p className="font-display display-sm text-[var(--fg-soft)]">
              {t.experiencesLead}{' '}
              <span className="relative inline-block align-baseline text-[var(--accent)]">
                <WordRotator words={data.rotatingWords} />
              </span>
            </p>
          </Reveal>

          <Reveal delay={1.25}>
            <p className="body-lg max-w-[640px] text-[var(--fg-soft)]">
              {data.subtitle}
            </p>
          </Reveal>

          <Reveal delay={1.45}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic>
                <a
                  href="#capabilities"
                  className="mono-meta inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-4 text-white transition-transform hover:scale-[1.02]"
                >
                  {t.ctaPrimary}
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-meta inline-flex items-center gap-3 rounded-full border border-[var(--hairline-strong)] px-7 py-4 text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
                >
                  {t.ctaSecondary}
                  <span aria-hidden className="inline-block">
                    ↗
                  </span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Bottom marquee — skills em mix-blend-difference global */}
        <div className="relative mt-6 border-y border-[var(--hairline)] py-8 md:py-10">
          <Marquee speed={45} className="mix-blend-difference">
            {data.skills.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="font-display display-md flex shrink-0 items-center gap-12 text-[var(--fg)]"
                style={{ lineHeight: 1.4, paddingBlock: '0.15em' }}
              >
                {skill}
                <span aria-hidden className="text-[var(--accent-mute)]">
                  ✦
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

export default Hero;

// ---------------------------------------------------------------------------
// i18n local — strings usadas apenas pelo hero. Centralização futura opcional.
// ---------------------------------------------------------------------------
const i18n = {
  pt: {
    sectionLabel: 'Abertura do portfólio',
    eyebrow: 'Portfólio · Edição 2026',
    available: 'Disponível para novos projetos',
    experiencesLead: 'Experiências digitais',
    ctaPrimary: 'Ver capacidades',
    ctaSecondary: 'Falar com Gabriella',
  },
  en: {
    sectionLabel: 'Portfolio opening',
    eyebrow: 'Portfolio · 2026 Edition',
    available: 'Available for new projects',
    experiencesLead: 'Digital experiences',
    ctaPrimary: 'See capabilities',
    ctaSecondary: 'Talk to Gabriella',
  },
} as const;
