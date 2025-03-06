"use client";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import { useLocale } from "next-intl";
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
import { clientCheck, singleRegister } from "@/services/TriveApiServices/RegistrationApi";
import { Alert } from "@/components/Alert";
import { checkRefCode } from "@/services/TriveApiServices/Partner";
import { Spinner } from "@/components/Spinner";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useTranslationsWithHTML } from "@/hooks/useTranslationsWithHTML";

export const RegistrationForm = () => {
  const tForm = useTranslationsWithHTML("Forms");
  const [countryCodeSelectValues, setCountryCodeSelectValues] = useState<ICountryCodeSelect[]>([]);
  const [countrySelectValues, setCountryNames] = useState<ICountrySelect[]>([]);
  const [marketingDataId, setMarketingDataId] = useState<string | null>(null);
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);
  const [formSubmittedSuccessfull, setFormSubmittedSuccessfull] = useState<boolean>(false);
  const [formHadError, setFormHadError] = useState<boolean>(false);

  const pageUrl = getFullPageUrl();
  const locale = useLocale();
  const currentSite = useCurrentSiteInfo({ locale });
  const searchParams = useSearchParams();
  const { utmCampaign, utmContent, utmMedium, utmSource } = useUtmParams({ searchParams }).utmParams;
  // Referral code should be works in INT or ID region
  const refCodeParam =
    currentSite.region == "int" || currentSite.region == "id" ? searchParams.get("refCode") || searchParams.get("refcode") || "" : "";
  const [showReferralCode, setShowReferralCode] = useState<boolean>(false);
  const [scaUrl, setScaUrl] = useState<string>(currentSite.scaUrl);

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

      formik.setFieldValue("marketingDataId", marketingIdValue);
      setMarketingDataId(marketingIdValue);
    };
    fetchMarketingId();
  }, []);

  const formik = useFormik({
    onSubmit: (
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
      setSubmitting(false);

      const formData = { ...formik.values };

      delete (formData as any).termsAndConditions;
      delete (formData as any).countryCodeSelect;

      const submitForm = async () => {
        setFormHadError(false);
        setSubmittingForm(true);
        const checkClient = await clientCheck({ data: { email: values.email }, locale }).catch((error) => {
          console.log(error);
          setSubmittingForm(false);
          setFormHadError(true);
        });

        // Check client is registred
        if (checkClient) {
          setSubmittingForm(false);
          formik.setErrors({ ...formik.errors, email: `${tForm("emailAlreadyTaken")} (${values.email})` });
        } else {
          const refCodeIsValid =
            (values.crRefCode &&
              (await checkRefCode({ locale, refCode: values.crRefCode }).catch((error) => {
                console.log(error);
                setSubmittingForm(false);
                setFormHadError(true);
              }))) ||
            "";

          if (values.crRefCode && !refCodeIsValid) {
            // Check if there is a refCode and refCode isValid
            setSubmittingForm(false);
            formik.setFieldError("crRefCode", tForm("invalidRefCodeMessage") as "");
          } else {
            const singleRegisterResult = await singleRegister({ data: formData, locale });

            if (!singleRegisterResult.hasError && singleRegisterResult.result.isSuccessful) {
              setSubmittingForm(false);
              formik.setSubmitting(false);
              setFormSubmittedSuccessfull(true);
              singleRegisterResult.result.scaToken && setScaUrl(scaUrl + "accounts?token=" + singleRegisterResult.result.scaToken);
            } else {
              console.log(singleRegisterResult);
              setFormHadError(true);
              setSubmittingForm(false);
            }
          }
        }
      };

      submitForm();
    },
    initialValues: {
      siteId: currentSite?.siteId,
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
      crRefCode: refCodeParam,
      scaPassword: "",
      isSendScaPassword: true,
      isPartner: false,
      // Without types
      termsAndConditions: false,
      countryCodeSelect: "",
    },
    validationSchema: getSingleRegisterFormScheme(tForm),
  });

  return (
    <div className="">
      {formSubmittedSuccessfull && (
        <div className="">
          <Alert
            canClose
            isOpenAlert={formSubmittedSuccessfull}
            onClickClose={() => {
              setFormSubmittedSuccessfull(false);
              setScaUrl(scaUrl);
            }}
          >
            <div className="px-6 py-10 text-center lg:px-12">
              <FaRegCircleCheck className="mx-auto text-4xl text-green-600 lg:text-6xl" />
              <p className="mt-4 text-2xl font-semibold leading-none lg:text-3xl">{tForm("registrationSuccessful")}</p>
              <p className="mb-6 mt-2">{tForm("registrationSuccessfullStartTrading")}</p>
              <a className="btn text-sm lg:text-base" target="_blank" href={scaUrl}>
                {tForm("startTrading")}
              </a>
            </div>
          </Alert>
        </div>
      )}
      {!formSubmittedSuccessfull && (
        <FormikProvider value={formik}>
          <form className="grid w-full gap-3" onSubmit={formik.handleSubmit}>
            <InputField name="firstName" label={tForm("formLabels.firstName") as ""} />
            <InputField name="lastName" label={tForm("formLabels.lastName") as ""} />
            <InputField name="email" label={tForm("formLabels.email") as ""} type="email" />
            <div className={combineClass("relative flex gap-1.5", {})}>
              <div className="w-[27%]">
                <SelectField
                  isClearable={false}
                  name="countryCodeSelect"
                  value={formik.values.countryCodeSelect}
                  onChange={(option: any) => {
                    // Clear error message of countryCodeSelect
                    formik.setErrors({ ...formik.errors, phoneCode: undefined });
                    formik.setValues({
                      ...formik.values,
                      countryCodeSelect: option,
                      phone: "+" + option.phoneCode,
                      phoneCode: "+" + option.phoneCode,
                    });
                  }}
                  runOnBlur={() => {
                    !formik.touched.phoneCode && formik.setFieldTouched("phoneCode", true);
                    formik.values.phoneCode &&
                      formik.setErrors({
                        ...formik.errors,
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
                  label={tForm("formLabels.phone") as ""}
                  name="phone"
                  runOnChange={(value) => {
                    if (formik.values.phoneCode == "") {
                      const checkPhoneNumberIsValid = value ? isValidPhoneNumber(value) : false;
                      const country = checkPhoneNumberIsValid ? parsePhoneNumber(value)?.country : false;

                      const foundCountry = country && countryCodeSelectValues?.find((c) => c.value.toLowerCase() == country?.toLowerCase());
                      foundCountry && formik.setFieldValue("phoneCode", "+" + foundCountry?.phoneCode || "");
                      foundCountry && formik.setFieldValue("countryCodeSelect", foundCountry || "");
                    }
                  }}
                  onCountryChange={(country: any) => {
                    const foundCountry = countryCodeSelectValues?.find((c) => c.value.toLowerCase() == country?.toLowerCase());

                    foundCountry && formik.setFieldValue("phoneCode", "+" + foundCountry?.phoneCode || "");
                    foundCountry && formik.setFieldValue("countryCodeSelect", foundCountry || "");
                  }}
                />
              </div>
            </div>
            <SelectField
              options={countrySelectValues}
              name="countryOfResidence"
              showIconOnControl
              placeholderText={tForm("formLabels.countryOfResidence") as ""}
              showIconOnOptions
              isClearable={false}
              runOnBlur={() => formik.setFieldTouched("countryOfResidence", true)}
              onChange={(newValue: any) => formik.setFieldValue("countryOfResidence", newValue.value)}
            />
            <InputField name="scaPassword" type="password" label={tForm("formLabels.password") as ""} />
            {(currentSite.region == "int" || currentSite.region == "id") && (
              <div>
                {!showReferralCode && !refCodeParam && (
                  <button className="ps-1 underline underline-offset-2 opacity-70" onClick={() => setShowReferralCode(true)}>
                    {tForm("addRefCodeMessage")}
                  </button>
                )}
                {(showReferralCode || refCodeParam) && <InputField name="crRefCode" label={tForm("formLabels.refCode") as ""} isClearable />}
              </div>
            )}

            <CheckboxField name="consentMarketing">
              I confirm and constent to Trive contacting me by phone, email for marketing purposes.
            </CheckboxField>
            {/* TODO raw ile html elemani ekleme bir de soyle aranmali, eger mesela key terms.message ise okey html getirebilirsin eger < bu varsa mesela ama isntHtml gibi bir sey varsa kesinlikle raw degildir denmeli */}
            <CheckboxField name="termsAndConditions">I am not a US Citizen or a US Resident for tax purposes.</CheckboxField>
            <p className="text-sm font-light">
              <b> By clicking "Register" I confirm, I read and understood</b>
              <b>
                {" "}
                <a
                  className="underline"
                  href="https://www.trive.com/assets/img/pdfs/Master_Privacy_Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  translate="yes"
                >
                  "Privacy Policy"
                </a>
              </b>
              ,{" "}
              <b>
                {" "}
                <a
                  className="underline"
                  href="https://www.trive.com/assets/img/pdfs/Terms_of_Use.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  translate="yes"
                >
                  "Terms of Use"
                </a>
              </b>
              .
            </p>
            {formHadError && (
              <Alert
                isMiniAlert
                canClose
                miniAlertType="danger"
                onClickClose={() => {
                  setFormHadError(false);
                }}
              >
                <div>
                  <p className="font-semibold">{tForm("errorTitle")}</p>
                  <p className="font-light">{tForm("anErrorOccuredTryAgain")}</p>
                </div>
              </Alert>
            )}
            <div className="mt-1">
              <button type="submit" className="btn flex items-center gap-1" disabled={submittingForm}>
                {submittingForm ? (
                  <>
                    <Spinner /> <p>{tForm("formLabels.register")}</p>
                  </>
                ) : (
                  <p>{tForm("formLabels.register")}</p>
                )}
              </button>
            </div>
          </form>
        </FormikProvider>
      )}
    </div>
  );
};
