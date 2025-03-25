import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";

import { api } from "@/lib/axios";
import { LocaleItem } from "@/i18n/routing";
import { ILandingPage_RegisterStep1, ILandingPage_RegisterStep2, ILandingPage_SingleRegister } from "./LandingPageServiceTypes";

export const lp_singleRegister = async ({ data, locale }: { data: ILandingPage_SingleRegister; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.landingPage.singleRegister, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data;
  }
};

export const lp_registerStep1 = async ({ data, locale }: { data: ILandingPage_RegisterStep1; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.landingPage.registerStep1, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data;
  }
};

export const lp_registerStep2 = async ({ data, locale }: { data: ILandingPage_RegisterStep2; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.landingPage.registerStep2, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data;
  }
};

export const lp_clientCheck = async ({ data, locale }: { data: { email: string }; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.landingPage.clientCheck, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data?.result?.isRegistered || false;
  }
};
