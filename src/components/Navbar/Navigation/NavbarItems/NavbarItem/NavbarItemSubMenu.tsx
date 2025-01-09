import {combineClass} from "@/helpers/development/combineClass";
import React from "react";
import {NavbarItemSubMenuChild} from "@/components/Navbar/Navigation/NavbarItems/NavbarItem/NavbarItemSubMenuChild";

type props = {
  navItem: any;
  subMenuActive: boolean;
  setSubmenuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarItemSubMenu: React.FC<props> = ({navItem, subMenuActive, setSubmenuActive}) => {
  return (
    <div className={combineClass("absolute backdrop-blur-sm bg-[#111111]/[90%] inset-0 top-0 lg:py-28 lg:pt-20 z-[1] py-6 pt-12 min-h-fit h-full lg:h-auto lg:-z-10", {})}>
      <div className="container mx-auto">
        <div
          className="lg:hidden flex gap-2 text-gray-500 text-xl mb-7"
          onClick={() => {
            setSubmenuActive(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-gray-500">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <p className="opacity-80">{navItem.title}</p>
        </div>

        <div className={combineClass("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8")}>
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
