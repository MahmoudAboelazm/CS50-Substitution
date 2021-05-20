import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import CopyBlock from "./CopyBlock";

const TestKeys = memo(() => {
  const { t } = useTranslation();
  const keys = t("test_keys", { returnObjects: true }) as [];
  return (
    <div className="test-keys text-center">
      <div className="wrapper">
        <span>{t("test_keys_title")}</span>
        <div className="keys">
          <div className="layer">
            {keys.map((k, i) => (
              <CopyBlock key={k} Name={"key" + i} value={k} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestKeys;
