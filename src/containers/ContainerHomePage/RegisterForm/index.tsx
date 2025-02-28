"use client";
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { combineClass } from "@/helpers/development/combineClass";
import { Formik, Form, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { IFieldsOfRegisterForm } from "./FieldTypesOfRegisterForm";
import { FormSchemeOfRegister } from "./FormSchemeOfRegister";
import { PhoneNumberField } from "@/components/Atoms/FormFields/PhoneNumberField";
import { ICountryCodeSelect, ICountrySelect, useCountryList } from "@/hooks/useCountryList";
import { useSearchParams } from "next/navigation";
import { FileUploadField } from "@/components/Atoms/FormFields/FileUploadField";
import { parsePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";

export const RegisterForm = () => {
  const [countryCodeSelectValues, setCountryCodeSelectValues] = useState<ICountryCodeSelect[]>([]);
  const [countrySelectValues, setCountryNames] = useState<ICountrySelect[]>([]);

  const searchParams = useSearchParams();

  const lang = searchParams.get("lang") || "";

  useEffect(() => {
    const fetchCountryList = async () => {
      const { getFormattedCountryCodeSelectValues, getFormattedCountrySelectValues } = useCountryList();

      const formattedCountryCodeSelectValues = await getFormattedCountryCodeSelectValues();
      const formattedCountrySelectValues = await getFormattedCountrySelectValues();

      setCountryCodeSelectValues(formattedCountryCodeSelectValues);
      setCountryNames(formattedCountrySelectValues);
    };

    fetchCountryList();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-md bg-white p-5 py-4 shadow-2xl">
      <h1 className="text-2xl font-bold">Register</h1>
      <p className="mb-8 font-light">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <Formik
        validationSchema={FormSchemeOfRegister}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneCode: "",
          phoneNumber: "",
          password: "",
          countryCodeSelect: "",
          cvFile: null,
          checkbox1: false,
          checkbox2: false,
        }}
        onSubmit={(values: IFieldsOfRegisterForm, { setSubmitting }: FormikHelpers<IFieldsOfRegisterForm>) => {
          console.log(values);

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue, errors, touched, handleBlur, setFieldTouched, setErrors, setValues, handleChange }) => {
          return (
            <>
              <Form className="grid gap-3">
                <InputField label="Name" name="firstName" type="text" isClearable />
                <InputField label="Surname" name="lastName" type="text" />
                <InputField label="E mail" name="email" type="mail" />

                <div className={combineClass("relative flex gap-1.5", {})}>
                  <div className="w-[27%]">
                    <SelectField
                      isClearable={false}
                      name="countryCodeSelect"
                      value={values.countryCodeSelect}
                      onChange={(option: any) => {
                        // Clear error message of countryCodeSelect
                        setErrors({ ...errors, countryCodeSelect: undefined });
                        setValues({
                          ...values,
                          countryCodeSelect: option,
                          phoneNumber: "+" + option.phoneCode,
                          phoneCode: option.shortLabel,
                        });
                      }}
                      onBlur={() => {
                        !touched.countryCodeSelect && setFieldTouched("countryCodeSelect", true);
                        values.countryCodeSelect &&
                          setErrors({
                            ...errors,
                            countryCodeSelect: undefined,
                          });
                      }}
                      placeholderText="Code"
                      options={countryCodeSelectValues}
                      className="h-100 !static text-base"
                      showOnlyIconOnControl
                      showIconOnOptions
                    />
                  </div>
                  <div className="w-[73%]">
                    <PhoneNumberField
                      label="Phone Number"
                      name="phoneNumber"
                      // For autocomplete
                      runOnChange={(value) => {
                        if (values.countryCodeSelect == "") {
                          const checkPhoneNumberIsValid = value ? isValidPhoneNumber(value) : false;
                          const country = checkPhoneNumberIsValid ? parsePhoneNumber(value)?.country : false;

                          const foundCountry = country && countryCodeSelectValues?.find((c) => c.value.toLowerCase() == country?.toLowerCase());
                          foundCountry && setFieldValue("countryCodeSelect", foundCountry || "");
                        }
                      }}
                      onCountryChange={(country: any) => {
                        const foundCountry = countryCodeSelectValues?.find((c) => c.value.toLowerCase() == country?.toLowerCase());
                        foundCountry && setFieldValue("phoneCode", "+" + foundCountry?.phoneCode || "");
                        foundCountry && setFieldValue("countryCodeSelect", foundCountry || "");
                      }}
                    />
                  </div>
                </div>

                <SelectField options={countrySelectValues} name="test" showIconOnControl showIconOnOptions isClearable={false} />

                <InputField label="Password" name="password" type="password" checked={values.checkbox1} />
                <FileUploadField
                  uploadMessage={"Upload CV"}
                  dropMessage="Drop CV"
                  name="cvFile"
                  acceptTypesMessage="The file must be PDF format and not exceed 500KB"
                />

                <CheckboxField name="checkbox1">
                  You need to enable JavaScript to run this app. You need to enable JavaScript to run this app.{" "}
                  <a target="_blank" href="https://www.trive.com" className="text-blue-500 underline">
                    You need to enable JavaScript
                  </a>{" "}
                  to run this app.
                </CheckboxField>

                <CheckboxField name="checkbox2">Test field</CheckboxField>

                <div className="text-left">
                  <button type="submit" className="mt-1 w-full rounded-full bg-gray-300 px-4 py-2 text-gray-900 transition hover:bg-gray-400">
                    Submit
                  </button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};
