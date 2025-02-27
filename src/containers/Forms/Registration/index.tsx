"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { getSingleRegisterFormScheme } from "./SingleRegisterFormScheme";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { useSearchParams } from "next/navigation";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { combineClass } from "@/helpers/development/combineClass";
import { PhoneNumberField } from "@/components/Atoms/FormFields/PhoneNumberField";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import { IRegistration_SingleRegister } from "@/services/TriveApiServices/RegistrationApi/RegistrationServiceTypes";
// import { useFullPageUrl } from "@/helpers/getFullPageUrl";
import { ICountryCodeSelect, ICountrySelect, useCountryList } from "@/helpers/getCountryList";
import { useCurrentSiteInfo } from "@/i18n/routing";

export const RegistrationForm = () => {
  const tForm = useTranslations("Forms");
  const searchParams = useSearchParams();
  const [countryCodeSelectValues, setCountryCodeSelectValues] = useState<ICountryCodeSelect[]>([]);
  const [countrySelectValues, setCountryNames] = useState<ICountrySelect[]>([]);

  const lang = searchParams.get("lang") || "";
  // const pageUrl = useFullPageUrl();
  const pageUrl = "sea";

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

  const SingleRegisterFormScheme = getSingleRegisterFormScheme(tForm);

  return (
    <div className="p-8">
      <Formik
        enableReinitialize
        validationSchema={SingleRegisterFormScheme}
        initialValues={{
          siteId: useCurrentSiteInfo()?.siteId || -1,
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          phoneCode: "",
          fullPageUrl: pageUrl,
          consentMarketing: false,
          countryOfResidence: "",
          source: "",
          utmSource: "",
          utmMedium: "",
          utmCampaign: "",
          utmContent: "",
          marketingDataId: "",
          affiliateCxdId: "",
          affiliateId: "",
          crRefCode: "",
          scaPassword: "",
          isSendScaPassword: true,
          isPartner: false,
          // Without types
          termsAndConditions: false,
          countryCodeSelect: "",
        }}
        onSubmit={(
          values: IRegistration_SingleRegister & {
            termsAndConditions: boolean;
            countryCodeSelect: ICountryCodeSelect | "";
          },
          {
            setSubmitting,
          }: FormikHelpers<
            IRegistration_SingleRegister & {
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
        {({ values, setFieldValue, errors, touched, handleBlur, setFieldTouched, setErrors, setValues, handleChange }) => {
          return (
            <>
              <Form className="grid gap-3">
                <p>{values.fullPageUrl}</p>
                <InputField name="firstName" label={tForm("formLabels.firstName")} />
                <InputField name="lastName" label={tForm("formLabels.lastName")} />
                <InputField name="email" label={tForm("formLabels.email")} type="email" />

                <InputField name="scaPassword" type="password" label={tForm("formLabels.password")} />

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
                      runOnBlur={() => {
                        !touched.phoneCode && setFieldTouched("phoneCode", true);
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
                          const checkPhoneNumberIsValid = value ? isValidPhoneNumber(value) : false;
                          const country = checkPhoneNumberIsValid ? parsePhoneNumber(value)?.country : false;

                          const foundCountry = country && countryCodeSelectValues?.find((c) => c.value.toLowerCase() == country?.toLowerCase());
                          foundCountry && setFieldValue("phoneCode", foundCountry || "");
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

                <CheckboxField name="consentMarketing">sela</CheckboxField>
                <CheckboxField name="termsAndConditions">Terms</CheckboxField>

                <SelectField
                  options={countrySelectValues}
                  name="countryOfResidence"
                  showIconOnControl
                  showIconOnOptions
                  isClearable={false}
                  onBlur={() => setFieldTouched("countryOfResidence", true)}
                  onChange={(newValue: any) => setFieldValue("countryOfResidence", newValue.value)}
                />

                {/* Ref code */}
                {/* Source */}
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
