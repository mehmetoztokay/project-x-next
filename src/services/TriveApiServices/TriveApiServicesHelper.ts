import { LocaleItem } from "@/i18n/routing";
import { lp_clientCheck, lp_registerStep1, lp_registerStep2, lp_singleRegister } from "./LandingPageApi";
import { registerClientCheck, registerStep1, registerStep2, singleRegister } from "./RegistrationApi";
import { partner_clientCheck, partner_singleRegister } from "./Partner";

type RegistrationApiType = "registration" | "partner" | "landingpage";

export const singleRegisterApi = async ({
  formType,
  formData,
  locale,
  landingPageName,
}: {
  formType: RegistrationApiType;
  formData: any;
  locale: LocaleItem["locale"];
  landingPageName?: string;
}) => {
  switch (formType) {
    case "registration":
    default:
      return await singleRegister({ data: formData, locale });
      break;
    case "landingpage":
      return await lp_singleRegister({ data: { ...formData, landingPageName }, locale });
      break;
    case "partner":
      return await partner_singleRegister({ data: { ...formData }, locale });
      break;
  }
};

export const registerStep1Api = async ({
  formType,
  step1Data,
  locale,
  landingPageName,
}: {
  formType: Omit<RegistrationApiType, "partner">;
  step1Data: any;
  locale: LocaleItem["locale"];
  landingPageName?: string;
}) => {
  switch (formType) {
    case "registration":
    default:
      return await registerStep1({ data: step1Data, locale });
      break;
    case "landingpage":
      return await lp_registerStep1({ data: { ...step1Data, landingPageName }, locale });
      break;
  }
};

export const registerStep2Api = async ({
  formType,
  step2Data,
  locale,
}: {
  formType: Omit<RegistrationApiType, "partner">;
  step2Data: any;
  locale: LocaleItem["locale"];
}) => {
  switch (formType) {
    case "registration":
    default:
      return await registerStep2({ data: step2Data, locale });
      break;
    case "landingpage":
      return await lp_registerStep2({ data: { ...step2Data }, locale });
      break;
  }
};

export const clientCheckApi = async ({ formType, email, locale }: { formType: RegistrationApiType; email: string; locale: LocaleItem["locale"] }) => {
  switch (formType) {
    case "registration":
    default:
      return await registerClientCheck({ data: { email }, locale });
      break;
    case "landingpage":
      return await lp_clientCheck({ data: { email }, locale });
      break;
    case "partner":
      return await partner_clientCheck({ data: { email }, locale });
      break;
  }
};
