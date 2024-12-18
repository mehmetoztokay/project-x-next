import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {Params} from "@/types/general";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({params}: {params: Params}) {
  const {locale} = await params;

  const t = await getTranslations({locale, namespace: "HomePage"});

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("description")}</Link>
    </div>
  );
}
