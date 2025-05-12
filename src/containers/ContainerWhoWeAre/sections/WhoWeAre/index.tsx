import { useLocale } from "next-intl";
import React from "react";
import { TranslationT } from "@/types/general";
import BannerLandingPageWhoWeAre from "@/components/Atoms/BannerLandingPageWhoWeAre";

export const WhoWeAre = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();

  return (
    <section>
      <BannerLandingPageWhoWeAre title={t("title") as string} />
      <div className="bg-white">
        <div className="container mx-auto pt-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[#002A5C] lg:text-2xl">{t("title1")}</h2>
            <p className="text-base text-[#002A5C] lg:text-lg">{t("additionalInfo0_isHTML")}</p>
            <p className="text-base text-[#002A5C] lg:text-lg">{t("additionalInfo1")}</p>
            <p className="text-base text-[#002A5C] lg:text-lg">{t("additionalInfo2_isHTML")}</p>
          </div>
          <div className="flex flex-col gap-3 pt-8">
            <h2 className="text-xl font-semibold text-[#002A5C] lg:text-2xl">{t("title2")}</h2>
            <p className="text-base text-[#002A5C] lg:text-lg">{t("additionalInfo3_isHTML")}</p>
            <p className="text-base text-[#002A5C] lg:text-lg">{t("additionalInfo4")}</p>
          </div>
          <div className="flex flex-col gap-3 pt-8">
            <h2 className="text-xl font-semibold text-[#002A5C] lg:text-2xl">{t("title3")}</h2>
            <p className="text-base text-[#002A5C] lg:text-lg">{t("additionalInfo5_isHTML")}</p>
            <p className="text-base text-[#002A5C] lg:text-lg">{t("additionalInfo6")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
