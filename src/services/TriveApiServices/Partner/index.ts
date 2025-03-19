import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";
import { useUtmParams } from "@/lib/hooks/useUtmParams";
import { getFullPageUrl } from "@/helpers/getFullPageUrl";
import { api } from "@/lib/axios";
import { LocaleItem, useCurrentSiteInfo } from "@/i18n/routing";

export const checkRefCode = async ({ refCode, locale }: { refCode: string; locale: LocaleItem["locale"] }) => {
  //   const refCode = searchParams.get("refcode") || searchParams.get("refCode") || null;

  const url = getApiServiceEndpoint(apiServicesEndpoints.partner.refCodeCheck, locale);
  const response = await api.post(url, { refCode });
  if (response.data?.hasError !== false) {
    console.log(response.data?.errors);
    return false;
  } else return response.data?.result.isExist;
};
