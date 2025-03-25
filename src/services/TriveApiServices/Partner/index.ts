import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";
import { useUtmParams } from "@/lib/hooks/useUtmParams";
import { getFullPageUrl } from "@/helpers/getFullPageUrl";
import { api } from "@/lib/axios";
import { LocaleItem, useCurrentSiteInfo } from "@/i18n/routing";
import { IPartner_SingleRegister } from "./PartnerServiceTypes";

export const checkRefCode = async ({ refCode, locale }: { refCode: string; locale: LocaleItem["locale"] }) => {
  //   const refCode = searchParams.get("refcode") || searchParams.get("refCode") || null;

  const url = getApiServiceEndpoint(apiServicesEndpoints.partner.refCodeCheck, locale);
  const response = await api.post(url, { refCode });
  if (response.data?.hasError !== false) {
    console.log(response.data?.errors);
    return false;
  } else return response.data?.result.isExist;
};

export const partner_clientCheck = async ({ data, locale }: { data: { email: string }; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.landingPage.clientCheck, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data?.result?.isRegistered || false;
  }
};

export const partner_singleRegister = async ({ data, locale }: { data: IPartner_SingleRegister; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.partner.singleRegister, locale);
  const response = await api.post(url, { ...data, isPartner: true });
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data;
  }
};
