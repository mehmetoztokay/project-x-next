import {Link, Locale} from "@/i18n/routing";
import React, {ReactNode} from "react";
import {useLocale, useTranslations} from "next-intl";
import {LocaleSwitcher} from "./LocaleSwitcher";
import {Button} from "@/components/Atoms/Button";
import {Navbar} from "@/components/Navbar";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({children}: Props) => {
  const t = useTranslations("Layout");
  const locale = useLocale();
  return (
    <>
      <Navbar />
      <div className="my-7"></div>
      <div className="mt-14">
        Current Locale: <b>{locale}</b>
      </div>
      <div className="mb-5 border py-4 px-4 font-bold flex gap-4 items-center">
        <Button text="selam" />
        <Link href="/">Home</Link>
        <Link href="/about">About Page</Link>
      </div>
      {children}
      <footer className="mt-[1000px] bg-slate-600 py-5 text-white px-5">Footer</footer>
    </>
  );
};
