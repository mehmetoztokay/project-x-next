import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const FormSchemeOfRegister = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[\p{L}]+(?:\s[\p{L}]+)*$/u, "Sadece harf")
    .required("Zorunlu alan")
    .min(2, "Cok kisa oldu")
    .max(8, "Cok uzun"),
  lastName: Yup.string()
    .min(2, "Cok kisa oldu")
    .max(8, "Cok uzun")
    .required("Zorunlu alan")
    .matches(/^[\p{L}]+(?:\s[\p{L}]+)*$/u, "Sadece harf"),
  email: Yup.string()
    .min(2, "cok kisa")
    .max(20, "cok uzun")
    .required("zorunlu alan")
    .email("duzgun gir maili")
    .matches(/^[^A-Z]*$/, "sadece kucuk harf"),
  countryCodeSelect: Yup.object().required("Error"),
  checkbox1: Yup.boolean().oneOf([true], "This field is required. Please tick the checkbox to continue."),
  checkbox2: Yup.boolean(),
  phoneNumber: Yup.string()
    .required("zorunlu alan")
    .test("is-valid-phone", "It's not valid", (value) => {
      if (value) {
        return isValidPhoneNumber(value);
      }
      return true; // Allow empty phone numbers (optional)
    }),
  cvFile: Yup.mixed<File>()
    .required('Required')
    .test('fileFormat', 'Only PDF files are allowed', (value: File) => {
      if (value instanceof File) {
        const supportedFormats = ['pdf'];
        return supportedFormats.includes(value.name.split('.').pop()?.toLowerCase() || '');
      }
      return false;
    })
    .test('fileSize', 'File size must be less than 3MB', (value) => {
      if (value instanceof File) {
        return value.size <= 3 * 1024 * 1024; // 3MB
      }
      return false;
    }),
});
