import { TranslationT } from "@/types/general";
import React from "react";

export const TradingInstruments = ({ t }: { t: TranslationT }) => {
  const tradingInstruments = [
    { src: "/assets/img/home/eurodolar.avif", alt: "EUR/USD Forex Pair", textKey: "instrumentDescriptionForex" },
    { src: "/assets/img/home/brentwti.avif", alt: "Brent and WTI Crude Oil", textKey: "instrumentDescriptionCommodities" },
    { src: "/assets/img/home/nas100ger40.avif", alt: "NASDAQ 100 and DAX 40 Indices", textKey: "instrumentDescriptionIndices" },
    { src: "/assets/img/home/stocks.avif", alt: "Various Stock Symbols", textKey: "instrumentDescriptionStocks" },
  ];

  const fallbackTexts: Record<string, string> = {
    instrumentDescriptionForex: "Forex Pairs",
    instrumentDescriptionCommodities: "Commodities",
    instrumentDescriptionIndices: "Indices",
    instrumentDescriptionStocks: "Stocks",
  };

  return (
    <div className="bg-white overflow-x-auto">
      <div className="container mx-auto py-20">
        <h2 className="mb-12 text-center  font-bold text-[#002a5c] text-3xl lg:text-5xl">{t("HomeComoditiesInstrumentsTitle")}</h2>
        <div className="flex overflow-x-responsive justify-center gap-4">
          {tradingInstruments.map((instrument, index) => (
            <div key={index} className="flex w-full flex-col items-center justify-start p-2 ">
              <img src={instrument.src} alt={instrument.alt} loading="lazy" />
              <p className="mt-3 text-center text-base font-bold text-gray-700 lg:text-3xl">
                {t(instrument.textKey) || fallbackTexts[instrument.textKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
