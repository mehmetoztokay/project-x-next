"use client";
import dynamic from "next/dynamic";

// TODO: Gec geliyor
const Select = dynamic(() => import("react-select"), { ssr: false });

import { combineClass } from "@/helpers/development/combineClass";
import {
  components,
  ControlProps,
  DropdownIndicatorProps,
  IndicatorsContainerProps,
  InputProps,
  MenuProps,
  NoticeProps,
  OptionProps,
  PlaceholderProps,
  Props,
} from "react-select";
import { useField } from "formik";
import { normalizeText } from "@/helpers/normalizeText";
import React from "react";
import { Spinner } from "@/components/Atoms/Spinner";

const CustomInput = ({ canAutoComplete, inputClasses, ...props }: { canAutoComplete: boolean; inputClasses: string } & InputProps) => {
  return <components.Input {...props} autoComplete={canAutoComplete ? "auto" : "never"} className={inputClasses} />;
};

const CustomControl = ({
  showIconOnControl,
  showOnlyIconOnControl,
  hiddenIconOnControlForMobile,
  showShortLabelOnMobile,
  meta,
  controlClasses,
  placeholderText,
  showLabelOnSelected,
  isLoadingSelect,
  ...props
}: {
  showShortLabelOnMobile?: boolean;
  showIconOnControl?: boolean;
  showOnlyIconOnControl?: boolean;
  hiddenIconOnControlForMobile?: boolean;
  controlClasses: string;
  placeholderText: string;
  showLabelOnSelected: boolean;
  isLoadingSelect?: boolean;
  meta?: any;
} & ControlProps) => {
  const selectedValue = props.getValue();

  const { icon, iconIsComponent, label, shortLabel }: any = selectedValue?.[0] || {};
  return (
    <components.Control
      {...props}
      className={combineClass(
        "!focus-within:border-gray-500 relative flex w-full max-w-full items-center overflow-auto rounded-md border !border-gray-200 !stroke-none p-[.375rem] px-[.07rem] text-gray-900 !shadow-none !outline-0",
        controlClasses,
        {
          "!border-blue-500": props.menuIsOpen,
          "!border-red-500": meta.touched && meta.error,
          "!pb-[3px] !pt-[9px]": selectedValue.length,
        },
      )}
    >
      {isLoadingSelect && (
        <div className="absolute right-[8px]">
          <Spinner classes="w-[20px] h-[20px]" />
        </div>
      )}
      {!iconIsComponent && (showIconOnControl || showOnlyIconOnControl) && icon && !props.menuIsOpen && (
        <img
          src={icon}
          alt={label}
          className={combineClass("relative h-4 w-6 rounded-sm ltr:left-2 ltr:mr-1 rtl:right-2 rtl:ml-1", {
            "hidden lg:inline-block": hiddenIconOnControlForMobile,
            "!hidden": props.menuIsOpen,
          })}
        />
      )}
      {iconIsComponent && (showIconOnControl || showOnlyIconOnControl) && icon && !props.menuIsOpen && (
        <div
          className={combineClass("relative h-4 w-6 overflow-hidden rounded-sm ltr:left-2 ltr:mr-1 rtl:right-2 rtl:ml-1", {
            "hidden lg:inline-block": hiddenIconOnControlForMobile,
            "!hidden": props.menuIsOpen,
          })}
        >
          {React.createElement(icon)}
        </div>
      )}
      {selectedValue.length != 0 && showLabelOnSelected && (
        <p className="absolute -translate-y-[16px] translate-x-[7px] text-[10px]">{placeholderText}</p>
      )}
      {props.children}
    </components.Control>
  );
};

const CustomMenu = ({ menuClasses, ...props }: { menuClasses?: string } & MenuProps) => {
  return (
    <components.Menu
      {...props}
      className={combineClass("!mt-1 rounded-lg border border-gray-200 stroke-none p-2 !shadow-none outline-0", menuClasses, {})}
    />
  );
};

const CustomPlaceholder = (props: PlaceholderProps) => {
  return (
    <components.Placeholder {...props} className="!text-gray-900">
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
      className={combineClass("my-1 flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm lg:px-3", {
        "bg-blue-100": isFocused,
        "bg-blue-500 text-white": isSelected,
      })}
    >
      {!data.iconIsComponent && showIconOnOptions && data.icon && (
        <img
          loading="lazy"
          src={data.icon}
          alt={data.label}
          className={combineClass("h-4 w-6 rounded-sm", {
            "hidden lg:inline-block": hiddenIconOpOptionsForMobile,
          })}
        />
      )}

      {data.iconIsComponent && showIconOnOptions && data.icon && (
        <div
          className={combineClass("h-4 w-6 overflow-hidden rounded-sm", {
            "hidden lg:inline-block": hiddenIconOpOptionsForMobile,
          })}
        >
          {React.createElement(data.icon)}
        </div>
      )}
      <span>{showShortLabelOnOptions && data.shortLabel ? data.shortLabel : data.label}</span>
    </div>
  );
};

const CustomIndicatorsContainer = (props: IndicatorsContainerProps) => {
  return (
    <div className="absolute right-0 flex items-center justify-center rtl:left-0 rtl:right-auto [&_*]:fill-gray-400">
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

const CustomDropdownIndicator = ({
  removeDropdownIndicatorIsFocused,
  ...props
}: {
  removeDropdownIndicatorIsFocused: boolean;
} & DropdownIndicatorProps<any>) => {
  return (
    <div
      className={combineClass("", {
        hidden: props.isFocused && removeDropdownIndicatorIsFocused,
      })}
    >
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
  canAutoComplete = false,
  inputClasses = "",
  controlClasses = "",
  runOnBlur,
  showLabelOnSelected = true,
  isLoadingSelect = false,
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
  canAutoComplete?: boolean;
  inputClasses?: string;
  controlClasses?: string;
  runOnBlur?: (value: any) => void;
  showLabelOnSelected?: boolean;
  isLoadingSelect?: boolean;
} & Props) => {
  const [field, meta, setField] = useField(name);
  return (
    <div>
      <Select
        controlShouldRenderValue
        className="text-gray-900"
        closeMenuOnSelect={true}
        isClearable={true}
        closeMenuOnScroll
        onBlur={(value) => {
          setField.setTouched(true);
          runOnBlur && runOnBlur(value);
        }}
        filterOption={(option: any, inputValue: any) => {
          const { label, shortLabel, value, ...otherProps } = option.data;
          const searchText = normalizeText(inputValue);

          // Normalize all values for comparison
          const normalizedLabel = normalizeText(label);
          const normalizedShortLabel = shortLabel && normalizeText(shortLabel);
          const normalizedValue = normalizeText(value);

          // Search all values
          return (
            normalizedLabel.includes(searchText) ||
            normalizedShortLabel.includes(searchText) ||
            normalizedValue.includes(searchText) ||
            // Excludes the "icon" property and checks if any other property in otherProps matches the search text.
            (!Object.keys(otherProps).includes("icon") &&
              Object.values(otherProps).some((prop: any) => normalizeText(prop?.toString()).includes(searchText)))
          );
        }}
        getOptionLabel={(option: any) => (showOnlyIconOnControl ? "" : showShortLabelOnControl ? option.shortLabel : option.label)}
        components={{
          IndicatorSeparator: () => null,
          IndicatorsContainer: CustomIndicatorsContainer,
          DropdownIndicator: (dropdownProps) => (
            <CustomDropdownIndicator {...dropdownProps} removeDropdownIndicatorIsFocused={removeDropdownIndicatorIsFocused} />
          ),
          Control: (controlProps) => (
            <CustomControl
              {...controlProps}
              meta={meta}
              showLabelOnSelected={showLabelOnSelected}
              placeholderText={placeholderText}
              isLoadingSelect={isLoadingSelect}
              controlClasses={controlClasses}
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
          Input: (inputProps) => <CustomInput {...inputProps} canAutoComplete={canAutoComplete} inputClasses={inputClasses} />,
          Placeholder: CustomPlaceholder,
          NoOptionsMessage: CustomNoOptionsMessage,
        }}
        options={options}
        placeholder={placeholderText}
        noOptionsMessage={() => noOptionsText.toString()}
        {...props}
      />

      {!hideErrorMessage && meta.touched && meta.error ? <p className="ml-1 mt-0.5 text-xs text-red-500">{meta.error}</p> : null}
    </div>
  );
};
