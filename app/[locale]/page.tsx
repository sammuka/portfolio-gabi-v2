import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import { SmoothScroll } from '@/components/motion/smooth-scroll';

import BootIntro from '@/components/sections/boot-intro';
import { Hero } from '@/components/sections/hero';
import { Manifesto } from '@/components/sections/manifesto';
import { Capabilities } from '@/components/sections/capabilities';
import { About } from '@/components/sections/about';
import { Process } from '@/components/sections/process';
import { DomainContext } from '@/components/sections/domain-context';
import { SelectedWork } from '@/components/sections/selected-work';
import { Testimonials } from '@/components/sections/testimonials';
import { Education } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';
import { Colophon } from '@/components/sections/colophon';

interface PageProps {
  params: Promise<{ locale: 'pt' | 'en' }>;
}

/**
 * Passo 25 — Orquestradora da home.
 *
 * Server component que monta as 12 seções na ordem canônica do V2
 * (Cold Archive). `BootIntro` fica FORA do `SmoothScroll` porque é um
 * overlay full-screen client (gerencia o próprio z-index + sessionStorage)
 * e não deve participar do Lenis. Todo o restante é envolto pelo Lenis
 * wrapper, que respeita `prefers-reduced-motion` via kill-switch interno.
 *
 * `content-visibility: auto` é aplicado a partir da 4ª seção (About em
 * diante) para economizar render nas seções abaixo da dobra. A hint
 * `contain-intrinsic-size: 100vh 720px` reserva espaço e evita layout
 * thrash no primeiro scroll.
 */
export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const deferredStyle = {
    contentVisibility: 'auto' as const,
    containIntrinsicSize: '100vh 720px',
  };

  return (
    <>
      <BootIntro />
      <SmoothScroll>
        <main>
          <Hero locale={locale} />
          <Manifesto locale={locale} />
          <Capabilities locale={locale} />
          <div style={deferredStyle}>
            <About locale={locale} />
          </div>
          <div style={deferredStyle}>
            <Process locale={locale} />
          </div>
          <div style={deferredStyle}>
            <DomainContext locale={locale} />
          </div>
          <div style={deferredStyle}>
            <SelectedWork locale={locale} />
          </div>
          <div style={deferredStyle}>
            <Testimonials locale={locale} />
          </div>
          <div style={deferredStyle}>
            <Education locale={locale} />
          </div>
          <div style={deferredStyle}>
            <Contact locale={locale} />
          </div>
          <Colophon locale={locale} />
        </main>
      </SmoothScroll>
    </>
  );
}
