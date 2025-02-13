import React, { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <footer className="mt-[400px] bg-slate-600 px-5 py-5 text-white">
        Footer
      </footer>
    </>
  );
};
