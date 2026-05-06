# Cold Archive — Direção Criativa V2

**Direção:** Cold Archive
**Portfólio:** Gabriella Gonçalves — UX/UI Designer
**Data:** 2026-05-06
**Status:** Direção travada, implementação em integração final

---

## Contexto

A V2 nasce de uma constatação objetiva: o portfólio V1 ("Quiet System") foi construído sob uma ótica editorial-humanista, com tons quentes, tipografia narrativa e um ritmo calmo de leitura. Esse registro serviu bem para consolidar a voz autoral da Gabi, mas não responde ao contexto atual de trabalho dela — pitches de produto em empresas SaaS, tech e B2B, onde o portfólio é lido em janelas curtas, por leitores técnicos (hiring managers de produto, head of design, fundadores de startup) e precisa comunicar densidade de sistema antes de comunicar sensibilidade.

Cold Archive é, portanto, um corte radical: dark-first, paleta de carbono, azul royal como único acento, tipografia display neogrotesca. O site deixa de performar como ensaio e passa a performar como **arquivo técnico navegável** — com zonas claras (hero, manifesto, capabilities, about, process, work, testimonials, contact), ritmo rígido de hairlines, metadados em mono, e uma única marca de calor preservada: a assinatura "Gabi" em script no colophon, como selo humano no rodapé de um documento frio.

A relação com a V1 é de continuidade estratégica, não estética. A escala tipográfica canônica (display-xxl → mono-meta) foi herdada; a paleta foi descartada. O contrato de conteúdo foi migrado 1:1 (mesma Gabi, mesmas capabilities, mesmo processo), mas recontextualizado em um shell visual que comunica rigor sistêmico em vez de sensibilidade editorial.

---

## Referências analisadas

| Referência | Aporte para Cold Archive |
|---|---|
| [leopoldoengroff.com](https://leopoldoengroff.com) | Densidade arquivística, uso de grid tipográfico rígido, metadados em mono como estrutura narrativa, ritmo de hairlines como divisores silenciosos. |
| [julio-angeli.lovable.app](https://julio-angeli.lovable.app) | Uso disciplinado de acento único (azul) sobre base carbono, tratamento dark-first sem necessidade de light mode, hierarquia de CTAs ancorada em eyebrows e mono-meta. |

---

## Paleta completa

Extraída de [`app/globals.css`](../../app/globals.css).

### Tokens de cor

| Token CSS | Valor | Papel |
|---|---|---|
| `--bg` | `#0A0A0C` | Fundo principal (carbono quase preto) |
| `--surface-2` | `#111114` | Superfície elevada tier 1 (cards, seções) |
| `--surface-3` | `#16161B` | Superfície elevada tier 2 (dialog, overlays) |
| `--fg` | `#EDEDED` | Texto primário |
| `--fg-soft` | `#B3B3B3` | Texto secundário, corpo longo |
| `--fg-mute` | `#808080` | Metadados, eyebrows, captions |
| `--accent` | `#3B7CDE` | Azul royal — acento único do sistema |
| `--accent-soft` | `rgba(59, 124, 222, 0.15)` | Fundo de badges, estados hover suaves |
| `--accent-mute` | `rgba(59, 124, 222, 0.7)` | Acento atenuado (dots, pulses) |
| `--hairline` | `rgba(237, 237, 237, 0.08)` | Divisor padrão |
| `--hairline-strong` | `rgba(237, 237, 237, 0.2)` | Divisor com gradiente, hairline horizontal |

### Radius

| Token | Valor |
|---|---|
| `--radius-sm` | `6px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `20px` |

### Easing

| Token | Valor | Uso |
|---|---|---|
| `--ease-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entradas, reveals, pulses |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transições simétricas |

---

## Tipografia

| Família | Token | Papel |
|---|---|---|
| **Space Grotesk** | `--font-display` | Display (hero, section headings, manifesto) |
| **Inter** | `--font-body` | Corpo, UI, descrições |
| **JetBrains Mono** | `--font-mono` | Metadados, tokens, eyebrows monospaced |
| **Dancing Script** | `--font-script` | **Exclusivo ao colophon.** Uso único na assinatura "Gabi" no rodapé. Nenhuma outra seção aplica `.font-script`. |

### Escala canônica

```
display-xxl  clamp(3.5rem, 11vw, 11rem)     line-height 0.9
display-xl   clamp(2.5rem, 7vw, 6rem)       line-height 0.95
display-lg   clamp(1.75rem, 4.5vw, 3.5rem)  line-height 1.05
display-md   clamp(1.5rem, 3vw, 2.5rem)     line-height 1.1
display-sm   clamp(1.125rem, 2vw, 1.5rem)   line-height 1.2
body-lg      1.0625rem                      line-height 1.6
body-base    0.9375rem                      line-height 1.65
body-sm      0.8125rem                      line-height 1.55
eyebrow      0.75rem   letter-spacing 0.22em  uppercase
mono-meta    0.625rem  letter-spacing 0.22em  uppercase
```

---

## Regras invioláveis aplicadas

1. **Dark-first.** O sistema nasce dark. Light mode é stub futuro (`[data-theme="light"]` vazio em `globals.css`).
2. **Acento único.** Apenas `#3B7CDE` (e suas variações mute/soft) funciona como cor de destaque. Nenhum segundo acento introduzido.
3. **Dancing Script exclusivo ao colophon.** Nenhum título, quote ou decoração pode usar `.font-script` fora do rodapé.
4. **Lenis controla o scroll.** `scroll-behavior: auto` no HTML; suavização nativa suprimida.
5. **`prefers-reduced-motion` é kill-switch universal.** Todas as animações (GSAP, Motion, marquee, pulse) respeitam o override em `@media (prefers-reduced-motion: reduce)`.
6. **Escala tipográfica canônica.** Nenhum componente define `font-size` arbitrário — tudo resolve via classes `.display-*`, `.body-*`, `.eyebrow`, `.mono-meta`.
7. **Hairlines em vez de borders.** Divisores usam gradiente (`.hairline`) ou `--hairline` / `--hairline-strong`, nunca `border: 1px solid`.
8. **Zero conteúdo fabricado.** Depoimentos, projetos e dados não confirmados aparecem como skeleton ou são omitidos.

---

## Decisões travadas pela Gabi

1. **WhatsApp como 3º CTA.** Além de LinkedIn e e-mail, o contato passa a incluir WhatsApp. Número real ainda pendente — campo `whatsapp` em [`content/portfolio-data.en.ts`](../../content/portfolio-data.en.ts) preenchido com `__PLACEHOLDER__` até validação.
2. **i18n real PT/EN via `next-intl`.** Sem fallback mock — `next-intl@4` integrado ao App Router, rotas segmentadas, contrato de conteúdo duplicado em [`content/portfolio-data.ts`](../../content/portfolio-data.ts) (PT) e [`content/portfolio-data.en.ts`](../../content/portfolio-data.en.ts) (EN).
3. **Testimonials como skeleton "Em breve".** A seção existe no layout, mas renderiza placeholder neutro. Nada fabricado enquanto não há depoimentos reais validados.
4. **Accent azul `#3B7CDE`.** Corte radical com a paleta quente da V1 ("Quiet System"). Azul royal escolhido como única cor de destaque do sistema, reforçando a leitura "arquivo técnico" em vez de "ensaio editorial".

---

## Ambiguidades pendentes / TODOs abertos

- **Número de WhatsApp real.** Aguarda Gabi — campo `whatsapp: "__PLACEHOLDER__"` em [`content/portfolio-data.en.ts`](../../content/portfolio-data.en.ts) (e no PT equivalente).
- **Copy EN marcada como `PENDING_REVIEW`.** Primeira linha de [`content/portfolio-data.en.ts`](../../content/portfolio-data.en.ts) sinaliza que toda a tradução aguarda validação humana. Itens específicos catalogados em [`01_translation_pending_review.md`](./01_translation_pending_review.md).
- **Light mode.** Bloco `[data-theme="light"]` em `globals.css` está vazio (stub). Implementação prevista para fase futura, apenas se demandada.
- **Node 24 warning.** `package.json` declara engine recomendada Node 24; ambiente local de desenvolvimento está rodando Node 22. Sem impacto funcional, mas gera warning no install. Alinhar versão do runtime antes do deploy.

---

## Stack final utilizada

| Camada | Biblioteca / Versão |
|---|---|
| Framework | **Next.js 16** (App Router) |
| UI runtime | **React 19** |
| Styling | **Tailwind CSS 4** (`@theme inline`) |
| Animação declarativa | **Motion 12** (`framer-motion` successor) |
| Scroll | **Lenis 1.3** |
| Animação imperativa | **GSAP 3** + **ScrollTrigger** |
| Split de texto | **split-type** |
| 3D | **Three** + **@react-three/fiber** (R3F) |
| i18n | **next-intl 4** |

---

*Documento de direção — Cold Archive V2. Última atualização: 2026-05-06.*
