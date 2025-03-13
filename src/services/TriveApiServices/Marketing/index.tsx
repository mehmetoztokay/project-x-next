import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";
import { useUtmParams } from "@/hooks/useUtmParams";
import { getFullPageUrl } from "@/helpers/getFullPageUrl";
import { api } from "@/lib/axios";
import { LocaleItem, useCurrentSiteInfo } from "@/i18n/routing";
import { Cookies } from "react-cookie";
import { checkIsInIframe } from "@/helpers/checkInIframe";

const isIframe = checkIsInIframe();

const createMarketingId = async ({ data, locale }: { data: IMarketingIdData; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.marketing.createMarketingId, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    console.log(response.data?.errors);
    return null;
  } else {
    return response.data?.result;
  }
};

export const getMarketingId = async ({ searchParams, locale }: { searchParams: URLSearchParams; locale: LocaleItem["locale"] }) => {
  const cookies = new Cookies();
  const uri = getFullPageUrl();
  const utmParameters = useUtmParams({ searchParams });
  const siteId = useCurrentSiteInfo({ locale })?.siteId;

  const sixMonthsLater = new Date();
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

  const existingMarketingId = cookies.get("existingMarketingId");
  if (utmParameters.hasUtmSourceOrCampaign) {
    // If has utm-parameter fetch
    const marketingId = await createMarketingId({ data: { existingGuid: existingMarketingId ? existingMarketingId : null, uri, siteId }, locale })
      // Set existingGuid to null if it doesn't already exist
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    marketingId &&
      cookies.set("existingMarketingId", JSON.stringify(marketingId), { expires: sixMonthsLater, path: "/", sameSite: isIframe ? "none" : "lax" });
    return marketingId;
  } else if (existingMarketingId) return existingMarketingId;
  else return null;
};
