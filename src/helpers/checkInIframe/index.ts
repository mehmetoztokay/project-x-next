export const checkIsInIframe = (): boolean => {
  // Control SSR
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch (e) {
    // If has a Cross Origin Error, return true
    return true;
  }
};
