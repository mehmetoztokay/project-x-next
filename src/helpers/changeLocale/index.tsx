import { Locale, locales, usePathname, useRouter } from "@/i18n/routing";
import { getCurrentQueries } from "@/helpers/getCurrentQueries";
import { useTransition } from "react";
import { useLocale } from "next-intl";

export const useChangeLocale = () => {
  const pathname = usePathname();
  const currentQueries = getCurrentQueries();
  const router = useRouter();
  const locale = useLocale();
  const [isPendingLocale, startTransitionLocale] = useTransition();

  // This function is not needed if you're not using RTL
  // Because it's handled by the `dir` attribute in the `html` tag

  // const updateDirection = (newLocale: Locale) => {
  //     const currentDirection = document.documentElement.getAttribute("dir");
  //     // Update direction if it's different from the current one
  //     const newDirection = locales.find((l) => l.locale === newLocale)?.direction;
  //     if (newDirection && newDirection !== currentDirection) {
  //         document.documentElement.setAttribute("dir", newDirection);
  //         console.log("Direction updated to:", newDirection);
  //     }
  // };

  const changeLocale = (newLocale: Locale, isPending?: boolean) => {
    if (newLocale === locale || isPending) return;

    startTransitionLocale(() => {
      router.replace(
        { pathname, query: currentQueries },
        { locale: newLocale },
      );
      // updateDirection(newLocale);
    });
  };

  return { changeLocale, isPendingLocale };
};
