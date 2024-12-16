import {createNavigation} from "next-intl/navigation";
import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["eu-en", "de", "tr"],
  defaultLocale: "eu-en",
  domains: [
    {
      domain: "test-trive.vercel.com",
      defaultLocale: "tr",
      locales: ["eu-en", "tr"],
    },
  ],
  pathnames: {
    "/": "/",
    "/about": {
      "eu-en": "/about-en",
      de: "/about-de",
      tr: "/about-tr",
    },
  },
  localePrefix: {
    mode: "always",
    prefixes: {
      "eu-en": "/en",
      de: "/de",
      tr: "/tr",
      // (/zh will be used as-is)
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} = createNavigation(routing);
