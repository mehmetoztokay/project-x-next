interface IRegistration_BaseService {
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
}

export interface IRegistration_SingleRegister
  extends IRegistration_BaseService {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  marketingDataId: string;
  affiliateCxdId: string;
  affiliateId: string;
  crRefCode: string;
  scaPassword: string;
  isSendScaPassword: boolean;
  isPartner: boolean;
}

export interface IRegistration_RegisterStep1 extends IRegistration_BaseService {
  marketingDataId: string;
  affiliateCxdId: string;
  affiliateId: string;
  crRefCode: string;
}

export interface IRegistration_RegisterStep2 {
  siteId: number;
  email: string;
  password: string;
  isPartner: boolean;
}

export interface IRegistration_ClientCheck {
  email: string;
}
