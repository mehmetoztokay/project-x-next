import { useLocale } from "next-intl";
import { Link, LocaleItem } from "@/i18n/routing";
import { Params, TranslationT } from "@/types/general";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/Atoms/Button";
import { HomePageContainer } from "@/containers/ContainerHomePage";
import { useTranslationsWithHTML } from "@/lib/hooks/useTranslationsWithHTML";

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;

  const t: TranslationT = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: t("title") as string,
    description: t("description") as string,
  };
}

export default function HomePage() {
  const locale = useLocale() as LocaleItem['locale'];
  
  const t: TranslationT = useTranslationsWithHTML("HomePage");

  return <HomePageContainer locale={locale} t={t} />;
}
