import { useLocale } from "next-intl";
import { Link, LocaleItem } from "@/i18n/routing";
import { Params, TranslationT } from "@/types/general";
import { getTranslations } from "next-intl/server";
import { useTranslationsWithHTML } from "@/lib/hooks/useTranslationsWithHTML";
import { ContainerWhoWeAre } from "@/containers/ContainerWhoWeAre";

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;

  const t: TranslationT = await getTranslations({ locale, namespace: "WhoWeArePage" });

  return {
    title: t("title") as string,
    description: t("description") as string,
  };
}

export default function WhoWeArePage() {
  const locale = useLocale() as LocaleItem['locale'];
  
  const t: TranslationT = useTranslationsWithHTML("WhoWeArePage");

  return <ContainerWhoWeAre locale={locale} t={t} />;
}
