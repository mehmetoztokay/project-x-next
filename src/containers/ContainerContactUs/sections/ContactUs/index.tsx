import { useLocale } from "next-intl";
import React from "react";
import { TranslationT } from "@/types/general";

export const ContactUs = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl lg:text-5xl font-bold text-[#002a5c] mb-12">{t("accountTypesTitle") || "Account types"}</h2>
        <h1 className="text-color mb-6 max-w-[711px] text-center text-3xl font-bold leading-[1.2] lg:text-start lg:text-5xl">
                {t("homeBannerTitle")}
              </h1>
      </div>
    </section>
  );
};
