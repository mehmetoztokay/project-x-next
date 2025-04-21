import { useCurrentSiteInfo } from "@/i18n/routing";
import { TranslationT } from "@/types/general";
import { useLocale } from "next-intl";
import React from "react";
import { HomeBannerSlider } from "./HomeBannerSlider";

export const HomeBanner = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();
  const currentSite = useCurrentSiteInfo(locale);

  return (
    <div>
      <div
        className="w-full overflow-hidden bg-gradient-to-r py-14"
        style={{
          background: "conic-gradient(from 45deg at 66.2% 80.7%, rgba(78,92,107,.15) 30.56300675675674deg, rgb(250, 250, 250) 303.96511824324324deg)",
        }}
      >
        <div className="container mx-auto h-full">
          <div className="relative mx-auto flex h-full flex-col-reverse items-center justify-center px-4 text-white lg:flex-row">
            <div>
              <h1 className="text-color mb-6 max-w-[711px] text-center text-3xl font-bold leading-[1.2] lg:text-start lg:text-5xl">
                {t("homeBannerTitle")}
              </h1>
              <p className="global-dark mb-8 max-w-2xl text-center text-xl lg:text-start lg:text-2xl">{t("homeBannerDescription")}</p>

              <div className="flex justify-center gap-4 lg:justify-start">
                <button className="btn">{t("BtnRegister")}</button>
              </div>
            </div>
            <div>
              <img
                src={"/assets/homeBanner/trivebanner.webp"}
                alt="Trive CFD, Forex, Commodities, Stocks Trading"
                className="h-full max-h-[399px] w-full max-w-[571px] object-cover"
              />
            </div>
          </div>
          <HomeBannerSlider
            slideMessage1={t("FirstRegulated") as ""}
            slideMessage2={t("SecondRegulated") as ""}
            slideMessage3={t("ThirdRegulated") as ""}
            slideMessage4={t("FourthRegulated") as ""}
          />
        </div>
      </div>

      {/* Ornegin alttaki oge sadece cn'de gorunsun istiyoruz */}
      {currentSite.locale == "int-cn" && <div>Bu sadece CN'de gorunur</div>}
      {currentSite.region == "int" && <div>Bu sadece INT region'da gorunur</div>}
    </div>
  );
};
