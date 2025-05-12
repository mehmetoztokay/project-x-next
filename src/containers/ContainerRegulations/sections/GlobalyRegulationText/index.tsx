import { useLocale } from "next-intl";
import React from "react";
import { TranslationT } from "@/types/general";

export const RegulationText = ({ t }: { t: TranslationT }) => {
  const locale = useLocale();
  return (
    <section>
      <div className="bg-[#fafafa] pt-10 pb-16 px-4 mt-10">
        <div className="container mx-auto mt-[60px] px-4">
          <div className="mt-10 grid grid-cols-1 gap-10 lg:gap-20 md:grid-cols-3">
            <div className="text-center">
              <h2 className="lg:text-[32px] md:text-2xl text-xl font-medium text-[#002a5c]">FINRA</h2>
              <p className="lg:text-xl text-lg text-[#002a5c] font-medium">Trive New York LLC</p>
              <p>License number: CRD 21946</p>
              <img src="/assets/img/regulations/americanflags.svg" alt="USA" className="mx-auto" />
            </div>
            <div className="text-center">
              <h2 className="lg:text-[32px] md:text-2xl text-xl font-medium text-[#002a5c]">ASIC</h2>
              <p className="lg:text-xl text-lg text-[#002a5c] font-medium">Trive Financial Services Australia Pty</p>
              <p>License number: 424122 ACN 159166739</p>
              <img src="/assets/img/regulations/australiaFlags.svg" alt="Australia" className="mx-auto" />
            </div>
            <div className="text-center">
              <h2 className="lg:text-[32px] md:text-2xl text-xl font-medium text-[#002a5c]">MFSA</h2>
              <p className="lg:text-xl text-lg text-[#002a5c] font-medium">Trive Financial Services Europe Limited*</p>
              <p>License number: CRES IF 5048</p>
              <div className="flex justify-center items-center gap-4">
                <img src="/assets/img/regulations/germany.svg" alt="Germany" className="max-w-full" />
                <img src="/assets/img/regulations/spain.svg" alt="Spain" className="max-w-full" />
                <img src="/assets/img/regulations/europe.svg" alt="Europe" className="max-w-full" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="lg:text-[32px] md:text-2xl text-xl font-medium text-[#002a5c]">MNB</h2>
              <p className="lg:text-xl text-lg text-[#002a5c] font-medium">Trive Bank Hungary Zrt</p>
              <p>License number: 01-10-142205</p>
              <img src="/assets/img/regulations/hungary.svg" alt="Hungary" className="mx-auto" />
            </div>
            <div className="text-center">
              <h2 className="lg:text-[32px] md:text-2xl text-xl font-medium text-[#002a5c]">CMB</h2>
              <p className="lg:text-xl text-lg text-[#002a5c] font-medium">Trive Türkiye</p>
              <p>Trive Yatırım Menkul Değerler A.Ş.</p>
              <p>License number: G-033(408)</p>
              <img src="/assets/img/regulations/turkish.svg" alt="Turkey" className="mx-auto" />
            </div>
            <div className="text-center">
              <h2 className="lg:text-[32px] md:text-2xl text-xl font-medium text-[#002a5c]">BAPPEBTI</h2>
              <p className="lg:text-xl text-lg text-[#002a5c] font-medium">PT Trive Invest Futures</p>
              <p>License number: 01/BAPPEBTI/SP-PN/08/2023</p>
              <img src="/assets/img/regulations/indonesia.svg" alt="Indonesia" className="mx-auto" />
            </div>
            <div className="text-center">
              <h2 className="lg:text-[32px] md:text-2xl text-xl font-medium text-[#002a5c]">FSCA</h2>
              <p className="lg:text-xl text-lg text-[#002a5c] font-medium">Trive South Africa (Pty) Limited</p>
              <p>Registration number: 2005/011130/07</p>
              <p>FSP number: 27231</p>
              <img src="/assets/img/regulations/southafrica.svg" alt="South Africa" className="mx-auto" />
            </div>
            <div className="text-center">
              <h2 className="lg:text-[32px] md:text-2xl text-xl font-medium text-[#002a5c]">FSC</h2>
              <p className="lg:text-xl text-lg text-[#002a5c] font-medium">Trive Financial Services Limited</p>
              <p>License number: GB21026295</p>
              <img src="/assets/img/regulations/litvania.svg" alt="Mauritius" className="mx-auto" />
            </div>
          </div>
          {/* End of Regulation List */}

          <div className="flex justify-center">
            <p className="mt-4 max-w-[1000px] text-center text-sm text-[#002a5c]">{t("FlagsInformation")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
