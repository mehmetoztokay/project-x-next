import {combineClass} from "@/helpers/development/combineClass";
import {Link} from "@/i18n/routing";
import React, {useState} from "react";
import {NavChild} from "./NavChild";

export const NavItem = ({navItem}: any) => {
  const [childMenuActive, setChildMenuActive] = useState<boolean>(false);
  const navItemRef = React.useRef<HTMLDivElement>(null);

  // if click outside the dropdown, close the dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (navItemRef.current && !navItemRef.current.contains(event.target)) {
        setChildMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={navItemRef}>
      <div>
        {navItem.hasChildren ? (
          <button
            onClick={() => setChildMenuActive(!childMenuActive)}
            className={combineClass("hover:bg-gray-200 lg:px-3 lg:py-1 my-4 lg:mt-0 py-4 rounded-md transition-all ease-in duration-400 flex gap-1 items-center", {
              "text-blue-500": childMenuActive,
            })}
          >
            {navItem.title}
            <svg
              className={combineClass("fill-gray-600 transform -rotate-90 lg:transform-none", {"!transform rotate-180 fill-blue-500": childMenuActive})}
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
          <Link className="hover:bg-gray-200 lg:px-3 lg:py-1 my-4 lg:mt-0 py-4 rounded-md transition-all ease-in duration-400 flex gap-1 items-center" href={navItem.link}>
            {navItem.title}
          </Link>
        )}
        <div className="bg-gradient-to-r from-gray-300 to-transparent h-[1px] opacity-70 lg:hidden"></div>
      </div>

      {navItem.hasChildren && (
        <div
          className={combineClass("absolute inset-0 backdrop-blur-md lg:bg-gray-100/70 bg-gray-100 hidden top-0 lg:py-28 py-16 min-h-fit h-full lg:h-auto lg:-z-10", {
            block: childMenuActive,
          })}
        >
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-gray-300 to-transparent h-[1px] mb-7 opacity-70 hidden lg:block"></div>
            <div className="lg:hidden flex gap-2 text-gray-500 text-xl mb-7" onClick={() => setChildMenuActive(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-gray-500">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              <p>{navItem.title}</p>
            </div>

            <div className={combineClass("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8")}>
              {navItem.children?.map((childNav: any, indexChildNav: number) => (
                <div key={indexChildNav}>
                  <NavChild key={indexChildNav} childNav={childNav} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
