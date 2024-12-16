import React from "react";
import {useTranslations} from "next-intl";

const AboutPage = () => {
  const t = useTranslations("HomePage");
  return <div>{t("aboutTitle")}</div>;
};

export default AboutPage;
