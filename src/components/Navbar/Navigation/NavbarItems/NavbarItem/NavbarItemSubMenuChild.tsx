import React from "react";
import {Link} from "@/i18n/routing";

type props = {
  navbarItemSubMenuChild: any;
};

export const NavbarItemSubMenuChild: React.FC<props> = ({navbarItemSubMenuChild}) => {
  return (
    <div>
      {navbarItemSubMenuChild.title && <h5 className="font-normal">{navbarItemSubMenuChild.title}</h5>}
      {navbarItemSubMenuChild.description && <p className="text-sm font-extralight">{navbarItemSubMenuChild.description}</p>}
      {navbarItemSubMenuChild.links && (
        <div className="flex flex-col gap-y-3 mt-6 items-baseline">
          {navbarItemSubMenuChild.links.map((link: any, indexLink: number) => (
            <Link
              key={indexLink}
              href={link.href}
              className="flex items-center gap-x-2 px-2 py-1 rounded-md hover:gap-x-4 transition-all ease-in hover:text-blue-500 hover:bg-gray-200"
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
