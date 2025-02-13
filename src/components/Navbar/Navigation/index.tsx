"use client";
import React, { useRef, useState } from "react";
import { combineClass } from "@/helpers/development/combineClass";
import { Logo } from "@/components/Navbar/Navigation/Logo";
import { NavbarItems } from "@/components/Navbar/Navigation/NavbarItems";
import { NavbarItemsRight } from "@/components/Navbar/Navigation/NavbarItemsRight";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

export const Navigation = () => {
  const pathname = usePathname();

  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [openChildMenu, setOpenChildMenu] = useState<boolean>(false);

  const t = useTranslations("Layout");
  const navigation = t.raw("navigation") || null;

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // if click outside the dropdown, close the dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setOpenMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close after route
  React.useEffect(() => {
    setOpenMobileMenu(false);
  }, [pathname]);

  return (
    <nav ref={mobileMenuRef} className={combineClass("relative py-2", {})}>
      <div className={combineClass("container mx-auto", {})}>
        <div className={combineClass("flex justify-between", {})}>
          <div className={combineClass("flex items-center", {})}>
            <Logo />
            <NavbarItems
              navigation={navigation}
              openMobileMenu={openMobileMenu}
              setOpenMobileMenu={setOpenMobileMenu}
              openChildMenu={openChildMenu}
              setOpenChildMenu={setOpenChildMenu}
            />
          </div>
          <NavbarItemsRight
            navigationIsNull={navigation.isNull}
            openMobileMenu={openMobileMenu}
            setOpenMobileMenu={setOpenMobileMenu}
          />
        </div>
      </div>
    </nav>
  );
};
