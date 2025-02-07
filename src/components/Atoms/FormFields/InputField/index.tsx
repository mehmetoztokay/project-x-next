import {combineClass} from "@/helpers/development/combineClass";
import {useField} from "formik";
import React, {useEffect, useRef, useState} from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  className?: string;
  inputBg?: string | undefined;
  hideErrorMessage?: boolean;
  isClearable?: boolean;
  focusAfterCleared?: boolean;
};

export const InputField: React.FC<InputProps> = ({
  placeholder = "",
  type = "text",
  className = "",
  name,
  label,
  id,
  inputBg = undefined,
  hideErrorMessage = false,
  isClearable = false,
  focusAfterCleared = false,
  ...props
}) => {
  const [fieldType, setFieldType] = useState(type);
  const [field, meta, setField] = useField(name);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    // Referansı kontrol et
    if (inputRef.current) {
      inputRef.current.addEventListener("focus", handleFocus);
      inputRef.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", handleFocus);
        inputRef.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);
  return (
    <div>
      <div className="relative text-gray-700">
        <input
          ref={inputRef}
          type={fieldType}
          id={id || name}
          autoComplete=""
          className={combineClass(
            "peer w-full border placeholder-transparent border-gray-200 rounded-md py-3 px-3 focus:outline-none focus:text-gray-900 focus:border-blue-500 placeholder-shown:bg-slate-700",
            className,
            {
              "!text-gray-900": field.value > 0,
              "border-red-500": meta.touched && meta.error,
              "pr-14 rtl:pr-3 rtl:pl-14": type == "password" || isClearable,
              "focus:pt-4 focus:pb-2 pt-4 pb-2": field.value.toString().length > 0,
            }
          )}
          style={{backgroundColor: inputBg && inputBg}}
          {...field}
          {...props}
        />
        <label
          htmlFor={id || name}
          className={combineClass(
            "absolute left-1 rtl:right-1 px-2 transform -translate-y-1/2 top-1/2 duration-200 ease-in-out peer-focus:text-blue-500 pointer-events-none peer-focus:-translate-y-[20px] peer-focus:text-[10px]",
            {
              "-translate-y-[20px] text-[10px]": field.value,
            }
          )}
          style={{backgroundColor: inputBg && (field.value || focused) && inputBg}}
        >
          {label}
        </label>

        <div className="absolute right-2.5 rtl:left-2.5 rtl:right-auto -translate-y-1/2 top-1/2 flex items-center">
          {type == "password" && (
            <button className=" " type="button" onClick={() => (fieldType == "password" ? setFieldType("text") : setFieldType("password"))}>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className="fill-gray-400">
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                </svg>
                <div
                  className={combineClass(
                    "absolute inset-0 after:absolute after:content-[''] after:bg-gray-400 after:h-[2px] after:w-full after:top-1/2 after:transform after:-translate-y-1/2 after:scale-x-0 after:origin-center after:transition-all after:duration-500 after:ease-in-out transform rotate-45 after:right-[1px] rtl:after:left-[1px] after:rounded-md",
                    {"after:scale-x-100": fieldType != "text"}
                  )}
                ></div>
              </div>
            </button>
          )}

          {isClearable && (
            <button
              type="button"
              onClick={() => {
                setField.setValue("");
                focusAfterCleared && inputRef.current?.focus();
              }}
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className="fill-gray-400">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
      {!hideErrorMessage && meta.touched && meta.error ? <p className="text-red-500 text-xs mt-1 ml-1">{meta.error}</p> : null}
    </div>
  );
};
