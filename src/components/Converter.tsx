import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { charSubtitution } from "../utils/charSubstitution";
import { keyValidation } from "../utils/keyValidation";
import CopyBlock from "./CopyBlock";
import Input from "./Input/Input";
import TestKeys from "./TestKeys";

interface props {
  converToCipher: Boolean;
}

const Converter: React.FC<props> = ({ converToCipher }) => {
  const query = window.location;

  const [key, setKey] = useState("");
  const [plainText, setPlaintext] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [error, setError] = useState("");

  const handleKeyValidation = (e: Event) => {
    e.preventDefault();
    const v = keyValidation(key);
    setError(t(v[0] as string, v[1] as object));
  };

  const handleCharSubtitution = (reverse: boolean, e: Event) => {
    e.preventDefault();
    charSubtitution({ key, cipherText, reverse, plainText });
  };

  const generateLink = () => {
    document.getElementsByClassName("generated-link")[0].innerHTML =
      query.host + "/?" + key;
  };

  useEffect(() => {
    const k = decodeURIComponent(query.search.slice(1));

    if (k) {
      const validateKeyLink = keyValidation(k);
      if (t(validateKeyLink[0] as string) === "valide") {
        setKey(k);
        setError("valide");
      }
    }
  }, []);

  const { t } = useTranslation();
  return (
    <section className="col col-lg-6 col-12  converter">
      <form onSubmit={(e) => handleKeyValidation(e as any)}>
        <Input
          label={t("key")}
          onChange={(e: any) => setKey(e.target.value)}
          value={key}
          onBlur={(e) => handleKeyValidation(e as any)}
          placeholder={t("placeholder_key")}
        />
        {error && error !== "valide" && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {error !== "valide" && (
          <>
            <TestKeys />
            <div className="d-flex flex-row-reverse">
              <button
                type="submit"
                className="btn btn-custom"
                onClick={(e) => handleKeyValidation(e as any)}
              >
                {t("next")}
              </button>
            </div>
          </>
        )}
      </form>
      {error === "valide" && (
        <>
          <form
            onSubmit={(e) => handleCharSubtitution(!converToCipher, e as any)}
          >
            {converToCipher ? (
              <Input
                label={t("plaintext")}
                value={plainText}
                onChange={(e: any) => setPlaintext(e.target.value)}
              />
            ) : (
              <Input
                label={t("ciphertext")}
                value={cipherText}
                onChange={(e: any) => setCipherText(e.target.value)}
              />
            )}
            <div className="d-flex flex-row-reverse mb-2">
              <button
                type="submit"
                className="btn btn-custom"
                onClick={(e) =>
                  handleCharSubtitution(!converToCipher, e as any)
                }
              >
                {t("convert")}
              </button>
            </div>
          </form>

          <CopyBlock Name="text" />
          <div className="d-flex justify-content-center mt-4 mb-2">
            <button onClick={generateLink} className="btn btn-custom">
              {t("generate_link")}
            </button>
          </div>
          <CopyBlock Name={"generated-link"} />
        </>
      )}
    </section>
  );
};

export default Converter;
