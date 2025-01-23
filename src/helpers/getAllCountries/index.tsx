import allCountries from "@/data/CountriesMultiLanguage/all-countries.json";
import { getCountryCallingCode } from "react-phone-number-input";

const excludeCountries = ["AQ", "BV", "TF", "HM", "PN", "GS", "UM"];

export const getAllCountries = (language: string = "en") => {
    return allCountries.filter((country: any) => !excludeCountries.includes(country.alpha2.toUpperCase()))
        .map((country: any) => {
            return {
                label: "+" + getCountryCallingCode(country.alpha2.toUpperCase()) + " " + (country[language] || country.en),
                value: country.alpha2.toUpperCase(),
                shortLabel: "+" + getCountryCallingCode(country.alpha2.toUpperCase()),
                id: country.id,
                icon: "https://flagcdn.com/w320/" + country.alpha2.toLowerCase() + ".png",
            };
        });
};