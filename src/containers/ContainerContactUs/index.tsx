import { Button } from "@/components/Atoms/Button";
import { Link, LocaleItem } from "@/i18n/routing";
import React from "react";
import { TranslationT } from "@/types/general";
import { ContactUs } from "./sections/ContactUs";

export const ContainerContactUs = ({ t, locale }: { t: TranslationT; locale: LocaleItem["locale"] }) => {
  return (
    <>
        <ContactUs t={t} />
    </>
  );
};
