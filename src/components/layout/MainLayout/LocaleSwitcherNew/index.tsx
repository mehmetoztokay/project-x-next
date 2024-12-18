"use client";
import { useLocale, useTranslations } from 'next-intl';
import React, { ChangeEvent, useEffect, useRef, useTransition } from 'react'
import { CountryFlag } from '../CountryFlag';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { getCurrentQueries } from '@/helpers/getCurrentQueries';
import { Spinner } from '@/components/Spinner';

export const LocaleSwitcherNew = () => {

    const t = useTranslations("Layout");
    const localeItems = t.raw("locales")

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const currentQueries = getCurrentQueries();

    const changeLocale = (newLocale: Locale) => {

        if (newLocale == locale || isPending) return

        startTransition(() => {
            router.replace({ pathname, query: currentQueries }, { locale: newLocale });
        });
    };

    // Handler for the dropdown menu
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // If the click is outside both the button and the dropdown, close the menu
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }

        };

        // Add the event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (


        <div className="relative inline-block text-left">
            {Object.keys(localeItems).every((locale: any) => typeof localeItems[locale] === "object") && (

                <>
                    <div className='flex items-center'>
                        <button type="button" onClick={() => setIsOpen(!isOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-inherit">
                                <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z" />
                            </svg>
                        </button>
                    </div>
                    <div ref={dropdownRef} className={isOpen ? "absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" : "hidden"} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="p-2 py-1" role="none">
                            {Object.keys(localeItems).map((localeItem: any) => (

                                <button disabled={isPending} onClick={() => changeLocale(localeItem)} key={localeItem} className={locale == localeItem ? "flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700 disabled:opacity-30 rounded-md bg-gray-200 my-1" : 'flex items-center gap-2 px-4 py-2 text-sm text-gray-700 disabled:opacity-30 rounded-md hover:bg-gray-100 my-1'} role="menuitem" tabIndex={-1}>
                                    <CountryFlag isoCode={localeItems[localeItem].isoCode} className="rounded-sm w-5" />
                                    <span>{localeItems[localeItem].title}</span>
                                </button>
                            ))}

                        </div>
                    </div>
                </>

                // <ul>
                //     
                // </ul>

            )}

        </div>
    )
}

