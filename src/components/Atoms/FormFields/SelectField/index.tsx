"use client";
import dynamic from "next/dynamic";

// TODO: Gec geliyor
const Select = dynamic(() => import("react-select"), {ssr: false});

import {combineClass} from "@/helpers/development/combineClass";
import {components, ControlProps, DropdownIndicatorProps, IndicatorsContainerProps, MenuProps, NoticeProps, OptionProps, PlaceholderProps, Props} from "react-select";
import {useField} from "formik";
import {normalizeText} from "@/helpers/normalizeText";

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
        "flex items-center !outline-0 !shadow-none !stroke-none border !border-gray-200 !focus-within:border-gray-500 rounded-md p-[.638rem] lg:p-[.375rem] px-[.07rem] text-gray-900 w-full max-w-full overflow-auto",
        {"!border-blue-500": props.menuIsOpen}
      )}
    >
      {showIconOnControl && icon && (
        <img
          src={icon}
          alt={label}
          className={combineClass("lg:w-6 lg:h-4 w-4 h-3 rounded-sm relative left-1 -mr-1", {"lg:inline-block hidden": hiddenIconOnControlForMobile, "!hidden": props.menuIsOpen})}
        />
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

const CustomIndicatorsContainer = (props: IndicatorsContainerProps) => {
  return (
    <div className="absolute lg:right-1.5 right-0 flex items-center justify-center">
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

const CustomDropdownIndicator = ({removeDropdownIndicatorIsFocused, ...props}: {removeDropdownIndicatorIsFocused: boolean} & DropdownIndicatorProps<any>) => {
  return (
    <div className={combineClass("", {hidden: props.isFocused && removeDropdownIndicatorIsFocused})}>
      <components.DropdownIndicator {...props}>{props.children}</components.DropdownIndicator>
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
  removeDropdownIndicatorIsFocused = false,
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
  removeDropdownIndicatorIsFocused?: boolean;
} & Props) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <Select
        controlShouldRenderValue
        className="text-gray-900"
        closeMenuOnSelect={true}
        isClearable={true}
        filterOption={(option: any, inputValue: any) => {
          const {label, shortLabel, value, ...otherProps} = option.data;
          const searchText = normalizeText(inputValue);

          // Normalize all values for comparison
          const normalizedLabel = normalizeText(label);
          const normalizedShortLabel = normalizeText(shortLabel);
          const normalizedValue = normalizeText(value);

          // Search all values
          return (
            normalizedLabel.includes(searchText) ||
            normalizedShortLabel.includes(searchText) ||
            normalizedValue.includes(searchText) ||
            // Excludes the "icon" property and checks if any other property in otherProps matches the search text.
            (!Object.keys(otherProps).includes("icon") && Object.values(otherProps).some((prop: any) => normalizeText(prop?.toString()).includes(searchText)))
          );
        }}
        getOptionLabel={(option: any) => `${showShortLabelOnControl ? option.shortLabel : option.label}`}
        components={{
          IndicatorSeparator: () => null,
          IndicatorsContainer: CustomIndicatorsContainer,
          DropdownIndicator: (dropdownProps) => <CustomDropdownIndicator {...dropdownProps} removeDropdownIndicatorIsFocused={removeDropdownIndicatorIsFocused} />,
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
