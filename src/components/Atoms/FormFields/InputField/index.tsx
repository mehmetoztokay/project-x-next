import {combineClass} from "@/helpers/development/combineClass";
import {useField} from "formik";
import React, {useState} from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  errorMessage?: string;
  className?: string;
  innerFloatLabel?: boolean;
};

export const InputField: React.FC<InputProps> = ({placeholder = "", type = "text", innerFloatLabel = false, errorMessage = "", className = "", name, label, id, ...props}) => {
  const [fieldType, setFieldType] = useState(type);
  const [field, meta] = useField(name);
  return (
    <div>
      <div className="relative text-gray-700">
        <input
          type={fieldType}
          id={id || name}
          className={combineClass(
            "peer w-full border placeholder-transparent border-gray-200 rounded-md p-3 pl-4 focus:outline-none focus:text-gray-900 focus:border-blue-500 placeholder-shown:bg-slate-700",
            className,
            {"!text-gray-900": field.value > 0, "border-red-500": meta.touched && meta.error, "pr-12": type == "password"}
          )}
          {...field}
          {...props}
        />
        <label
          htmlFor={id || name}
          className={combineClass(
            "absolute left-0 ml-1 px-2 translate-x-1 transform -translate-y-1/2 top-1/2 duration-200 ease-in-out peer-focus:text-blue-500 pointer-events-none",
            {
              "-translate-y-8 text-xs bg-white": field.value && !innerFloatLabel,
              "peer-focus:bg-white peer-focus:text-xs peer-focus:-translate-y-8": !innerFloatLabel,

              // If Inner Label
              "-translate-y-[23px] text-[10px]": field.value && innerFloatLabel,
              "peer-focus:-translate-y-[23px] peer-focus:text-[10px]": innerFloatLabel,
            }
          )}
        >
          {label}
        </label>
        {type == "password" && (
          <button className="absolute right-3 -translate-y-1/2 top-1/2" type="button" onClick={() => (fieldType == "password" ? setFieldType("text") : setFieldType("password"))}>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-gray-300">
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
              <div
                className={combineClass(
                  "absolute inset-0 after:absolute after:content-[''] after:bg-gray-300 after:h-[2px] after:w-full after:top-1/2 after:transform after:-translate-y-1/2 after:scale-x-0 after:origin-center after:transition-all after:duration-500 after:ease-in-out transform rotate-45 after:right-[1px] after:rounded-md",
                  {"after:scale-x-100": fieldType != "text"}
                )}
              ></div>
            </div>
          </button>
        )}
      </div>
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {meta.error} {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
