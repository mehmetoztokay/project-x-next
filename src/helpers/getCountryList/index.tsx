import countries from "i18n-iso-countries";
import {getCountryCallingCode} from "react-phone-number-input";

const excludeCountries = ["AQ", "BV", "TF", "HM", "PN", "GS", "UM"];

export const getCountryList = async (language: string = "en", forMobilePhone: boolean = false) => {
  // If not supported lang return default en
  if (!countries.getSupportedLanguages().includes(language)) language = "en";

  try {
    const localeModule = await import(`i18n-iso-countries/langs/${language}.json`);
    countries.registerLocale(localeModule.default);
  } catch (error) {
    console.error(`Countries are not loaded for: ${language} lang.`, error);
  }

  const countryListObject = countries.getNames(language, {select: "official"});

  if (!forMobilePhone) return countryListObject;

  // Else
  const countryList = Object.entries(countryListObject)
    .filter(([alphaCode, countryName]) => !excludeCountries.includes(alphaCode))
    .map(([alphaCode, countryName]) => ({
      phoneCountryLabel: `+${getCountryCallingCode(alphaCode.toLocaleUpperCase() as "TR")} ${countryName}`,
      countryCallingCode: getCountryCallingCode(alphaCode.toLocaleUpperCase() as "TR"),
      alphaCode,
      flagUrl: `https://flagcdn.com/w320/${alphaCode.toLowerCase()}.png`,
      countryData: {[alphaCode]: countryName},
    }));

  return countryList;
};
