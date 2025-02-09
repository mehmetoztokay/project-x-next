import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales: { locale: string; direction: "ltr" | "rtl" }[] = [
  { locale: "eu-en", direction: "ltr" },
  { locale: "eu-de", direction: "ltr" },
  { locale: "eu-es", direction: "rtl" },
  { locale: "eu-it", direction: "ltr" },
  { locale: "tr", direction: "ltr" },
  { locale: "int-th", direction: "rtl" },
  { locale: "olmayan-dil", direction: "ltr" }
];

export const routing = defineRouting({
  // ! If you add a language, you must also add a `middleware.ts` file with the following matcher: `matcher: ["/", "/(tr|de|en)/:path*"]`

  locales: locales.map((l: { locale: string; direction: string }) => l.locale),
  defaultLocale: "eu-en",
  domains: [
    // {
    //   domain: 'test-trive.vercel.app',
    //   defaultLocale: 'tr'
    //   // locales: ["tr"],
    // }
  ],
  pathnames: {
    "/": "/",
    "/about": {
      "eu-en": "/about-en",
      "eu-de": "/about-de",
      "eu-es": "/about-es",
      "eu-it": "/about-it",
      tr: "/about-tr",
      "int-th": "/about-int-th",
      "olmayan-dil": "/about-olmayan-dil"
    }
  },
  localePrefix: {
    mode: "always",
    prefixes: {
      "eu-en": "/en",
      "eu-de": "/de",
      "eu-es": "/es",
      "eu-it": "/it",
      tr: "/tr",
      "int-th": "/int-th"
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
