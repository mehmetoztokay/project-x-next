import { checkIsInIframe } from "@/helpers/checkInIframe";

export const getFullPageUrl = (): string => {
  if (typeof window === "undefined") return ""; // SSR için boş döndür

  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const parentUrl = urlParams.get("parentUrl");

  if (checkIsInIframe()) {
    return parentUrl ? parentUrl : `${currentUrl}&hasParent=true`;
  } else {
    return currentUrl;
  }
};
