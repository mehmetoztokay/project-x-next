import { combineClass } from "@/helpers/development/combineClass";
import React from "react";
import { NavbarItem } from "@/components/Navbar/Navigation/NavbarItems/NavbarItem";

type props = {
  navigation: any;
  // Mobile menu state
  openMobileMenu: boolean;
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  // Child menu state
  openChildMenu: boolean;
  setOpenChildMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarItems: React.FC<props> = ({ navigation, openMobileMenu, setOpenMobileMenu, openChildMenu, setOpenChildMenu }) => {
  return (
    <>
      {navigation && !navigation?.isNull && (
        <div
          className={combineClass(
            `duration-400 absolute inset-0 -z-10 mt-[47px] grid h-min grid-rows-[0fr] bg-[#000000]/[85%] backdrop-blur-md transition-all ease-in-out lg:!static lg:inset-auto lg:z-0 lg:mt-0 lg:grid-rows-[1fr] lg:bg-transparent lg:backdrop-blur-none lg:duration-300`,
            {
              "grid-rows-[1fr] duration-200": openMobileMenu,
              "grid-rows-[0fr] backdrop-blur-none": openChildMenu,
            },
          )}
        >
          <div className={combineClass("container mx-auto overflow-hidden lg:py-0", {})}>
            <div className={combineClass("my-6 gap-4 lg:my-0 lg:flex", {})}>
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
