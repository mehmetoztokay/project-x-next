export interface FieldTypesOfRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  phoneCode: string;
  password: string;
  selectCountryCode: TypeSelectCountryCode | "";
  refcode: string;
  checkbox1: boolean;
  checkbox2: boolean;
}

export interface TypeSelectCountryCode {
  id: number;
  value: string;
  label: string;
  shortLabel: string;
  icon: string;
}
export interface RegisterUserData {  
  firstName: string;  
  lastName: string;  
  email: string;  
  countryCode: string;  
  phone: string;  
  phoneCode: string;  
  password: string;  
  selectCountryCode: string;  
  refcode: string;  
  checkbox1: boolean;  
  checkbox2: boolean;  
}  