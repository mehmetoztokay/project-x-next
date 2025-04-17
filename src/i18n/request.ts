import { getRequestConfig } from "next-intl/server";
import { Locale, routing, useCurrentSiteInfo } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  const currentSiteLang = locale ? useCurrentSiteInfo({ locale }).lang.toLocaleLowerCase() : useCurrentSiteInfo({ locale: "en-MT" });

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  let messages;

  try {
    messages = (await import(`../../messages/${currentSiteLang}.json`)).default;
  } catch (error) {
    console.warn(`Could not load messages for locale: ${currentSiteLang}, falling back to default.`);
    messages = (await import(`../../messages/en-mt.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
