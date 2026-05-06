"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { navSections } from "@/content/portfolio-data";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const MOBILE_DRAWER_ID = "nav-mobile-drawer";

export function Header() {
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc fecha o drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Filtra seções mostradas no nav central (omite hero, que é o topo)
  const centerSections = navSections.filter((s) => s.id !== "hero");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-14 md:h-16",
          "transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-soft)]",
          scrolled
            ? "backdrop-blur bg-[color-mix(in_oklab,var(--bg)_60%,transparent)] border-b border-[var(--hairline)] text-[var(--fg)]"
            : "mix-blend-difference text-white"
        )}
      >
        <div className="flex h-full items-center justify-between px-6 lg:px-10">
          {/* Esquerda: logo */}
          <a
            href={`/${locale}`}
            aria-label="Gabriella Gonçalves — início"
            className="display-sm font-display leading-none tracking-tight"
          >
            GG
          </a>

          {/* Centro: nav (md+) */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-6"
          >
            {centerSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "mono-meta uppercase tracking-[0.14em]",
                  "transition-colors duration-200",
                  "hover:text-[var(--accent)]"
                )}
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Direita: language + theme + hamburger */}
          <div className="flex items-center gap-3 md:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_DRAWER_ID}
              className={cn(
                "md:hidden inline-flex h-8 w-8 items-center justify-center",
                "border border-current rounded-full"
              )}
            >
              <span className="relative block h-[10px] w-4">
                <span className="absolute left-0 top-0 h-px w-full bg-current" />
                <span className="absolute left-0 top-[4px] h-px w-full bg-current" />
                <span className="absolute left-0 top-[8px] h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        {/* backdrop */}
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-[color-mix(in_oklab,var(--bg)_80%,transparent)]",
            "transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />
        {/* drawer */}
        <aside
          id={MOBILE_DRAWER_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className={cn(
            "absolute top-0 right-0 h-full w-[80%] max-w-sm",
            "bg-[var(--bg)] border-l border-[var(--hairline)]",
            "transition-transform duration-500 ease-[var(--ease-soft)]",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-14 items-center justify-between px-6">
            <span className="display-sm font-display leading-none">GG</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex h-8 w-8 items-center justify-center border border-[var(--hairline-strong)] rounded-full text-[var(--fg)]"
            >
              <span className="relative block h-3 w-3">
                <span className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav
            aria-label="Navegação móvel"
            className="flex flex-col gap-1 px-6 py-4"
          >
            {centerSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "border-b border-[var(--hairline)] py-4",
                  "font-display display-sm",
                  "text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                )}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
