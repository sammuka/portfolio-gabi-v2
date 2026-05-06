import { Chip } from '@/components/primitives/chip';
import { MonoTag } from '@/components/primitives/mono-tag';
import { Reveal } from '@/components/motion/reveal';
import { getPortfolioData, type Locale } from '@/content/get-portfolio-data';
import ptMessages from '@/messages/pt.json';
import enMessages from '@/messages/en.json';

export interface TestimonialsProps {
  locale: Locale;
}

/**
 * Testimonials — depoimentos reais autorizados + slots "Em breve".
 *
 * REGRA DURA: apenas depoimentos com `authorized: true` em portfolio-data
 * são renderizados como cards reais. Slots restantes permanecem skeletons
 * editoriais para sinalizar coleta em andamento.
 */
export function Testimonials({ locale }: TestimonialsProps) {
  const t = locale === 'pt' ? ptMessages.testimonials : enMessages.testimonials;
  const data = getPortfolioData(locale);
  const authorized = data.testimonials.filter((x) => x.authorized);

  // Quantos skeletons completam a linha (alvo: 3 cards totais desktop).
  const skeletonCount = Math.max(0, 2 - authorized.length + 1);
  const skeletons = Array.from({ length: skeletonCount }, (_, i) => i);

  return (
    <section
      id="testimonials"
      className="relative w-full py-32 md:py-40"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-6">
            <MonoTag index="008" label="TESTIMONIALS" tone="accent" />
            <h2
              id="testimonials-title"
              className="display-lg"
              style={{ color: 'var(--fg)' }}
            >
              {t.title}
            </h2>
            <p
              className="body-lg max-w-2xl"
              style={{ color: 'var(--fg-soft)' }}
            >
              {t.editorial_note}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {authorized.map((item, i) => (
            <Reveal key={item.id} delay={0.08 * (i + 1)}>
              <article
                className="relative flex h-full flex-col gap-6 rounded-[var(--radius-lg)] border p-8"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--accent-mute)',
                }}
                aria-label={`${item.author} — ${item.role}`}
              >
                <header className="flex items-center justify-between gap-4">
                  <Chip tone="accent">
                    {locale === 'pt' ? 'AUTORIZADO' : 'AUTHORIZED'}
                  </Chip>
                  <span
                    className="mono-meta"
                    style={{ color: 'var(--fg-mute)' }}
                  >
                    [ 01 / 01 ]
                  </span>
                </header>

                <blockquote className="flex flex-col gap-4">
                  {item.quote.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="body-base"
                      style={{ color: 'var(--fg-soft)' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </blockquote>

                <footer
                  className="mt-auto flex flex-col gap-1 border-t pt-4"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  <cite
                    className="body-base not-italic"
                    style={{ color: 'var(--fg)' }}
                  >
                    {item.author}
                  </cite>
                  <span
                    className="mono-meta"
                    style={{ color: 'var(--fg-mute)' }}
                  >
                    {item.role}
                  </span>
                  <span
                    className="body-sm"
                    style={{ color: 'var(--fg-mute)' }}
                  >
                    {item.relation}
                  </span>
                </footer>
              </article>
            </Reveal>
          ))}

          {skeletons.map((i) => (
            <Reveal key={`skel-${i}`} delay={0.08 * (authorized.length + i + 1)}>
              <article
                className="relative flex h-full flex-col justify-between gap-6 rounded-[var(--radius-lg)] border border-dashed p-8"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--hairline-strong)',
                }}
                aria-label={`${t.coming_soon} — ${i + 1}`}
              >
                <header className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className="h-10 w-10 shrink-0 rounded-full"
                    style={{
                      border: '1px solid var(--hairline-strong)',
                      backgroundColor: 'var(--surface-3)',
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <span
                      className="mono-meta"
                      style={{ color: 'var(--fg-mute)' }}
                      aria-label="name placeholder"
                    >
                      —
                    </span>
                    <span
                      className="mono-meta"
                      style={{ color: 'var(--fg-mute)' }}
                      aria-label="role placeholder"
                    >
                      —
                    </span>
                  </div>
                </header>

                <div aria-hidden className="flex flex-col gap-2">
                  <div
                    className="rounded-full"
                    style={{
                      height: '8px',
                      width: '92%',
                      backgroundColor: 'var(--hairline)',
                    }}
                  />
                  <div
                    className="rounded-full"
                    style={{
                      height: '8px',
                      width: '78%',
                      backgroundColor: 'var(--hairline)',
                    }}
                  />
                  <div
                    className="rounded-full"
                    style={{
                      height: '4px',
                      width: '54%',
                      backgroundColor: 'var(--hairline)',
                    }}
                  />
                </div>

                <footer className="mt-auto flex justify-end">
                  <Chip tone="warning">{t.coming_soon}</Chip>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
