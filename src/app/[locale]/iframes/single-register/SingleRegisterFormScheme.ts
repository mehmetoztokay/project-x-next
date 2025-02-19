import {
  regexAtLeastOneLowerCase,
  regexAtLeastOneNumber,
  regexAtLeastOneUpperCase,
  regexNoSpecialChars,
  regexOnlyLetters,
  regexOnlyLowercaseLetters,
  regexPhoneCode,
} from "@/helpers/regexUtils";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const getSingleRegisterFormScheme = (tForm: any) => {
  const scheme = Yup.object().shape({
    // Email
    email: Yup.string()
      .required(tForm("isRequired"))
      .min(5, tForm("minChars", { number: 5 }))
      .max(50, tForm("maxChars", { number: 50 }))
      .email(tForm("invalidEmail"))
      .matches(regexOnlyLowercaseLetters, tForm("onlyLowercase")),
    // FirstName
    firstName: Yup.string()
      .required(tForm("isRequired"))
      .matches(regexOnlyLetters, tForm("useOnlyLetters"))
      .min(2, tForm("minChars", { number: 2 }))
      .max(20, tForm("maxChars", { number: 20 })),
    // LastName
    lastName: Yup.string()
      .required(tForm("isRequired"))
      .matches(regexOnlyLetters, tForm("useOnlyLetters"))
      .min(2, tForm("minChars", { number: 2 }))
      .max(20, tForm("maxChars", { number: 20 })),
    // Phone
    phone: Yup.string()
      .required(tForm("isRequired"))
      .test("is-valid-phone", tForm("invalidPhone"), (value) => {
        if (value) {
          return isValidPhoneNumber(value);
        }
        return true;
      }),
    // PhoneCode
    phoneCode: Yup.string()
      .required(tForm("isRequired"))
      .matches(regexPhoneCode, tForm("invalidPhoneCode")),
    // Consent Marketing
    consentMarketing: Yup.boolean().oneOf([true, false]),
    // Consent of Terms and Conditions
    termsAndConditions: Yup.boolean().oneOf([true], tForm("checkboxRequired")),
    // Country of Resicende
    countryOfResidence: Yup.string()
      .required(tForm("isRequired"))
      .min(2, tForm("minChars", { number: 2 }))
      .max(2, tForm("maxChars", { number: 2 })),
    cRefCode: Yup.string(),
    scaPassword: Yup.string()
      .required(tForm("isRequired"))
      .matches(regexNoSpecialChars, tForm("noSpecialChars"))
      .min(8, tForm("minChars", { number: 8 }))
      .max(15, tForm("maxChars", { number: 15 }))
      .matches(regexAtLeastOneUpperCase, tForm("atLeastOneUpperCase"))
      .matches(regexAtLeastOneLowerCase, tForm("atLeastOneLowerCase"))
      .matches(regexAtLeastOneNumber, tForm("atLeastOneNumber")),
    countryCodeSelect: Yup.object().required(),
  });

  return scheme;
};
