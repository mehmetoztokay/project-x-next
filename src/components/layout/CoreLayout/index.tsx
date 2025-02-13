import { Inter } from "next/font/google";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { ControlLayout } from "../ControlLayout";
import "@/app/globals.css";
import { locales } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function CoreLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      dir={locales.find((l) => l.locale === locale)?.direction}
    >
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ControlLayout children={children} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
