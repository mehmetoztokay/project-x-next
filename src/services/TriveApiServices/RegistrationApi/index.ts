import { apiServicesEndpoints, getApiServiceEndpoint } from "@/lib/apiEndpoints";

import {
  IRegistration_RegisterStep1,
  IRegistration_RegisterStep2,
  IRegistration_ClientCheck,
  IRegistration_SingleRegister,
} from "./RegistrationServiceTypes";

import { api } from "@/lib/axios";

export const singleRegister = async (data: IRegistration_SingleRegister) => {
  try {
    const url = getApiServiceEndpoint(apiServicesEndpoints.registration.singleRegister);
    const response = await api.post(url, data);
    if (response.data?.hasError !== false) {
      throw new Error(response.data?.errors);
    } else {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const registerStep1 = async (data: IRegistration_RegisterStep1) => {
  try {
    const url = getApiServiceEndpoint(apiServicesEndpoints.registration.registerStep1);
    const response = await api.post(url, data);
    if (response.data?.hasError !== false) {
      throw new Error(response.data?.errors);
    } else {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const registerStep2 = async (data: IRegistration_RegisterStep2) => {
  try {
    const url = getApiServiceEndpoint(apiServicesEndpoints.registration.registerStep2);
    const response = await api.post(url, data);
    if (response.data?.hasError !== false) {
      throw new Error(response.data?.errors);
    } else {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const clientCheck = async (data: IRegistration_ClientCheck) => {
  try {
    const url = getApiServiceEndpoint(apiServicesEndpoints.registration.clientCheck);
    const response = await api.post(url, data);
    if (response.data?.hasError !== false) {
      throw new Error(response.data?.errors);
    } else {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
