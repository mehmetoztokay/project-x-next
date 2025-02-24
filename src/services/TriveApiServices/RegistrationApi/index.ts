import {
  ApiServiceEndpointOptions,
  apiServicesEndpoints,
  getApiServiceEndpoint,
} from "@/lib/apiEndpoints";

import {
  IRegistration_RegisterStep1,
  IRegistration_RegisterStep2,
  IRegistration_ClientCheck,
  IRegistration_SingleRegister,
} from "./RegistrationServiceTypes";
import { postRequestService } from "@/services/TriveApiServices/generalRequests";

export const singleRegister = async (
  data: IRegistration_SingleRegister,
  options: ApiServiceEndpointOptions,
) =>
  postRequestService(
    apiServicesEndpoints.registration.singleRegister,
    data,
    options,
  );

export const registerStep1 = async (
  data: IRegistration_RegisterStep1,
  options: ApiServiceEndpointOptions,
) =>
  postRequestService(
    apiServicesEndpoints.registration.registerStep1,
    data,
    options,
  );

export const registerStep2 = async (
  data: IRegistration_RegisterStep2,
  options: ApiServiceEndpointOptions,
) =>
  postRequestService(
    apiServicesEndpoints.registration.registerStep2,
    data,
    options,
  );

export const clientCheck = async (
  data: IRegistration_ClientCheck,
  options: ApiServiceEndpointOptions,
) =>
  postRequestService(
    apiServicesEndpoints.registration.clientCheck,
    data,
    options,
  );
