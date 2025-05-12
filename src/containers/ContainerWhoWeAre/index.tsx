import { Button } from "@/components/Atoms/Button";
import { Link, LocaleItem } from "@/i18n/routing";
import React from "react";
import { TranslationT } from "@/types/general";
import {  WhoWeAre } from "./sections/WhoWeAre";

export const ContainerWhoWeAre = ({ t, locale }: { t: TranslationT; locale: LocaleItem["locale"] }) => {
  return (
    <>
        <WhoWeAre t={t} />
    </>
  );
};
