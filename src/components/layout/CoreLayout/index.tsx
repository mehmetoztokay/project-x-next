import { Inter_Tight, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { ControlLayout } from "../ControlLayout";
import "@/styles/globals.css";
import { locales, useCurrentSiteInfo } from "@/i18n/routing";
import { combineClass } from "@/helpers/development/combineClass";

const inter = Inter_Tight({ subsets: ["latin"] });
const natoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"] });

type Props = {
  children: ReactNode;
  locale: string;
  isIframeLayout?: boolean;
};

export default async function CoreLayout({ children, locale, isIframeLayout }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const currentSite = useCurrentSiteInfo(locale);

  return (
    <html className={combineClass("h-full w-full", {})} lang={locale} dir={locales.find((l) => l.locale === locale)?.direction || "ltr"}>
      <body className={combineClass(`${currentSite.direction == "ltr" ? inter.className : natoSansArabic.className} h-full w-full antialiased`, {})}>
        <NextIntlClientProvider messages={messages}>
          <main>
            <ControlLayout children={children} isIframeLayout={isIframeLayout} />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
