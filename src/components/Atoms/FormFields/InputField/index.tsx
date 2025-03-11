import { combineClass } from "@/helpers/development/combineClass";
import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onBlur" | "onFocus"> & {
  label: string;
  name: string;
  className?: string;
  inputBg?: string | undefined;
  hideErrorMessage?: boolean;
  isClearable?: boolean;
  focusAfterCleared?: boolean;
  runOnFocus?: () => void;
  runOnBlur?: () => void;
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
  runOnFocus,
  runOnBlur,
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
          {...field}
          onFocus={() => {
            runOnFocus && runOnFocus();
          }}
          onBlur={() => {
            runOnBlur && runOnBlur();
            setField.setTouched(true);
          }}
          ref={inputRef}
          type={fieldType}
          id={id || name}
          autoComplete=""
          className={combineClass(
            "peer w-full rounded-md border border-gray-200 px-3 py-3 placeholder-transparent placeholder-shown:bg-slate-700 focus:border-blue-500 focus:text-gray-900 focus:outline-none",
            className,
            {
              "!text-gray-900": field.value > 0,
              "border-red-500": meta.touched && meta.error,
              "pr-14 rtl:pl-14 rtl:pr-3": type == "password" || isClearable,
              "pb-2 pt-4 focus:pb-2 focus:pt-4": field?.value?.toString().length > 0,
            },
          )}
          style={{ backgroundColor: inputBg && inputBg }}
          {...props}
        />
        <label
          htmlFor={id || name}
          className={combineClass(
            "pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 transform px-2 duration-200 ease-in-out peer-focus:-translate-y-[20px] peer-focus:text-[10px] peer-focus:text-blue-500 rtl:right-1",
            {
              "-translate-y-[20px] text-[10px]": field.value,
            },
          )}
          style={{
            backgroundColor: inputBg && (field.value || focused) && inputBg,
          }}
        >
          {label}
        </label>

        <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center rtl:left-2.5 rtl:right-auto">
          {type == "password" && (
            <button className=" " type="button" onClick={() => (fieldType == "password" ? setFieldType("text") : setFieldType("password"))}>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className="fill-gray-400">
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                </svg>
                <div
                  className={combineClass(
                    "absolute inset-0 rotate-45 transform after:absolute after:right-[1px] after:top-1/2 after:h-[2px] after:w-full after:origin-center after:-translate-y-1/2 after:scale-x-0 after:transform after:rounded-md after:bg-gray-400 after:transition-all after:duration-500 after:ease-in-out after:content-[''] rtl:after:left-[1px]",
                    { "after:scale-x-100": fieldType != "text" },
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
      {!hideErrorMessage && meta.touched && meta.error ? <p className="ml-1 mt-0.5 text-xs text-red-500">{meta.error}</p> : null}
    </div>
  );
};
