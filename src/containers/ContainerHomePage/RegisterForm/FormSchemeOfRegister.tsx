import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";


export const FormSchemeOfRegister = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "sadece harf")
        .required("Zorunlu alan")
        .min(2, "Cok kisa oldu")
        .max(8, "Cok uzun"),
    lastName: Yup.string()
        .min(2, "Cok kisa oldu")
        .max(8, "Cok uzun")
        .required("Zorunlu alan")
        .matches(/^[A-Za-z]+$/, "sadece harf"),
    email: Yup.string()
        .min(2, "cok kisa")
        .max(20, "cok uzun")
        .required("zorunlu alan")
        .email("duzgun gir maili")
        .matches(/^[^A-Z]*$/, "sadece kucuk harf"),
    selectCountryCode: Yup.object().required("bos olmamali"),
    checkbox1: Yup.boolean().oneOf([true], "This field is required. Please tick the checkbox to continue."),
    checkbox2: Yup.boolean(),
    phoneNumber: Yup.string()
        .test(
            "is-valid-phone",
            "It's not a valid phone number",
            (value) => {
                if (value) {
                    return isValidPhoneNumber(value);
                }
                return true; // Allow empty phone numbers (optional)
            }
        ),
});