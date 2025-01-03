"use client";
import {combineClass} from "@/helpers/development/combineClass";
import React, {useState} from "react";
import {NavItem} from "./NavItem";
import {useTranslations} from "next-intl";

export const NavbarMenuNew = () => {
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
  const t = useTranslations("Layout");

  return (
    <div className="relative z-10">
      <nav className="container mx-auto py-5">
        <div className="flex justify-between">
          <div className="lg:flex lg:items-center">
            <div className="flex justify-between lg:justify-start w-full lg:w-auto relative z-10">
              <p className={combineClass("flex text-4xl font-bold")}>LOGO</p>
            </div>

            {!t.raw("navs.isNull") && (
              <div
                className={combineClass(
                  "lg:flex absolute backdrop-blur-md bg-gray-200/30 lg:backdrop-blur-none lg:bg-transparent inset-0 lg:inset-auto min-h-fit h-svh lg:h-auto lg:py-0 py-16 lg:top-36 lg:!static -z-10 lg:z-0",
                  {
                    hidden: !isActiveMenu,
                  }
                )}
              >
                <div className="container mx-auto">
                  <div className="lg:flex gap-4">
                    {t.raw("navs.navItems").map((navItem: any, indexNav: number) => (
                      <NavItem key={indexNav} navItem={navItem} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 relative z-10 items-center">
            <div className="flex gap-2">
              <div>btn</div>
            </div>
            {!t.raw("navs.isNull") && (
              <div className={combineClass("flex lg:hidden")} onClick={() => setIsActiveMenu(!isActiveMenu)}>
                <div
                  className={combineClass(
                    "relative inline-block h-[30px] w-[30px] cursor-pointer transform rotate-0 transition-all duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)] select-none touch-none",
                    {"rotate-90": isActiveMenu}
                  )}
                >
                  <div className="w-[18px] h-[8px] relative block mt-[-4px] mx-auto top-1/2">
                    <div
                      className={combineClass(
                        "w-full h-[1px] block relative bg-gray-500 transition-all duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)] delay-0 transform translate-y-0 rotate-0",
                        {"translate-y-[4px] rotate-45 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0.01,0.165,0.99)] delay-[200ms]": isActiveMenu}
                      )}
                    ></div>
                    <div
                      className={combineClass(
                        "w-full h-[1px] block relative bg-gray-500 transition-all duration-300 ease-[cubic-bezier(0.4,0.01,0.165,0.99)] delay-0 transform translate-y-[6px] rotate-0",
                        {"transform translate-y-[3px] rotate-[-45deg] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0.01,0.165,0.99)] delay-[200ms]": isActiveMenu}
                      )}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
