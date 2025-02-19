"use client";
import { ISingleRegisterPayload } from "@/services/singleRegister";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { getSingleRegisterFormScheme } from "./SingleRegisterFormScheme";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { ICountryCodeSelect } from "@/types/ICountryCodeSelect";
import { ICountrySelect } from "@/types/ICountrySelect";
import { getCountryList } from "@/helpers/getCountryList";
import { useSearchParams } from "next/navigation";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { combineClass } from "@/helpers/development/combineClass";
import { PhoneNumberField } from "@/components/Atoms/FormFields/PhoneNumberField";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

export const SingleRegisterForm = () => {
  const t = useTranslations("IframePages");
  const tForm = useTranslations("Forms");

  const [countryCodeSelectValues, setCountryCodeSelectValues] = useState<
    ICountryCodeSelect[]
  >([]);
  const [countrySelectValues, setCountryNames] = useState<ICountrySelect[]>([]);

  const searchParams = useSearchParams();

  const lang = searchParams.get("lang") || "";

  useEffect(() => {
    const fetchCountryList = async () => {
      const allCountries = await getCountryList(lang);

      const formattedCountryCodeSelectValues = allCountries.map((country) => ({
        label: country.phoneCountryLabel,
        value: country.alphaCode,
        id: country.alphaCode,
        shortLabel: `+${country.countryCallingCode}`,
        icon: country.flagComponent,
        phoneCode: country.countryCallingCode,
        iconIsComponent: true,
      }));

      const formattedCountrySelectValues = allCountries.map((country) => ({
        label: country.countryName,
        value: country.alphaCode,
        id: country.alphaCode,
        shortLabel: country.alphaCode,
        icon: country.flagComponent,
        iconIsComponent: true,
      }));

      setCountryCodeSelectValues(formattedCountryCodeSelectValues);
      setCountryNames(formattedCountrySelectValues);
    };

    fetchCountryList();
  }, []);

  const SingleRegisterFormScheme = getSingleRegisterFormScheme(tForm);

  return (
    <div className="p-8">
      <Formik
        validationSchema={SingleRegisterFormScheme}
        initialValues={{
          // siteId: "",
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          phoneCode: "",
          // fullPageUrl: "",
          consentMarketing: false,
          termsAndConditions: false,
          countryOfResidence: "",
          // source:
          crRefCode: "",
          scaPassword: "",
          countryCodeSelect: "",
        }}
        onSubmit={(
          values: Omit<
            ISingleRegisterPayload,
            "siteId" | "fullPageUrl" | "source"
          > & {
            termsAndConditions: boolean;
            countryCodeSelect: ICountryCodeSelect | "";
          },
          {
            setSubmitting,
          }: FormikHelpers<
            Omit<
              ISingleRegisterPayload,
              "siteId" | "fullPageUrl" | "source"
            > & {
              termsAndConditions: boolean;
              countryCodeSelect: ICountryCodeSelect | "";
            }
          >,
        ) => {
          console.log(values);

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          handleBlur,
          setFieldTouched,
          setErrors,
          setValues,
          handleChange,
        }) => {
          return (
            <>
              <div className="p-4 py-8 text-xs">
                <br />
                <code>
                  {/* {JSON.stringify(values.phone)}
                  {JSON.stringify(values.phoneCode)}
                  {JSON.stringify(values.countryOfResidence)} */}
                  {/* {JSON.stringify(values.countryCodeSelect)} */}
                </code>
              </div>
              <Form className="grid gap-3">
                <InputField
                  name="firstName"
                  label={tForm("formLabels.firstName")}
                />
                <InputField
                  name="lastName"
                  label={tForm("formLabels.lastName")}
                />
                <InputField
                  name="email"
                  label={tForm("formLabels.email")}
                  type="email"
                />

                <InputField
                  name="scaPassword"
                  type="password"
                  label={tForm("formLabels.password")}
                />

                <div className={combineClass("relative flex gap-1.5", {})}>
                  <div className="w-[27%]">
                    <SelectField
                      isClearable={false}
                      name="countryCodeSelect"
                      value={values.countryCodeSelect}
                      onChange={(option: any) => {
                        // Clear error message of countryCodeSelect
                        setErrors({ ...errors, phoneCode: undefined });
                        setValues({
                          ...values,
                          countryCodeSelect: option,
                          phone: "+" + option.phoneCode,
                          phoneCode: option.shortLabel,
                        });
                      }}
                      onBlur={() => {
                        !touched.phoneCode &&
                          setFieldTouched("phoneCode", true);
                        values.phoneCode &&
                          setErrors({
                            ...errors,
                            phoneCode: undefined,
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
                      label={tForm("formLabels.phone")}
                      name="phone"
                      // For autocomplete
                      runOnChange={(value) => {
                        if (values.phoneCode == "") {
                          const checkPhoneNumberIsValid = value
                            ? isValidPhoneNumber(value)
                            : false;
                          const country = checkPhoneNumberIsValid
                            ? parsePhoneNumber(value)?.country
                            : false;

                          const foundCountry =
                            country &&
                            countryCodeSelectValues?.find(
                              (c) =>
                                c.value.toLowerCase() == country?.toLowerCase(),
                            );
                          foundCountry &&
                            setFieldValue("phoneCode", foundCountry || "");
                        }
                      }}
                      onCountryChange={(country: any) => {
                        const foundCountry = countryCodeSelectValues?.find(
                          (c) =>
                            c.value.toLowerCase() == country?.toLowerCase(),
                        );

                        foundCountry &&
                          setFieldValue(
                            "phoneCode",
                            "+" + foundCountry?.phoneCode || "",
                          );
                        foundCountry &&
                          setFieldValue(
                            "countryCodeSelect",
                            foundCountry || "",
                          );
                      }}
                    />
                  </div>
                </div>

                <CheckboxField name="consentMarketing">sela</CheckboxField>
                <CheckboxField name="termsAndConditions">Terms</CheckboxField>

                <SelectField
                  options={countrySelectValues}
                  name="countryOfResidence"
                  showIconOnControl
                  showIconOnOptions
                  isClearable={false}
                  onBlur={() => setFieldTouched("countryOfResidence", true)}
                  onChange={(newValue: any) =>
                    setFieldValue("countryOfResidence", newValue.value)
                  }
                />

                {/* TODO: Ref code */}
                {/* TODO: Source */}

                {/* Country select */}
                <div className="my-10"></div>

                <button type="submit">gonder</button>
                <div className="my-10"></div>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};
