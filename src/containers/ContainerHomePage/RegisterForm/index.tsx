"use client";
import {CheckboxField} from "@/components/Atoms/FormFields/CheckboxField";
import {InputField} from "@/components/Atoms/FormFields/InputField";
import {SelectField} from "@/components/Atoms/FormFields/SelectField";
import {combineClass} from "@/helpers/development/combineClass";
import {Formik, Field, Form, FormikHelpers, useFormik} from "formik";
import {useEffect, useRef, useState} from "react";
import {CountryFormattedType, CountryType, FieldTypesOfRegisterForm} from "./FieldTypesOfRegisterForm";
import {FormSchemeOfRegister} from "./FormSchemeOfRegister";
import {PhoneNumberField} from "@/components/Atoms/FormFields/PhoneNumberField";
import {getCountryList} from "@/helpers/getCountryList";

export const RegisterForm = () => {
  const [countryList, setCountryList] = useState<CountryFormattedType[]>([]);

  useEffect(() => {
    const fetchCountryList = async () => {
      const allCountries = (await getCountryList("tr", true)) as CountryType[];

      const formattedCountries = allCountries.map((country) => ({
        label: country.phoneCountryLabel,
        value: country.alphaCode,
        id: country.alphaCode,
        shortLabel: `+${country.countryCallingCode}`,
        icon: country.flagUrl,
        phoneCode: country.countryCallingCode,
      }));

      setCountryList(formattedCountries);
    };

    fetchCountryList();
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
          phoneCode: "",
          phoneNumber: "",
          password: "",
          countryCodeSelect: "",
          checkbox1: false,
          checkbox2: false,
        }}
        onSubmit={(values: FieldTypesOfRegisterForm, {setSubmitting}: FormikHelpers<FieldTypesOfRegisterForm>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({values, setFieldValue, errors, touched, handleBlur, setFieldTouched, setErrors, setValues}) => {
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
                      name="countryCodeSelect"
                      value={values.countryCodeSelect}
                      onChange={(option: any) => {
                        // Clear error message of countryCodeSelect
                        setErrors({...errors, countryCodeSelect: undefined});
                        setValues({
                          ...values, // Mevcut form verilerini koru
                          countryCodeSelect: option, // countryCodeSelect'ı güncelle
                          phoneNumber: option.shortLabel, // phoneNumber'ı güncelle
                          phoneCode: option.shortLabel, // phoneCode'u güncelle
                        });
                      }}
                      onBlur={() => {
                        !touched.countryCodeSelect && setFieldTouched("countryCodeSelect", true);
                        values.countryCodeSelect && setErrors({...errors, countryCodeSelect: undefined});
                      }}
                      placeholderText="Code"
                      options={countryList}
                      className="text-base !static h-100"
                      showOnlyIconOnControl
                      showIconOnOptions
                    />
                  </div>
                  <div className="col-span-9">
                    <PhoneNumberField
                      label="Phone Number"
                      name="phoneNumber"
                      onCountryChange={(country: any) => {
                        const foundCountry = countryList?.find((c: CountryFormattedType) => c.value.toLowerCase() == country?.toLowerCase());
                        setFieldValue("countryCodeSelect", foundCountry);
                      }}
                    />
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
