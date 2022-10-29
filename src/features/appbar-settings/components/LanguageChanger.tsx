import { MenuItem } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageChanger = () => {
  const { t, i18n } = useTranslation("settings");
  const languages = i18n.options.preload as string[];
  const currentLang = i18n.language;

  const handleClick = () => {
    const newIndex = (languages.indexOf(currentLang) + 1) % languages.length;

    i18n.changeLanguage(languages[newIndex]);
  };

  useEffect(() => {
    if (currentLang.indexOf("-") === -1) {
      return;
    }

    const [actualLang] = currentLang.split("-");
    i18n.changeLanguage(actualLang);
  }, [currentLang]);

  return <MenuItem onClick={handleClick}>Language: English</MenuItem>;
};

export default LanguageChanger;
