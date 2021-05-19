import Cookies from "js-cookie";
import { languages } from "../languages/languages";

interface props {
  reverse?: boolean;
  plainText: string;
  key: string;
  cipherText: string;
}

export const charSubtitution = ({
  plainText,
  key,
  cipherText,
  reverse,
}: props) => {
  const currentLanguageCode = Cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  if (!currentLanguage) {
    return false;
  }

  const { keyLetters, characters } = currentLanguage;

  let ABC = characters;
  let cipherKey = key;
  let text = plainText;

  if (reverse) {
    ABC = key.toUpperCase();
    cipherKey = characters;
    text = cipherText;
  }

  let c = "";
  for (let i = 0; i < text.length; i++) {
    for (let k = 0; k < ABC.length; k++) {
      if (text[i] === ABC[k]) {
        if (cipherKey[k] !== ABC[k]) {
          c += cipherKey[k].toUpperCase();
          break;
        }
        c += cipherKey[k];
        break;
      }
      if (text[i] === ABC[k].toLowerCase()) {
        c += cipherKey[k].toLowerCase();
        break;
      }

      if (!text[i].match(keyLetters)) {
        c += text[i];
        break;
      }
      if (text[i].match(keyLetters) && ABC.indexOf(text[i].toUpperCase()) < 0) {
        c += text[i];
        break;
      }
    }
  }
  document.getElementsByClassName("text")[0].innerHTML = c;
};
