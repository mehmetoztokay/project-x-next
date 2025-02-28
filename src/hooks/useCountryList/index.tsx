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

import countries from "i18n-iso-countries";
import { getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const excludeCountries = ["AQ", "BV", "TF", "HM", "PN", "GS", "UM"];

export const useCountryList = () => {
  const getCountryList = async (language: string = "en"): Promise<ICountry[]> => {
    // If not supported lang return default en
    if (!countries.getSupportedLanguages().includes(language)) language = "en";

    try {
      const localeModule = await import(`i18n-iso-countries/langs/${language}.json`);
      countries.registerLocale(localeModule.default);
    } catch (error) {
      console.error(`Countries are not loaded for: ${language} lang.`, error);
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

  const getFormattedCountryCodeSelectValues = async (lang: string = "en") => {
    const allCountries = await getCountryList(lang);

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

  const getFormattedCountrySelectValues = async (lang: string = "en") => {
    const allCountries = await getCountryList(lang);

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
