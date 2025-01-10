import {combineClass} from "@/helpers/development/combineClass";
import React from "react";
import {NavbarItem} from "@/components/Navbar/Navigation/NavbarItems/NavbarItem";

type props = {
  navigation: any;
  // Mobile menu state
  openMobileMenu: boolean;
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  // Child menu state
  openChildMenu: boolean;
  setOpenChildMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarItems: React.FC<props> = ({navigation, openMobileMenu, setOpenMobileMenu, openChildMenu, setOpenChildMenu}) => {
  return (
    <>
      {navigation && !navigation?.isNull && (
        <div
          className={combineClass(
            `absolute inset-0 lg:inset-auto lg:!static lg:h-auto min-h-fit mt-[47px] lg:mt-0 -z-10 lg:z-0 backdrop-blur-md bg-[#111111]/[90%] lg:backdrop-blur-none lg:bg-transparent lg:grid-rows-[1fr] grid grid-rows-[0fr] transition-all duration-300 ease-in-out`,
            {
              "grid-rows-[1fr]": openMobileMenu,
              "bg-transparent transition-none backdrop-blur-none": openChildMenu,
            }
          )}
        >
          <div className={combineClass("container mx-auto lg:py-0 overflow-hidden", {})}>
            <div className={combineClass("lg:flex gap-4 my-6 lg:my-0", {})}>
              {navigation?.navItems?.map((navItem: any, indexNav: number) => (
                <NavbarItem key={indexNav} navItem={navItem} openChildMenu={openChildMenu} setOpenChildMenu={setOpenChildMenu} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
