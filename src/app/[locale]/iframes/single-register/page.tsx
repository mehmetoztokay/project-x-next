import React from "react";
import { useTranslations } from "next-intl";
import { Params } from "@/types/general";
import { getTranslations } from "next-intl/server";
import { SingleRegisterForm } from "./SingleRegisterForm";

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "IframePages" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const RegisterFormPage = () => {
  return (
    <div className="h-full w-full">
      <SingleRegisterForm />
    </div>
  );
};

export default RegisterFormPage;
