import { TranslationT } from "@/types/general";
import React from "react";

export const HomeBanner = ({ t }: { t: TranslationT }) => {
  return (
    <div>
      <p className="text-3xl">{t("homeBannerTitle")}</p>
    </div>
  );
};
