import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";
import { useUtmParams } from "@/helpers/getUtmParameters";
import { getFullPageUrl } from "@/helpers/getFullPageUrl";
import { api } from "@/lib/axios";
import { LocaleItem, useCurrentSiteInfo } from "@/i18n/routing";
import { Cookies } from "react-cookie";

const createMarketingId = async ({ data, locale }: { data: IMarketingIdData; locale: LocaleItem["locale"] }) => {
  try {
    const url = getApiServiceEndpoint(apiServicesEndpoints.marketing.createMarketingId, locale);
    const response = await api.post(url, data);
    if (response.data?.hasError !== false) {
      console.log(response.data?.errors);
      return null;
    } else {
      return response.data?.result;
    }
  } catch (error) {
    console.log(error);
    return null;
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

    marketingId && cookies.set("existingMarketingId", marketingId, { expires: sixMonthsLater });
    return marketingId;
  } else if (existingMarketingId) return existingMarketingId;
  else return null;
};
