import React from "react";
import {combineClass} from "@/helpers/development/combineClass";

type props = {
  navigationIsNull: boolean;
  openMobileMenu: boolean;
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarItemsRight: React.FC<props> = ({navigationIsNull, openMobileMenu, setOpenMobileMenu}) => {
  return (
    <div className="flex gap-4 relative z-10 items-center">
      <div className="flex gap-2">
        <div>btn</div>
      </div>
      {!navigationIsNull && (
        <div className={combineClass("flex lg:hidden")} onClick={() => setOpenMobileMenu(!openMobileMenu)}>
          <div
            className={combineClass(
              "relative inline-block h-[30px] w-[30px] cursor-pointer transform rotate-0 transition-all duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)] select-none touch-none",
              {"rotate-90": openMobileMenu}
            )}
          >
            <div className="w-[18px] h-[8px] relative block mt-[-4px] mx-auto top-1/2">
              <div
                className={combineClass(
                  "w-full h-[1px] block relative bg-gray-500 transition-all duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)] delay-0 transform translate-y-0 rotate-0",
                  {"translate-y-[4px] rotate-45 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0.01,0.165,0.99)] delay-[200ms]": openMobileMenu}
                )}
              ></div>
              <div
                className={combineClass(
                  "w-full h-[1px] block relative bg-gray-500 transition-all duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)] delay-0 transform translate-y-[6px] rotate-0",
                  {"transform translate-y-[3px] rotate-[-45deg] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0.01,0.165,0.99)] delay-[200ms]": openMobileMenu}
                )}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
