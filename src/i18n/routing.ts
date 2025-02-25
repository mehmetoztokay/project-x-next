import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

type LocaleItem = {
  locale: string;
  direction: "ltr" | "rtl";
  siteId: number;
  prefixURL: string;
};

export const locales: LocaleItem[] = [
  // Turkiye
  { locale: "tr-tr", prefixURL: "/tr", siteId: 0, direction: "ltr" },

  // EU
  { locale: "eu-mt", prefixURL: "/en", siteId: 91, direction: "ltr" },
  { locale: "eu-es", prefixURL: "/es", siteId: 92, direction: "rtl" },
  { locale: "eu-de", prefixURL: "/de", siteId: 94, direction: "ltr" },
  { locale: "eu-it", prefixURL: "/it", siteId: 95, direction: "ltr" },
  { locale: "eu-fr", prefixURL: "/fr", siteId: 96, direction: "ltr" },

  // Indonesia
  { locale: "id-id", prefixURL: "/id", siteId: 50, direction: "ltr" },
  { locale: "id-en", prefixURL: "/id-en", siteId: 58, direction: "ltr" },

  // International
  { locale: "int-my", prefixURL: "/int", siteId: 300, direction: "ltr" }, // Deafult Int-EN
  { locale: "int-jp", prefixURL: "/int-jp", siteId: 310, direction: "ltr" },
  { locale: "int-jp", prefixURL: "/int-jp", siteId: 304, direction: "ltr" },
  { locale: "int-th", prefixURL: "/int-th", siteId: 305, direction: "ltr" },
  { locale: "int-kr", prefixURL: "/int-kr", siteId: 302, direction: "ltr" },
  { locale: "int-tw", prefixURL: "/int-tw", siteId: 303, direction: "ltr" },
  { locale: "int-ph", prefixURL: "/int-ph", siteId: 306, direction: "ltr" },
  { locale: "int-es", prefixURL: "/int-es", siteId: 307, direction: "ltr" },
  { locale: "int-es", prefixURL: "/int-in", siteId: 308, direction: "ltr" },
  { locale: "int-cn", prefixURL: "/cn", siteId: 304, direction: "ltr" },

  // Example
  {
    locale: "olmayan-dil",
    prefixURL: "/olmayan-dil",
    siteId: 0,
    direction: "ltr",
  },
];

export const getSiteIdWithLocale = (locale?: string) => {
  const currentLocale = useLocale();
  const foundSiteId = locales.find(
    (l) => l.locale.toLocaleLowerCase() == (locale ? locale?.toLowerCase() : currentLocale?.toLocaleLowerCase()),
  )?.siteId;
  if (foundSiteId) return foundSiteId;
  else return 0;
};

const getPrefixes = (locales: LocaleItem[]): Record<string, string> =>
  locales.reduce(
    (acc, { locale, prefixURL }) => {
      acc[locale] = prefixURL;
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
