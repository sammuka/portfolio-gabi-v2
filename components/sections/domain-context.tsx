import { Reveal } from '@/components/motion/reveal';
import { Magnetic } from '@/components/motion/magnetic';
import { Chip } from '@/components/primitives/chip';
import { MonoTag } from '@/components/primitives/mono-tag';
import { getPortfolioData } from '@/content/get-portfolio-data';

/**
 * DomainContext — Passo 19.
 *
 * Seção `#domain`: contexto de domínio (mercado segurador) + 2 cards:
 *   1. Experiência Sistran (discreto).
 *   2. Published Work — Design System colaborativo com Isadora (destaque).
 *
 * Skills invocadas: reveal-on-scroll, stagger-cascata, gradientes-layers.
 * Server component; `Magnetic` e `Reveal` são os pontos client.
 */
export interface DomainContextProps {
  locale: 'pt' | 'en';
}

const COPY = {
  pt: {
    eyebrow: 'DOMAIN_CONTEXT',
    title: 'Domínio de atuação.',
    expIndex: 'EXP',
    expLabel: '2024→',
    publishedChip: 'PUBLISHED',
    coauthor: 'Coautoria: Isadora',
  },
  en: {
    eyebrow: 'DOMAIN_CONTEXT',
    title: 'Industry context.',
    expIndex: 'EXP',
    expLabel: '2024→',
    publishedChip: 'PUBLISHED',
    coauthor: 'Co-authored with Isadora',
  },
} as const;

export function DomainContext({ locale }: DomainContextProps) {
  const copy = COPY[locale];
  const data = getPortfolioData(locale);
  const { domainContext, experience, publishedWork } = data;
  const sistran = experience[0];
  const featured = publishedWork[0];

  return (
    <section
      id="domain"
      className="relative py-32 md:py-40"
      aria-labelledby="domain-title"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal>
          <MonoTag index="006" label={copy.eyebrow} />
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="domain-title"
            className="mt-4 display-lg text-fg"
          >
            {copy.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="display-md mt-8 text-fg"
            style={{ maxWidth: '768px' }}
          >
            {domainContext.body}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1 — Sistran experience (discreto) */}
          {sistran && (
            <Reveal delay={0.15}>
              <article
                className="flex h-full flex-col gap-4 p-8"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <MonoTag
                  index={copy.expIndex}
                  label={copy.expLabel}
                  tone="mute"
                />

                <h3 className="display-sm mt-2 text-fg">
                  {sistran.company}
                </h3>

                {sistran.role && (
                  <p className="body-base text-fg-soft">{sistran.role}</p>
                )}

                <p
                  className="body-sm mt-auto"
                  style={{ color: 'var(--fg-soft)' }}
                >
                  {sistran.description}
                </p>
              </article>
            </Reveal>
          )}

          {/* Card 2 — Published Work (DESTAQUE: Design System com Isadora) */}
          {featured && (
            <Reveal delay={0.22}>
              <article
                className="relative flex h-full flex-col gap-5 overflow-hidden p-8"
                style={{
                  background:
                    'linear-gradient(180deg, var(--surface-3) 0%, var(--surface-2) 100%)',
                  border: '1px solid var(--accent-mute)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {/* Gradient layer — accent wash decorativo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(600px 300px at 100% 0%, var(--accent-soft), transparent 60%)',
                  }}
                />

                <div className="relative flex flex-wrap items-center gap-2">
                  <Chip tone="accent">{copy.publishedChip}</Chip>
                </div>

                <h3 className="display-sm relative text-fg">
                  {featured.title}
                </h3>

                <p className="body-base relative text-fg-soft">
                  {featured.summary}
                </p>

                {/* Tags */}
                <div className="relative flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <Chip key={tag} tone="mute">
                      {tag}
                    </Chip>
                  ))}
                </div>

                {/* Links */}
                <div className="relative mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:gap-6">
                  <Magnetic strength={0.25}>
                    <a
                      href={featured.primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono-meta inline-flex items-center gap-2 text-accent underline-offset-4 hover:underline"
                    >
                      {featured.primaryLabel}
                      <span aria-hidden>&#8599;</span>
                    </a>
                  </Magnetic>

                  {featured.referenceUrl && (
                    <Magnetic strength={0.25}>
                      <a
                        href={featured.referenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono-meta inline-flex items-center gap-2 text-fg-soft underline-offset-4 hover:text-accent hover:underline"
                      >
                        {featured.referenceLabel}
                        <span aria-hidden>&#8599;</span>
                      </a>
                    </Magnetic>
                  )}
                </div>

                {/* Coautoria */}
                <p
                  className="mono-meta relative"
                  style={{ color: 'var(--fg-mute)' }}
                >
                  {copy.coauthor}
                </p>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export default DomainContext;
