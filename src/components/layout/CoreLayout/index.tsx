import {Inter} from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {ReactNode} from "react";
import {ControlLayout} from "../ControlLayout";
import {Viewport} from "next";
import "@/app/globals.css";

const inter = Inter({subsets: ["latin"]});

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function CoreLayout({children, locale}: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ControlLayout children={children} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
