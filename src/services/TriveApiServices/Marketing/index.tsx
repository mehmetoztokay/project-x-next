import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";
// import { cookies } from "next/headers";
import { useUtmParams } from "@/helpers/getUtmParameters";
import { getFullPageUrl } from "@/helpers/getFullPageUrl";
import { api } from "@/lib/axios";
import { useCurrentSiteInfo } from "@/i18n/routing";

const createMarketingId = async (data: IMarketingIdData) => {
  try {
    const url = getApiServiceEndpoint(apiServicesEndpoints.marketing.createMarketingId);
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

export const getMarketingId = async () => {
  // const cookieStorage = await cookies();
  const utmParameters = useUtmParams();
  const uri = getFullPageUrl();
  const siteId = useCurrentSiteInfo()?.siteId;
  // const existingGuid = cookieStorage.get('marketingId');

  if (utmParameters.hasUtmSourceOrCampaign) {
    const marketingId = await createMarketingId({
      uri,
      siteId: siteId || -1,
      // existingGuid: existingGuid?.value ? existingGuid.value : null,
      existingGuid: null,
    })
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
