# Translation Pending Review — Gabriella Gonçalves V2 (EN)

**Data:** 2026-05-06
**Fonte:** [`content/portfolio-data.en.ts`](../../content/portfolio-data.en.ts)
**Status:** Aguardando validação humana

> Este documento lista traduções que foram geradas automaticamente e aguardam validação da Gabi antes de publicação em produção. O arquivo `portfolio-data.en.ts` está sinalizado com `// PENDING_REVIEW — awaiting Gabi validation` em sua primeira linha. Cada item abaixo traz a string atual em EN e 1–2 alternativas sugeridas. Marque o checkbox após aceite.

---

## Strings flagadas

### 1. `location`

- **Atual (EN):** `"Dois Vizinhos, PR — Brazil"`
- **Ponto de ambiguidade:** grafia do país — `Brazil` (en-US) vs `Brasil` (pt-BR preservado como nome próprio).
- **Alternativas:**
  - `"Dois Vizinhos, PR — Brazil"` (atual, padrão internacional)
  - `"Dois Vizinhos, PR — Brasil"` (preserva grafia original como proper noun)
- [ ] Aceite

---

### 2. `domainContext.title`

- **Atual (EN):** `"Domain context"`
- **Ponto de ambiguidade:** tradução literal de "Contexto de domínio" pode soar genérica em EN.
- **Alternativas:**
  - `"Domain context"` (atual, literal)
  - `"Industry context"`
  - `"Background"`
- [ ] Aceite

---

### 3. `process[0].title`

- **Atual (EN):** `"Understanding the problem"`
- **Ponto de ambiguidade:** gerúndio pode ser substituído por substantivo mais preciso do vocabulário UX.
- **Alternativas:**
  - `"Understanding the problem"` (atual)
  - `"Problem framing"`
- [ ] Aceite

---

### 4. `process[1].title`

- **Atual (EN):** `"Structuring the journey"`
- **Ponto de ambiguidade:** tradução literal de "Estruturação da jornada"; EN prefere termos mais canônicos de UX.
- **Alternativas:**
  - `"Structuring the journey"` (atual)
  - `"Journey mapping"`
  - `"Flow structure"`
- [ ] Aceite

---

### 5. `capabilities.ux-ui.description`

- **Atual (EN):** `"Design of digital product interfaces, balancing visual clarity, consistency and ease of use."`
- **Ponto de ambiguidade:** verificar fluência — estrutura "Design of..." é tradução direta do PT e pode soar nominalizada demais em EN.
- **Alternativas:**
  - `"Design of digital product interfaces, balancing visual clarity, consistency and ease of use."` (atual)
  - `"Designing digital product interfaces that balance visual clarity, consistency and ease of use."`
- [ ] Aceite

---

### 6. `bioLong` — última frase

- **Atual (EN):** `"...a context where clarity, consistency and the ability to understand complex flows are essential."`
- **Ponto de ambiguidade:** "ability to understand complex flows" é tradução direta; pode ser mais idiomática.
- **Alternativas:**
  - `"...the ability to understand complex flows are essential."` (atual)
  - `"...the capacity to navigate complex flows are essential."`
  - `"...fluency in complex flows are essential."`
- [ ] Aceite

---

### 7. `entrepreneurship.description`

- **Atual (EN):** `"Possible professional/business link in technology. Use only if confirmed and authorized."`
- **Ponto de ambiguidade:** depende de `showEntrepreneurshipBlock` (atualmente `false`). Só entra em produção se o bloco for ativado — revisar tom e fraseado caso a Gabi autorize exibição.
- **Alternativas:**
  - `"Possible professional/business link in technology. Use only if confirmed and authorized."` (atual, interno/draft)
  - `"Business affiliation in technology — pending confirmation."` (forma pública, caso ativado)
- [ ] Aceite (e decisão sobre `showEntrepreneurshipBlock`)

---

### 8. `taglineAlternates[3]`

- **Atual (EN):** `"From prototype to design system: digital experiences built to evolve."`
- **Ponto de ambiguidade:** escolha entre `built to evolve` (mais orgânico) e `designed to evolve` (mais alinhado ao vocabulário do portfólio).
- **Alternativas:**
  - `"...digital experiences built to evolve."` (atual)
  - `"...digital experiences designed to evolve."`
- [ ] Aceite

---

### 9. `publishedWork[0].title`

- **Atual (EN):** `"Design System — collaborative publication"`
- **Ponto de ambiguidade:** "publication" em EN implica paper/artigo; "release" é mais usado para software/design system público.
- **Alternativas:**
  - `"Design System — collaborative publication"` (atual)
  - `"Design System — collaborative release"`
- [ ] Aceite

---

### 10. `publishedWork[0].collaborators[0].role`

- **Atual (EN):** `"Co-author"`
- **Ponto de ambiguidade:** `Co-author` (papel de pessoa) vs `Co-authorship` (tipo de relação). Depende de como o dado é renderizado no componente.
- **Alternativas:**
  - `"Co-author"` (atual, papel pessoal)
  - `"Co-authorship"` (tipo de relação/contribuição)
- [ ] Aceite

---

## Próximos passos

1. Gabi revisa cada item e marca o checkbox correspondente.
2. Após aceite, atualizar [`content/portfolio-data.en.ts`](../../content/portfolio-data.en.ts) com as strings finais.
3. Remover a linha `// PENDING_REVIEW — awaiting Gabi validation` no topo do arquivo quando todos os itens estiverem validados.

---

*Translation Pending Review — Cold Archive V2. Última atualização: 2026-05-06.*
