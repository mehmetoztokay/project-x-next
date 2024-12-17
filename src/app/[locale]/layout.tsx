import {NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";
import {Locale, routing} from "@/i18n/routing";

import {Geist, Geist_Mono} from "next/font/google";
import "@/app/globals.css";
import PageLayout from "../components/PageLayout";
import {ReactNode} from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type Params = Promise<{slug: string[]; locale: string}>;

export async function generateMetadata({params}: {params: Params}) {
  const {locale} = await params;

  const t = await getTranslations({locale, namespace: "HomePage"});

  return {
    title: t("title"),
  };
}

export default async function LocaleLayout({children, params}: {children: ReactNode; params: Params}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <PageLayout />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
