import {
  ApiServiceEndpointOptions,
  apiServicesEndpoints,
} from "@/lib/apiEndpoints";
import { postRequestService } from "../generalRequests";

export const createMarketingId = async (
  data: IMarketingIdData,
  options: ApiServiceEndpointOptions,
) => {
  return postRequestService(
    apiServicesEndpoints.marketing.createMarketingId,
    data,
    options,
  );
};
