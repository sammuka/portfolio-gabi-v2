import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Dancing_Script,
} from "next/font/google";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/navigation/header";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: true,
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  preload: false,
});

type LocaleParams = { locale: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titleByLocale: Record<string, string> = {
    pt: "Gabriella Gonçalves | UX/UI Designer",
    en: "Gabriella Gonçalves | UX/UI Designer",
  };

  const descriptionByLocale: Record<string, string> = {
    pt: "Portfólio de Gabriella Gonçalves — UX/UI Designer. Design systems, pesquisa, prototipagem e experiências digitais intencionais.",
    en: "Portfolio of Gabriella Gonçalves — UX/UI Designer. Design systems, research, prototyping, and intentional digital experiences.",
  };

  return {
    title: titleByLocale[locale] ?? titleByLocale.pt,
    description: descriptionByLocale[locale] ?? descriptionByLocale.pt,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0C" },
    { media: "(prefers-color-scheme: light)", color: "#F5F4F0" },
  ],
  width: "device-width",
  initialScale: 1,
};

const NO_FLASH_THEME = `(function(){try{var t=localStorage.getItem('cold-archive-theme');if(t!=='dark'&&t!=='light'){t='dark';}var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t;}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} ${script.variable}`}
    >
      <body className="bg-bg text-fg">
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME }} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
