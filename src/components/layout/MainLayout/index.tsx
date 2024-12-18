"use client";

import {Link, Locale, routing, usePathname, useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";
import React, {ReactNode} from "react";
import {LocaleSwitcher} from "@/components/layout/MainLayout/LocaleSwitcher";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({children}: Props) => {
  return (
    <>
      <div className="mb-5 border py-4 px-4 text-xl font-bold flex gap-4">
        {/* Navigation Links */}
        <Link href="/">Home</Link>
        <Link href="/about">About Page</Link>

        <div className="ml-auto">
          <LocaleSwitcher />
        </div>
      </div>
      {children}
      <footer className="mt-10 bg-slate-600 py-5 text-white px-5">Footer</footer>
    </>
  );
};
