"use client";
import {CheckboxField} from "@/components/Atoms/FormFields/CheckboxField";
import {InputField} from "@/components/Atoms/FormFields/InputField";
import {SelectField} from "@/components/Atoms/FormFields/SelectField";
import {combineClass} from "@/helpers/development/combineClass";
import {Formik, Field, Form, FormikHelpers, useFormik} from "formik";
import * as Yup from "yup";
interface Values {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  selectCountryCode: any;
  checkbox1: boolean;
  checkbox2: boolean;
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
  selectCountryCode: Yup.object().required("bos olmamali"),
  checkbox1: Yup.boolean().oneOf([true], "This field is required. Please tick the checkbox to continue."),
  checkbox2: Yup.boolean(),
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
  return (
    <div className="max-w-[340px] mx-auto p-5 py-4 rounded-md bg-[#f5f5f5]">
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
          selectCountryCode: null,
          checkbox1: false,
          checkbox2: false,
        }}
        onSubmit={(values: Values, {setSubmitting}: FormikHelpers<Values>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({values, setFieldValue, errors, touched, handleBlur, setFieldTouched}) => (
          <Form className="grid gap-3">
            <InputField label="Name" name="firstName" type="text" innerFloatLabel={true} />
            <InputField label="Surname" name="lastName" type="text" innerFloatLabel={true} />
            <InputField label="E mail" name="email" type="text" innerFloatLabel={true} />
            <div className={combineClass("flex gap-2 relative", {})}>
              <div className="w-[35%]">
                <SelectField
                  isClearable={false}
                  name="selectCountryCode"
                  value={values.selectCountryCode}
                  onChange={(option) => setFieldValue("selectCountryCode", option)}
                  onBlur={() => setFieldTouched("selectCountryCode")}
                  placeholderText="Code"
                  options={optionsWithFlags}
                  showIconOnControl
                  className="text-xs lg:text-base !static"
                  // menuClasses="!w-full"
                  showIconOnOptions
                  // menuIsOpen
                  hiddenIconOnControlForMobile
                  showShortLabelOnControl
                  showShortLabelOnOptions
                />
                {/* <InputField label="Code" name="countryCode" type="text" innerFloatLabel={true} /> */}
              </div>
              <div className="w-[65%]">
                <InputField label="Phone" name="phone" type="text" innerFloatLabel={true} />
              </div>
            </div>
            <InputField label="Password" name="password" type="password" checked={values.checkbox1} innerFloatLabel={false} />

            {/* <SelectField
              name="selectCountryCode"
              value={values.selectCountryCode}
              onChange={(option) => setFieldValue("selectCountryCode", option)}
              onBlur={() => setFieldTouched("selectCountryCode")}
              options={optionsWithFlags}
              showIconOnControl
              showIconOnOptions
              hiddenIconOnControlForMobile
              showShortLabelOnControl
            /> */}

            <CheckboxField name="checkbox1">
              {errors.checkbox1}
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
        )}
      </Formik>
    </div>
  );
};
