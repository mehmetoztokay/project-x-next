import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";
// import { cookies } from "next/headers";
import { useUtmParams } from "@/helpers/getUtmParameters";
import { getFullPageUrl } from "@/helpers/getFullPageUrl";
import { api } from "@/lib/axios";
import { LocaleItem, useCurrentSiteInfo } from "@/i18n/routing";

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
  // const cookieStorage = await cookies();
  const uri = getFullPageUrl();
  const utmParameters = useUtmParams({ searchParams });
  const siteId = useCurrentSiteInfo({ locale })?.siteId;

  // const existingGuid = cookieStorage.get('marketingId');

  if (utmParameters.hasUtmSourceOrCampaign) {
    const marketingId = await createMarketingId({ data: { existingGuid: null, uri, siteId }, locale })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    return marketingId;
  } else return "existingGuid?.value ? existingGuid.value : null";
};
