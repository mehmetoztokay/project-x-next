import { Button } from "@/components/Atoms/Button";
import { Link, LocaleItem } from "@/i18n/routing";
import React from "react";
import { HomeBanner } from "./sections/HomeBanner";
import { TranslationT } from "@/types/general";
import { HomeComoditiesMore } from "./sections/homeCommoditiesMore";
import { PaymentsMethod } from "./sections/paymentsMethod";
import { TradingInstruments } from "./sections/TradingInstruments";
import { TableInstruments } from "./sections/tableInstruments";
import { Awards } from "./sections/awards";
import { RegulatedAndLicensed } from "./sections/regulatedAndLicence";
import { TraderInvestorSection } from "./sections/traderInvestor";
import { GlobalMarketAccess } from "./sections/GlobalMarketAccess";

export const HomePageContainer = ({ t, locale }: { t: TranslationT; locale: LocaleItem["locale"] }) => {
  return (
    <>
      <HomeBanner t={t} />
      <HomeComoditiesMore t={t}/>
      <PaymentsMethod t={t}/>
      <TradingInstruments t={t} />
      <TableInstruments t={t} />
      <Awards t={t}/>
      <RegulatedAndLicensed t={t} />
      <TraderInvestorSection t={t} /> 
      <GlobalMarketAccess t={t} />
      <div className="container mx-auto">
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
