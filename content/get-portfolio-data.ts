/**
 * Locale-aware selector for portfolio data.
 * Synchronous helper — both datasets are bundled at build time.
 */

import { portfolioData, navSections, type PortfolioData } from "./portfolio-data";
import { portfolioDataEn, navSectionsEn } from "./portfolio-data.en";

export type Locale = "pt" | "en";

export function getPortfolioData(locale: Locale): PortfolioData {
  return locale === "en" ? portfolioDataEn : portfolioData;
}

export function getNavSections(locale: Locale) {
  return locale === "en" ? navSectionsEn : navSections;
}

export type { PortfolioData } from "./portfolio-data";
