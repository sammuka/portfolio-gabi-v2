"use client";

import { useEffect, useState } from "react";

interface LiveClockProps {
  /**
   * Timezone IANA. Default `America/Sao_Paulo` → exibe sufixo `BRT`.
   */
  timeZone?: string;
}

/**
 * LiveClock — relógio HH:MM:SS ao vivo, atualiza 1x/s.
 *
 * Hydration-safe: primeira render (SSR + client) devolve placeholder `—:—:—`,
 * o tempo real só aparece depois de `useEffect`. `suppressHydrationWarning`
 * protege contra drift caso o timezone do servidor difira do cliente.
 *
 * API idêntica à V1 (única prop `timeZone`).
 */
export function LiveClock({ timeZone = "America/Sao_Paulo" }: LiveClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="font-mono tabular-nums" aria-hidden>
        —:—:—
      </span>
    );
  }

  const fmt = new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <time
      dateTime={now.toISOString()}
      className="font-mono tabular-nums"
      suppressHydrationWarning
    >
      {fmt.format(now)} BRT
    </time>
  );
}
