export interface FieldTypesOfRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  password: string;
  countrySelect: CountryFormattedType | "";
  checkbox1: boolean;
  checkbox2: boolean;
}
export interface CountryType {
  phoneCountryLabel: string;
  countryCallingCode: string;
  alphaCode: string;
  flagUrl: string;
  countryData: {[key: string]: string};
}

export interface CountryFormattedType {
  label: string;
  value: string;
  id: string;
  shortLabel: string;
  icon: string;
  phoneCode: string;
}
