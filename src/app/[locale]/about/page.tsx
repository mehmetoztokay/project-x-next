import React from "react";
import {useTranslations} from "next-intl";
import {Params} from "@/types/general";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({params}: {params: Params}) {
  const {locale} = await params;

  const t = await getTranslations({locale, namespace: "AboutPage"});

  return {
    title: t("title"),
    description: t("description"),
  };
}

const AboutPage = () => {
  const t = useTranslations("AboutPage");
  return <div>{t("title")}</div>;
};

export default AboutPage;
