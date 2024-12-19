"use client"
import React from 'react'
import { NavbarChild } from "./NavbarChild"
import { combineClass } from "@/helpers/development/combineClass"

export const NavItem = ({ navItem }: any) => {
    const [isOpenNavItem, setIsOpenNavItem] = React.useState(false)
    const navItemRef = React.useRef<HTMLDivElement>(null)

    // if click outside the dropdown, close the dropdown
    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (navItemRef.current && !navItemRef.current.contains(event.target)) {
                setIsOpenNavItem(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div ref={navItemRef}>
            <button onClick={() => setIsOpenNavItem(!isOpenNavItem)} className={
                combineClass("hover:bg-gray-200 px-3 py-1 rounded-md transition-all duration-100",
                    {
                        "bg-gray-200": isOpenNavItem,
                    })}>{navItem.title}</button>
            {navItem.hasChildren && isOpenNavItem && (
                <div className="absolute top-0 left-0 backdrop-blur-md bg-gray-100/30 inset-0 -z-10 pt-20 pb-16 h-fit border-b-2 border-b-gray-300">
                    <div className="container relative mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-8 gap-y-14">
                        <button onClick={() => setIsOpenNavItem(false)} className="absolute right-[15] top-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.3002 5.70998C18.2077 5.61728 18.0978 5.54373 17.9768 5.49355C17.8559 5.44337 17.7262 5.41754 17.5952 5.41754C17.4643 5.41754 17.3346 5.44337 17.2136 5.49355C17.0926 5.54373 16.9827 5.61728 16.8902 5.70998L12.0002 10.59L7.11022 5.69998C7.01764 5.6074 6.90773 5.53396 6.78677 5.48385C6.6658 5.43375 6.53615 5.40796 6.40522 5.40796C6.27429 5.40796 6.14464 5.43375 6.02368 5.48385C5.90272 5.53396 5.79281 5.6074 5.70022 5.69998C5.60764 5.79256 5.5342 5.90247 5.4841 6.02344C5.43399 6.1444 5.4082 6.27405 5.4082 6.40498C5.4082 6.53591 5.43399 6.66556 5.4841 6.78652C5.5342 6.90749 5.60764 7.0174 5.70022 7.10998L10.5902 12L5.70022 16.89C5.60764 16.9826 5.5342 17.0925 5.4841 17.2134C5.43399 17.3344 5.4082 17.464 5.4082 17.595C5.4082 17.7259 5.43399 17.8556 5.4841 17.9765C5.5342 18.0975 5.60764 18.2074 5.70022 18.3C5.79281 18.3926 5.90272 18.466 6.02368 18.5161C6.14464 18.5662 6.27429 18.592 6.40522 18.592C6.53615 18.592 6.6658 18.5662 6.78677 18.5161C6.90773 18.466 7.01764 18.3926 7.11022 18.3L12.0002 13.41L16.8902 18.3C16.9828 18.3926 17.0927 18.466 17.2137 18.5161C17.3346 18.5662 17.4643 18.592 17.5952 18.592C17.7262 18.592 17.8558 18.5662 17.9768 18.5161C18.0977 18.466 18.2076 18.3926 18.3002 18.3C18.3928 18.2074 18.4662 18.0975 18.5163 17.9765C18.5665 17.8556 18.5922 17.7259 18.5922 17.595C18.5922 17.464 18.5665 17.3344 18.5163 17.2134C18.4662 17.0925 18.3928 16.9826 18.3002 16.89L13.4102 12L18.3002 7.10998C18.6802 6.72998 18.6802 6.08998 18.3002 5.70998Z" fill="black" />
                            </svg>
                        </button>
                        {navItem.children?.map((childNav: any, indexChildNav: number) => (
                            <NavbarChild key={indexChildNav} childNav={childNav} isOpenNavItem={isOpenNavItem} setIsOpenNavItem={setIsOpenNavItem} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}