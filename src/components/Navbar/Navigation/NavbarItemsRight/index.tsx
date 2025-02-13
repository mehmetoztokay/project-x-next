import React from "react";
import { combineClass } from "@/helpers/development/combineClass";
import { LocaleSwitcher } from "@/components/layout/MainLayout/LocaleSwitcher";

type props = {
  navigationIsNull: boolean;
  openMobileMenu: boolean;
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarItemsRight: React.FC<props> = ({
  navigationIsNull,
  openMobileMenu,
  setOpenMobileMenu,
}) => {
  return (
    <div className="relative z-10 flex items-center gap-4">
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <button className="rounded-md border border-gray-500 bg-transparent px-3 py-1 text-sm text-gray-200 transition-all duration-300 hover:bg-slate-300 hover:text-gray-800">
          <span className="hidden md:block">Sample Link</span>
          <span className="block md:hidden">ICON</span>
        </button>

        <button className="rounded-md bg-slate-300 px-3 py-1 text-sm text-gray-800 transition-all duration-300 hover:bg-slate-700 hover:text-gray-200">
          <span className="hidden md:block">Sample Link</span>
          <span className="block md:hidden">ICON</span>
        </button>
      </div>
      {!navigationIsNull && (
        <div
          className={combineClass("flex lg:hidden")}
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
        >
          <div
            className={combineClass(
              "relative inline-block h-[30px] w-[30px] rotate-0 transform cursor-pointer touch-none select-none transition-all duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)]",
              { "rotate-90": openMobileMenu },
            )}
          >
            <div className="relative top-1/2 mx-auto mt-[-4px] block h-[8px] w-[18px]">
              <div
                className={combineClass(
                  "relative block h-[1px] w-full translate-y-0 rotate-0 transform bg-gray-500 transition-all delay-0 duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)]",
                  {
                    "translate-y-[4px] rotate-45 transition-all delay-[200ms] duration-[400ms] ease-[cubic-bezier(0.4,0.01,0.165,0.99)]":
                      openMobileMenu,
                  },
                )}
              ></div>
              <div
                className={combineClass(
                  "relative block h-[1px] w-full translate-y-[6px] rotate-0 transform bg-gray-500 transition-all delay-0 duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)]",
                  {
                    "translate-y-[3px] rotate-[-45deg] transform transition-all delay-[200ms] duration-[400ms] ease-[cubic-bezier(0.4,0.01,0.165,0.99)]":
                      openMobileMenu,
                  },
                )}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
