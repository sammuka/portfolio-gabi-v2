"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<(typeof routing.locales)[number], string> = {
  pt: "PT",
  en: "EN",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const change = (next: (typeof routing.locales)[number]) => {
    if (next === locale) return;
    // preserva pathname e hash atual
    const hash =
      typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${hash}`, { locale: next });
  };

  return (
    <div
      role="group"
      aria-label="Selecionar idioma"
      className="flex items-center gap-1 mono-meta uppercase tracking-[0.14em]"
    >
      {routing.locales.map((code, idx) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => change(code)}
              aria-pressed={active}
              aria-label={`Mudar idioma para ${LABELS[code]}`}
              className={cn(
                "transition-colors duration-200",
                active
                  ? "text-[var(--accent)]"
                  : "text-[var(--fg-mute)] hover:text-[var(--fg)]"
              )}
            >
              [{LABELS[code]}]
            </button>
            {idx < routing.locales.length - 1 && (
              <span aria-hidden className="text-[var(--fg-mute)]">
                /
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
