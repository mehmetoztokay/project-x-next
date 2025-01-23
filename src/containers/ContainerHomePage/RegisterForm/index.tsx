"use client"
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { combineClass } from "@/helpers/development/combineClass";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";

import PhoneInput, { Value } from "react-phone-number-input/input";
import { FieldTypesOfRegisterForm } from "./FieldTypesOfRegisterForm";
import { FormSchemeOfRegister } from "./FormSchemeOfRegister";
import { getAllCountries } from "@/helpers/getAllCountries";



export const RegisterForm = () => {

  const optionsWithFlags = getAllCountries("en")
  console.log(optionsWithFlags);

  return (
    <div className="max-w-[340px] mx-auto p-5 py-4 rounded-md bg-white shadow-2xl">
      <h1 className="text-2xl font-bold">Register</h1>
      <p className="mb-8 font-light">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <Formik
        validationSchema={FormSchemeOfRegister}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "",
          phoneNumber: "",
          phoneCode: "",
          password: "",
          // FIXME: It's can't be null
          selectCountryCode: { id: 0, value: "", label: "", shortLabel: "", icon: "" },
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
            <Form className="grid gap-3">
              <InputField label="Name" name="firstName" type="text" innerFloatLabel={true} />
              <InputField label="Surname" name="lastName" type="text" innerFloatLabel={true} />
              <InputField label="E mail" name="email" type="text" innerFloatLabel={true} />

              <div className={combineClass("grid grid-cols-12 gap-1 relative", {})}>
                <div className="col-span-4">
                  <SelectField
                    isClearable={false}
                    name="selectCountryCode"
                    value={values.selectCountryCode}
                    onChange={(option: any) => {
                      setFieldValue("selectCountryCode", option);
                      setFieldValue("phoneNumber", option.shortLabel);
                    }}
                    onBlur={() => setFieldTouched("selectCountryCode")}
                    placeholderText="Code"
                    options={getAllCountries("en")}
                    className="text-xs lg:text-base !static"
                    showIconOnControl
                    showIconOnOptions
                    hiddenIconOnControlForMobile
                    showShortLabelOnControl
                    removeDropdownIndicatorIsFocused
                  />
                </div>
                <div className="col-span-8">
                  <PhoneInput
                    className={combineClass(
                      "peer w-full border placeholder-transparent border-gray-200 rounded-md py-3 px-3 focus:outline-none focus:text-gray-900 focus:border-blue-500 ",
                      {
                        "!text-gray-900": values.phoneNumber?.length > 0, // Update class based on phone number presence
                        "border-red-500": touched.phoneNumber && errors.phoneNumber, // Update class for error
                      }
                    )}
                    country={values?.selectCountryCode?.value as "TR" | undefined}
                    placeholder="Number"
                    value={values.phoneNumber}
                    onChange={(value: Value) => setFieldValue("phoneNumber", value)}
                    onBlur={() => {
                      setFieldTouched("phoneNumber");
                      setErrors({ ...errors, phoneNumber: undefined }); // Clear error message on blur
                    }}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <div className="text-red-500 text-xs">{errors.phoneNumber} hataa</div>
                  )}
                </div>
              </div>

              <InputField label="Password" name="password" type="password" checked={values.checkbox1} innerFloatLabel={false} />

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
          );
        }}
      </Formik>
    </div>
  );
};