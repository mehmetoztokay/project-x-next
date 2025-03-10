import { ICountryCodeSelect } from "@/hooks/useCountryList";

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
