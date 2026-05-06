'use client';

import dynamic from 'next/dynamic';

/**
 * Client-only lazy wrapper around <GrainBackdrop />.
 *
 * Existe para permitir que seções server-side (ex.: Hero) incluam o shader
 * sem SSR. `next/dynamic({ ssr: false })` só pode ser invocado a partir de um
 * módulo 'use client', por isso esta ponte.
 *
 * Fallback: um retângulo pintado com `var(--bg)` enquanto o chunk carrega,
 * evitando flash de cor. Props são repassadas literalmente.
 */
const GrainBackdropInner = dynamic(
  () => import('./grain-backdrop').then((m) => m.GrainBackdrop),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'var(--bg)' }}
      />
    ),
  },
);

interface GrainBackdropLazyProps {
  className?: string;
}

export function GrainBackdropLazy(props: GrainBackdropLazyProps) {
  return <GrainBackdropInner {...props} />;
}

export default GrainBackdropLazy;
