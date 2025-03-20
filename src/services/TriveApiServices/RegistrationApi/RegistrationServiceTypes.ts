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
  source: "WEB";
}

export interface IRegistration_SingleRegister extends IRegistration_BaseService {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  marketingDataId: string | null;
  // TODO affiliateCxdId and affiliateId simdilik bos gidiyor, ama cellexpert'ten geldiginde bunlar doldurulmali.
  affiliateCxdId: string;
  affiliateId: string;
  crRefCode: string;
  scaPassword: string;
  isSendScaPassword: boolean;
  isPartner: false;
}

export interface IRegistration_RegisterStep1 extends IRegistration_BaseService {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  marketingDataId: string | null;
  affiliateCxdId: string;
  affiliateId: string;
  crRefCode: string;
}

export interface IRegistration_RegisterStep2 {
  siteId: number;
  email: string;
  password: string;
  isPartner: false;
}

export interface IRegistration_ClientCheck {
  email: string;
}
