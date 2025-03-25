"use client";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";
import { getSingleRegisterFormScheme, getStep1FormScheme, getStep2FormScheme } from "./RegisterFormScheme";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { useSearchParams } from "next/navigation";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { combineClass } from "@/helpers/development/combineClass";
import { PhoneNumberField } from "@/components/Atoms/FormFields/PhoneNumberField";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import { IRegistration_SingleRegister } from "@/services/TriveApiServices/RegistrationApi/RegistrationServiceTypes";
import { ICountryCodeSelect, ICountrySelect, useCountryList } from "@/lib/hooks/useCountryList";
import { useCurrentSiteInfo } from "@/i18n/routing";
import { getFullPageUrl } from "@/helpers/getFullPageUrl";
import { getMarketingId } from "@/services/TriveApiServices/Marketing";
import { useUtmParams } from "@/lib/hooks/useUtmParams";
import { Alert } from "@/components/Atoms/Alert";
import { checkRefCode } from "@/services/TriveApiServices/Partner";
import { Spinner } from "@/components/Atoms/Spinner";
import { FaCheck, FaRegCircleCheck } from "react-icons/fa6";
import { useTranslationsWithHTML } from "@/lib/hooks/useTranslationsWithHTML";
import { IoClose } from "react-icons/io5";
import { controlRegex, regexAtLeastOneLowerCase, regexAtLeastOneNumber, regexAtLeastOneUpperCase, regexNoSpecialChars } from "@/helpers/regexUtils";
import { getCountryIsoCode } from "@/services/TriveApiServices/GeoIp";
import { clientCheckApi, registerStep1Api, registerStep2Api, singleRegisterApi } from "@/services/TriveApiServices/TriveApiServicesHelper";

export const RegisterForm = ({
  isMultiStepForm,
  formTitle,
  formDescription,
  formSuccessMessage,
  formSucccessLink,
  formSucccessLinkTitle,
  formType = "registration",
  formLandingPageName,
}: {
  isMultiStepForm?: boolean;
  formTitle?: string;
  formDescription?: string;
  formSucccessLink?: string;
  formSucccessLinkTitle?: string;
  formSuccessMessage?: string;
  formType?: "registration" | "partner" | "landingpage";
  formLandingPageName?: string;
}) => {
  const tForm = useTranslationsWithHTML("Forms");
  const [countryCodeSelectValues, setCountryCodeSelectValues] = useState<ICountryCodeSelect[]>([]);
  const [countrySelectValues, setCountrySelectValues] = useState<ICountrySelect[]>([]);
  const [marketingDataId, setMarketingDataId] = useState<string | null>(null);
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);
  const [formSubmittedSuccessfull, setFormSubmittedSuccessfull] = useState<boolean>(false);
  const [formHadError, setFormHadError] = useState<boolean>(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);
  const [isLoadingSelect, setIsLoadingSelect] = useState<boolean>(false);
  const [isStep2, setIsStep2] = useState<boolean>(false);

  const pageUrl = getFullPageUrl();
  const locale = useLocale();
  const currentSite = useCurrentSiteInfo({ locale });
  const searchParams = useSearchParams();
  const { utmCampaign, utmContent, utmMedium, utmSource } = useUtmParams({ searchParams }).utmParams;
  const typeOfForm = formType || searchParams.get("formType");
  const landingPageName = formLandingPageName || searchParams.get("formLandingPageName") || "";
  const isMultiStep = isMultiStepForm || searchParams.get("isMultiStep");
  const title = formTitle || searchParams.get("formTitle");
  const description = formDescription || searchParams.get("formDescription");
  const successLink = formSucccessLink || searchParams.get("formSuccessLink");
  const successLinkTitle = formSucccessLinkTitle || searchParams.get("formSuccessLinkTitle");
  const successMessage = formSuccessMessage || searchParams.get("formSuccessMessage");
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
      setCountrySelectValues(formattedCountrySelectValues);

      // Get Locale Iso Code for Country Selects
      const fetchCountryIsoCode = async () => {
        try {
          setIsLoadingSelect(true);
          const countryIsoCode = await getCountryIsoCode({ locale });

          if (countryIsoCode) {
            const foundCountryCode = formattedCountryCodeSelectValues.find((country) => country.value.toLowerCase() == countryIsoCode.toLowerCase());
            const foundCountry = formattedCountrySelectValues.find((country) => country.value.toLowerCase() == countryIsoCode.toLowerCase());

            if (foundCountryCode && foundCountry) {
              formik.setFieldValue("countryCodeSelect", foundCountryCode);
              formik.setFieldValue("phoneCode", "+" + foundCountryCode?.phoneCode);
              formik.setFieldValue("phone", "+" + foundCountryCode?.phoneCode);
              formik.setFieldValue("countrySelect", foundCountry);
              formik.setFieldValue("countryOfResidence", foundCountry.value);
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingSelect(false);
        }
      };

      fetchCountryIsoCode();
    };
    fetchCountryList();

    // Get Marketing Id
    const fetchMarketingId = async () => {
      try {
        const marketingIdValue = await getMarketingId({ locale: locale, searchParams });

        formik.setFieldValue("marketingDataId", marketingIdValue);
        setMarketingDataId(marketingIdValue);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMarketingId();
  }, []);

  type FormValues = IRegistration_SingleRegister & {
    termsAndConditions: boolean;
    countryCodeSelect: ICountryCodeSelect | "";
    countrySelect: ICountrySelect | "";
  };

  const formik = useFormik({
    onSubmit: (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setSubmitting(false);

      const formData = { ...formik.values };

      delete (formData as any).termsAndConditions;
      delete (formData as any).countryCodeSelect;
      delete (formData as any).countrySelect;

      const submitForm = async () => {
        try {
          setFormHadError(false);
          setSubmittingForm(true);

          debugger;

          // Check isClient
          const checkClient = await clientCheckApi({ email: formik.values.email, formType: typeOfForm, locale });

          if (checkClient) {
            formik.setErrors({ ...formik.errors, email: `${tForm("emailAlreadyTaken")} (${values.email})` });
            return setSubmittingForm(false);
          }

          // Check Referral Code (If there is)
          let refCodeIsValid = "";
          if (values.crRefCode) {
            refCodeIsValid = await checkRefCode({ locale, refCode: values.crRefCode });

            if (!refCodeIsValid) {
              formik.setFieldError("crRefCode", tForm("invalidRefCodeMessage") as "");
              return setSubmittingForm(false);
            }
          }
          // Registration
          // If Single Register
          if (!isMultiStep) {
            const singleRegisterResult = await singleRegisterApi({ formData, formType: typeOfForm, locale, landingPageName });

            if (singleRegisterResult?.hasError) {
              console.error(singleRegisterResult);
              setFormHadError(true);
            } else if (singleRegisterResult?.result?.isSuccessful) {
              formik.setSubmitting(false);
              setFormSubmittedSuccessfull(true);

              const scaToken = singleRegisterResult?.result?.scaToken;
              if (scaToken && typeOfForm != "partner") {
                setScaUrl(`${scaUrl}accounts?token=${scaToken}`);
              } else if (singleRegisterResult?.result?.loginUrl && typeOfForm == "partner") {
                setScaUrl(singleRegisterResult?.result?.loginUrl);
              }
            }
          } else {
            // Register Step 1
            const step1Data = { ...formData };
            delete (step1Data as any).scaPassword;
            delete (step1Data as any).isPartner;
            delete (step1Data as any).isSendScaPassword;
            if (!isStep2) {
              const registerStep1Result = await registerStep1Api({ formType: typeOfForm, locale, step1Data, landingPageName });

              if (registerStep1Result?.hasError) {
                console.error(registerStep1Result);
                setFormHadError(true);
              } else if (registerStep1Result?.result?.isSuccessful) {
                formik.setSubmitting(false);
                setIsStep2(true);
              }
              // TODO kullanici sifre girmesi gerektiginde gorulmesi gereken bir mesaj olabilir
            } else {
              const step2Data = {
                siteId: formData.siteId,
                email: formData.email,
                password: formData.scaPassword,
                isPartner: formData.isPartner,
              };

              const registerStep2Result = await registerStep2Api({ step2Data, formType: typeOfForm, locale });
              if (registerStep2Result?.hasError) {
                console.error(registerStep2Result);
                setFormHadError(true);
              } else {
                formik.setSubmitting(false);

                setFormSubmittedSuccessfull(true);

                const scaToken = registerStep2Result?.result?.scaToken;
                if (scaToken) {
                  setScaUrl(`${scaUrl}accounts?token=${scaToken}`);
                }
              }
            }
          }
        } catch (error) {
          console.error("Form Submission Error:", error);
          setFormHadError(true);
        } finally {
          setSubmittingForm(false);
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
      countrySelect: "",
    },
    validationSchema: !isMultiStep ? getSingleRegisterFormScheme(tForm) : !isStep2 ? getStep1FormScheme(tForm) : getStep2FormScheme(tForm),
  });

  return (
    <div className="">
      {title && <h2 className="text-2xl font-semibold lg:text-3xl">{title}</h2>}
      {description && <p className="mb-4 text-sm lg:text-base">{description}</p>}
      {formSubmittedSuccessfull && (
        <div className="">
          <Alert
            canClose
            isOpenAlert={formSubmittedSuccessfull}
            onClickClose={() => {
              setFormSubmittedSuccessfull(false);
              setScaUrl(scaUrl);
              setIsStep2(false);
            }}
          >
            <div className="px-6 py-10 text-center lg:px-12">
              <FaRegCircleCheck className="mx-auto text-4xl text-green-600 lg:text-6xl" />
              <p className="mt-4 text-2xl font-semibold leading-none lg:text-3xl">{tForm("registrationSuccessful")}</p>
              <p className="mb-4 mt-1">{tForm("registrationSuccessfullStartTrading")}</p>
              <div>
                <a className="btn text-sm lg:text-base" target="_blank" href={scaUrl}>
                  {tForm("login")}
                </a>
              </div>
              <div className="my-5">
                {successMessage && <h4 className="mt-10 text-xl">{successMessage}</h4>}
                {successLink && (
                  <a href={successLink?.toString()} className="btn btn-second mt-2">
                    {successLinkTitle}
                  </a>
                )}
              </div>
            </div>
          </Alert>
        </div>
      )}
      {!formSubmittedSuccessfull && (
        <FormikProvider value={formik}>
          <form className="grid w-full gap-3" onSubmit={formik.handleSubmit}>
            {(!isMultiStep || (isMultiStep && !isStep2)) && (
              <>
                <InputField name="firstName" label={tForm("formLabels.firstName") as ""} />
                <InputField name="lastName" label={tForm("formLabels.lastName") as ""} />
                <InputField name="email" label={tForm("formLabels.email") as ""} type="email" />
                <div className={combineClass("relative flex gap-1.5", {})}>
                  <div className="absolute z-10 ml-[1px] mt-[1px] w-20">
                    <SelectField
                      isDisabled={isLoadingSelect}
                      isLoadingSelect={isLoadingSelect}
                      menuClasses="!w-[250px] !max-w-[250px]"
                      hideErrorMessage
                      isClearable={false}
                      controlClasses={`!border-none ${formik.values.countryCodeSelect && "!w-16"}`}
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
                  <div className="w-full">
                    <PhoneNumberField
                      label={tForm("formLabels.phone") as ""}
                      name="phone"
                      className={formik.values.countryCodeSelect ? "!ps-[50px]" : "!ps-[72px]"}
                      labelClassName={formik.values.countryCodeSelect ? "!ps-[60px] rtl:!ps-[65px]" : "!ps-[80px]"}
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
                  isDisabled={isLoadingSelect}
                  isLoadingSelect={isLoadingSelect}
                  options={countrySelectValues}
                  name="countryOfResidence"
                  showIconOnControl
                  value={formik.values.countrySelect}
                  placeholderText={tForm("formLabels.countryOfResidence") as ""}
                  showIconOnOptions
                  isClearable={false}
                  runOnBlur={() => formik.setFieldTouched("countryOfResidence", true)}
                  onChange={(newValue: any) => {
                    formik.setFieldValue("countryOfResidence", newValue.value);
                    formik.setFieldValue("countrySelect", newValue);
                  }}
                />
              </>
            )}
            {(!isMultiStep || (isMultiStep && isStep2)) && (
              <>
                <InputField
                  name="scaPassword"
                  runOnFocus={() => setIsFocusedPassword(true)}
                  runOnBlur={() => setIsFocusedPassword(false)}
                  type="password"
                  label={tForm("formLabels.password") as ""}
                />
                {isFocusedPassword && (
                  <div
                    className={combineClass("flex flex-col gap-2 rounded-md border bg-[#FAFAFA] px-3 py-4", {
                      "border border-red-300 bg-red-300/5": !(
                        formik.values.scaPassword.length >= 8 &&
                        formik.values.scaPassword.length <= 15 &&
                        controlRegex(regexAtLeastOneUpperCase, formik.values.scaPassword) &&
                        controlRegex(regexAtLeastOneLowerCase, formik.values.scaPassword) &&
                        controlRegex(regexNoSpecialChars, formik.values.scaPassword) &&
                        controlRegex(regexAtLeastOneNumber, formik.values.scaPassword)
                      ),
                    })}
                  >
                    <div className="flex gap-x-1.5 text-sm">
                      {formik.values.scaPassword.length >= 8 && formik.values.scaPassword.length <= 15 ? (
                        <FaCheck className="mt-0.5 text-green-500" />
                      ) : (
                        <IoClose className="mt-0.5 text-red-500" />
                      )}
                      <p>{tForm("useBetween8and15chars")}</p>
                    </div>

                    <div className="flex gap-x-1.5 text-sm">
                      {controlRegex(regexAtLeastOneUpperCase, formik.values.scaPassword) &&
                      controlRegex(regexAtLeastOneLowerCase, formik.values.scaPassword) ? (
                        <FaCheck className="mt-0.5 text-green-500" />
                      ) : (
                        <IoClose className="mt-0.5 text-red-500" />
                      )}
                      <p>{tForm("useLowerCaseAndUpperCase")}</p>
                    </div>

                    <div className="flex gap-x-1.5 text-sm">
                      {controlRegex(regexNoSpecialChars, formik.values.scaPassword) &&
                      controlRegex(regexAtLeastOneNumber, formik.values.scaPassword) ? (
                        <FaCheck className="mt-0.5 text-green-500" />
                      ) : (
                        <IoClose className="mt-0.5 text-red-500" />
                      )}
                      <p>{tForm("useCombinationOfNumbersAndLetters")}</p>
                    </div>
                  </div>
                )}
              </>
            )}
            {(!isMultiStep || (isMultiStep && !isStep2)) && (
              <>
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
              </>
            )}

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
              <button type="submit" className="btn flex items-center gap-1">
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
