import { Link } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"
import React from "react"
import { NavbarChild } from "./NavbarChild"
import { NavItem } from "./NavItem"

export const NavbarMenu = () => {
    const t = useTranslations("Layout")

    return (
        <div className="relative z-10 select-none">
            <div className="container mx-auto flex justify-between">
                <div className="flex items-center gap-10 py-4">
                    <div className="font-bold text-xl">Logo</div>
                    {!t.raw("navs.isNull") &&
                        <nav>
                            <div className="flex gap-10">
                                {t.raw("navs.navItems").map((navItem: any, indexNav: number) => (
                                    <NavItem key={indexNav} navItem={navItem} />
                                ))}
                            </div>
                        </nav>
                    }
                </div>
            </div>
        </div>
    )
}

