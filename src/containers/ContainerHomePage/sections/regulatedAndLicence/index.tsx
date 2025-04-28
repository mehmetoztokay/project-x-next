import { useLocale } from "next-intl";
import React from "react";
import { TranslationT } from "@/types/general";

export const RegulatedAndLicensed = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        {/* Bölüm Başlığı */}
        <h2 className="mb-12 text-center text-3xl font-bold text-blue-900 lg:text-5xl">
          {t("regulatedAndLicensedTitle") || "Regulated and Licensed"}
        </h2>

        {/* Lisans Kartları */}
        <div className="flex flex-wrap justify-center gap-8 lg:justify-evenly">
          {/* MFSA */}
          <div className="flex w-full max-w-xs flex-col items-center text-center">
            <h3 className="mb-2 text-xl font-semibold text-blue-900">MFSA</h3>
            <p className="text-base text-blue-900">{t("mfsaCompanyName") || "Trive Financial Services Europe Limited*"}</p>
            <p className="mt-1 text-sm text-gray-600">{t("licenseNumberLabel") || "License number:"} </p>
            <div className="mt-4 flex space-x-2">
              <img src="/assets/icons/flags/germany.svg" alt={String(t("germanyAlt") || "Germany")} />
              <img src="/assets/icons/flags/spain.svg" alt={String(t("spainAlt") || "Spain")} />
              <img src="/assets/icons/flags/eu.svg" alt={String(t("euAlt") || "European Union")} />
            </div>
          </div>

          {/* ASIC */}
          <div className="flex w-full max-w-xs flex-col items-center text-center">
            <h3 className="mb-2 text-xl font-semibold text-blue-900">ASIC</h3>
            <p className="text-base text-blue-900">{t("asicCompanyName") || "Trive Financial Services Australia Pty"}</p>
            <p className="mt-1 text-sm text-gray-600">{t("licenseNumberLabel") || "License number:"} </p>
            <div className="mt-4 flex space-x-2">
              <img src="/assets/icons/flags/australia.svg" alt={String(t("australiaAlt") || "Australia")} />
            </div>

            <button className="mt-6 text-blue-900 hover:underline">{t("seeAll") || "See all"}</button>
          </div>
          <div className="flex w-full max-w-xs flex-col items-center text-center">
            <h3 className="mb-2 text-xl font-semibold text-blue-900">FINRA</h3>
            <p className="text-base text-blue-900">{t("finraCompanyName") || "Trive New York LLC"}</p>
            <p className="mt-1 text-sm text-gray-600">{t("licenseNumberLabel") || "License number:"} </p>
            <div className="mt-4 flex space-x-2">
              <img src="/assets/icons/flags/usa.svg" alt={String(t("usAlt") || "United States")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
