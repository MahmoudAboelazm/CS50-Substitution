import React, { memo } from "react";
import { useTranslation } from "react-i18next";

interface props {
  setConvertToCipher: Function;
  converToCipher: boolean;
}

const Header: React.FC<props> = memo(
  ({ setConvertToCipher, converToCipher }) => {
    console.log("rendered");
    const { t } = useTranslation();
    return (
      <header className="col col-lg-6 col-12 mb-2">
        <h1 className="font-weight-normal">{t("title")}</h1>
        <p>{t("brief")}</p>
        <button
          type="button"
          className="btn btn-custom"
          onClick={() => setConvertToCipher((c: any) => !c)}
        >
          {converToCipher ? t("convert_to_plain") : t("convert_to_cipher")}
        </button>
      </header>
    );
  },
);

export default Header;
