import { useLocale } from "next-intl";
import React from "react";
import { TranslationT } from "@/types/general";

export const AccountTypes = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl lg:text-5xl font-bold text-[#002a5c] mb-12">{t("accountTypesTitle") || "Account types"}</h2>
        <div className="flex gap-2 overflow-x-responsive">
          <div className="flex flex-col items-center justify-between bg-white rounded-[40px]  p-6 text-center min-w-[320px]" style={{ background: 'conic-gradient(from 44deg at 71.1% 87%,#025dbf,#0169d7 210.8108108108108deg,#008cff 360deg)' }}>
            <p className="mt-2 text-sm text-white">{t("classicDesc") || "Description"}</p>
            <h3 className="font-bold text-white text-lg md:text-xl lg:text-2xl">{t("classicTitle") || "Classic"}</h3>
            <ul className="mt-4 mb-6 text-white">
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("classicFeature1") || "Feature 1"}</li>
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("classicFeature2") || "Feature 2"}</li>
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("classicFeature3") || "Feature 3"}</li>
            </ul>
            <a href="#" className="text-white hover:underline">{t("seeDetails") || "See details"}</a>
          </div>

          <div className="flex flex-col items-center justify-between bg-white rounded-[40px]  p-6 text-center min-w-[320px]" style={{ background: 'conic-gradient(from 44deg at 71.1% 87%,#025dbf,#0169d7 210.8108108108108deg,#008cff 360deg)' }}>
            <p className="mt-2 text-sm text-white">{t("primeDesc") || "Description"}</p>
            <h3 className="font-bold text-white text-lg md:text-xl lg:text-2xl">{t("primeTitle") || "Prime"}</h3>
            <ul className="mt-4 mb-6 text-white">
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("primeFeature1") || "Feature 1"}</li>
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("primeFeature2") || "Feature 2"}</li>
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("primeFeature3") || "Feature 3"}</li>
            </ul>
            <a href="#" className="text-white hover:underline">{t("seeDetails") || "See details"}</a>
          </div>

          <div className="flex flex-col items-center justify-between bg-white rounded-[40px]  p-6 text-center min-w-[320px]" style={{ background: 'conic-gradient(from 44deg at 71.1% 87%,#025dbf,#0169d7 210.8108108108108deg,#008cff 360deg)' }}>
            <p className="mt-2 text-sm text-white">{t("primeplusDesc") || "Description"}</p>
            <h3 className="font-bold text-white text-lg md:text-xl lg:text-2xl">{t("primeplusTitle") || "Prime Plus"}</h3>
            <ul className="mt-4 mb-6 text-white">
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("primeplusFeature1") || "Feature 1"}</li>
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("primeplusFeature2") || "Feature 2"}</li>
              <li className="p-4 border-b border-[rgb(255_255_255_/_35%)]">{t("primeplusFeature3") || "Feature 3"}</li>
            </ul>
            <a href="#" className="text-white hover:underline">{t("seeDetails") || "See details"}</a>
          </div>

          <div className="flex flex-col items-center justify-between bg-white rounded-[40px]  p-6 text-center min-w-[320px]" style={{ background: 'conic-gradient(from 42deg at 71.1% 87%,#d9d9d9,#fff 342.4852195945946deg)' }}>
            <p className="p-1 px-10 mt-2 text-sm text-white bg-[var(--token-1a3314b7-d856-4bbf-9555-cca65d3da8d1,#0070e7)] rounded-full">{t("investmentDesc") || "Description"}</p>
            <h3 className="font-bold text-[rgb(0, 42, 92)] text-lg md:text-xl lg:text-2xl">{t("investmentTitle") || "Investment"}</h3>
            <ul className="mt-4 mb-6 text-gray-600">
              <li className="p-4 border-b border-[rgb(150, 181, 214)] lg:min-w-[253px]">{t("investmentFeature1") || "Feature 1"}</li>
              <li className="p-4 border-b border-[rgb(150, 181, 214)] lg:min-w-[253px]">{t("investmentFeature2") || "Feature 2"}</li>
              <li className="p-4 border-b border-[rgb(150, 181, 214)] lg:min-w-[253px]">{t("investmentFeature3") || "Feature 3"}</li>
            </ul>
            <a href="#" className="text-blue-500 hover:underline">{t("seeDetails") || "See details"}</a>
          </div>
        </div>
      </div>
    </section>
  );
};
