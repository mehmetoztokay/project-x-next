import React from "react";
import {combineClass} from "@/helpers/development/combineClass";
import {AnnouncementBar} from "@/components/Navbar/AnnouncementBar";
import {Navigation} from "@/components/Navbar/Navigation";

export const Navbar = () => {
  return (
    <div className={combineClass("relative z-10 bg-[#1a1a1a] text-gray-300 font-light", {})}>
      {0 < 1 && <AnnouncementBar />}
      <Navigation />
      <div className="bg-gradient-to-r from-gray-700 to-transparent h-[1px] opacity-60"></div>
    </div>
  );
};
