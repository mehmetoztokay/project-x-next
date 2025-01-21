"use client";
import dynamic from "next/dynamic";

// TODO: Gec geliyor
const Select = dynamic(() => import("react-select"), {ssr: false});

import {combineClass} from "@/helpers/development/combineClass";
import {components, ControlProps, MenuProps, NoticeProps, OptionProps, PlaceholderProps, Props} from "react-select";
import {useField} from "formik";

const CustomControl = ({
  showIconOnControl,
  hiddenIconOnControlForMobile,
  showShortLabelOnMobile,
  ...props
}: {
  showShortLabelOnMobile?: boolean;
  showIconOnControl?: boolean;
  hiddenIconOnControlForMobile?: boolean;
} & ControlProps) => {
  const selectedValue = props.getValue();
  const {icon, label, shortLabel}: any = selectedValue?.[0] || {};

  return (
    <components.Control
      {...props}
      className={combineClass(
        "flex items-center !outline-0 !shadow-none !stroke-none border !border-gray-200 !focus-within:border-gray-500 rounded-md p-[.375rem] pl-1.5 text-gray-900 w-full max-w-full overflow-auto",
        {"!border-blue-500": props.isFocused}
      )}
    >
      {showIconOnControl && icon && (
        <img src={icon} alt={label} className={combineClass("lg:w-6 lg:h-4 w-4 h-3 rounded-sm", {"lg:inline-block hidden": hiddenIconOnControlForMobile})} />
      )}

      {props.children}
    </components.Control>
  );
};

const CustomMenu = ({menuClasses, ...props}: {menuClasses?: string} & MenuProps) => {
  return <components.Menu {...props} className={combineClass("border outline-0 !shadow-none stroke-none border-gray-200 rounded-lg p-2 !mt-1", menuClasses, {})} />;
};

const CustomPlaceholder = (props: PlaceholderProps) => {
  return (
    <components.Placeholder {...props} className="!text-gray-900">
      {props.children}
    </components.Placeholder>
  );
};

const CustomNoOptionsMessage = (props: NoticeProps) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span className="text-gray-400">{props.children}</span>
    </components.NoOptionsMessage>
  );
};

const CustomOption = ({
  data,
  innerRef,
  innerProps,
  isFocused,
  isSelected,
  showIconOnOptions,
  showShortLabelOnOptions,
  hiddenIconOpOptionsForMobile,
}: OptionProps<any> & {
  showIconOnOptions?: boolean;
  showShortLabelOnOptions?: boolean;
  hiddenIconOpOptionsForMobile?: boolean;
}) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={combineClass("flex items-center gap-2 lg:px-3 px-2 py-2 cursor-pointer rounded text-sm my-1", {"bg-blue-100": isFocused, "bg-blue-500 text-white": isSelected})}
    >
      {showIconOnOptions && data.icon && (
        <img src={data.icon} alt={data.label} className={combineClass("lg:w-6 lg:h-4 w-4 h-3 rounded-sm", {"lg:inline-block hidden": hiddenIconOpOptionsForMobile})} />
      )}
      <span>{showShortLabelOnOptions && data.shortLabel ? data.shortLabel : data.label}</span>
    </div>
  );
};

export const SelectField = ({
  name,
  options,
  placeholderText = "Select...",
  noOptionsText = "No options available",
  menuClasses = "",
  showShortLabelOnControl = false,
  showShortLabelOnOptions = false,
  showIconOnControl = false,
  hiddenIconOnControlForMobile = false,
  showIconOnOptions = false,
  hiddenIconOpOptionsForMobile = false,
  ...props
}: {
  name: string;
  options: any[];
  placeholderText?: string;
  noOptionsText?: string;
  menuClasses?: string;
  showShortLabelOnControl?: boolean;
  showShortLabelOnOptions?: boolean;
  showIconOnControl?: boolean;
  hiddenIconOnControlForMobile?: boolean;
  showIconOnOptions?: boolean;
  hiddenIconOpOptionsForMobile?: boolean;
} & Props) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <Select
        controlShouldRenderValue
        className="text-gray-900"
        closeMenuOnSelect={true}
        isClearable={true}
        getOptionLabel={(option: any) => `${showShortLabelOnControl ? option.shortLabel : option.label}`}
        components={{
          IndicatorSeparator: () => null,
          Control: (controlProps) => <CustomControl {...controlProps} showIconOnControl={showIconOnControl} hiddenIconOnControlForMobile={hiddenIconOnControlForMobile} />,
          Menu: (menuProps) => <CustomMenu {...menuProps} menuClasses={menuClasses} />,
          Option: (optionProps) => (
            <CustomOption
              {...optionProps}
              showShortLabelOnOptions={showShortLabelOnOptions}
              showIconOnOptions={showIconOnOptions}
              hiddenIconOpOptionsForMobile={hiddenIconOpOptionsForMobile}
            />
          ),
          Placeholder: CustomPlaceholder,
          NoOptionsMessage: CustomNoOptionsMessage,
        }}
        options={options}
        placeholder={placeholderText}
        noOptionsMessage={() => noOptionsText.toString()}
        {...props}
      />

      {meta.touched && meta.error ? <p className="text-red-500 text-xs ml-1">{meta.error}</p> : null}
    </div>
  );
};
