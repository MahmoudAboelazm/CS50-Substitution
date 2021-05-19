import Cookies from "js-cookie";

import { languages } from "../languages/languages";

export const keyValidation = (key: string) => {
  const currentLanguageCode = Cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  if (!currentLanguage) {
    return [false];
  }

  const { keyLetters, char_count } = currentLanguage;
  if (!key.trim().match(keyLetters)) {
    return ["bad_key"];
  }
  if (key.trim().length !== char_count) {
    return ["key_length", { char_count }];
  }
  let duplicatedChar = false;
  key
    .trim()
    .split("")
    .some((e, i, a) => (a.lastIndexOf(e) !== i ? (duplicatedChar = true) : ""));

  if (duplicatedChar) {
    return ["key_duplicated_char"];
  }
  return ["good_key"];
};
