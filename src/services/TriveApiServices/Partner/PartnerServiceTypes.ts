export interface IPartner_SingleRegister {
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
  crRefCode: string;
  scaPassword: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  marketingDataId: string | null;
  isPartner: true;
  //   // TODO affiliateCxdId and affiliateId simdilik bos gidiyor, ama cellexpert'ten geldiginde bunlar doldurulmali.
  //   affiliateCxdId: string;
  //   affiliateId: string;
  //   isSendScaPassword: boolean;
}
