import React, {useEffect, useRef, useState, useTransition} from "react";
import {useLocale, useTranslations} from "next-intl";
import {CountryFlag} from "../CountryFlag";
import {Locale, usePathname, useRouter} from "@/i18n/routing";
import {getCurrentQueries} from "@/helpers/getCurrentQueries";
import {combineClass} from "@/helpers/development/combineClass";

export const LocaleSwitcher = () => {
  const t = useTranslations("Layout");
  const localeItems = t.raw("locales");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const currentQueries = getCurrentQueries();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLocale = (newLocale: Locale) => {
    if (newLocale === locale || isPending) return;

    startTransition(() => {
      router.replace({pathname, query: currentQueries}, {locale: newLocale});
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      {Object.keys(localeItems).every((key) => typeof localeItems[key] === "object") && (
        <div ref={dropdownRef}>
          <div className="flex items-center">
            <button type="button" onClick={() => setIsOpen((prev) => !prev)} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-gray-300">
                <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z" />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div
              className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-[#1a1a1a] shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              tabIndex={-1}
            >
              <div className="p-2 py-1" role="none">
                {Object.keys(localeItems).map((localeItem: any) => (
                  <button
                    key={localeItem}
                    disabled={isPending}
                    onClick={() => changeLocale(localeItem)}
                    className={combineClass(
                      "flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-200 hover:text-gray-700 disabled:opacity-30 rounded-md my-1 text-nowrap",
                      {
                        "bg-gray-200 text-gray-700": locale === localeItem && !isPending,
                      }
                    )}
                    role="menuitem"
                    tabIndex={-1}
                  >
                    <CountryFlag isoCode={localeItems[localeItem].flag} className="rounded-sm w-5" />
                    <span>{localeItems[localeItem].title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
