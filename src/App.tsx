import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "./components/Input/Input";
import Nav from "./components/Nav/Nav";
import { charSubtitution } from "./utils/charSubstitution";
import { keyValidation } from "./utils/keyValidation";

export default function App() {
  const query = window.location;

  const [key, setKey] = useState("");
  const [plainText, setPlaintext] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [error, setError] = useState("");
  const [converToCipher, setConvertToCipher] = useState(true);
  const handleKeyValidation = () => {
    const k = keyValidation(key);
    setError(t(k[0] as string, k[1] as object));
  };
  const handleCharSubtitution = (reverse: boolean) =>
    charSubtitution({ key, cipherText, reverse, plainText });

  const { t } = useTranslation();

  return (
    <div className="container">
      <Nav />
      <main className="row justify-content-lg-center">
        <header className="col col-lg-6 col-12 mb-2">
          <h1 className="font-weight-normal">{t("title")}</h1>
          <p>{t("brief")}</p>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => setConvertToCipher((c) => !c)}
          >
            {converToCipher
              ? "Convert To Plain Text"
              : "Convert To Cipher Text"}
          </button>
        </header>
        <section className="col col-lg-6 col-12  converter">
          <Input
            label={t("key")}
            onChange={(e: any) => setKey(e.target.value)}
            value={key}
            onBlur={() => handleKeyValidation()}
          />
          {error && error !== "valide" && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {error !== "valide" && (
            <div className="d-flex flex-row-reverse">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleKeyValidation()}
              >
                Next
              </button>
            </div>
          )}
          {error === "valide" && (
            <>
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
              <div className="d-flex flex-row-reverse">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => handleCharSubtitution(!converToCipher)}
                >
                  Convert
                </button>
              </div>
              <p className="text mt-4"></p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
