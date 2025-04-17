import React, { ReactNode } from "react";
import { MainLayout } from "../MainLayout";
import { DefaultLayout } from "../DefaultLayout";

type Props = {
  children: ReactNode;
  isIframeLayout?: boolean;
};

export const ControlLayout = ({ children, isIframeLayout }: Props) => {
  return (
    <>
      {!isIframeLayout ? (
        <MainLayout>{children}</MainLayout>
      ) : (
        <DefaultLayout>{children}</DefaultLayout>
      )}
    </>
  );
};
