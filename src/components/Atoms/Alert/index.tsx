import { combineClass } from "@/helpers/development/combineClass";
import React from "react";
import { IoClose } from "react-icons/io5";

export const Alert = ({
  children,
  isOpenAlert = true,
  onClickClose,
  canClose = false,
  isMiniAlert = false,
  miniAlertType = "default",
}: {
  children: React.ReactElement;
  isOpenAlert?: boolean;
  onClickClose?: () => void;
  canClose?: boolean;
  isMiniAlert?: boolean;
  miniAlertType?: "success" | "info" | "warning" | "danger" | "rich" | "default";
}) => {
  return !isMiniAlert
    ? isOpenAlert && (
        <div className="relative rounded-lg bg-[#f7f7f7]">
          {canClose && (
            <div className="absolute right-4 top-4 rtl:left-4 rtl:right-auto">
              <div
                className="cursor-pointer rounded-full bg-[#eeeded] p-1 transition-all duration-300 hover:bg-[#dddbdb]"
                onClick={() => onClickClose && onClickClose()}
              >
                <IoClose size={22} />
              </div>
            </div>
          )}
          <div className="mt-1">{children}</div>
        </div>
      )
    : isOpenAlert && (
        <div
          className={combineClass("relative rounded-md border-l-4 p-4", {
            "border-gray-800 bg-gray-50 text-gray-900": miniAlertType == "info",
            "border-green-800 bg-green-50 text-green-900": miniAlertType == "success",
            "border-orange-700 bg-orange-50 text-orange-700": miniAlertType == "warning",
            "border-red-800 bg-red-50 text-red-900": miniAlertType == "danger",
            "border-blue-800 bg-blue-50 text-blue-900": miniAlertType == "default",
            "pr-12": canClose,
          })}
          role="alert"
        >
          {canClose && (
            <div className="absolute right-4 top-4 rtl:left-4 rtl:right-auto">
              <div
                className="cursor-pointer rounded-full bg-[#eeeded] p-1 transition-all duration-300 hover:bg-[#dddbdb]"
                onClick={() => onClickClose && onClickClose()}
              >
                <IoClose size={18} />
              </div>
            </div>
          )}
          {children}
        </div>
      );
};
