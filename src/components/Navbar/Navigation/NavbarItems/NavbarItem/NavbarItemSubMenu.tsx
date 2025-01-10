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
    <div
      className={combineClass(
        `absolute backdrop-blur-md bg-[#111111]/[90%] inset-0 top-0 mt-0 lg:mt-[53px] lg:py-28 lg:pt-10 z-[1] py-10 h-min lg:-z-10 transition-all duration-500 ease-in-out transform translate-x-32 lg:-translate-y-20 lg:translate-x-0 opacity-0`,
        {
          "lg:translate-y-0 opacity-100 translate-x-0": subMenuActive,
        }
      )}
    >
      <div
        className={combineClass("container mx-auto transition-all duration-1000 ease-out transform translate-x-0 opacity-0", {
          "translate-x-0 opacity-100": subMenuActive,
        })}
      >
        <div
          className="lg:hidden inline-flex gap-2 text-xl mb-7 -ml-1 opacity-70"
          onClick={() => {
            setSubmenuActive(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-gray-300">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <p>{navItem.title.toUpperCase()}</p>
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
