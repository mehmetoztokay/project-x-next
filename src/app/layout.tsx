import { Viewport } from "next";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Update Favicon
export const metadata = {
  icons: {
    icon: "/assets/icons/layout/favicon.png",
    apple: "/assets/icons/layout/favicon.png",
    android: "/assets/icons/layout/favicon.png",
  },
};

export const viewport: Viewport = {
  userScalable: false,
  colorScheme: "light",
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
