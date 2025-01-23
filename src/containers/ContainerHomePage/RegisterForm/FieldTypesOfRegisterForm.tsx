export interface FieldTypesOfRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    phoneCode: string;
    password: string;
    selectCountryCode: TypeSelectCountryCode;
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