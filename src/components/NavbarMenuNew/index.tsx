"use client";
import {combineClass} from "@/helpers/development/combineClass";
import React, {useState} from "react";
import {NavItem} from "./NavItem";

export const NavbarMenuNew = () => {
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);

  return (
    <div className="relative z-10">
      <nav className="container mx-auto py-3">
        <div className="flex justify-between">
          <div className="lg:flex lg:items-center">
            <div className="flex justify-between lg:justify-start w-full lg:w-auto relative z-10">
              <p className={combineClass("flex text-4xl font-bold")}>LOGO 123</p>
            </div>

            <div
              className={combineClass(
                "lg:flex absolute bg-green-200 lg:bg-transparent inset-0 lg:inset-auto min-h-fit h-svh lg:h-auto lg:py-0 py-16 lg:top-36 lg:!static -z-10 lg:z-0",
                {
                  hidden: !isActiveMenu,
                }
              )}
            >
              <div className="container mx-auto">
                <div className="lg:flex gap-4">
                  <NavItem />
                  <NavItem />
                  <NavItem />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-10">
            <div className="flex gap-2">
              <div>btn 1</div>
              <div>btn 2</div>
            </div>
            <div className={combineClass("flex lg:hidden")} onClick={() => setIsActiveMenu(!isActiveMenu)}>
              {isActiveMenu ? "x" : "="}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
