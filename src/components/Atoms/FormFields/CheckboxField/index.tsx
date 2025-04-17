import React from "react";
import { useField } from "formik";
import { combineClass } from "@/helpers/development/combineClass";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  hideErrorMessage?: boolean;
};

export const CheckboxField = ({ name, label, children, className, hideErrorMessage = false, ...props }: CheckboxProps) => {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <>
      <label
        className={combineClass("relative flex cursor-pointer select-none ps-6 text-justify text-xs text-gray-500 lg:text-sm", className, {
          "cursor-not-allowed opacity-50": props.disabled,
        })}
      >
        <input type="checkbox" {...field} {...props} className="peer absolute h-0 w-0 opacity-0" />
        <span className="absolute left-0 top-[2px] mt-[0px] h-[18px] w-[18px] rounded border border-gray-200 bg-white transition-all duration-300 ease-in-out peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:after:absolute peer-checked:after:left-1/2 peer-checked:after:top-1/2 peer-checked:after:h-2.5 peer-checked:after:w-1.5 peer-checked:after:-translate-x-1/2 peer-checked:after:-translate-y-[60%] peer-checked:after:rotate-45 peer-checked:after:transform peer-checked:after:border-b-2 peer-checked:after:border-r-2 peer-checked:after:border-solid peer-checked:after:border-white peer-checked:after:content-[''] peer-focus:ring-1 peer-focus:ring-gray-200 peer-disabled:opacity-70 rtl:left-auto rtl:right-0"></span>
        <p className="inline-block leading-5">{label ? label : children}</p>
      </label>
      {!hideErrorMessage && meta.touched && meta.error ? <p className="ps-6 text-xs text-red-500">{meta.error}</p> : null}
    </>
  );
};
