"use client";
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { copyToClipboard } from "@/helpers/copyToClipBoard";
import { Params } from "@/types/general";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";

// export async function generateMetadata({ params }: { params: Params }) {
//   return {
//     title: "Iframe Link Creator",
//   };
// }

const IframeCreator = () => {
  const iframeDomain = new URL("https://frames.trive.com/");
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
  });

  useEffect(() => {
    // Set form path
    Object.entries(formik.values).forEach(([key, value]) => {
      if (!value) return;

      if (typeof value) iframeDomain.searchParams.set(key, value.toString());
      formik.values.formType == "partner" && iframeDomain.searchParams.delete("isMultiStep");

      if (key == "formType") {
        iframeDomain.pathname = value as "";
      }
    });

    setIframeLink(iframeDomain.href);
  }, [formik.values]);

  return (
    <div className="fixed flex h-full w-full justify-center overflow-y-scroll py-10">
      <div className="relative my-auto w-[500px] max-w-[95%] rounded-md bg-gray-100 px-5 py-10 lg:max-w-[90%]">
        <h1 className="text-2xl font-semibold">Iframe Link Creator</h1>
        <p className="mb-4 text-sm">
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
            {formik.values.formType != "partner" && (
              <CheckboxField name="isMultiStep" label="Is form multi step?" className="text-base text-gray-700" />
            )}
            <div className="rounded-md bg-gray-200/60 p-4">
              <div className="relative">
                <input
                  ref={iframeLinkRef}
                  readOnly
                  value={iframeLink}
                  type="text"
                  className="w-full max-w-full select-none rounded-md px-4 py-2 focus:outline-none"
                  onClick={() => copyToClipboard(iframeLink, setCopiedText)}
                />
                <button
                  onClick={() => copyToClipboard(iframeLink, setCopiedText)}
                  className="z-1 absolute right-2 top-1.5 rounded-md bg-blue-500 px-2 py-1 text-sm text-gray-200 hover:bg-blue-600"
                >
                  {!copiedText ? "Copy" : "Copied Link"}
                </button>
              </div>
            </div>
          </div>
        </FormikProvider>
      </div>
    </div>
  );
};

export default IframeCreator;
