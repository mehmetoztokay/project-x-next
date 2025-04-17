"use client";
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { copyToClipboard } from "@/helpers/copyToClipBoard";
import { combineClass } from "@/helpers/development/combineClass";
import { regexURL } from "@/helpers/regexUtils";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import * as Yup from "yup";

const IframeCreator = () => {
  const iframeDomain = new URL("https://trive.com/");
  const [iframeLink, setIframeLink] = useState<string>("");
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const iframeLinkRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    onSubmit: (values, { setSubmitting }) => {},
    initialValues: {
      formType: "",
      isMultiStep: false,
      formTitle: "",
      formDescription: "",
      formSuccessLinkTitle: "",
      formSuccessMessage: "",
      formSuccessLink: "",
    },
    validationSchema: Yup.object().shape({
      // Email
      formSuccessLink: Yup.string().matches(regexURL, "Invalid link, write as https://www.google.com/"),
    }),
  });

  useEffect(() => {
    // Set form path
    Object.entries(formik.values).forEach(([key, value]) => {
      if (!value) return;

      if (typeof value) iframeDomain.searchParams.set(key, value.toString());
      formik.values.formType == "partner" && iframeDomain.searchParams.delete("isMultiStep");
    });

    setIframeLink(iframeDomain.href.replace("https://trive.com/", "/register/"));

    if (formik.values.formType == "partner") formik.setFieldValue("isMultiStep", false);
  }, [formik.values]);

  return (
    <div className="fixed flex h-full w-full justify-center overflow-y-scroll py-10">
      <div className="relative my-auto w-[500px] max-w-[95%] rounded-md bg-gray-100 px-5 py-10 lg:max-w-[90%]">
        <h1 className="text-2xl font-semibold text-gray-800">Iframe Link Creator</h1>
        <p className="mb-4 text-sm text-gray-500">
          It's an iframe link creator for Trive. Fields without a <strong>*</strong> mark are optional.
        </p>
        <FormikProvider value={formik}>
          <div className="flex flex-col gap-4">
            <SelectField
              name="formType"
              isClearable={false}
              onChange={(e: any) => {
                formik.setFieldValue("formType", e.value);
              }}
              options={[
                { value: "registration", label: "Registration" },
                { value: "partner", label: "Partner" },
                { value: "langdingpage", label: "Landing Page" },
              ]}
              placeholderText="Form Type *"
            />
            <InputField label="Form Title" name="formTitle" />
            <InputField label="Form Description" name="formDescription" />
            <InputField label="Success Message" name="formSuccessMessage" />
            <InputField label="Form Success Link Label " name="formSuccessLinkTitle" />
            <InputField label="Success Link (as https://...)" name="formSuccessLink" />
            <CheckboxField
              name="isMultiStep"
              label="Is form multi step?"
              className={combineClass("text-base text-gray-700", { "blur-[2px]": formik.values.formType == "partner" })}
              disabled={formik.values.formType == "partner"}
            />
            <div className="rounded-md bg-gray-200/60 p-4">
              <div className="relative">
                <input
                  ref={iframeLinkRef}
                  readOnly
                  style={{ userSelect: "none" }}
                  onChange={() => formik.setFieldTouched("iframeLink")}
                  value={iframeLink}
                  type="text"
                  className={combineClass("pointer-events-none w-full max-w-full select-none rounded-md px-4 py-2 focus:outline-none", {
                    "blur-sm": formik.errors.formSuccessLink,
                  })}
                  onClick={() => !formik.errors.formSuccessLink && copyToClipboard(iframeLink, setCopiedText)}
                />
                <div className="absolute inset-0"></div>
                <button
                  onClick={() => copyToClipboard(iframeLink, setCopiedText)}
                  disabled={formik.errors.formSuccessLink ? true : false}
                  className={combineClass("z-1 absolute right-2 top-1.5 rounded-md bg-gray-500 px-2 py-1 text-sm text-gray-200 hover:bg-gray-600", {
                    "!bg-green-700": copiedText,
                    "blur-[1px]": formik.errors.formSuccessLink,
                  })}
                >
                  {!copiedText ? (
                    "Copy"
                  ) : (
                    <div className="flex items-center gap-x-1">
                      <FaRegCheckCircle /> Copied
                    </div>
                  )}
                </button>
              </div>

              {formik.values.formType && <p className="mt-1 px-1 text-xs text-yellow-700">Don't forget to update the language! (int, co.id...)</p>}
            </div>
          </div>
        </FormikProvider>
      </div>
    </div>
  );
};

export default IframeCreator;
