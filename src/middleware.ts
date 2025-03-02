import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(olmayan-dil|cn|id|id-en|afr|int|int-jp|int-th|int-kr|int-tw|int-ph|int-pk|int-es|int-in|tr|es|it|fr|de|en)/:path*"],
};
