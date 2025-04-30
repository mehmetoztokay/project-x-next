import { TranslationT } from "@/types/general";
import React from "react";

export const GlobalMarketAccess = ({ t }: { t: TranslationT }) => {
  return (
    <div className="bg-[#f5f7fa]">
      <div className="container mx-auto py-12 px-2">
        <h2 className="mb-10 text-center text-3xl font-bold text-blue-900 lg:text-4xl">
          {t("HomeComoditiesInstrumentsTitle") || "Global Market Access"}
        </h2>
        <div className="flex flex-col gap-6 md:flex-row md:justify-center">
          {/* CFD Card */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 min-w-[320px] max-w-xl mx-auto md:mx-2">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/img/home/cfds-icon.png"
                alt="CFDs"
                className="w-10 h-10"
                loading="lazy"
              />
              <span className="text-lg font-bold text-gray-900">CFDs</span>
            </div>
            <p className="text-sm text-gray-700">
              {t("globalMarketAccessCFDsDesc") ||
                "Diversify your investments by exploring our wide range of instruments that contains commodities, indices, currency pairs, and more."}
            </p>
          </div>
          {/* Stocks Card */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 min-w-[320px] max-w-xl mx-auto md:mx-2">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/img/home/stocks-icon.png"
                alt="Stocks"
                className="w-10 h-10"
                loading="lazy"
              />
              <span className="text-lg font-bold text-gray-900">Stocks</span>
            </div>
            <p className="text-sm text-gray-700">
              {t("globalMarketAccessStocksDesc") ||
                "Want to invest in disruptive tech companies, mobility, and more? Extend your investments to the world’s biggest stock markets in minutes."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
