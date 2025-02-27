import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export type LocaleItem = {
  locale: string;
  prefixLocale: string;
  region: "tr" | "eu" | "int" | "id" | "olmayan-region";
  direction: "ltr" | "rtl";
  siteId: number;
};

export const locales: LocaleItem[] = [
  // Buraya language de eklenebilir defaultLanguage gibi bir sey
  // Turkiye
  { locale: "tr-tr", prefixLocale: "/tr", region: "tr", siteId: 0, direction: "ltr" },

  // EU
  { locale: "eu-mt", prefixLocale: "/en", region: "eu", siteId: 91, direction: "ltr" },
  { locale: "eu-es", prefixLocale: "/es", region: "eu", siteId: 92, direction: "rtl" },
  { locale: "eu-de", prefixLocale: "/de", region: "eu", siteId: 94, direction: "ltr" },
  { locale: "eu-it", prefixLocale: "/it", region: "eu", siteId: 95, direction: "ltr" },
  { locale: "eu-fr", prefixLocale: "/fr", region: "eu", siteId: 96, direction: "ltr" },

  // Indonesia
  { locale: "id-id", prefixLocale: "/id", region: "id", siteId: 50, direction: "ltr" },
  { locale: "id-en", prefixLocale: "/id-en", region: "id", siteId: 58, direction: "ltr" },

  // Africa
  { locale: "za-en", prefixLocale: "/id", region: "id", siteId: 300, direction: "ltr" },

  // International
  { locale: "int-my", prefixLocale: "/int", region: "int", siteId: 300, direction: "ltr" }, // Deafult Int-EN
  { locale: "int-jp", prefixLocale: "/int-jp", region: "int", siteId: 310, direction: "ltr" },
  { locale: "int-jp", prefixLocale: "/int-jp", region: "int", siteId: 304, direction: "ltr" },
  { locale: "int-th", prefixLocale: "/int-th", region: "int", siteId: 305, direction: "ltr" },
  { locale: "int-kr", prefixLocale: "/int-kr", region: "int", siteId: 302, direction: "ltr" },
  { locale: "int-tw", prefixLocale: "/int-tw", region: "int", siteId: 303, direction: "ltr" },
  { locale: "int-ph", prefixLocale: "/int-ph", region: "int", siteId: 306, direction: "ltr" },
  { locale: "int-pk", prefixLocale: "/int-pk", region: "int", siteId: 311, direction: "rtl" },
  { locale: "int-es", prefixLocale: "/int-es", region: "int", siteId: 307, direction: "ltr" },
  { locale: "int-es", prefixLocale: "/int-in", region: "int", siteId: 308, direction: "ltr" },
  { locale: "int-cn", prefixLocale: "/cn", region: "int", siteId: 304, direction: "ltr" },

  // Example
  {
    locale: "olmayan-dil",
    prefixLocale: "/olmayan-dil",
    region: "olmayan-region",
    siteId: 0,
    direction: "ltr",
  },
];

export const useCurrentSiteInfo = ({ locale }: { locale: LocaleItem["locale"] }): LocaleItem => {
  const foundSiteId = locales.find((l) => l.locale.toLocaleLowerCase() == locale?.toLocaleLowerCase());
  if (foundSiteId) return foundSiteId;
  else return locales.find((l) => l.locale == "eu-mt");
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
