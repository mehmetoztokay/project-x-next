import { Link, Locale } from "@/i18n/routing";
import React, { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";

type Props = {
  children: ReactNode;
};



export const MainLayout = ({ children }: Props) => {
  const t = useTranslations("Layout");
  const locale = useLocale()
  return (
    <>
      <div>Current Locale: <b>{locale}</b></div>
      <div className="mb-5 border py-4 px-4 text-xl font-bold flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About Page</Link>

        <div className="ml-auto"><LocaleSwitcher /></div>
      </div>
      {children}
      <footer className="mt-10 bg-slate-600 py-5 text-white px-5">Footer</footer>
    </>
  );
};
