import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";

import { IRegistration_RegisterStep1, IRegistration_RegisterStep2, IRegistration_SingleRegister } from "./RegistrationServiceTypes";

import { api } from "@/lib/axios";
import { LocaleItem } from "@/i18n/routing";

export const singleRegister = async ({ data, locale }: { data: IRegistration_SingleRegister; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.registration.singleRegister, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data;
  }
};

export const registerStep1 = async ({ data, locale }: { data: IRegistration_RegisterStep1; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.registration.registerStep1, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data;
  }
};

export const registerStep2 = async ({ data, locale }: { data: IRegistration_RegisterStep2; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.registration.registerStep2, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data;
  }
};

export const registerClientCheck = async ({ data, locale }: { data: { email: string }; locale: LocaleItem["locale"] }) => {
  const url = getApiServiceEndpoint(apiServicesEndpoints.registration.clientCheck, locale);
  const response = await api.post(url, data);
  if (response.data?.hasError !== false) {
    throw new Error(response.data?.errors);
  } else {
    return response.data?.result?.isRegistered || false;
  }
};
