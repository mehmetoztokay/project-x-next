import {useLocale, useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {Params} from "@/types/general";
import {getTranslations} from "next-intl/server";
import {Button} from "@/components/Atoms/Button";

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
  return (
    <div className="container mx-auto bg-slate-500">
      <h1 className="text-3xl">Home Page</h1>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("description")}</Link>
      <div className="container mx-auto">
        <div className="my-7"></div>
        <div className="mt-14">
          Current Locale: <b>{locale}</b>
        </div>
        <div className="mb-5 border py-4 px-4 font-bold flex gap-4 items-center">
          <Button text="selam" />
          <Link href="/">Home</Link>
          <Link href="/about">About Page</Link>
        </div>
      </div>
    </div>
  );
}
