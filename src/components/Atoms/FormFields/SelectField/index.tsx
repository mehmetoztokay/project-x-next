"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {ssr: false});

import {combineClass} from "@/helpers/development/combineClass";
import {components, ControlProps, MenuProps, NoticeProps, OptionProps, PlaceholderProps, Props} from "react-select";

const CustomControl = (props: ControlProps) => {
  return (
    <components.Control
      {...props}
      className={combineClass(
        "flex items-center !outline-0 !shadow-none !stroke-none border !border-gray-200 !focus-within:border-gray-500 rounded-md p-[.375rem] pl-1.5 text-gray-900 w-full max-w-full overflow-auto",
        {"!border-blue-500": props.isFocused}
      )}
    />
  );
};

const CustomMenu = (props: MenuProps) => {
  return <components.Menu {...props} className="bg-white border outline-0 !shadow-none stroke-none border-gray-200 rounded-lg p-2 !mt-1" />;
};

const CustomPlaceholder = (props: PlaceholderProps) => {
  console.log(props);

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

const CustomOption = (props: OptionProps<any>) => {
  const {data, innerRef, innerProps, isFocused, isSelected} = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={combineClass("flex items-center gap-2 px-3 py-2 cursor-pointer rounded text-sm my-1", {"bg-blue-100": isFocused, "bg-blue-500 text-white": isSelected})}
    >
      {data.icon && <img src={data.icon} alt={data.label} className="w-6 h-4 rounded-sm" />}
      <span>{data.label}</span>
    </div>
  );
};

export const SelectField = ({
  choice,
  setChoice,
  options,
  placeholderText = "Select... falan filan",
  noOptionsText = "No options available",
  ...props
}: {
  choice: any;
  setChoice: (choice: any) => void;
  options: any[];
  placeholderText?: string;
  noOptionsText?: string;
} & Props) => (
  <Select
    className="text-gray-900"
    closeMenuOnSelect={true}
    onChange={(choice) => setChoice(choice)}
    isClearable={true}
    components={{
      Control: CustomControl,
      Menu: CustomMenu,
      Option: CustomOption,
      Placeholder: CustomPlaceholder,
      NoOptionsMessage: CustomNoOptionsMessage,
    }}
    options={options}
    placeholder={placeholderText}
    noOptionsMessage={() => noOptionsText.toString()}
    {...props}
  />
);
