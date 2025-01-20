"use client";
import {InputField} from "@/components/Atoms/FormFields/InputField";
import {SelectField} from "@/components/Atoms/FormFields/SelectField";
import {combineClass} from "@/helpers/development/combineClass";
import {Formik, Field, Form, FormikHelpers} from "formik";
import {useEffect, useState} from "react";
import Select from "react-select";
import * as Yup from "yup";
interface Values {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  choice: {};
  isim: string;
}

const RegisterFormScheme = Yup.object().shape({
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
});

const optionsWithFlags = [
  {
    value: "turkey",
    label: "+90 Turkey",
    shortLabel: "+90",
    icon: "https://flagcdn.com/w320/tr.png",
  },
  {
    value: "us",
    label: "+1 United States",
    shortLabel: "+1",
    icon: "https://flagcdn.com/w320/us.png",
  },
  {
    value: "uk",
    label: "+44 United Kingdom",
    shortLabel: "+44",
    icon: "https://flagcdn.com/w320/gb.png",
  },
];

export const RegisterForm = () => {
  const [choice, setChoice] = useState();

  return (
    <div className="max-w-[320px] mx-auto p-5 py-4 rounded-md bg-[#f5f5f5]">
      <h1 className="text-2xl font-bold">Register</h1>
      <p className="mb-8 font-light">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <Formik
        validationSchema={RegisterFormScheme}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "",
          phone: "",
          password: "",
          choice: {},
          isim: "",
        }}
        onSubmit={(values: Values, {setSubmitting}: FormikHelpers<Values>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className="grid gap-3">
          <InputField label="Name" name="firstName" type="text" innerFloatLabel={true} />
          <InputField label="Surname" name="lastName" type="text" innerFloatLabel={true} />
          <InputField label="E mail" name="email" type="text" innerFloatLabel={true} />
          <InputField label="isim" name="isim" innerFloatLabel={true} type="password" />
          <div className={combineClass("flex gap-2", {})}>
            <div className="w-[30%]">
              <InputField label="Code" name="countryCode" type="text" innerFloatLabel={true} />
            </div>
            <div className="w-[70%]">
              <InputField label="Phone" name="phone" type="text" innerFloatLabel={true} />
            </div>
          </div>
          <InputField label="Password" name="password" type="password" innerFloatLabel={true} />

          <SelectField options={optionsWithFlags} showIconOnControl showIconOnOptions hiddenIconOnControlForMobile showShortLabelOnMobile />

          <div className="text-left">
            <button
              type="submit"
              className="mt-1 bg-gray-300 transition hover:bg-gray-400 text-gray-900
             px-4 py-2 rounded-full w-full"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
