import React from "react";
import { Params } from "@/types/general";
import { getTranslations } from "next-intl/server";
import { useTranslationsWithHTML } from "@/hooks/useTranslationsWithHTML";

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const AboutPage = () => {
  const t = useTranslationsWithHTML("AboutPage");
  const t2 = useTranslationsWithHTML("Forms");
  return <div>{t("title")}</div>;
};

export default AboutPage;
