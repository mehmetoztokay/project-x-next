"use client";

import {Link, Locale, routing, usePathname, useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";
import React from "react";

const PageLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const changeLocale = (newLocale: string) => {
    router.push(pathname, {locale: newLocale});
  };

  // console.log(routing.locales.toString());
  // console.log(params);

  return (
    <div className="mb-5 border py-4 px-4 text-xl font-bold flex gap-4">
      {/* Navigation Links */}
      <Link href="/">Home</Link>
      <Link href="/about">About Page</Link>

      {/* Locale Switcher */}
      <div className="ml-auto flex gap-4">
        <p className="font-light border p-3">Current Locale: {routing.locales.toString()}</p>
        <button onClick={() => changeLocale("eu-en")}>English</button>
        <button onClick={() => changeLocale("de")}>Deutsch</button>
        <button onClick={() => changeLocale("tr")}>Türkçe</button>
      </div>
    </div>
  );
};

export default PageLayout;
