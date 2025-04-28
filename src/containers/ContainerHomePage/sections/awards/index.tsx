import { useCurrentSiteInfo } from "@/i18n/routing";
import { TranslationT } from "@/types/general";
import { useLocale } from "next-intl";
import React from "react";
// Removed unused react-icons imports

export const Awards = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();
  // Removed unused currentSite variable
  // const currentSite = useCurrentSiteInfo(locale);

  return (
    <div className="bg-white">
      <div className="container mx-auto py-20">
        {/* Assuming awardsTitle exists in your translation files */}
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-5xl">{t("awardsTitle" as any) || "Awards & Recognition"}</h2>
        <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div className="flex flex-col items-center text-center">
            <img src="/assets/home/mostTrustedBroker.svg" alt={String(t("mostTrustedBrokerAlt"))} className="h-20 w-auto md:h-24" />
            <p className="mt-2 max-w-[150px] text-sm text-gray-600">{t("mostTrustedBrokerDescription")}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="/assets/home/mostReliable.svg" alt={String(t("mostReliableBrokerAlt"))} className="h-20 w-auto md:h-24" />
            <p className="mt-2 max-w-[150px] text-sm text-gray-600">{t("mostReliableBrokerDescription")}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="/assets/home/mostReliableTransparent.svg" alt={String(t("mostReliableTransparentBrokerAlt"))} className="h-20 w-auto md:h-24" />
            <p className="mt-2 max-w-[150px] text-sm text-gray-600">{t("mostReliableTransparentBrokerDescription")}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="/assets/home/European.svg" alt={String(t("europeanAlt"))} className="h-20 w-auto md:h-24" />
            <p className="mt-2 max-w-[150px] text-sm text-gray-600">{t("europeanDescription")}</p>
          </div>
        </div>
        <p className="text-center mt-6">{t("seeAll")}</p>
      </div>
    </div>
  );
};
