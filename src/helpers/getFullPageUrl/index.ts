import { useState, useEffect } from "react";
import { checkIsInIframe } from "@/helpers/checkInIframe";

export const useFullPageUrl = (): string => {
  const [fullPageUrl, setFullPageUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(window.location.search);
      const parentUrl = urlParams.get("parentUrl");

      // If the page is inside an iframe
      if (checkIsInIframe()) {
        // If parentUrl is available, return it
        if (parentUrl) {
          setFullPageUrl(parentUrl);
        } else {
          // If inside iframe but no parentUrl is present, return the current URL with the `hasParent=true` parameter
          setFullPageUrl(`${currentUrl}&hasParent=true`);
        }
      } else {
        // If not inside an iframe, return the current URL as is
        setFullPageUrl(currentUrl);
      }
    }
  }, []); // Only run once on mount

  return fullPageUrl;
};
