import { useLocale } from "next-intl";
import React from "react";
import { TranslationT } from "@/types/general";
import { FaLocationDot } from "react-icons/fa6";
import { GoMail } from "react-icons/go";

export const ContactUs = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();

  return (
    <section className="pt-16">
      <div className="mx-auto max-w-[600px] px-4">
        <h1 className="text-color mb-6 text-3xl font-bold leading-[1.2] lg:text-5xl">{t("title") || "Contact Us"}</h1>
        <div className="flex gap-4">
          <div className="mt-5 flex flex-col gap-6">
            <div className="flex gap-2">
              <FaLocationDot size={36} color="#0070e7" />
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-[#002a5c] lg:text-[32px]">{t("Address") || "Contact Us"}</h3>
                <p className="max-w-[506px] text-lg font-medium">{t("AddressDescription") || "Contact Us"}</p>
              </div>
            </div>
            <div className="flex gap-2">
            <GoMail size={36} color="#0070e7" />
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-[#002a5c] lg:text-[32px]">{t("E-Mail") || "E-Mail"}</h3>
                <p className="max-w-[506px] text-lg font-medium">{t("EmailDescription") || "Contact Us"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
