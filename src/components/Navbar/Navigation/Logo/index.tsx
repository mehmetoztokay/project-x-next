import React from "react";
import {combineClass} from "@/helpers/development/combineClass";
import {Link} from "@/i18n/routing";

export const Logo = () => {
  return (
    <Link href={"/"} className={combineClass("relative z-[1] text-xl font-bold")}>
      LOGO
    </Link>
  );
};
