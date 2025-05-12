import { Button } from "@/components/Atoms/Button";
import { Link, LocaleItem } from "@/i18n/routing";
import React from "react";
import { TranslationT } from "@/types/general";
import { Regulation } from "./sections/GlobalyRegulation";
import { RegulationText } from "./sections/GlobalyRegulationText";

export const ContainerRegulations = ({ t, locale }: { t: TranslationT; locale: LocaleItem["locale"] }) => {
  return (
    <>
        <Regulation t={t}/>
        <RegulationText t={t} />
    </>
  );
};
