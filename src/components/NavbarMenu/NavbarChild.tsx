import {Link} from "@/i18n/routing";
import React from "react";

export const NavbarChild = ({childNav}: any) => {
  return (
    <div>
      {childNav.title && <h5 className="font-normal text-gray-600">{childNav.title}</h5>}
      {childNav.description && <p className="text-gray-500 text-sm font-extralight">{childNav.description}</p>}
      {childNav.links && (
        <div className="flex flex-col gap-y-3 mt-6 items-baseline">
          {childNav.links.map((link: any, indexLink: number) => (
            <Link
              key={indexLink}
              href={link.href}
              className="flex items-center gap-x-2 px-2 py-1 rounded-md hover:gap-x-4 transition-all ease-in text-gray-600 hover:text-blue-500 hover:bg-gray-200"
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
