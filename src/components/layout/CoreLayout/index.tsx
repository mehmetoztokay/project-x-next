import { Inter } from "next/font/google";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { ControlLayout } from "../ControlLayout";
import "@/app/globals.css";
import { locales } from "@/i18n/routing";
import { combineClass } from "@/helpers/development/combineClass";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  locale: string;
  isIframeLayout?: boolean;
};

export default async function CoreLayout({ children, locale, isIframeLayout }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className={combineClass("h-full w-full", {})} lang={locale} dir={locales.find((l) => l.locale === locale)?.direction || "ltr"}>
      <body className={combineClass(`${inter.className} h-full w-full antialiased`, {})}>
        <NextIntlClientProvider messages={messages}>
          <main>
            <ControlLayout children={children} isIframeLayout={isIframeLayout} />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
