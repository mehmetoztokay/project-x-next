import { TranslationT } from "@/types/general";
import React from "react";

export const GlobalMarketAccess = ({ t }: { t: TranslationT }) => {
  return (
    <div className="bg-[#f5f7fa]">
      <div className="container mx-auto px-2 py-12">
        <h2 className="mb-10 text-center  font-bold text-[#002a5c] text-3xl lg:text-5xl overflow-x-responsiv">
          {t("HomeComoditiesInstrumentsTitle") || "Global Market Access"}
        </h2>
        <div className="flex flex-col gap-6 md:flex-row md:justify-center">
          {/* CFD Card */}
          <div className="max-w-[90%]  mx-auto flex-1 rounded-xl bg-white shadow-sm md:w-auto md:mx-2 lg:max-w-[652px]">
            <div
              className="flex items-center justify-start gap-6 rounded-tl-xl rounded-tr-xl flex-none h-min overflow-hidden p-6 relative w-full"
              style={{ background: "conic-gradient(from 49deg at 63% 63.4%, #e3e3e3eb, #fff 203.55304054054054deg)" }}
            >
              <img src="/assets/img/home/EURUSDGOLD.avif" alt="CFDs" className="h-[70px] w-[70px] max-w-full" loading="lazy" />
              <span className="text-lg font-bold text-gray-900 p-5">CFDs</span>
            </div>
            <p className="text-gray-700 min-h-[167px] text-base lg:text-lg p-5 bg-[#F7F7F8]">
              {t("globalMarketAccessCFDsDesc") ||
                "Diversify your investments by exploring our wide range of instruments that contains commodities, indices, currency pairs, and more."}
            </p>
          </div>
          {/* Stocks Card */}
          <div className="max-w-[90%]  mx-auto flex-1 rounded-xl bg-white shadow-sm md:w-auto md:mx-2 lg:max-w-[652px] rounded-b-md">
            <div className="flex items-center justify-start gap-6 rounded-tl-xl rounded-tr-xl flex-none h-min overflow-hidden p-6 relative w-full"
              style={{ background: "conic-gradient(from 49deg at 63% 63.4%, #e3e3e3eb, #fff 203.55304054054054deg)" }}>
              <img src="/assets/img/home/stocksGT.webp" alt="Stocks" className="h-[70px] w-[70px] max-w-full" loading="lazy" />
              <span className="text-lg font-bold text-gray-900">Stocks</span>
            </div>
            <p className="text-gray-700 min-h-[167px] text-base lg:text-lg p-5 bg-[#F7F7F8]">
              {t("globalMarketAccessStocksDesc") ||
                "Want to invest in disruptive tech companies, mobility, and more? Extend your investments to the world’s biggest stock markets in minutes."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
