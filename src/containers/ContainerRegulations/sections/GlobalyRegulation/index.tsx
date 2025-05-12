import { useLocale } from "next-intl";
import React from "react";
import { TranslationT } from "@/types/general";

export const Regulation = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();
  return (
    <section>
      <div className="bg-white">
        <div className="container mx-auto mt-[60px] px-4">
          <h1
            style={{
              background: `linear-gradient(73deg, var(--token-37e7984d-7291-4e22-8591-4bd45b7f5648, rgb(0, 42, 92)) -15%, var(--token-1a3314b7-d856-4bbf-9555-cca65d3da8d1, rgb(0, 112, 231)) 46%, rgb(113, 203, 230) 73%)`,
              backgroundClip: "text",
            }}
            className="flex items-center justify-center text-center text-[40px] font-bold text-blue-600 text-transparent md:text-[48px] lg:text-[56px]"
          >
            {t("title")}
          </h1>
          <p className="text-center text-xl font-medium text-[#788ca1] lg:text-2xl">{t("description")}</p>
          <div className="mt-6 flex justify-center">
            <img src="/assets/img/regulations/RegulationsMap.avif" alt="CFDs" className="max-w-full" loading="lazy" />
          </div>
          <div className="flex justify-center">
            <p className="max-w-[1000px] text-center text-base text-[#002a5c] lg:text-lg mt-4">{t("MapDescription")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
