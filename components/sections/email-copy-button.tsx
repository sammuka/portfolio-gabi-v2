'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface EmailCopyButtonProps {
  /** E-mail de destino (vem de portfolioData.email). */
  email: string;
  /** Rótulo padrão (ex.: "Copiar e-mail ↗"). */
  label: string;
  /** Rótulo de confirmação (ex.: "Copiado ✓"). */
  labelCopied: string;
  /** Duração da mensagem de confirmação em ms. Default 2000. */
  timeoutMs?: number;
  /** Texto a ser anunciado por leitores de tela quando copiado. */
  srCopied: string;
  className?: string;
}

/**
 * EmailCopyButton — client-only. Copia o e-mail para o clipboard e mostra
 * um estado transitório "Copiado ✓" por ~2s. Fallback silencioso em caso
 * de falha (clipboard indisponível).
 *
 * Acessibilidade: usa `aria-live="polite"` para anunciar a confirmação.
 */
export function EmailCopyButton({
  email,
  label,
  labelCopied,
  timeoutMs = 2000,
  srCopied,
  className,
}: EmailCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      }
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), timeoutMs);
    } catch {
      /* clipboard indisponível: não anuncia falsamente sucesso */
    }
  }, [email, timeoutMs]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={[
        'mono-meta inline-flex items-center justify-center gap-2',
        'rounded-full px-5 py-3',
        'bg-bg text-fg',
        'border border-solid border-hairline-strong',
        'transition-colors duration-300',
        'hover:bg-fg hover:text-bg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span>{copied ? labelCopied : label}</span>
      <span className="sr-only">{copied ? srCopied : ''}</span>
    </button>
  );
}

export default EmailCopyButton;
