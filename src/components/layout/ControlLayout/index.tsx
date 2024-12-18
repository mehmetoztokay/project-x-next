import React, {ReactNode} from "react";
import {MainLayout} from "../MainLayout";

type Props = {
  children: ReactNode;
};

export const ControlLayout = ({children}: Props) => {
  return <>{0 < 1 ? <MainLayout>{children}</MainLayout> : <p>Another layout</p>}</>;
};
