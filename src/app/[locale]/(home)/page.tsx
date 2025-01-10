import {useLocale, useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {Params} from "@/types/general";
import {getTranslations} from "next-intl/server";
import {Button} from "@/components/Atoms/Button";
import {HomePageContainer} from "@/containers/ContainerHomePage";

export async function generateMetadata({params}: {params: Params}) {
  const {locale} = await params;

  const t = await getTranslations({locale, namespace: "HomePage"});

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  return <HomePageContainer locale={locale} t={t} />;
}
