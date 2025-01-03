"use client";
import {combineClass} from "@/helpers/development/combineClass";
import React, {useState} from "react";
import {NavItem} from "./NavItem";

export const NavbarMenuNew = () => {
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);

  return (
    <nav className="px-4 py-4">
      <div className=" inset-0 bg-white z-50 p-4 lg:flex lg:items-center">
        <div className="flex justify-between lg:justify-start w-full lg:w-auto">
          <p className={combineClass("flex text-4xl font-bold")}>LOGO</p>

          <div className={combineClass("flex lg:hidden")} onClick={() => setIsActiveMenu(!isActiveMenu)}>
            {isActiveMenu ? "x" : "="}
          </div>
        </div>

        <div className={combineClass("lg:flex gap-4 absolute bg-green-200 lg:bg-transparent inset-0 lg:inset-auto top-20 pl-8 lg:!static", {hidden: !isActiveMenu})}>
          <NavItem />
          <NavItem />
          <NavItem />
        </div>
      </div>
    </nav>
  );
};
