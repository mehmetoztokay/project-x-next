import { combineClass } from "@/helpers/development/combineClass";
import React from "react";
import { NavbarItemSubMenuChild } from "@/components/Navbar/Navigation/NavbarItems/NavbarItem/NavbarItemSubMenuChild";

type props = {
  navItem: any;
  subMenuActive: boolean;
  setSubmenuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarItemSubMenu: React.FC<props> = ({ navItem, subMenuActive, setSubmenuActive }) => {
  return (
    <div
      className={combineClass(
        `pointer-events-none absolute inset-0 top-0 z-[1] mt-0 h-min -translate-x-[40%] transform bg-[#000000]/[85%] py-10 opacity-0 backdrop-blur-md transition-all duration-500 ease-in-out lg:-z-10 lg:mt-[53px] lg:-translate-y-20 lg:translate-x-0 lg:py-28 lg:pt-10`,
        {
          "pointer-events-auto translate-x-0 opacity-100 lg:translate-y-0": subMenuActive,
        },
      )}
    >
      <div
        className={combineClass("container mx-auto translate-x-0 transform opacity-0 transition-all duration-1000 ease-out", {
          "translate-x-0 opacity-100": subMenuActive,
        })}
      >
        <div
          className="-ml-1 mb-7 inline-flex gap-2 text-xl opacity-70 lg:hidden"
          onClick={() => {
            setSubmenuActive(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-gray-300">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <p>{navItem.title.toUpperCase()}</p>
        </div>

        <div className={combineClass("grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}>
          {navItem.children?.map((navbarItemSubMenuChild: any, indexChildNav: number) => (
            <div key={indexChildNav}>
              <NavbarItemSubMenuChild key={indexChildNav} navbarItemSubMenuChild={navbarItemSubMenuChild} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
