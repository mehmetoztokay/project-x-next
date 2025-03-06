/**
 * `useTranslationsWithHTML` Hook'u, çeviri anahtarları içinde '_isHTML' varsa
 * bu anahtarların değerlerini `dangerouslySetInnerHTML` ile işleyerek HTML içeriği olarak render eder.
 * Eğer çeviri anahtarının içinde '_isHTML' bulunmazsa, normal metin döndürülür.
 *
 * Bu hook, aynı zamanda `raw`, `rich`, `markup` gibi `next-intl`'in sunduğu diğer metodları da
 * barındırır ve `t` fonksiyonunun işlevselliğini genişletir.
 */

import { useTranslations as originalUseTranslations } from "next-intl";
import React from "react";

export const useTranslationsWithHTML = (namespace: string) => {
  const t = originalUseTranslations(namespace);

  const tExtended = (key: string): string | React.ReactNode => {
    // Eğer anahtarın çevirisi yoksa, direkt olarak key'i döndür
    if (!t.has(key)) {
      return key; // Çeviri bulunamazsa, key döndürülür
    }

    // Eğer çeviri anahtarının sonunda '_isHTML' varsa, raw HTML içerik alalım
    if (key.includes("_isHTML")) {
      return <div dangerouslySetInnerHTML={{ __html: t.raw(key) }} />;
    }

    // Normal metin döndürülür
    return t(key);
  };

  // Raw, Rich gibi metodları burada direkt olarak sağlıyoruz
  tExtended.raw = t.raw;
  tExtended.rich = t.rich;
  tExtended.markup = t.markup;
  tExtended.has = t.has;

  return tExtended;
};
