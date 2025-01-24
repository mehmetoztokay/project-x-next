export const normalizeText = (text: string) => {
  return text.toLowerCase().replace(/[ç]/g, "c").replace(/[ğ]/g, "g").replace(/[ı]/g, "i").replace(/[ö]/g, "o").replace(/[ş]/g, "s").replace(/[ü]/g, "u");
};
