"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/store";
import { ControlLayout } from "../ControlLayout";

export const StoreProvider = ({ children, isIframeLayout }: { children: React.ReactNode; isIframeLayout?: boolean }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }

  return (
    <Provider store={storeRef.current}>
      <ControlLayout children={children} isIframeLayout={isIframeLayout} />
    </Provider>
  );
};
