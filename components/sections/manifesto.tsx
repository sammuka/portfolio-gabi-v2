'use client';

import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { portfolioData } from '@/content/portfolio-data';
import { portfolioDataEn } from '@/content/portfolio-data.en';
import { MonoTag } from '@/components/primitives/mono-tag';
import { Reveal } from '@/components/motion/reveal';
import { useReducedMotion } from '@/lib/use-reduced-motion';

/**
 * Passo 15 — Manifesto
 *
 * Section id="manifesto" com tipografia massiva em 4 linhas.
 * Cada linha revela via scroll-trigger + SplitText (split-type, by word).
 * Stagger 0.05s entre palavras, 0.15s de offset entre linhas.
 * A palavra "intuitivas" / "intuitive" da última linha é renderizada em
 * `text-accent` (var(--accent)).
 *
 * Abaixo: 3 chips mono-meta (Eixo / Método / Superfície) readaptando o
 * contexto do V1 para a estética Cold Archive.
 */

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
 * ManifestoLine — client piece com SplitText-by-word + trigger
 * --------------------------------------------------------- */

interface ManifestoLineProps {
  text: string;
  lineIndex: number;
  sizeClass: string;
  /** Palavra da linha que deve receber `text-accent`. */
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

  // Pré-renderiza os tokens (para permitir aplicar accent sem depender do
  // resultado do SplitType). Estratégia: tokeniza por espaço, detecta a
  // palavra com highlight via regex (ignora acentuação e pontuação).
  const tokens = tokenize(text, highlightWord);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      // Reduced motion: estado final visível
      node
        .querySelectorAll<HTMLElement>('[data-token]')
        .forEach((el) => {
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });
      return;
    }

    const split = new SplitType(node, {
      types: 'words',
      tagName: 'span',
      wordClass: 'manifesto-word',
    });

    const items = (split.words ?? []) as HTMLElement[];

    items.forEach((el) => {
      el.style.display = 'inline-block';
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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
        });
      },
      // start ~ 'top 70%' do viewport
      { rootMargin: '0px 0px -30% 0px', threshold: 0.01 },
    );

    io.observe(node);

    return () => {
      io.disconnect();
      split.revert();
    };
  }, [lineIndex, reduced, text]);

  return (
    <div
      ref={ref}
      className={`${sizeClass} font-display text-fg overflow-hidden`}
      // overflow-hidden garante que o translateY(110%) inicial fique escondido
    >
      {tokens.map((tok, i) => (
        <span
          key={i}
          data-token
          className={tok.accent ? 'text-accent' : undefined}
          style={{ display: 'inline-block' }}
        >
          {tok.text}
          {i < tokens.length - 1 ? ' ' : ''}
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

/**
 * Divide a linha por espaços em branco e marca com `accent=true` o token cujo
 * "miolo alfabético" (sem pontuação) bate com `highlightWord` (case/acento
 * -insensitive). Se `highlightWord` não existir na linha, nenhum token é
 * marcado.
 */
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
