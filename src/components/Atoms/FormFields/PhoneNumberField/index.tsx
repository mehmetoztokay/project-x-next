import { combineClass } from "@/helpers/development/combineClass";
import { useField } from "formik";
import { useState } from "react";
import PhoneInput, { PhoneNumber, Value } from "react-phone-number-input";

type PhoneInputProps = Partial<React.ComponentProps<typeof PhoneInput>> & {
    name: string;
    label: string;
    className?: string;
    innerFloatLabel?: boolean;
    inputBg?: string | undefined;
};

export const PhoneNumberField: React.FC<PhoneInputProps> = ({ name, label, className, inputBg, innerFloatLabel = false, ...props }) => {
    const [field, meta, setField] = useField(name);
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <div className={combineClass("relative text-gray-700", {
                "!text-gray-900": field.value?.length > 0, // Update class based on phone number presence
                "border-red-500": field.value && meta.error, // Update class for error
            })}>
                <div className={combineClass("peer w-full border border-gray-200 rounded-md py-3 px-3", {
                    "text-gray-900 border-blue-500 pt-4 pb-2": focused, "!text-gray-900": field.value > 0,
                    "border-red-500": meta.touched && meta.error, "pt-4 pb-2": field.value,
                })}>
                    <PhoneInput
                        className={combineClass(
                            "[&>input]:w-full [&>input]:h-full [&>input]:border-none [&>input]:placeholder-transparent [&>input]:outline-none [&>input]:py-0 [&>input]:px-0 p-0", {})}
                        style={{ backgroundColor: inputBg && inputBg }}
                        countrySelectComponent={() => null}
                        placeholder=""
                        value={field.value}
                        onChange={(value: Value) => {
                            setField.setValue(value);
                        }}
                        onBlur={() => {
                            setField.setTouched(true);
                            setFocused(false);
                        }}
                        onFocus={() => setFocused(true)}
                        {...props} // Burada gelen props'ları aktarıyoruz
                    />
                </div>
                <label
                    htmlFor={name}
                    className={combineClass("absolute left-1 px-2 transform -translate-y-1/2 top-1/2 duration-200 ease-in-out pointer-events-none ", {
                        "-translate-y-[20px] text-[10px]": field.value || focused,
                        "text-blue-500": focused,

                    })}
                    style={{ backgroundColor: inputBg && (field.value || focused) && inputBg }}
                >
                    {label}
                </label>
            </div>
            {meta.touched && meta.error && <div className="text-red-500 text-xs">{meta.error}</div>}
        </div>
    );
};