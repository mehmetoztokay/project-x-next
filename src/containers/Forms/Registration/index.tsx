"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { useLocale, useTranslations } from "next-intl";
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
import { ICountryCodeSelect, ICountrySelect, useCountryList } from "@/hooks/useCountryList";
import { useCurrentSiteInfo } from "@/i18n/routing";
import { getFullPageUrl } from "@/helpers/getFullPageUrl";
import { getMarketingId } from "@/services/TriveApiServices/Marketing";
import { useUtmParams } from "@/hooks/useUtmParams";

export const RegistrationForm = ({ isTwoSteps }: { isTwoSteps?: boolean }) => {
  const tForm = useTranslations("Forms");
  const [countryCodeSelectValues, setCountryCodeSelectValues] = useState<ICountryCodeSelect[]>([]);
  const [countrySelectValues, setCountryNames] = useState<ICountrySelect[]>([]);
  const [marketingDataId, setMarketingDataId] = useState<string | null>(null);

  const pageUrl = getFullPageUrl();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { utmCampaign, utmContent, utmMedium, utmSource } = useUtmParams({ searchParams }).utmParams;

  useEffect(() => {
    // Get countryList for Country Code and Country of Residence Select
    const fetchCountryList = async () => {
      const { getFormattedCountryCodeSelectValues, getFormattedCountrySelectValues } = useCountryList({ locale });

      const formattedCountryCodeSelectValues = await getFormattedCountryCodeSelectValues();
      const formattedCountrySelectValues = await getFormattedCountrySelectValues();

      setCountryCodeSelectValues(formattedCountryCodeSelectValues);
      setCountryNames(formattedCountrySelectValues);
    };

    fetchCountryList();

    // Get Marketing Id
    const fetchMarketingId = async () => {
      const marketingIdValue = await getMarketingId({ locale: locale, searchParams });

      setMarketingDataId(marketingIdValue);
    };

    fetchMarketingId();
  }, []);

  const SingleRegisterFormScheme = getSingleRegisterFormScheme(tForm);

  return (
    <div className="p-8">
      <Formik
        enableReinitialize
        validationSchema={SingleRegisterFormScheme}
        initialValues={{
          siteId: useCurrentSiteInfo({ locale })?.siteId,
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          phoneCode: "",
          fullPageUrl: pageUrl,
          consentMarketing: false,
          countryOfResidence: "",
          source: "WEB",
          utmSource: utmSource,
          utmMedium: utmMedium,
          utmCampaign: utmCampaign,
          utmContent: utmContent,
          marketingDataId,
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
          console.log(JSON.stringify(values, null, 2));

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 100);
        }}
      >
        {({ values, setFieldValue, errors, touched, handleBlur, setFieldTouched, setErrors, setValues, handleChange }) => {
          return (
            <>              <Form className="grid gap-3">
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
                        phoneCode: "+" + option.phoneCode,
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
                        foundCountry && setFieldValue("phoneCode", "+" + foundCountry?.phoneCode || "");
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

              <CheckboxField name="consentMarketing">sela</CheckboxField>
              {/* TODO raw ile html elemani ekleme bir de soyle aranmali, eger mesela key terms.message ise okey html getirebilirsin eger < bu varsa mesela ama isntHtml gibi bir sey varsa kesinlikle raw degildir denmeli */}
              <CheckboxField name="termsAndConditions">Terms</CheckboxField>
              <SelectField
                options={countrySelectValues}
                name="countryOfResidence"
                showIconOnControl
                showIconOnOptions
                isClearable={false}
                runOnBlur={() => setFieldTouched("countryOfResidence", true)}
                onChange={(newValue: any) => setFieldValue("countryOfResidence", newValue.value)}
              />
              <div className="mt-5">
                <button type="submit" className="py-2 px-4 bg-blue-400 rounded-md hover:bg-blue-500 transition-all duration-300 text-white">gonder</button>
              </div>
            </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};
