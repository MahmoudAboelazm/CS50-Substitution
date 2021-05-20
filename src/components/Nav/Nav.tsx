import i18next from "i18next";
import Cookies from "js-cookie";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import GlobeIcon from "../../icons/GlobeIcon";
import { languages } from "../../languages/languages";

const Nav = memo(() => {
  const { t } = useTranslation();
  const currentLanguageCode = Cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.body.dir = currentLanguage!.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);
  return (
    <nav className="">
      <div className="language-select">
        <div className="d-flex justify-content-end align-items-center language-select-root">
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <GlobeIcon />
            </button>
            <ul
              className="dropdown-menu "
              style={{ textAlign: "unset" }}
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <span className="dropdown-item-text">{t("language")}</span>
              </li>
              {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <button
                    className={"dropdown-item"}
                    onClick={() => {
                      i18next.changeLanguage(code);
                    }}
                  >
                    <span
                      className={`flag-icon flag-icon-${country_code} mx-2`}
                    ></span>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Nav;
