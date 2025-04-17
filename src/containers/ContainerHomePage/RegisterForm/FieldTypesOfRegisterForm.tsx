import { ICountryCodeSelect } from "@/lib/hooks/useCountryList";

export interface IFieldsOfRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  password: string;
  countryCodeSelect: ICountryCodeSelect | "";
  refcode: string;
  cvFile: File | null;
  checkbox1: boolean;
  checkbox2: boolean;
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