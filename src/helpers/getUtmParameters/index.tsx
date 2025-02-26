"use client"
import { useSearchParams } from "next/navigation";

export const useUtmParams = () => {
  const searchParams = useSearchParams();

  const utmParams = {
    utmSource: searchParams.get("utm_source") ?? "",
    utmMedium: searchParams.get("utm_medium") ?? "",
    utmCampaign: searchParams.get("utm_campaign") ?? "",
    utmContent: searchParams.get("utm_content") ?? "",
  };

  const addUtmParametersToObject = (object: Record<string, any>) => {
    Object.assign(object, utmParams);
    return object;
  };

  const hasAnyUtmParam = Object.values(utmParams).some((value) => Boolean(value && value.trim()));

  const hasUtmSourceOrCampaign = Boolean(utmParams.utmSource.trim()) || Boolean(utmParams.utmCampaign.trim());

  return { utmParams, addUtmParametersToObject, hasAnyUtmParam, hasUtmSourceOrCampaign };
};
