export const useUtmParams = ({ searchParams }: { searchParams: URLSearchParams }) => {
  const utmParams = {
    utmSource: searchParams.get("utm_source") ?? "",
    utmMedium: searchParams.get("utm_medium") ?? "",
    utmCampaign: searchParams.get("utm_campaign") ?? "",
    utmContent: searchParams.get("utm_content") ?? "",
  };

  const addUtmParametersToObject = <T extends Record<string, any>>(object: T): T => {
    return { ...object, ...utmParams };
  };

  const hasAnyUtmParam = Object.values(utmParams).some((value) => Boolean(value && value.trim()));

  const hasUtmSourceOrCampaign = Boolean(utmParams.utmSource.trim()) || Boolean(utmParams.utmCampaign.trim());

  return { utmParams, addUtmParametersToObject, hasAnyUtmParam, hasUtmSourceOrCampaign };
};
