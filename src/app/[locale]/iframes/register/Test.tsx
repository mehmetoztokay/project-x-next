"use client";
import { getMarketingId } from "@/services/TriveApiServices/Marketing";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const TestPage = () => {
  const locale = useLocale();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getMarketing = async () => {
      const marketingId = await getMarketingId({ locale, searchParams });

      console.log(marketingId);
    };

    getMarketing();
  }, []);

  return <div>TestPages</div>;
};
