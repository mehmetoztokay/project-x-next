"use client";
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { combineClass } from "@/helpers/development/combineClass";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FieldTypesOfRegisterForm } from "./FieldTypesOfRegisterForm";
import { FormSchemeOfRegister } from "./FormSchemeOfRegister";
import { getAllCountries } from "@/helpers/getAllCountries";
import { PhoneNumberField } from "@/components/Atoms/FormFields/PhoneNumberField";

export const RegisterForm = () => {
  const [countriesData, setCountriesData] = useState<any>(null);

  useEffect(() => {
    setCountriesData(getAllCountries("en"));
  }, []);

  return (
    <div className="max-w-[350px] mx-auto p-5 py-4 rounded-md bg-white shadow-2xl">
      <h1 className="text-2xl font-bold">Register</h1>
      <p className="mb-8 font-light">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <Formik
        validationSchema={FormSchemeOfRegister}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          countryCode: "",
          checkbox1: false,
          checkbox2: false,
        }}
        onSubmit={(values: FieldTypesOfRegisterForm, { setSubmitting }: FormikHelpers<FieldTypesOfRegisterForm>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue, errors, touched, handleBlur, setFieldTouched, setErrors }) => {
          return (
            <>
              <Form className="grid gap-3">
                <InputField label="Name" name="firstName" type="text" />
                <InputField label="Surname" name="lastName" type="text" />
                <InputField label="E mail" name="email" type="text" />

                <div className={combineClass("grid grid-cols-12 gap-1 relative", {})}>
                  <div className="col-span-3">
                    <SelectField
                      isClearable={false}
                      name="countryCode"
                      value={values.countryCode}
                      onChange={(option: any) => {
                        setFieldValue("countryCode", option);
                        setFieldValue("phoneNumber", option.shortLabel);
                        values.countryCode && setErrors({ ...errors, countryCode: undefined });
                      }}
                      onBlur={() => {
                        setFieldTouched("countryCode");
                      }}
                      placeholderText="Code"
                      options={countriesData}
                      className="text-base !static h-100"
                      // showIconOnControl
                      showOnlyIconOnControl
                      showIconOnOptions
                    // hiddenIconOnControlForMobile
                    // showShortLabelOnControl
                    // removeDropdownIndicatorIsFocused
                    />
                  </div>
                  <div className="col-span-9">
                    <PhoneNumberField label="Phone Number" name="phoneNumber" onCountryChange={(country: any) => {
                      const foundCountry = countriesData?.find((o: any) => o.value.toLowerCase() == country?.toLowerCase())
                      setFieldValue(
                        "countryCode",
                        foundCountry
                      );
                    }} />
                  </div>
                </div>

                <InputField label="Password" name="password" type="password" checked={values.checkbox1} />

                <CheckboxField name="checkbox1">
                  You need to enable JavaScript to run this app. You need to enable JavaScript to run this app.
                  <a target="_blank" href="https://www.trive.com" className="text-blue-500 underline">
                    You need to enable JavaScript{" "}
                  </a>
                  to run this app.
                </CheckboxField>

                <CheckboxField name="checkbox2">test</CheckboxField>

                <div className="text-left">
                  <button type="submit" className="mt-1 bg-gray-300 transition hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-full w-full">
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
