import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export type LocaleItem = {
  locale: string;
  prefixLocale: string;
  region: "tr" | "eu" | "int" | "id" | "olmayan-region";
  lang: string;
  shortLang: "en" | "es" | "de" | "it" | "fr" | "id" | "ja" | "th" | "ko" | "zh" | "ur" | "hi" | "tl" | "tr";
  direction: "ltr" | "rtl";
  siteId: number;
};

export const locales: LocaleItem[] = [
  // ! If you add a language, you must also add a `middleware.ts` file with the following matcher: `matcher: ["/", "/(tr|de|en)/:path*"]`
  // Turkiye
  { locale: "tr-tr", prefixLocale: "/tr", region: "tr", lang: "tr-TR", shortLang: "tr", siteId: -1, direction: "ltr" },

  // EU
  { locale: "eu-mt", prefixLocale: "/en", region: "eu", lang: "en-MT", shortLang: "en", siteId: 91, direction: "ltr" },
  { locale: "eu-es", prefixLocale: "/es", region: "eu", lang: "es-ES", shortLang: "es", siteId: 92, direction: "ltr" },
  { locale: "eu-de", prefixLocale: "/de", region: "eu", lang: "de-DE", shortLang: "de", siteId: 94, direction: "ltr" },
  { locale: "eu-it", prefixLocale: "/it", region: "eu", lang: "it-IT", shortLang: "it", siteId: 95, direction: "ltr" },
  { locale: "eu-fr", prefixLocale: "/fr", region: "eu", lang: "fr-FR", shortLang: "fr", siteId: 96, direction: "ltr" },

  // Indonesia
  { locale: "id-id", prefixLocale: "/id", region: "id", lang: "id-ID", shortLang: "id", siteId: 50, direction: "ltr" },
  { locale: "id-en", prefixLocale: "/id-en", region: "id", lang: "id-EN", shortLang: "en", siteId: 58, direction: "ltr" },

  // Africa
  { locale: "za-en", prefixLocale: "/afr", region: "int", lang: "en-ZA", shortLang: "en", siteId: 300, direction: "ltr" },

  // International
  { locale: "int-my", prefixLocale: "/int", region: "int", lang: "en-MY", shortLang: "en", siteId: 300, direction: "ltr" }, // Deafult Int-EN
  { locale: "int-jp", prefixLocale: "/int-jp", region: "int", lang: "ja-JP", shortLang: "ja", siteId: 310, direction: "ltr" },
  { locale: "int-th", prefixLocale: "/int-th", region: "int", lang: "th-MT", shortLang: "th", siteId: 305, direction: "ltr" },
  { locale: "int-kr", prefixLocale: "/int-kr", region: "int", lang: "ko-KR", shortLang: "ko", siteId: 302, direction: "ltr" },
  { locale: "int-tw", prefixLocale: "/int-tw", region: "int", lang: "zh-TW", shortLang: "zh", siteId: 303, direction: "ltr" },
  { locale: "int-ph", prefixLocale: "/int-ph", region: "int", lang: "tl-PH", shortLang: "tl", siteId: 306, direction: "ltr" },
  { locale: "int-pk", prefixLocale: "/int-pk", region: "int", lang: "ur-PK", shortLang: "ur", siteId: 311, direction: "rtl" },
  { locale: "int-es", prefixLocale: "/int-es", region: "int", lang: "es-MX", shortLang: "en", siteId: 307, direction: "ltr" }, // TODO: MX or SV?
  { locale: "int-in", prefixLocale: "/int-in", region: "int", lang: "hi-IN", shortLang: "hi", siteId: 308, direction: "ltr" },
  { locale: "int-cn", prefixLocale: "/cn", region: "int", lang: "zh-CN", shortLang: "zh", siteId: 304, direction: "ltr" },

  // Example
  {
    locale: "olmayan-dil",
    prefixLocale: "/olmayan-dil",
    region: "olmayan-region",
    lang: "en-MT",
    shortLang: "en",
    siteId: 0,
    direction: "ltr",
  },
];

export const useCurrentSiteInfo = ({ locale }: { locale: LocaleItem["locale"] }): LocaleItem => {
  const foundSiteId = locales.find((l) => l.locale.toLocaleLowerCase() == locale?.toLocaleLowerCase());
  if (foundSiteId) return foundSiteId;
  else return locales.find((l) => l.locale == "eu-mt")!;
  // Default will return "eu-mt"
};

const getPrefixes = (locales: LocaleItem[]): Record<string, string> =>
  locales.reduce(
    (acc, { locale, prefixLocale }) => {
      acc[locale] = prefixLocale;
      return acc;
    },
    {} as Record<string, string>,
  );

export const routing = defineRouting({
  // ! If you add a language, you must also add a `middleware.ts` file with the following matcher: `matcher: ["/", "/(tr|de|en)/:path*"]`

  locales: locales.map((l: { locale: string; direction: string }) => l.locale),
  defaultLocale: "eu-mt",
  domains: [
    // {
    //   domain: 'test-trive.vercel.app',
    //   defaultLocale: 'tr'
    //   // locales: ["tr"],
    // }
  ],
  localePrefix: {
    mode: "always",
    prefixes: getPrefixes(locales),

    // {
    //   "tr-tr": "/tr",
    //   "eu-mt": "/en",
    //   "eu-es": "/es",
    //   "eu-de": "/de",
    //   "eu-it": "/it",
    //   "int-th": "/int-th",
    // },
  },
  pathnames: {
    "/": "/",
    "/about": {
      "eu-mt": "/about-en-mt",
      "eu-de": "/about-de",
      "eu-es": "/about-es",
      "eu-it": "/about-it",
      "tr-tr": "/about-tr",
      "int-th": "/about-int-th",
      "olmayan-dil": "/about-olmayan-dil",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
