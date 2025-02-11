export interface IFieldsOfRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  password: string;
  countryCodeSelect: ICountryCodeSelect | "";
  cvFile: File | null;
  checkbox1: boolean;
  checkbox2: boolean;
}

export interface ICountryCodeSelect {
  label: string;
  value: string;
  id: string;
  shortLabel?: string;
  icon?: any;
  phoneCode: string;
  iconIsComponent?: boolean;
}

export interface ICountrySelect {
  label: string;
  value: string;
  id: string;
}
