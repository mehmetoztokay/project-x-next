import React from "react";
import { combineClass } from "@/helpers/development/combineClass";
import { Link } from "@/i18n/routing";

export const Logo = () => {
  return (
    <div className={combineClass("relative z-[1] text-xl font-bold")}>
      <Link href={"/"}>LOGO</Link>
    </div>
  );
};
