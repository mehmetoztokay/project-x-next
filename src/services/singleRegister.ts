import { api } from "@/lib/axios";
import { getEndpoint } from "@/lib/apiEndpoints";

export interface ISingleRegisterPayload {
  siteId: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneCode: string;
  fullPageUrl: string;
  consentMarketing: boolean;
  countryOfResidence: string;
  source: string;
  crRefCode: string;
  scaPassword: string;
}

export const singleRegister = async (
  data: ISingleRegisterPayload,
  isInt: boolean = false,
) => {
  try {
    const url = getEndpoint("singleRegisterApi", isInt);
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
