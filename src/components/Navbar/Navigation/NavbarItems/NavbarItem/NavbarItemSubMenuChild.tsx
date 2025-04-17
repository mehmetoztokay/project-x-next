import React from "react";
import { Link, usePathname } from "@/i18n/routing";

type props = {
  navbarItemSubMenuChild: any;
};

export const NavbarItemSubMenuChild: React.FC<props> = ({
  navbarItemSubMenuChild,
}) => {
  const pathname = usePathname(); // Aktif sayfanın yolunu alır.

  return (
    <div>
      {navbarItemSubMenuChild.title && (
        <h5 className="font-normal">{navbarItemSubMenuChild.title}</h5>
      )}
      {navbarItemSubMenuChild.description && (
        <p className="text-sm font-extralight">
          {navbarItemSubMenuChild.description}
        </p>
      )}
      {navbarItemSubMenuChild.links && (
        <div className="mt-6 flex flex-col items-baseline gap-y-3">
          {navbarItemSubMenuChild.links.map((link: any, indexLink: number) => {
            const isActive = pathname === link.href; // Aktif link kontrolü

            return (
              <Link
                key={indexLink}
                href={link.href}
                className={`flex items-center gap-x-2 rounded-md px-2 py-1 transition-all ease-in hover:gap-x-4 ${
                  isActive
                    ? "text-blue-500"
                    : "hover:bg-[#2d2d2d] hover:text-blue-500"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
