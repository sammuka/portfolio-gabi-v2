import { portfolioData } from "@/content/portfolio-data";
import { portfolioDataEn } from "@/content/portfolio-data.en";
import { SkeletonCard } from "@/components/primitives/skeleton-card";
import { Chip } from "@/components/primitives/chip";
import { MonoTag } from "@/components/primitives/mono-tag";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { FeaturedWorkCard } from "./selected-work.client";

interface SelectedWorkProps {
  locale: "pt" | "en";
}

/**
 * SelectedWork — § 007 / SELECTED_WORK.
 *
 * Grid 3x2 de projetos (desktop): Slot 1 = publishedWork (Design System
 * publicado colaborativamente com Isadora), Slots 2-6 = SkeletonCard
 * `[EM CURADORIA] / [IN CURATION]` — cada slot carrega um rótulo de
 * vertical neutro ("Produto digital", "Prototipagem", "UX/UI",
 * "Usabilidade", "Interface") para não fabricar projetos.
 *
 * Abaixo do grid, enquanto `projects.length < 3` (sempre verdadeiro na V1),
 * renderiza um Editorial Notice com CTA "Solicitar portfólio" / "Request
 * portfolio" que abre o LinkedIn.
 *
 * Server component. A animação (hover lift + clip-path reveal) do card
 * featured é delegada ao `FeaturedWorkCard` (client) para manter
 * boundaries explícitas.
 */

const COPY = {
  pt: {
    heading: "Trabalhos em curadoria.",
    slotLabel: "EM CURADORIA",
    slots: [
      { index: "02", label: "Produto digital" },
      { index: "03", label: "Prototipagem" },
      { index: "04", label: "UX/UI" },
      { index: "05", label: "Usabilidade" },
      { index: "06", label: "Interface" },
    ],
    publishedChip: "DESIGN SYSTEM",
    collabChip: "COLLAB WITH ISADORA",
    noticeEyebrow: "Estado editorial",
    noticeLead: [
      "A seleção de cases está sendo organizada com ",
      "rigor",
      " antes de ir ao público.",
    ],
    noticeSupport:
      "Para receber um portfólio detalhado com projetos anonimizados quando disponível, entre em contato via LinkedIn.",
    cta: "Solicitar portfólio",
  },
  en: {
    heading: "Selected work.",
    slotLabel: "IN CURATION",
    slots: [
      { index: "02", label: "Digital product" },
      { index: "03", label: "Prototyping" },
      { index: "04", label: "UX/UI" },
      { index: "05", label: "Usability" },
      { index: "06", label: "Interface" },
    ],
    publishedChip: "DESIGN SYSTEM",
    collabChip: "COLLAB WITH ISADORA",
    noticeEyebrow: "Editorial notice",
    noticeLead: [
      "The selection is being organized with ",
      "rigor",
      " before going public.",
    ],
    noticeSupport:
      "To receive a detailed portfolio with anonymized projects when available, get in touch via LinkedIn.",
    cta: "Request portfolio",
  },
} as const;

export function SelectedWork({ locale }: SelectedWorkProps) {
  const data = locale === "en" ? portfolioDataEn : portfolioData;
  const copy = COPY[locale];

  const featured = data.publishedWork[0];
  const showNotice = data.projects.length < 3;

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative py-32 md:py-40"
      style={{ backgroundColor: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <MonoTag index="007" label="SELECTED_WORK" tone="accent" />
            <h2
              id="work-title"
              className="font-display display-lg"
              style={{ color: "var(--fg)" }}
            >
              {copy.heading}
            </h2>
          </div>
          <p
            className="body-lg max-w-md"
            style={{ color: "var(--fg-soft)" }}
          >
            {data.projectsNote}
          </p>
        </div>

        {/* Grid 3x2 */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured && (
            <FeaturedWorkCard
              title={featured.title}
              summary={featured.summary}
              tags={featured.tags}
              primaryUrl={featured.primaryUrl}
              primaryLabel={featured.primaryLabel}
              referenceUrl={featured.referenceUrl}
              referenceLabel={featured.referenceLabel}
              publishedChip={copy.publishedChip}
              collabChip={copy.collabChip}
            />
          )}

          {copy.slots.map((slot, i) => (
            <Reveal key={slot.index} delay={(i + 1) * 0.08}>
              <SkeletonCard
                index={slot.index}
                label={`${copy.slotLabel} · ${slot.label}`}
              />
            </Reveal>
          ))}
        </div>

        {/* Editorial Notice — exibe enquanto projects.length < 3 */}
        {showNotice && (
          <Reveal delay={0.2}>
            <div
              className="mt-16 flex flex-col items-center gap-6 rounded-[var(--radius-lg)] border p-10 text-center"
              style={{
                backgroundColor: "var(--surface-2)",
                borderStyle: "dashed",
                borderColor: "var(--hairline-strong)",
              }}
            >
              <span
                className="mono-meta"
                style={{ color: "var(--fg-mute)" }}
              >
                {copy.noticeEyebrow}
              </span>
              <p
                className="display-sm max-w-xl font-display"
                style={{ color: "var(--fg)" }}
              >
                {copy.noticeLead[0]}
                <span
                  className="italic"
                  style={{ color: "var(--accent)" }}
                >
                  {copy.noticeLead[1]}
                </span>
                {copy.noticeLead[2]}
              </p>
              <p
                className="body-base max-w-lg"
                style={{ color: "var(--fg-soft)" }}
              >
                {copy.noticeSupport}
              </p>
              <Magnetic>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="on-accent inline-flex items-center gap-3 rounded-full px-7 py-4 transition-transform hover:scale-[1.02]"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--on-accent)",
                    fontFamily: "var(--font-mono, ui-monospace)",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {copy.cta}
                  <span aria-hidden>&#8599;</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default SelectedWork;
