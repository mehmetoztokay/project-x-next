import React, {ReactNode} from "react";
import {Navbar} from "@/components/Navbar";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({children}: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <footer className="mt-[400px] bg-slate-600 py-5 text-white px-5">Footer</footer>
    </>
  );
};
