import React from "react";
import {useField} from "formik";
import {combineClass} from "@/helpers/development/combineClass";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {name: string; label?: string; children?: React.ReactNode; className?: string; hideErrorMessage?: boolean};

export const CheckboxField = ({name, label, children, className, hideErrorMessage = false}: CheckboxProps) => {
  const [field, meta] = useField({name, type: "checkbox"});

  return (
    <>
      {" "}
      <label className={combineClass("relative ps-6 cursor-pointer text-lg select-none flex", className, {})}>
        <input type="checkbox" {...field} className="absolute opacity-0 h-0 w-0 peer" />
        <span className="absolute top-[2px] left-0 rtl:right-0 rtl:left-auto h-[18px] w-[18px] bg-white border border-gray-200 rounded transition-all duration-300 ease-in-out peer-focus:ring-1 peer-focus:ring-gray-200 peer-checked:bg-blue-600 peer-disabled:opacity-70 peer-checked:border-transparent peer-checked:after:h-2.5 peer-checked:after:w-1.5 peer-checked:after:content-[''] peer-checked:after:absolute peer-checked:after:left-1/2 peer-checked:after:top-1/2 peer-checked:after:border-solid peer-checked:after:border-white peer-checked:after:border-r-2 peer-checked:after:border-b-2 peer-checked:after:rotate-45 peer-checked:after:transform peer-checked:after:-translate-x-1/2 peer-checked:after:-translate-y-[60%] mt-[0px]"></span>
        <div className="text-xs lg:text-sm text-gray-500 inline-block text-justify">{label ? label : children}</div>
      </label>
      {!hideErrorMessage && meta.touched && meta.error ? <p className="text-red-500 text-xs -mt-2 ps-6">{meta.error}</p> : null}
    </>
  );
};
