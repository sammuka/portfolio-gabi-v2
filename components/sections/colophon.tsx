import { portfolioData } from "@/content/portfolio-data";
import { MonoTag } from "@/components/primitives/mono-tag";
import { Reveal } from "@/components/motion/reveal";
import { BackToTop } from "./back-to-top";

/**
 * Colophon — footer editorial do portfólio.
 *
 * Layout mono/arquivístico em 12 colunas:
 *  - Col 1 (5): nome completo, bio curta e ASSINATURA "Gabi" em Dancing Script (azul).
 *  - Col 2 (3): links (LinkedIn, e-mail, voltar ao topo).
 *  - Col 3 (4): nota editorial + última atualização.
 *  - Copyright bar inferior com hairline.
 *
 * Regra inviolável: esta é a ÚNICA seção do site que aplica a classe
 * `.font-script` (Dancing Script). Qualquer outro uso deve ser removido.
 *
 * Server component — o único client child é `BackToTop`.
 */
export interface ColophonProps {
  locale: "pt" | "en";
}

export function Colophon({ locale }: ColophonProps) {
  const isPT = locale === "pt";

  const copy = {
    linksLabel: isPT ? "LINKS" : "LINKS",
    linkedin: isPT ? "LinkedIn" : "LinkedIn",
    email: "Email",
    backToTop: isPT ? "Voltar ao topo" : "Back to top",
    editorialLabel: isPT ? "EDITORIAL" : "EDITORIAL",
    editorialNote: isPT
      ? "Esta página foi construída a partir de pesquisa pública documentada e dos materiais de identidade pública da própria Gabriella no LinkedIn."
      : "This page was built from documented public research and public identity materials by Gabriella herself on LinkedIn.",
    lastUpdate: isPT ? "Última atualização" : "Last update",
    rights: isPT
      ? "© 2026 Gabriella Gonçalves. Todos os direitos reservados."
      : "© 2026 Gabriella Gonçalves. All rights reserved.",
    tagline: "Cold Archive · Atelier Gabi",
  };

  return (
    <footer
      id="colophon"
      className="relative border-t py-24 md:py-32"
      style={{
        backgroundColor: "var(--surface-2)",
        borderTopColor: "var(--hairline)",
        borderTopWidth: "1px",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        {/* Grid editorial 12 cols */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Col 1 — Nome, bio, assinatura */}
          <div className="md:col-span-5">
            <Reveal delay={0}>
              <p className="display-md" style={{ color: "var(--fg)" }}>
                {portfolioData.fullName}.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p
                className="body-base mt-5 max-w-md"
                style={{ color: "var(--fg-soft)" }}
              >
                {portfolioData.bioShort}
              </p>
            </Reveal>

            {/* Assinatura "Gabi" — ÚNICA aparição de Dancing Script na LP. */}
            <Reveal delay={0.2}>
              <span
                className="font-script display-lg mt-10 inline-block"
                style={{ color: "var(--accent)" }}
                aria-label={isPT ? "Assinatura: Gabi" : "Signature: Gabi"}
              >
                Gabi
              </span>
            </Reveal>
          </div>

          {/* Col 2 — Links */}
          <div className="md:col-span-3">
            <Reveal delay={0.12}>
              <MonoTag index="NAV" label={copy.linksLabel} tone="mute" />
            </Reveal>
            <ul className="mt-5 flex flex-col gap-3">
              <Reveal as="li" delay={0.18}>
                <a
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-base transition-colors duration-300 hover:text-accent focus-visible:text-accent"
                  style={{ color: "var(--fg)" }}
                >
                  {copy.linkedin}
                  <span aria-hidden className="ml-1">
                    ↗
                  </span>
                </a>
              </Reveal>
              <Reveal as="li" delay={0.24}>
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="body-base transition-colors duration-300 hover:text-accent focus-visible:text-accent"
                  style={{ color: "var(--fg)" }}
                >
                  {copy.email}
                </a>
              </Reveal>
              <Reveal as="li" delay={0.3}>
                <BackToTop label={copy.backToTop} />
              </Reveal>
            </ul>
          </div>

          {/* Col 3 — Nota editorial */}
          <div className="md:col-span-4">
            <Reveal delay={0.14}>
              <MonoTag index="NOTE" label={copy.editorialLabel} tone="mute" />
            </Reveal>
            <Reveal delay={0.22}>
              <p
                className="body-base mt-5"
                style={{ color: "var(--fg-soft)" }}
              >
                {copy.editorialNote}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <span className="mono-meta mt-5 inline-block">
                {copy.lastUpdate}: {portfolioData.lastUpdated}
              </span>
            </Reveal>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-20 md:mt-28">
          <div className="hairline" aria-hidden />
          <div className="mt-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <span className="mono-meta">{copy.rights}</span>
            <span className="mono-meta">{copy.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Colophon;
