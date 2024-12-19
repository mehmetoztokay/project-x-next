import { Link } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"
import React from "react"
import { NavbarChild } from "./NavbarChild"
import { NavItem } from "./NavItem"

export const NavbarMenu = () => {
    const t = useTranslations("Layout")
    const navs = t.raw("navs")
    // const locale = useLocale()
    console.log(navs);

    return (
        <div className="relative z-10 select-none">
            <div className="container mx-auto flex justify-between">
                <div className="flex items-center gap-10 py-4">
                    <div className="font-bold text-xl">Logo</div>
                    <nav>
                        <div className="flex gap-10">
                            {navs.map((navItem: any, indexNav: number) => (
                                <NavItem key={indexNav} navItem={navItem} />
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

