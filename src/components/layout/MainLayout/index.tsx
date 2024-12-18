import { Link, Locale } from "@/i18n/routing";
import React, { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/layout/MainLayout/LocaleSwitcher";
import { useMessages, useTranslations } from "next-intl";
import { CountryFlag } from "./CountryFlag";
import { LocaleSwitcherNew } from './LocaleSwitcherNew/index';

type Props = {
  children: ReactNode;
};



export const MainLayout = ({ children }: Props) => {
  const t = useTranslations("Layout");
  const localeItems = t.raw("locales")

  return (
    <>
      <div className="mb-5 border py-4 px-4 text-xl font-bold flex gap-4">
        {/* Navigation Links */}
        <Link href="/">Home</Link>
        <Link href="/about">About Page</Link>

        <div>

        </div>

        {/* <div>
          {Object.keys(localeItems).every((locale: any) => typeof localeItems[locale] === "object") && <ul>
            {Object.keys(localeItems).map((locale: any) => (
              <li key={locale}>
                <div>{localeItems[locale].title} <div> <CountryFlag isoCode={localeItems[locale].isoCode} className="rounded-sm w-5" /></div></div>
              </li>
            ))}
          </ul>}
        </div> */}

        {/* <div className="ml-auto">
          <LocaleSwitcher />
        </div> */}

        <div><LocaleSwitcherNew /></div>
      </div>
      {children}
      <footer className="mt-10 bg-slate-600 py-5 text-white px-5">Footer</footer>
    </>
  );
};
