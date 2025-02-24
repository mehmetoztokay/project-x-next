import {
  ApiServiceEndpointOptions,
  getApiServiceEndpoint,
} from "@/lib/apiEndpoints";
import { api } from "@/lib/axios";

export const postRequestService = async <T>(
  endpoint: string,
  data: T,
  options: ApiServiceEndpointOptions,
) => {
  try {
    const url = getApiServiceEndpoint(endpoint, options);
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
