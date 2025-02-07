"use client";
import dynamic from "next/dynamic";

// TODO: Gec geliyor
const Select = dynamic(() => import("react-select"), {ssr: false});

import {combineClass} from "@/helpers/development/combineClass";
import {components, ControlProps, DropdownIndicatorProps, IndicatorsContainerProps, MenuProps, NoticeProps, OptionProps, PlaceholderProps, Props} from "react-select";
import {useField} from "formik";
import {normalizeText} from "@/helpers/normalizeText";
import React from "react";

const CustomControl = ({
  showIconOnControl,
  showOnlyIconOnControl,
  hiddenIconOnControlForMobile,
  showShortLabelOnMobile,
  meta,
  ...props
}: {
  showShortLabelOnMobile?: boolean;
  showIconOnControl?: boolean;
  showOnlyIconOnControl?: boolean;
  hiddenIconOnControlForMobile?: boolean;
  meta?: any;
} & ControlProps) => {
  const selectedValue = props.getValue();
  const {icon, iconIsComponent, label, shortLabel}: any = selectedValue?.[0] || {};

  return (
    <components.Control
      {...props}
      className={combineClass(
        "flex items-center !outline-0 !shadow-none !stroke-none border !border-gray-200 !focus-within:border-gray-500 rounded-md p-[.375rem] px-[.07rem] text-gray-900 w-full max-w-full overflow-auto",
        {"!border-blue-500": props.menuIsOpen, "!border-red-500": meta.touched && meta.error}
      )}
    >
      {!iconIsComponent && (showIconOnControl || showOnlyIconOnControl) && icon && !props.menuIsOpen && (
        <img
          src={icon}
          alt={label}
          onClick={() => console.log("sela")}
          className={combineClass("w-6 h-4 rounded-sm relative left-1", {
            "lg:inline-block hidden": hiddenIconOnControlForMobile,
            "!hidden": props.menuIsOpen,
            "left-2": showOnlyIconOnControl,
          })}
        />
      )}
      {iconIsComponent && (showIconOnControl || showOnlyIconOnControl) && icon && !props.menuIsOpen && (
        <div
          className={combineClass("w-6 h-4 rounded-sm relative left-1 overflow-hidden", {
            "lg:inline-block hidden": hiddenIconOnControlForMobile,
            "!hidden": props.menuIsOpen,
            "left-2": showOnlyIconOnControl,
          })}
        >
          {React.createElement(icon)}
        </div>
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
    <components.Placeholder {...props} className="!text-gray-900 !-ml-1">
      {!props.isFocused && props.children}
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
      {!data.iconIsComponent && showIconOnOptions && data.icon && (
        <img loading="lazy" src={data.icon} alt={data.label} className={combineClass("w-6 h-4 rounded-sm", {"lg:inline-block hidden": hiddenIconOpOptionsForMobile})} />
      )}

      {data.iconIsComponent && showIconOnOptions && data.icon && (
        <div className={combineClass("w-6 h-4 rounded-sm overflow-hidden", {"lg:inline-block hidden": hiddenIconOpOptionsForMobile})}>{React.createElement(data.icon)}</div>
      )}
      <span>{showShortLabelOnOptions && data.shortLabel ? data.shortLabel : data.label}</span>
    </div>
  );
};

const CustomIndicatorsContainer = (props: IndicatorsContainerProps) => {
  return (
    <div className="absolute right-0 rtl:left-0 rtl:right-auto flex items-center justify-center">
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
  showOnlyIconOnControl = false,
  hiddenIconOnControlForMobile = false,
  showIconOnOptions = false,
  hiddenIconOpOptionsForMobile = false,
  removeDropdownIndicatorIsFocused = false,
  hideErrorMessage = false,
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
  showOnlyIconOnControl?: boolean;
  hiddenIconOnControlForMobile?: boolean;
  showIconOnOptions?: boolean;
  hiddenIconOpOptionsForMobile?: boolean;
  removeDropdownIndicatorIsFocused?: boolean;
  hideErrorMessage?: boolean;
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
        getOptionLabel={(option: any) => (showOnlyIconOnControl ? "" : showShortLabelOnControl ? option.shortLabel : option.label)}
        components={{
          IndicatorSeparator: () => null,
          IndicatorsContainer: CustomIndicatorsContainer,
          DropdownIndicator: (dropdownProps) => <CustomDropdownIndicator {...dropdownProps} removeDropdownIndicatorIsFocused={removeDropdownIndicatorIsFocused} />,
          Control: (controlProps) => (
            <CustomControl
              {...controlProps}
              meta={meta}
              showIconOnControl={showIconOnControl}
              hiddenIconOnControlForMobile={hiddenIconOnControlForMobile}
              showOnlyIconOnControl={showOnlyIconOnControl}
            />
          ),
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

      {!hideErrorMessage && meta.touched && meta.error ? <p className="text-red-500 text-xs ml-1">{meta.error}</p> : null}
    </div>
  );
};
