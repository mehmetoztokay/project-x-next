import { Button } from "@/components/Atoms/Button";
import { Link, LocaleItem } from "@/i18n/routing";
import React from "react";
import { HomeBanner } from "./sections/HomeBanner";
import { TranslationT } from "@/types/general";

export const HomePageContainer = ({ t, locale }: { t: TranslationT; locale: LocaleItem["locale"] }) => {
  return (
    <>
      <div className="container mx-auto">
        <HomeBanner t={t} />
        <Button isPending text="selam" />
        <div className="mt-3 flex gap-3">
          <Link className="btn" href="/about">
            {t("goAboutPageBtnText")}
          </Link>

          <button className="btn">Test button</button>
        </div>
      </div>
      <div className="container mx-auto mt-20"></div>
    </>
  );
};
