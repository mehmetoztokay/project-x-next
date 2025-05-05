import { useCurrentSiteInfo } from "@/i18n/routing";
import { TranslationT } from "@/types/general";
import { useLocale } from "next-intl";
import React from "react";
// Removed unused react-icons imports

export const PaymentsMethod = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();
  // Removed unused currentSite variable
  // const currentSite = useCurrentSiteInfo(locale);

  return (
    <div className="bg-white">
      <div className="container mx-auto py-20">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 lg:text-[32px]">{t("paymentMethodsTitle")}</h2>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <img src="/assets/icons/home/PayPal.svg" alt="PayPal" className="h-28 w-28 object-contain" />
          <img src="/assets/icons/home/Visa.svg" alt="Visa" className="h-20 w-20 object-contain" />
          <img src="/assets/icons/home/Mastercard.svg" alt="Mastercard" className="h-16 w-16 object-contain" />
          <img src="/assets/icons/home/Neteller.svg" alt="Neteller" className="h-28 w-28 object-contain" />
          <img src="/assets/icons/home/Skrill.svg" alt="Skrill" className="h-28 w-28 object-contain" />
        </div>
      </div>
    </div>
  );
};
