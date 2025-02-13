// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

import CoreLayout from "@/components/layout/CoreLayout";
import { routing } from "@/i18n/routing";

export default function GlobalNotFound() {
  return (
    <CoreLayout locale={routing.defaultLocale}>
      <p className="text-xl text-red-500">Page not found</p>
    </CoreLayout>
  );
}
