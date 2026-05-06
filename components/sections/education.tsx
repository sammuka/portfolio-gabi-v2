import { Reveal } from '@/components/motion/reveal';
import { Chip } from '@/components/primitives/chip';
import { MonoTag } from '@/components/primitives/mono-tag';
import { portfolioData } from '@/content/portfolio-data';

/**
 * Education — Passo 22.
 *
 * Seção minimalista de formação acadêmica. Linha única no formato ficha técnica
 * (grid 12 colunas) para a entrada UNINTER, com curso pendente de validação.
 *
 * Server component — delega a animação ao `Reveal` (client) internamente.
 */
export interface EducationProps {
  locale: 'pt' | 'en';
}

const COPY = {
  pt: {
    eyebrow: 'EDUCATION',
    title: 'Base acadêmica.',
    institutionLabel: 'INSTITUTION',
    chip: 'CURSO A CONFIRMAR',
  },
  en: {
    eyebrow: 'EDUCATION',
    title: 'Academic background.',
    institutionLabel: 'INSTITUTION',
    chip: 'COURSE TBD',
  },
} as const;

export function Education({ locale }: EducationProps) {
  const copy = COPY[locale];
  const entry = portfolioData.education[0];

  return (
    <section
      id="education"
      className="relative py-24 md:py-32"
      aria-labelledby="education-title"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal>
          <MonoTag index="009" label={copy.eyebrow} />
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="education-title"
            className="mt-4 display-lg text-fg"
          >
            {copy.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <div className="hairline" />

            <div className="grid grid-cols-12 items-center gap-4 py-8">
              <div className="col-span-12 md:col-span-3">
                <MonoTag
                  index="01"
                  label={copy.institutionLabel}
                  tone="mute"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <p className="display-sm text-fg">{entry.institution}</p>
              </div>

              <div className="col-span-12 md:col-span-3 md:text-right">
                <Chip tone="warning">{copy.chip}</Chip>
              </div>
            </div>

            <div className="hairline" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="body-sm mt-6 text-fg-mute">{entry.description}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default Education;
