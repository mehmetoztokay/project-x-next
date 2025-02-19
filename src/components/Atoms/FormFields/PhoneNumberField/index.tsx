import { combineClass } from "@/helpers/development/combineClass";
import { useField } from "formik";
import React, { useRef, useState } from "react";
import PhoneInput, { PhoneNumber, Value } from "react-phone-number-input";

type PhoneInputProps = Partial<React.ComponentProps<typeof PhoneInput>> & {
  name: string;
  label: string;
  className?: string;
  innerFloatLabel?: boolean;
  inputBg?: string | undefined;
  hideErrorMessage?: boolean;
  runOnChange?: (value: any) => void;
};

export const PhoneNumberField: React.FC<PhoneInputProps> = ({
  name,
  label,
  className,
  inputBg,
  innerFloatLabel = false,
  hideErrorMessage = false,
  runOnChange,
  ...props
}) => {
  const [field, meta, setField] = useField(name);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<any>(null);

  return (
    <div>
      <div
        className={combineClass("relative text-gray-700", {
          "!text-gray-900": field.value?.length > 0, // Update class based on phone number presence
          "border-red-500": field.value && meta.error, // Update class for error
        })}
      >
        <div
          className={combineClass(
            "peer w-full rounded-md border border-gray-200 px-3 py-3",
            {
              "border-blue-500 pb-2 pt-4 text-gray-900": focused,
              "!text-gray-900": field.value > 0,
              "border-red-500": meta.touched && meta.error,
              "pb-2 pt-4": field.value,
            },
          )}
        >
          <PhoneInput
            className={combineClass(
              "p-0 [&>input]:h-full [&>input]:w-full [&>input]:border-none [&>input]:px-0 [&>input]:py-0 [&>input]:placeholder-transparent [&>input]:outline-none",
              {},
            )}
            ref={inputRef}
            style={{ backgroundColor: inputBg && inputBg }}
            countrySelectComponent={() => null}
            placeholder=""
            value={field.value}
            onChange={(value: Value) => {
              setField.setValue(value);
              runOnChange && runOnChange(value);
            }}
            onBlur={() => {
              setField.setTouched(true);
              setFocused(false);
            }}
            onFocus={(e) => {
              setFocused(true);
              console.log(e.currentTarget);
            }}
            {...props}
          />
        </div>
        <label
          htmlFor={name}
          className={combineClass(
            "pointer-events-none absolute left-1 top-1/2 w-full -translate-y-1/2 transform px-2 duration-200 ease-in-out",
            {
              "-translate-y-[20px] text-[10px]": field.value || focused,
              "text-blue-500": focused,
            },
          )}
          style={{
            backgroundColor: inputBg && (field.value || focused) && inputBg,
          }}
        >
          {label}
        </label>
      </div>
      {!hideErrorMessage && meta.touched && meta.error && (
        <div className="ml-1 mt-0.5 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};
