import {combineClass} from "@/helpers/development/combineClass";
import {Link} from "@/i18n/routing";
import React from "react";

type props = {
  navItem: any;
  subMenuActive: boolean;
  setSubmenuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarItemLink: React.FC<props> = ({navItem, subMenuActive, setSubmenuActive}) => {
  const classOfLink =
    "lg:hover:bg-[#2d2d2d] lg:px-3 lg:py-1 my-4 lg:my-0 lg:mt-0 py-2 rounded-md transition-all ease-in duration-400 flex gap-1 items-center text-lg lg:text-[length:inherit]";
  return (
    <div>
      {navItem?.hasChildren ? (
        <button
          onClick={() => {
            setSubmenuActive(!subMenuActive);
          }}
          className={combineClass(classOfLink, {
            "text-blue-500": subMenuActive,
          })}
        >
          {navItem.title}
          <svg
            className={combineClass("fill-gray-600 transform -rotate-90 lg:transform-none", {"!transform rotate-180 fill-blue-500": subMenuActive})}
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.3644 5.29295C14.1769 5.10548 13.9226 5.00017 13.6574 5.00017C13.3923 5.00017 13.138 5.10548 12.9504 5.29295L8.00044 10.243L3.05044 5.29295C2.86184 5.11079 2.60924 5.01 2.34704 5.01228C2.08484 5.01456 1.83403 5.11972 1.64862 5.30513C1.46321 5.49054 1.35805 5.74135 1.35577 6.00355C1.35349 6.26575 1.45428 6.51835 1.63644 6.70695L7.29344 12.364C7.48097 12.5514 7.73528 12.6567 8.00044 12.6567C8.2656 12.6567 8.51991 12.5514 8.70744 12.364L14.3644 6.70695C14.5519 6.51942 14.6572 6.26512 14.6572 5.99995C14.6572 5.73479 14.5519 5.48048 14.3644 5.29295Z" />
          </svg>
        </button>
      ) : (
        <Link className={classOfLink} href={navItem.link}>
          {navItem.title}
        </Link>
      )}
      <div className="bg-gradient-to-r from-gray-300 to-transparent h-[1px] opacity-50 lg:hidden"></div>
    </div>
  );
};
