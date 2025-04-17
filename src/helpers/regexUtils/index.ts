export const regexOnlyLowercaseLetters = /^[^A-Z]*$/;

export const regexMail = /^[a-z0-9](\.?[a-z0-9_-])*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/;

export const regexOnlyLetters = /^[\p{L}]+(?:\s[\p{L}]+)*$/u;

export const regexPhoneCode = /^\+(\d{1,4})$/;

export const regexNoSpecialChars = /^[A-Za-z0-9]*$/;

export const regexAtLeastOneUpperCase = /[A-Z]/;

export const regexAtLeastOneLowerCase = /[a-z]/;

export const regexAtLeastOneNumber = /^(?=.*\d)[A-Za-z\d]*$/;

export const regexHTML = /<\/?[a-z][\s\S]*>/i;

export const regexURL = /^https?:\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;

// Control Regex
export const controlRegex = (regex: RegExp, value: string): boolean => {
  return regex.test(value);
};
