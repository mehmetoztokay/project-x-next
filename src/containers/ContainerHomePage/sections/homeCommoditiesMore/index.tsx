import { useCurrentSiteInfo } from "@/i18n/routing";
import { TranslationT } from "@/types/general";
import { useLocale } from "next-intl";
import React from "react";
import { BsGraphUp } from "react-icons/bs";
import Link from "next/link";
import { FaMoneyBills } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
export const HomeComoditiesMore = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();
  const currentSite = useCurrentSiteInfo(locale);

  return (
    <div className="bg-white">
      <div className="container mx-auto py-20">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-5xl">{t("HomeComoditiesMoreTite")}</h2>
        <div className="flex flex-col items-center gap-20 lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/2">
            <img
              src={"/assets/homeBanner/commoditiesAndMore.webp"}
              alt="Trive CFD, Forex, Commodities, Stocks Trading"
              className="h-full w-full rounded-[16px] object-cover"
            />
          </div>
          <div className="flex w-full flex-col gap-10 lg:w-1/2">
            <div className="flex justify-start gap-4">
              <BsGraphUp size={35} className="mb-6" />
              <div>
                <p className="mb-2 text-xl text-gray-600 lg:text-2xl">{t("commoditiesGraphText")}</p>
                <p className="mb-2 text-lg text-gray-600 lg:text-xl">{t("commoditiesGraphDescription")}</p>
                <div className="mb-2">
                  <Link href={`/${locale}/trading/instruments`} className="text-lg text-blue-600 hover:text-blue-800 lg:text-xl">
                    {t("seeDetailsForex")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-4">
              <FaMoneyBills size={35} className="mb-6" />
              <div>
                <p className="mb-2 text-xl text-gray-600 lg:text-2xl">{t("commoditiesMoneyText")}</p>
                <p className="mb-2 text-lg text-gray-600 lg:text-xl">{t("commoditiesMoneyDescription")}</p>
                <div className="mb-2">
                  <Link href={`/${locale}/trading/instruments`} className="text-lg text-blue-600 hover:text-blue-800 lg:text-xl">
                    {t("seeDetailsForex")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-start gap-4">
              <IoMdSearch size={35} className="mb-6" />
              <div>
                <p className="mb-2 text-xl text-gray-600 lg:text-2xl">{t("commoditiesMoneyText")}</p>
                <p className="mb-2 text-lg text-gray-600 lg:text-xl">{t("commoditiesMoneyDescription")}</p>
                <div className="mb-2">
                  <Link href={`/${locale}/trading/instruments`} className="text-lg text-blue-600 hover:text-blue-800 lg:text-xl">
                    {t("seeDetailsForex")}
                  </Link>
                </div>
                <div className="mt-5">
                  <button className="btn">{t("BtnRegister")}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
