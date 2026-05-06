import { getPortfolioData, type Locale } from '@/content/get-portfolio-data';
import { MonoTag } from '@/components/primitives/mono-tag';
import { Chip } from '@/components/primitives/chip';
import { Magnetic } from '@/components/motion/magnetic';
import { SplitText } from '@/components/motion/split-text';
import { EmailCopyButton } from './email-copy-button';

interface ContactProps {
  locale: 'pt' | 'en';
}

interface ContactCopy {
  headlineLine1: string;
  headlineLine2Prefix: string;
  headlineAccent: string;
  headlineSuffix: string;
  linkedinChip: string;
  linkedinLabel: string;
  linkedinDescription: string;
  linkedinCta: string;
  emailChip: string;
  emailCta: string;
  emailCopied: string;
  emailSrCopied: string;
  whatsappChip: string;
  whatsappDescription: string;
  whatsappCta: string;
  whatsappPending: string;
  whatsappPendingNote: string;
  location: string;
  formalNote: string;
  portraitAlt: string;
}

const copyByLocale: Record<ContactProps['locale'], ContactCopy> = {
  pt: {
    headlineLine1: 'Vamos criar',
    headlineLine2Prefix: 'experiências ',
    headlineAccent: 'mais claras',
    headlineSuffix: '?',
    linkedinChip: 'LINKEDIN',
    linkedinLabel: 'Rede profissional pública',
    linkedinDescription:
      'Mensagens, convites e conversas de projeto em canal público e rastreável.',
    linkedinCta: 'Abrir LinkedIn ↗',
    emailChip: 'EMAIL',
    emailCta: 'Copiar e-mail ↗',
    emailCopied: 'Copiado ✓',
    emailSrCopied: 'E-mail copiado para a área de transferência.',
    whatsappChip: 'WHATSAPP',
    whatsappDescription: 'Mensagem direta para alinhamentos rápidos.',
    whatsappCta: 'Abrir WhatsApp ↗',
    whatsappPending: 'A CONFIRMAR',
    whatsappPendingNote: 'Número pendente de validação.',
    location: 'Dois Vizinhos, PR · Brasil · BRT (UTC-03)',
    formalNote:
      'Prefere um formato mais formal? Envie uma mensagem no LinkedIn com o escopo inicial.',
    portraitAlt: 'Retrato preto e branco de Gabriella Gonçalves.',
  },
  en: {
    headlineLine1: "Let's build",
    headlineLine2Prefix: '',
    headlineAccent: 'clearer',
    headlineSuffix: ' experiences?',
    linkedinChip: 'LINKEDIN',
    linkedinLabel: 'Professional network',
    linkedinDescription:
      'Messages, invitations and project conversations on a public, traceable channel.',
    linkedinCta: 'Open LinkedIn ↗',
    emailChip: 'EMAIL',
    emailCta: 'Copy email ↗',
    emailCopied: 'Copied ✓',
    emailSrCopied: 'Email copied to clipboard.',
    whatsappChip: 'WHATSAPP',
    whatsappDescription: 'Direct message for quick alignments.',
    whatsappCta: 'Open WhatsApp ↗',
    whatsappPending: 'PENDING',
    whatsappPendingNote: 'Number pending validation.',
    location: 'Dois Vizinhos, PR · Brazil · BRT (UTC-03)',
    formalNote:
      'Prefer a more formal format? Send a LinkedIn message with the initial scope.',
    portraitAlt: 'Black and white portrait of Gabriella Gonçalves.',
  },
};

/**
 * `sections/contact.tsx` — Seção `#contact` (Passo 23).
 *
 * - Surface invert: bg `--accent` (azul) sobre texto `--bg` (carbono).
 * - CTA gigante estilo Leopoldo (display-xxl), Space Grotesk.
 * - 3 cards: LinkedIn (external link), Email (copy-to-clipboard client),
 *   WhatsApp (link com tratamento de placeholder).
 * - WhatsApp nunca fabrica número: quando `portfolioData.whatsapp === "__PLACEHOLDER__"`,
 *   o CTA é desabilitado (aria-disabled, pointer-events-none, opacity 0.5)
 *   e um chip `A CONFIRMAR` / `PENDING` é exibido.
 *
 * Server Component. O botão de copiar e-mail é importado como client boundary.
 */
export function Contact({ locale }: ContactProps) {
  const data = getPortfolioData(locale);
  const t = copyByLocale[locale];

  const whatsappDisabled = data.whatsapp === '__PLACEHOLDER__';
  const whatsappHref = whatsappDisabled
    ? undefined
    : `https://wa.me/${data.whatsapp}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-accent py-40 md:py-48"
      style={{ color: 'var(--bg)' }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-between gap-6">
          <MonoTag index="010" label="CONTACT" />
          <span className="mono-meta hidden md:inline" style={{ color: 'var(--bg)' }}>
            {t.location}
          </span>
        </div>

        {/* CTA gigante + retrato */}
        <div className="mt-10 grid grid-cols-12 gap-6 md:gap-10">
          {/* Retrato B&W pequeno — col-span 4 / md:3 */}
          <figure className="col-span-4 md:col-span-3 self-end">
            <div
              className="aspect-square w-full max-w-[200px] overflow-hidden ring-1"
              style={{
                clipPath: 'circle(50%)',
                filter: 'grayscale(1)',
                borderColor: 'var(--accent-mute)',
              }}
              aria-hidden
            >
              {/* Fallback silencioso: se a imagem ainda não existir,
                  o círculo funciona como placeholder neutro. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/gabriella-portrait.jpg"
                alt={t.portraitAlt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>

          {/* Headline display-xxl */}
          <div className="col-span-12 md:col-span-9">
            <h2
              id="contact-title"
              className="font-display display-xl tracking-tight"
              style={{ color: 'var(--bg)' }}
            >
              <Magnetic strength={0.12}>
                <span className="block">{t.headlineLine1}</span>
              </Magnetic>
              <span className="block">
                {t.headlineLine2Prefix}
                <span
                  className="whitespace-nowrap"
                  style={{ color: 'var(--fg)' }}
                >
                  {t.headlineAccent}
                  {t.headlineSuffix}
                </span>
              </span>
            </h2>
          </div>
        </div>

        {/* 3 cards */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 — LinkedIn */}
          <article
            className="relative flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] p-8 backdrop-blur-md"
            style={{
              background: 'color-mix(in oklab, var(--bg) 12%, transparent)',
              border: '1px solid color-mix(in oklab, var(--bg) 22%, transparent)',
            }}
          >
            <header className="flex items-center justify-between gap-3">
              <Chip tone="inverted">{t.linkedinChip}</Chip>
            </header>
            <div>
              <p className="font-display display-sm" style={{ color: 'var(--bg)' }}>
                {t.linkedinLabel}
              </p>
              <p
                className="body-sm mt-2"
                style={{ color: 'color-mix(in oklab, var(--bg) 80%, transparent)' }}
              >
                {t.linkedinDescription}
              </p>
            </div>
            <Magnetic strength={0.18}>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-meta inline-flex items-center gap-2 rounded-full border border-solid px-5 py-3 transition-colors duration-300 hover:text-[var(--accent)]"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--fg)',
                  borderColor: 'var(--hairline-strong)',
                }}
              >
                {t.linkedinCta}
              </a>
            </Magnetic>
          </article>

          {/* Card 2 — Email (copy to clipboard / client) */}
          <article
            className="relative flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] p-8 backdrop-blur-md"
            style={{
              background: 'color-mix(in oklab, var(--bg) 12%, transparent)',
              border: '1px solid color-mix(in oklab, var(--bg) 22%, transparent)',
            }}
          >
            <header className="flex items-center justify-between gap-3">
              <Chip tone="inverted">{t.emailChip}</Chip>
            </header>
            <div>
              <code
                className="mono-meta block break-all"
                style={{ color: 'var(--bg)' }}
              >
                {data.email}
              </code>
            </div>
            <EmailCopyButton
              email={data.email}
              label={t.emailCta}
              labelCopied={t.emailCopied}
              srCopied={t.emailSrCopied}
            />
          </article>

          {/* Card 3 — WhatsApp */}
          <article
            className="relative flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] p-8 backdrop-blur-md"
            style={{
              background: 'color-mix(in oklab, var(--bg) 12%, transparent)',
              border: '1px solid color-mix(in oklab, var(--bg) 22%, transparent)',
            }}
          >
            <header className="flex items-center justify-between gap-3">
              <Chip tone="inverted">{t.whatsappChip}</Chip>
              {whatsappDisabled ? <Chip tone="warning">{t.whatsappPending}</Chip> : null}
            </header>
            <div>
              <p className="font-display display-sm" style={{ color: 'var(--bg)' }}>
                {t.whatsappDescription}
              </p>
              {whatsappDisabled ? (
                <p
                  className="body-sm mt-2"
                  style={{ color: 'color-mix(in oklab, var(--bg) 70%, transparent)' }}
                >
                  {t.whatsappPendingNote}
                </p>
              ) : null}
            </div>

            {whatsappDisabled ? (
              <span
                aria-disabled="true"
                role="link"
                tabIndex={-1}
                className="mono-meta pointer-events-none inline-flex items-center gap-2 rounded-full border border-solid px-5 py-3 select-none"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--fg)',
                  borderColor: 'var(--hairline-strong)',
                  opacity: 0.5,
                }}
              >
                {t.whatsappCta}
              </span>
            ) : (
              <Magnetic strength={0.18}>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-meta inline-flex items-center gap-2 rounded-full border border-solid px-5 py-3 transition-colors duration-300 hover:text-[var(--accent)]"
                  style={{
                    background: 'var(--bg)',
                    color: 'var(--fg)',
                    borderColor: 'var(--hairline-strong)',
                  }}
                >
                  {t.whatsappCta}
                </a>
              </Magnetic>
            )}
          </article>
        </div>

        {/* Footer info */}
        <div
          className="mt-20 flex flex-col gap-6 border-t pt-10 md:flex-row md:items-end md:justify-between"
          style={{ borderColor: 'color-mix(in oklab, var(--bg) 30%, transparent)' }}
        >
          <p className="body-sm md:hidden" style={{ color: 'var(--bg)' }}>
            {t.location}
          </p>
          <p
            className="font-display max-w-3xl"
            style={{
              fontSize: 'var(--fs-display-sm)',
              color: 'var(--bg)',
            }}
          >
            <SplitText text={t.formalNote} by="word" stagger={0.04} />
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
