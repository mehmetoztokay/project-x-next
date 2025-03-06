import React from "react";
import { Params } from "@/types/general";
import { getTranslations } from "next-intl/server";
import { useTranslationsWithHTML } from "@/hooks/useTranslationsWithHTML";
// import { FormArea } from "./FormArea";

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const RegisterFormPage = () => {
  const t = useTranslationsWithHTML("AboutPage");
  return <div className="h-full w-full">{/* <FormArea /> */}</div>;
};

export default RegisterFormPage;
