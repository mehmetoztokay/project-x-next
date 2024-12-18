import {notFound} from "next/navigation";
import {Locale, routing} from "@/i18n/routing";

import {ReactNode} from "react";
import {Params} from "@/types/general";
import CoreLayout from "@/components/layout/CoreLayout";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: {children: ReactNode; params: Params}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return <CoreLayout children={children} locale={locale} />;
}
