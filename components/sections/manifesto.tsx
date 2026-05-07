'use client';

import { useEffect, useRef } from 'react';
import { portfolioData } from '@/content/portfolio-data';
import { portfolioDataEn } from '@/content/portfolio-data.en';
import { MonoTag } from '@/components/primitives/mono-tag';
import { Reveal } from '@/components/motion/reveal';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export interface ManifestoProps {
  locale: 'pt' | 'en';
}

interface ManifestoCopy {
  lines: string[];
  highlightWord: string;
  chips: {
    eyebrow: string;
    value: string;
  }[];
}

const COPY: Record<'pt' | 'en', ManifestoCopy> = {
  pt: {
    lines: portfolioData.manifesto,
    highlightWord: 'intuitivas',
    chips: [
      { eyebrow: 'Eixo', value: 'Experiências intuitivas' },
      { eyebrow: 'Método', value: 'Design Systems · Prototipagem' },
      { eyebrow: 'Superfície', value: 'Produtos digitais' },
    ],
  },
  en: {
    lines: portfolioDataEn.manifesto,
    highlightWord: 'intuitive',
    chips: [
      { eyebrow: 'Axis', value: 'Intuitive experiences' },
      { eyebrow: 'Method', value: 'Design Systems · Prototyping' },
      { eyebrow: 'Surface', value: 'Digital products' },
    ],
  },
};

export function Manifesto({ locale }: ManifestoProps) {
  const copy = COPY[locale];

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-title"
      className="relative bg-surface-2 py-32 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <Reveal>
          <MonoTag index="002" label="MANIFESTO" tone="accent" />
        </Reveal>

        <h2 id="manifesto-title" className="sr-only">
          Manifesto
        </h2>

        <div className="mt-12 space-y-4 md:mt-16 md:space-y-6">
          {copy.lines.map((line, idx) => {
            const isLastLine = idx === copy.lines.length - 1;
            const sizeClass = idx === 2 ? 'display-lg' : 'display-xl';
            return (
              <ManifestoLine
                key={idx}
                text={line}
                lineIndex={idx}
                sizeClass={sizeClass}
                highlightWord={isLastLine ? copy.highlightWord : undefined}
              />
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-hairline)] md:mt-24 md:grid-cols-3">
          {copy.chips.map((chip, i) => (
            <Reveal
              key={chip.eyebrow}
              delay={0.1 + i * 0.08}
              className="bg-surface-2 p-6 md:p-8"
            >
              <div className="flex flex-col gap-3">
                <MonoTag
                  index={String(i + 1).padStart(3, '0')}
                  label={chip.eyebrow.toUpperCase()}
                />
                <p className="display-sm text-fg">{chip.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
 * ManifestoLine — animação word-by-word sem SplitType
 * O espaço entre palavras fica FORA do wrapper overflow:hidden
 * para nunca ser cortado.
 * --------------------------------------------------------- */

interface ManifestoLineProps {
  text: string;
  lineIndex: number;
  sizeClass: string;
  highlightWord?: string;
}

const WORD_STAGGER_S = 0.05;
const LINE_OFFSET_S = 0.15;

function ManifestoLine({
  text,
  lineIndex,
  sizeClass,
  highlightWord,
}: ManifestoLineProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const tokens = tokenize(text, highlightWord);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const items = Array.from(node.querySelectorAll<HTMLElement>('[data-token]'));

    if (reduced) {
      items.forEach((el) => {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      });
      return;
    }

    items.forEach((el) => {
      el.style.willChange = 'transform, opacity';
      el.style.transform = 'translateY(110%)';
      el.style.opacity = '0';
      el.style.transition =
        'transform 0.9s var(--ease-soft, cubic-bezier(0.22,1,0.36,1)), opacity 0.9s var(--ease-soft, cubic-bezier(0.22,1,0.36,1))';
    });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      const lineDelay = lineIndex * LINE_OFFSET_S;
      items.forEach((el, i) => {
        el.style.transitionDelay = `${lineDelay + i * WORD_STAGGER_S}s`;
        requestAnimationFrame(() => {
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });
      });
    };

    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) play(); }); },
      { rootMargin: '0px 0px -30% 0px', threshold: 0.01 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [lineIndex, reduced, text]);

  return (
    <div ref={ref} className={`${sizeClass} font-display text-fg`}>
      {tokens.map((tok, i) => (
        <span key={i}>
          {/* wrapper clips translateY without eating the trailing space */}
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <span
              data-token
              className={tok.accent ? 'text-accent' : undefined}
              style={{ display: 'inline-block' }}
            >
              {tok.text}
            </span>
          </span>
          {i < tokens.length - 1 ? ' ' : ''}
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
 * Helpers
 * --------------------------------------------------------- */

interface Token {
  text: string;
  accent: boolean;
}

function tokenize(line: string, highlightWord?: string): Token[] {
  const raw = line.split(/\s+/).filter(Boolean);
  if (!highlightWord) return raw.map((text) => ({ text, accent: false }));

  const normalize = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^\p{L}\p{N}]/gu, '')
      .toLowerCase();

  const target = normalize(highlightWord);

  return raw.map((text) => ({
    text,
    accent: normalize(text) === target,
  }));
}

export default Manifesto;
