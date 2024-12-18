import {createNavigation} from "next-intl/navigation";
import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  // ! If you add a language, you must also add a `middleware.ts` file with the following matcher: `matcher: ["/", "/(tr|de|en)/:path*"]`

  locales: ["eu-en", "de", "tr", "int-th", "olmayan-dil"],
  defaultLocale: "eu-en",
  domains: [
    {
      domain: "test-trive.vercel.app",
      defaultLocale: "tr",
      // locales: ["tr"],
    },
  ],
  pathnames: {
    "/": "/",
    "/about": {
      "eu-en": "/about-en",
      de: "/about-de",
      tr: "/about-tr",
      "int-th": "/about-int-th",
      "olmayan-dil": "/about-olmayan-dil",
    },
  },
  localePrefix: {
    mode: "always",
    prefixes: {
      "eu-en": "/en",
      de: "/de",
      tr: "/tr",
      "int-th": "/int-th",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} = createNavigation(routing);
