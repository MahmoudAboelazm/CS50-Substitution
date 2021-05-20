import React from "react";
import { useTranslation } from "react-i18next";
import GitHub from "../icons/GitHub";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      {t("repo_link")}

      <a
        href="https://github.com/MahmoudAboelazm/CS50-Substitution"
        aria-label="git"
        className="text-decoration-none"
        target="blank"
      >
        <GitHub />
      </a>
    </footer>
  );
};

export default Footer;
