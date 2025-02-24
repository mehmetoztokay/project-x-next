const API_GATEWAY_BASE_URL = "https://api-gateway.trive.com/api/gateway";
const API_INT_GATEWAY_BASE_URL =
  "https://api-int-gateway.trive.com/api/gateway";
const API_GATEWAY_INVEST_BASE_URL =
  "https://api-gateway.triveinvest.co.id/api/gateway";

const API_VERSION = "1";

type Region = "eu" | "int" | "invest";

export interface ApiServiceEndpointOptions {
  region: Region;
}

const getBaseURL = ({ region }: ApiServiceEndpointOptions) => {
  switch (region) {
    case "invest":
      return API_GATEWAY_INVEST_BASE_URL;
    case "int":
      return API_INT_GATEWAY_BASE_URL;
    case "eu":
    default:
      return API_GATEWAY_BASE_URL;
  }
};

export const apiServicesEndpoints = {
  registration: {
    singleRegister: `/registration/${API_VERSION}/Registration/singleregister`,
    registerStep1: `/registration/${API_VERSION}/LandingPage/registerstep1`,
    registerStep2: `/registration/${API_VERSION}/LandingPage/registerstep2`,
    clientCheck: `/registration/${API_VERSION}/LandingPage/clientcheck`,
  },
};

export const getApiServiceEndpoint = (
  endpoint: string,
  options: ApiServiceEndpointOptions,
) => `${getBaseURL(options)}${endpoint}`;

// Usage example:
// getEndpoint(apiServices.landingPage.singleRegisterApi, { region: "eu" });
