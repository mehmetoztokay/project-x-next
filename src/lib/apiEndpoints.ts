import { isDevMode } from "@/helpers/isDevMode";
import { LocaleItem, useCurrentSiteInfo } from "@/i18n/routing";

const API_EU_GATEWAY_BASE_URL = `https://api${isDevMode ? "-dev" : ""}-gateway.trive.com/api/gateway`;
const API_INT_GATEWAY_BASE_URL = `https://api${isDevMode ? "-dev" : ""}-int-gateway.trive.com/api/gateway`;
const API_GATEWAY_INVEST_BASE_URL = `https://api${isDevMode ? "-dev" : ""}-gateway.triveinvest.co.id/api/gateway`;

const API_VERSION = "1";

const getBaseURL = ({ locale }: { locale: LocaleItem["locale"] }) => {
  const currentSite = useCurrentSiteInfo({ locale });

  switch (currentSite?.region) {
    case "id":
      return API_GATEWAY_INVEST_BASE_URL;
    case "int":
      return API_INT_GATEWAY_BASE_URL;
    case "eu":
      return API_EU_GATEWAY_BASE_URL;
    default:
      return API_EU_GATEWAY_BASE_URL;
  }
};

export const apiServicesEndpoints = {
  registration: {
    singleRegister: `/registration/v${API_VERSION}/Registration/singleregister`,
    registerStep1: `/registration/v${API_VERSION}/Registration/registerstep1`,
    registerStep2: `/registration/v${API_VERSION}/Registration/registerstep2`,
    clientCheck: `/registration/v${API_VERSION}/Registration/clientcheck`,
  },
  marketing: {
    createMarketingId: `/registration/v${API_VERSION}/Marketing/create-marketingId`,
  },
  partner: {
    singleRegister: `/registration/v${API_VERSION}/Partner/singleregister`,
    clientCheck: `/registration/v${API_VERSION}/Partner/clientcheck`,
    refCodeCheck: `/registration/v${API_VERSION}/Partner/refcodecheck`,
  },
};

export const getApiServiceEndpoint = (endpoint: string, locale: LocaleItem["locale"]) => `${getBaseURL({ locale })}${endpoint}`;

// Usage example:
// getEndpoint(apiServices.landingPage.singleRegisterApi, { region: "eu" });
