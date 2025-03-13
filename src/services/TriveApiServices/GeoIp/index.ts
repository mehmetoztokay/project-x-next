import { LocaleItem } from "@/i18n/routing";
import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";
import { api } from "@/lib/axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const oneMonthsLater = new Date();
oneMonthsLater.setMonth(oneMonthsLater.getMonth() + 1);

export const getIpAddress = async ({ locale }: { locale: LocaleItem["locale"] }): Promise<string | null> => {
  const ipAddressFromCookie = cookies.get("localeIpAddress");
  if (ipAddressFromCookie) return ipAddressFromCookie;
  else {
    const url = getApiServiceEndpoint(apiServicesEndpoints.geoIp.getIp, locale);

    const response = await api.get(url);

    if (!response) return null;
    else {
      cookies.set("localeIpAddress", JSON.stringify(response.data), { expires: oneMonthsLater });
      return response.data;
    }
  }
};

export const getCountryIsoCode = async ({ locale, ip }: { ip?: string; locale: LocaleItem["locale"] }): Promise<null | string> => {
  const ipAddress = ip || (await getIpAddress({ locale }));

  if (!ipAddress) return null;
  else {
    const countryIsoCodeFromCookie = cookies.get("localeCountryIsoCode");
    if (countryIsoCodeFromCookie) return countryIsoCodeFromCookie;
    else {
      const url = getApiServiceEndpoint(apiServicesEndpoints.geoIp.countryInfo(ipAddress), locale);
      const response = await api.get(url);

      if (!response || response?.data.hasError) {
        console.log(response);
        return null;
      } else {
        cookies.set("localeCountryIsoCode", JSON.stringify(response.data?.result.iso_code), { expires: oneMonthsLater });
        return response.data?.result.iso_code;
      }
    }
  }
};
