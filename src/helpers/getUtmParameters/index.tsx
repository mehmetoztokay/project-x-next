export const useUtmParams = ({ searchParams }: { searchParams: URLSearchParams }) => {
  const utmParams = {
    utmSource: searchParams.get("utm_source") ?? null,
    utmMedium: searchParams.get("utm_medium") ?? null,
    utmCampaign: searchParams.get("utm_campaign") ?? null,
    utmContent: searchParams.get("utm_content") ?? null,
  };

  const addUtmParametersToObject = <T extends Record<string, any>>(object: T): T => {
    return { ...object, ...utmParams };
  };

  const hasAnyUtmParam = Object.values(utmParams).some((value) => Boolean(value && value.trim()));

  const hasUtmSourceOrCampaign = Boolean(utmParams.utmSource) || Boolean(utmParams.utmCampaign);

  return { utmParams, addUtmParametersToObject, hasAnyUtmParam, hasUtmSourceOrCampaign };
};
