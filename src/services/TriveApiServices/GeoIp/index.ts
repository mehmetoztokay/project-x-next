import { checkIsInIframe } from "@/helpers/checkInIframe";
import { LocaleItem } from "@/i18n/routing";
import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";
import { api } from "@/lib/axios";

export const getIpAddress = async ({ locale }: { locale: LocaleItem["locale"] }): Promise<string | null> => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.geoIp.getIp, locale);

  const response = await api.get(url);

  if (!response) return null;
  else {
    return response.data;
  }
};

export const getCountryIsoCode = async ({ locale, ip }: { ip?: string; locale: LocaleItem["locale"] }): Promise<null | string> => {
  const ipAddress = ip || (await getIpAddress({ locale }));

  if (!ipAddress) return null;
  else {
    const url = getApiServiceEndpoint(apiServicesEndpoints.geoIp.countryInfo(ipAddress), locale);
    const response = await api.get(url);

    if (!response || response?.data.hasError) {
      console.log(response);
      return null;
    } else return response.data?.result.iso_code;
  }
};
