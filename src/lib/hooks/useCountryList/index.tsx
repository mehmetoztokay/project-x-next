export interface ICountry {
  alphaCode: string;
  countryName: string;
  phoneCountryLabel: string;
  countryCallingCode: string;
  flagUrl?: string;
  flagComponent?: React.FC<any>;
}
export interface ICountryCodeSelect {
  label: string;
  value: string;
  id: string;
  shortLabel?: string;
  icon?: any;
  phoneCode: string;
  iconIsComponent?: boolean;
}

export interface ICountrySelect {
  label: string;
  value: string;
  id: string;
}

import { LocaleItem, useCurrentSiteInfo } from "@/i18n/routing";
import countries from "i18n-iso-countries";
import { getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const excludeCountries = ["AQ", "BV", "TF", "HM", "PN", "GS", "UM"];

export const useCountryList = ({ locale, language }: { locale: LocaleItem["locale"]; language?: LocaleItem["shortLang"] }) => {
  if (language && !countries.getSupportedLanguages().includes(language)) language = "en";
  // If not supported lang return default en
  else
    language = countries.getSupportedLanguages().includes(useCurrentSiteInfo({ locale }).shortLang) ? useCurrentSiteInfo({ locale }).shortLang : "en";

  const getCountryList = async (): Promise<ICountry[]> => {
    try {
      const localeModule = await import(`i18n-iso-countries/langs/${language}.json`);
      localeModule && countries.registerLocale(localeModule.default);
    } catch (error) {
      console.warn(`Countries are not loaded for: ${language} lang.`, error);

      const defaultLocaleModule = await import(`i18n-iso-countries/langs/en.json`);
      defaultLocaleModule && countries.registerLocale(defaultLocaleModule.default);
    }

    const countryListObject = countries.getNames(language, {
      select: "official",
    });

    const countryList = Object.entries(countryListObject)
      // Exclude some coountries
      .filter(([alphaCode, countryName]) => !excludeCountries.includes(alphaCode))
      .map(([alphaCode, countryName]) => ({
        alphaCode,
        countryName,
        phoneCountryLabel: `+${getCountryCallingCode(alphaCode.toLocaleUpperCase() as "TR")} ${countryName}`,
        countryCallingCode: getCountryCallingCode(alphaCode.toLocaleUpperCase() as "TR"),
        flagUrl: `https://flagcdn.com/w320/${alphaCode.toLowerCase()}.png`,
        flagComponent: flags[alphaCode.toUpperCase() as "US"],
      }));

    return countryList;
  };

  const getFormattedCountryCodeSelectValues = async () => {
    const allCountries = await getCountryList();

    const formattedCountryCodeSelectValues = allCountries.map((country) => ({
      label: country.phoneCountryLabel,
      value: country.alphaCode,
      id: country.alphaCode,
      shortLabel: `+${country.countryCallingCode}`,
      icon: country.flagComponent,
      phoneCode: country.countryCallingCode,
      iconIsComponent: true,
    }));

    return formattedCountryCodeSelectValues;
  };

  const getFormattedCountrySelectValues = async () => {
    const allCountries = await getCountryList();

    const formattedCountrySelectValues = allCountries.map((country) => ({
      label: country.countryName,
      value: country.alphaCode,
      id: country.alphaCode,
      shortLabel: country.alphaCode,
      icon: country.flagComponent,
      iconIsComponent: true,
    }));

    return formattedCountrySelectValues;
  };

  return { getCountryList, getFormattedCountryCodeSelectValues, getFormattedCountrySelectValues };
};
