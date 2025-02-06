export interface FieldTypesOfRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  password: string;
  countryCodeSelect: CountryFormattedType | "";
  checkbox1: boolean;
  checkbox2: boolean;
}
export interface CountryType {
  alphaCode: string;
  countryName: string;
  phoneCountryLabel: string;
  countryCallingCode: string;
  flagUrl: string;
}

export interface CountryFormattedType {
  label: string;
  value: string;
  id: string;
  shortLabel: string;
  icon: string;
  phoneCode: string;
}
