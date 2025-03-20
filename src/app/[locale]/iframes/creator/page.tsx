"use client";
import { CheckboxField } from "@/components/Atoms/FormFields/CheckboxField";
import { InputField } from "@/components/Atoms/FormFields/InputField";
import { SelectField } from "@/components/Atoms/FormFields/SelectField";
import { copyToClipboard } from "@/helpers/copyToClipBoard";
import { Params } from "@/types/general";
import { FormikProvider, useFormik } from "formik";
import React from "react";

// export async function generateMetadata({ params }: { params: Params }) {
//   return {
//     title: "Iframe Link Creator",
//   };
// }

const IframeCreator = () => {
  const formik = useFormik({
    onSubmit: (values, { setSubmitting }) => {},
    initialValues: {
      formType: "",
      isMultiStep: false,
      formTitle: "",
      formDescription: "",
      formSuccessTitle: "",
      formSuccessLinkTitle: "",
      formSuccessLink: "",
    },
    // validationSchema: !isMultiStep ? getSingleRegisterFormScheme(tForm) : !isStep2 ? getStep1FormScheme(tForm) : getStep2FormScheme(tForm),
  });
  return (
    <div className="fixed flex h-full w-full justify-center overflow-y-scroll py-10">
      <div className="relative my-auto w-[500px] max-w-[95%] rounded-md bg-gray-100 px-5 py-10 lg:max-w-[90%]">
        <h1 className="text-2xl font-semibold">Iframe Link Creator</h1>
        <p className="mb-4 text-sm">
          It's an iframe link creator for Trive. Fields without a <strong>*</strong> mark are optional.
        </p>
        {JSON.stringify(formik.values, null, 2)}

        <FormikProvider value={formik}>
          <div className="flex flex-col gap-4">
            <SelectField
              name="formType"
              onChange={(e: any) => {
                formik.setFieldValue("formType", e.value);
              }}
              options={[
                { value: "registration", label: "Registration" },
                { value: "partner", label: "Partner" },
                { value: "langdingpage", label: "Landing Page" },
              ]}
              placeholderText="Form type"
            />
            <InputField label="Form Title" name="formTitle" />
            <InputField label="Form Description" name="formDescription" />
            <InputField label="Form Success Title " name="formSuccessTitle" />
            <InputField label="Success Link Label" name="formSuccessLinkTitle" />
            <InputField label="Success Link (as https://...)" name="formSuccessLink" />
            {formik.values.formType != "partner" && (
              <CheckboxField name="isMultiStep" label="Is form multi step?" className="text-base text-gray-700" />
            )}
            <div className="rounded-md bg-green-200/60 p-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full max-w-full rounded-md px-4 py-2 focus:outline-none"
                  readOnly
                  value={"sa"}
                  onClick={(e: React.MouseEvent<HTMLInputElement>) => copyToClipboard(e.currentTarget.value)}
                  // TODO when clicked to buton, change Copy message to Copied
                />
                <button className="z-1 absolute right-2 top-1.5 !cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-sm text-gray-200 hover:bg-blue-600">
                  Copy
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
