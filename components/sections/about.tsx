import { Counter } from '@/components/motion/counter';
import { MonoTag } from '@/components/primitives/mono-tag';
import { Reveal } from '@/components/motion/reveal';
import { getPortfolioData } from '@/content/get-portfolio-data';
import { AboutPortrait } from './about-portrait';

/**
 * About — Passo 17.
 *
 * Layout bipartite: retrato circular B&W com outline azul (parallax) +
 * bio longa, stats em grid mono e contador animado "2+".
 *
 * Server component: o retrato (parallax via Motion `useScroll`+`useTransform`)
 * e o contador são isolados como client components.
 *
 * Regras:
 * - Sem hex cru — tudo via tokens `--bg`, `--accent`, `--accent-mute`, etc.
 * - Script reservado ao colophon; destaque final usa `text-accent`, não script.
 * - Kill-switch herdado via Counter/Reveal/useReducedMotion.
 */
export interface AboutProps {
  locale: 'pt' | 'en';
}

const COPY = {
  pt: {
    eyebrow: 'ABOUT',
    titlePrefix: 'Desenhar para que o complexo se torne ',
    titleAccent: 'óbvio',
    titleSuffix: '.',
    bio: [
      'Sou UX/UI Designer com mais de 3 anos de experiência na criação de produtos digitais.',
      'Meu foco profissional envolve design systems, prototipagem, usabilidade e Figma, sempre com atenção à construção de experiências intuitivas.',
      'Estou finalizando minha formação em Engenharia de Software e também cursando o IAUX Designer, do Leandro Rezende, da UX Unicórnio, ampliando minha visão sobre a integração entre experiência do usuário, inteligência artificial e desenvolvimento de produtos digitais.',
      'Atuei por um bom tempo em uma empresa de tecnologia voltada ao mercado segurador, contexto em que clareza, consistência e compreensão de fluxos complexos são fundamentais. Integro ferramentas como Figma Make, Bolt.new e agentes de IA ao meu fluxo de prototipagem e análise de jornadas, acelerando a validação de hipóteses com precisão.',
    ],
    stats: [
      { label: 'TÍTULO', value: 'UX/UI Designer' },
      { label: 'FERRAMENTA', value: 'Figma' },
      { label: 'LOCALIDADE', value: 'Dois Vizinhos · PR' },
      { label: 'FORMAÇÃO', value: 'UNINTER' },
    ],
    experienceLabel: 'ANOS EM PRODUTO DIGITAL',
    portraitAlt:
      'Retrato profissional de Gabriella Gonçalves — UX/UI Designer',
  },
  en: {
    eyebrow: 'ABOUT',
    titlePrefix: 'Design so that the complex becomes ',
    titleAccent: 'obvious',
    titleSuffix: '.',
    bio: [
      'Gabriella Gonçalves dos Santos works as a UX/UI Designer, with over 2 years of experience building digital products.',
      'Her professional focus covers design systems, prototyping, usability and Figma, always with attention to building intuitive experiences.',
      'Her public track record is associated with Sistran Informática, a technology company serving the insurance market — a context where clarity, consistency and the ability to understand complex flows are essential.',
      'She integrates tools like Figma Make, Bolt.new and AI agents into her prototyping and journey analysis workflow, accelerating hypothesis validation with precision.',
    ],
    stats: [
      { label: 'TITLE', value: 'UX/UI Designer' },
      { label: 'TOOL', value: 'Figma' },
      { label: 'LOCATION', value: 'Dois Vizinhos · PR' },
      { label: 'EDUCATION', value: 'UNINTER' },
    ],
    experienceLabel: 'YEARS IN DIGITAL PRODUCT',
    portraitAlt:
      'Professional portrait of Gabriella Gonçalves — UX/UI Designer',
  },
} as const;

export function About({ locale }: AboutProps) {
  const copy = COPY[locale];
  // `getPortfolioData` importado para manter a seção alinhada ao contrato
  // de dados (mesmo que a cópia seja hardcoded em 3 parágrafos aqui).
  void getPortfolioData(locale);

  return (
    <section
      id="about"
      className="relative py-32 md:py-40"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal>
          <MonoTag index="004" label={copy.eyebrow} />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
          {/* Portrait — col-span-5, circular B&W + outline accent + parallax */}
          <div className="md:col-span-5">
            <AboutPortrait alt={copy.portraitAlt} />
          </div>

          {/* Content — col-span-7: título + bio + stats + counter */}
          <div className="flex flex-col gap-10 md:col-span-7">
            <Reveal>
              <h2
                id="about-title"
                className="display-lg text-fg"
              >
                {copy.titlePrefix}
                <span className="text-accent">{copy.titleAccent}</span>
                {copy.titleSuffix}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="body-lg space-y-6 text-fg-soft">
                {copy.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="grid grid-cols-2 gap-6 border-t border-[color:var(--hairline)] pt-8 sm:grid-cols-4">
                {copy.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="mono-meta text-fg-mute">
                      {stat.label}
                    </span>
                    <span className="font-display body-lg text-fg">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex items-baseline gap-4">
                <Counter
                  from={0}
                  to={2}
                  suffix="+"
                  className="font-display display-lg text-accent"
                />
                <span className="mono-meta text-fg-mute">
                  {copy.experienceLabel}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
