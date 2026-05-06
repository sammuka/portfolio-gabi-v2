import { Reveal } from '@/components/motion/reveal';
import { MonoTag } from '@/components/primitives/mono-tag';
import { portfolioData } from '@/content/portfolio-data';
import { CapabilityCard } from './capability-card';

/**
 * Capabilities — Passo 16.
 *
 * Grid 3x2 de 6 capabilities (server component). Header com MonoTag `[003 — CAPABILITIES]`
 * + título display-lg bilíngue. Cada célula é um `CapabilityCard` (client) com hover
 * que aplica wash accent e expande a descrição.
 *
 * Layout:
 * - `bg-hairline` no grid + `bg-surface-2` em cada card cria as divisórias finas.
 * - Entrada: stagger 0.06s por card via Reveal (wrapper).
 */
export interface CapabilitiesProps {
  locale: 'pt' | 'en';
}

const COPY = {
  pt: {
    eyebrow: 'CAPABILITIES',
    titleLead: 'Um sistema de',
    titleScript: 'pequenos',
    titleTail: 'artefatos.',
    lede:
      'Cada capacidade é um token do mesmo sistema. Passe o mouse para ver a definição.',
  },
  en: {
    eyebrow: 'CAPABILITIES',
    titleLead: 'A system of',
    titleScript: 'small',
    titleTail: 'artifacts.',
    lede: 'Each capability is a token in the same system. Hover to read the definition.',
  },
} as const;

export function Capabilities({ locale }: CapabilitiesProps) {
  const copy = COPY[locale];

  return (
    <section
      id="capabilities"
      className="relative py-32 md:py-40"
      aria-labelledby="capabilities-title"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <Reveal>
              <MonoTag index="003" label={copy.eyebrow} tone="accent" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="capabilities-title"
                className="display-lg max-w-3xl text-fg"
              >
                {copy.titleLead}{' '}
                <span className="italic text-accent">
                  {copy.titleScript}
                </span>{' '}
                {copy.titleTail}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="body-base max-w-sm text-fg-soft">{copy.lede}</p>
          </Reveal>
        </div>

        <ul
          className="mt-16 grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {portfolioData.capabilities.map((cap, index) => (
            <Reveal
              key={cap.id}
              as="li"
              delay={index * 0.06}
              y={20}
              className="list-none"
            >
              <CapabilityCard
                token={cap.token}
                title={cap.title}
                description={cap.description}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Capabilities;
