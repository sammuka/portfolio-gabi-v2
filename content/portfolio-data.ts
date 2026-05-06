/**
 * Contrato de dados — fonte única do conteúdo visível da landing (PT).
 * Toda string aqui vem literalmente ou parafraseada com fidelidade de docs/01..07.
 * Não adicionar projetos, clientes, métricas ou afirmações sem base documental.
 */

export interface Capability {
  id: string;
  title: string;
  description: string;
  token: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface ExperienceEntry {
  company: string;
  role?: string;
  description: string;
  source: string;
  validation?: string;
}

export interface EducationEntry {
  institution: string;
  description: string;
  validation?: string;
}

export interface Project {
  name: string;
  type: string;
  challenge: string;
  role: string;
  process: string;
  result: string;
  tags: string[];
  image?: string;
  link?: string;
}

export interface Collaborator {
  name: string;
  role?: string;
  url?: string;
}

export interface PublishedWork {
  id: string;
  kind: "design-system" | "article" | "case" | "talk";
  title: string;
  summary: string;
  collaborators: Collaborator[];
  primaryUrl: string;
  primaryLabel: string;
  referenceUrl?: string;
  referenceLabel?: string;
  publishedAt?: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  relation: string;
  quote: string[];
  authorized: boolean;
}

export interface PortfolioData {
  name: string;
  fullName: string;
  title: string;
  tagline: string;
  taglineAlternates: string[];
  subtitle: string;
  bioShort: string;
  bioLong: string;
  location: string;
  locationTimezone: string;
  linkedin: string;
  email: string;
  whatsapp: string;
  skills: string[];
  capabilities: Capability[];
  manifesto: string[];
  process: ProcessStep[];
  experience: ExperienceEntry[];
  domainContext: {
    title: string;
    body: string;
    sources: string[];
  };
  education: EducationEntry[];
  projects: Project[];
  publishedWork: PublishedWork[];
  testimonials: Testimonial[];
  projectsNote: string;
  rotatingWords: string[];
  showEntrepreneurshipBlock: boolean;
  entrepreneurship: {
    company: string;
    description: string;
    source: string;
    validation: string;
  };
  lastUpdated: string;
}

export const portfolioData: PortfolioData = {
  name: "Gabriella Gonçalves",
  fullName: "Gabriella Gonçalves dos Santos",
  title: "UX/UI Designer",
  tagline: "UX/UI Designer focada em experiências digitais intuitivas",
  taglineAlternates: [
    "Design de interfaces para produtos digitais mais claros e consistentes.",
    "UX/UI, prototipagem e design systems para experiências digitais intuitivas.",
    "Transformando fluxos complexos em interfaces simples de usar.",
    "Do protótipo ao design system: experiências digitais pensadas para evoluir.",
  ],
  subtitle:
    "Criação de interfaces, protótipos e sistemas visuais para produtos digitais mais claros, consistentes e fáceis de usar.",
  bioShort:
    "UX/UI Designer com foco em produtos digitais, prototipagem, usabilidade e design systems.",
  bioLong:
    "Gabriella Gonçalves dos Santos atua como UX/UI Designer, com mais de 2 anos de experiência na criação de produtos digitais. Seu foco profissional envolve design systems, prototipagem, usabilidade e Figma, sempre com atenção à construção de experiências intuitivas. Sua trajetória pública está associada à Sistran Informática, empresa de tecnologia voltada ao mercado segurador, um contexto em que clareza, consistência e compreensão de fluxos complexos são fundamentais. Integra ferramentas como Figma Make, Bolt.new e agentes de IA ao fluxo de prototipagem e análise de jornadas, acelerando a validação de hipóteses com precisão.",
  location: "Dois Vizinhos, PR — Brasil",
  locationTimezone: "America/Sao_Paulo",
  linkedin: "https://br.linkedin.com/in/gabriella-gon%C3%A7alves-0283841b2",
  email: "contato@gabriellagoncalves.com",
  whatsapp: "__PLACEHOLDER__",
  skills: [
    "UX/UI Design",
    "Design Systems",
    "Figma Make",
    "Bolt.new",
    "Agentes de IA",
    "Produtos Digitais",
  ],
  capabilities: [
    {
      id: "ux-ui",
      token: "01 / CORE",
      title: "UX/UI Design",
      description:
        "Desenho de interfaces para produtos digitais, equilibrando clareza visual, consistência e facilidade de uso.",
    },
    {
      id: "prototyping",
      token: "02 / PROCESSO",
      title: "Prototipagem",
      description:
        "Prototipagem acelerada com suporte de ferramentas de IA para iterar fluxos, validar hipóteses e apoiar decisões de produto antes do desenvolvimento.",
    },
    {
      id: "design-systems",
      token: "03 / SISTEMA",
      title: "Design Systems",
      description:
        "Organização de padrões visuais, componentes e diretrizes para tornar produtos mais consistentes e escaláveis.",
    },
    {
      id: "usability",
      token: "04 / JORNADA",
      title: "Usabilidade",
      description:
        "Análise de jornadas, fluxos e pontos de fricção para tornar a experiência mais simples e intuitiva.",
    },
    {
      id: "ai-prototyping",
      token: "05 / VELOCITY",
      title: "IA + Prototipagem",
      description:
        "Uso integrado de Figma Make, Bolt.new e agentes de IA para acelerar prototipagem, validar fluxos e iterar com precisão — sem abrir mão da qualidade do design.",
    },
    {
      id: "digital-products",
      token: "06 / CONTEXTO",
      title: "Produtos Digitais",
      description:
        "Atuação com produtos digitais em contextos de tecnologia aplicada a negócios complexos.",
    },
  ],
  manifesto: [
    "Design de produtos digitais",
    "com foco em clareza,",
    "consistência",
    "e experiências intuitivas.",
  ],
  process: [
    {
      index: "01",
      title: "Entendimento do problema",
      description:
        "Compreensão do contexto, objetivos do produto, necessidades dos usuários e restrições do negócio.",
    },
    {
      index: "02",
      title: "Organização da jornada",
      description:
        "Mapeamento de fluxos, telas, pontos de decisão e possíveis fricções.",
    },
    {
      index: "03",
      title: "Prototipagem",
      description:
        "Construção de wireframes e protótipos com apoio de ferramentas de IA (Figma Make, Bolt.new) para iterar caminhos de solução com velocidade e alinhamento com stakeholders.",
    },
    {
      index: "04",
      title: "Interface e consistência",
      description:
        "Criação de telas com atenção a hierarquia visual, componentes, padrões e consistência.",
    },
    {
      index: "05",
      title: "Handoff e evolução",
      description:
        "Preparação de materiais para desenvolvimento e evolução das interfaces a partir de feedbacks.",
    },
  ],
  experience: [
    {
      company: "Sistran Informática",
      role: "UX/UI Designer",
      description:
        "Atuação profissional associada à Sistran Informática, empresa de tecnologia com foco em soluções para o mercado segurador.",
      source: "https://br.linkedin.com/in/gabriella-gon%C3%A7alves-0283841b2",
      validation: "Validar datas e escopo antes de publicar detalhes.",
    },
  ],
  domainContext: {
    title: "Contexto de domínio",
    body: "Experiência associada a um ambiente de tecnologia para o mercado segurador, em que clareza de fluxos e consistência de interface são essenciais.",
    sources: [
      "https://www.sistran.com.br/",
      "https://www.sistran.com.br/sobre/",
      "https://www.sistran.com.br/solucoes/",
    ],
  },
  education: [
    {
      institution: "UNINTER Centro Universitário Internacional",
      description: "Formação associada ao perfil público no LinkedIn.",
      validation: "Curso e período pendentes de validação.",
    },
  ],
  projects: [],
  publishedWork: [
    {
      id: "ds-figma-isadora",
      kind: "design-system",
      title: "Design System — publicação colaborativa",
      summary:
        "Construção e publicação pública de um Design System no Figma, em coautoria com Isadora. Organização de tokens, componentes e diretrizes visuais para uso compartilhado.",
      collaborators: [{ name: "Isadora", role: "Coautoria" }],
      primaryUrl:
        "https://www.figma.com/design/YIQdXAgxeZxjJSS0cyvLqp/Design-System?node-id=142-475&p=f",
      primaryLabel: "Abrir no Figma",
      referenceUrl:
        "https://www.linkedin.com/feed/update/urn:li:activity:7361369948050337793/",
      referenceLabel: "Ver publicação no LinkedIn",
      tags: ["Design System", "Figma", "Tokens", "Componentes", "Colaboração"],
    },
  ],
  testimonials: [
    {
      id: "samuel-alves-tech-lead",
      author: "Samuel Alves",
      role: "Líder Técnico · Arquiteto de Soluções",
      relation: "Líder técnico direto por dois anos",
      quote: [
        "Tive a oportunidade de atuar como líder técnico da Gabriella nos últimos dois anos e acompanhar de perto sua evolução como UX/UI Designer. Nesse período, ela demonstrou uma combinação muito valiosa de sensibilidade visual, pensamento estruturado e atenção à experiência real do usuário.",
        "A Gabriella tem uma capacidade acima da média de transformar problemas complexos em interfaces claras, organizadas e agradáveis de usar. Além do domínio em prototipação e design de interfaces, sempre se destacou pela colaboração com o time técnico, pela abertura ao diálogo e pela preocupação em construir soluções viáveis, consistentes e bem alinhadas ao produto.",
        "É uma profissional dedicada, cuidadosa e em constante evolução, que contribui não apenas com boas telas, mas com visão, critério e maturidade no processo de construção de experiências digitais.",
      ],
      authorized: true,
    },
  ],
  projectsNote:
    "Um case público já no ar. Demais cases em curadoria para publicação autorizada.",
  rotatingWords: ["intuitivas", "claras", "consistentes", "escaláveis", "humanas"],
  showEntrepreneurshipBlock: false,
  entrepreneurship: {
    company: "Dal Molin Dev LTDA",
    description:
      "Possível vínculo profissional/empresarial em tecnologia. Usar somente se confirmado e autorizado.",
    source: "https://advdinamico.com.br/socios/gabriella-goncalves-dos-santos-5e4c9e6d",
    validation: "Pendente de validação com Gabriella.",
  },
  lastUpdated: "2026-05-06",
};

export const navSections = [
  { id: "hero", label: "Índice" },
  { id: "manifesto", label: "Manifesto" },
  { id: "capabilities", label: "Capacidades" },
  { id: "about", label: "Sobre" },
  { id: "process", label: "Processo" },
  { id: "work", label: "Trabalhos" },
  { id: "testimonials", label: "Depoimentos" },
  { id: "contact", label: "Contato" },
] as const;
