interface ILandingPage_BaseService {
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

export interface ILandingPage_SingleRegister extends ILandingPage_BaseService {
  landingPageName: string;
  marketingDataId: string | null;
  crRefCode: string;
  scaPassword: string;
  isSendScaPassword: boolean;
  isPartner: false;
  // utmSource: string | null;
  // utmMedium: string | null;
  // utmCampaign: string | null;
  // utmContent: string | null;
}

export interface ILandingPage_RegisterStep1 extends ILandingPage_BaseService {
  // utmSource: string | null;
  // utmMedium: string | null;
  // utmCampaign: string | null;
  // utmContent: string | null;
  marketingDataId: string | null;
  // affiliateCxdId: string;
  // affiliateId: string;
  crRefCode: string;
}

export interface ILandingPage_RegisterStep2 {
  siteId: number;
  email: string;
  password: string;
  isPartner: false;
}
