import { useCurrentSiteInfo } from "@/i18n/routing";
import { TranslationT } from "@/types/general";
import { useLocale } from "next-intl";
import React from "react";

export const HomeBanner = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();
  const currentSite = useCurrentSiteInfo(locale);

  return (
    <div>
      <p className="text-3xl">{t("homeBannerTitle")}</p>

      {/* Ornegin alttaki oge sadece cn'de gorunsun istiyoruz */}
      {currentSite.locale == "int-cn" && <div>Bu sadece CN'de gorunur</div>}
      {currentSite.region == "int" && <div>Bu sadece INT region'da gorunur</div>}
      {currentSite.region == "eu" && <div>Bu sadece EU region'da gorunur</div>}
    </div>
  );
};
