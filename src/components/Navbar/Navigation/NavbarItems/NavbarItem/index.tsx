import {combineClass} from "@/helpers/development/combineClass";
import React, {useEffect, useRef, useState} from "react";
import {NavbarItemLink} from "@/components/Navbar/Navigation/NavbarItems/NavbarItem/NavbarItemLink";
import {NavbarItemSubMenu} from "@/components/Navbar/Navigation/NavbarItems/NavbarItem/NavbarItemSubMenu";

type props = {
  navItem: any;
  // Child menu state
  openChildMenu: boolean;
  setOpenChildMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarItem: React.FC<props> = ({navItem, openChildMenu, setOpenChildMenu}) => {
  const [subMenuActive, setSubmenuActive] = useState<boolean>(false);

  const navbarItemRef = useRef<HTMLDivElement>(null);

  // if click outside the dropdown, close the dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (navbarItemRef.current && !navbarItemRef.current.contains(event.target)) {
        setSubmenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (subMenuActive) setOpenChildMenu(true);
    else setOpenChildMenu(false);
  }, [subMenuActive]);

  return (
    <div ref={navbarItemRef}>
      <NavbarItemLink navItem={navItem} subMenuActive={subMenuActive} setSubmenuActive={setSubmenuActive} />
      {navItem.hasChildren && <NavbarItemSubMenu navItem={navItem} subMenuActive={subMenuActive} setSubmenuActive={setSubmenuActive} />}
    </div>
  );
};
