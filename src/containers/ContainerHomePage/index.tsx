import {Button} from "@/components/Atoms/Button";
import {Link} from "@/i18n/routing";
import React from "react";

export const HomePageContainer = ({t, locale}: any) => {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl">Home Page</h1>
        <h1>{t("title")}</h1>
        <Button text="selam" />
        <div>
          <Link href="/about">{t("description")}</Link>
        </div>
      </div>
      <div className="container mx-auto mt-20"></div>
    </>
  );
};
