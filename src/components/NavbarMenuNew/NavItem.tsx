import {combineClass} from "@/helpers/development/combineClass";
import React, {useState} from "react";

export const NavItem = () => {
  const [childMenuActive, setChildMenuActive] = useState<boolean>(false);

  return (
    <div className={combineClass("flex overflow-hidden", {hidden: 0 < -1})}>
      <div>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            setChildMenuActive(!childMenuActive);
          }}
        >
          Linko <span className={combineClass("inline-block lg:hidden")}>{">"}</span>
        </a>
      </div>
      <div className={combineClass("absolute inset-0 bg-gray-300 mt-0 lg:mt-20 pl-8 hidden", {block: childMenuActive})}>
        <div className="lg:hidden" onClick={() => setChildMenuActive(false)}>
          {"< back"}
        </div>
        <ul className={combineClass("mt-4 hidden flex-col gap-6", {flex: childMenuActive})}>
          <li>Menu item</li>
          <li>Menu item</li>
          <li>Menu item</li>
          <li>Menu item</li>
        </ul>
      </div>
    </div>
  );
};
