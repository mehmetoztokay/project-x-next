const API_GATEWAY_BASE_URL = "https://api-gateway.trive.com/api/gateway";
const API_INT_GATEWAY_BASE_URL =
  "https://api-int-gateway.trive.com/api/gateway";
const API_VERSION = "1";

export const getEndpoint = (
  key: keyof typeof endpoints,
  isInt: boolean = false,
) => {
  const baseURL = isInt ? API_INT_GATEWAY_BASE_URL : API_GATEWAY_BASE_URL;
  return `${baseURL}${endpoints[key]}`;
};

interface Endpoints {
  singleRegisterApi: string;
}

const endpoints: Endpoints = {
  singleRegisterApi: `/registration/${API_VERSION}/Partner/singleregister`,
};
