import {NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";
import {Locale, routing} from "@/i18n/routing";

import {Inter} from "next/font/google";
import "@/app/globals.css";
import {ReactNode} from "react";
import {Params} from "@/types/general";
import {Viewport} from "next";
import {BaseLayout} from "@/components/layout/BaseLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Update Favicon
export const metadata = {
  icons: {
    icon: "/assets/icons/favicon.png",
    apple: "/assets/icons/favicon.png",
    android: "/assets/icons/favicon.png",
  },
};

export const viewport: Viewport = {
  userScalable: false,
  colorScheme: "light",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: {children: ReactNode; params: Params}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <BaseLayout>{children}</BaseLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
