import {getCurrentQueries} from "@/helpers/getCurrentQueries";
import {routing, usePathname, useRouter} from "@/i18n/routing";
import React from "react";

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentQueries = getCurrentQueries();

  const changeLocale = (newLocale: string) => {
    router.push({pathname, query: currentQueries}, {locale: newLocale});
  };
  return (
    <>
      <div className="ml-auto flex gap-4">
        <p className="font-light border p-3">{routing.locales.toString()}</p>
        {routing.locales.map((l) => (
          <button key={l} onClick={() => changeLocale(l)}>
            {l}
          </button>
        ))}
      </div>
    </>
  );
};
