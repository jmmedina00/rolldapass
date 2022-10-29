import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageChanger = () => {
  const { t, i18n } = useTranslation("settings");
  const languages = i18n.options.preload as string[];
  const currentLang = i18n.language;

  const handleClick = () => {
    const newIndex = (languages.indexOf(currentLang) + 1) % languages.length;

    i18n.changeLanguage(languages[newIndex]);
  };

  return <MenuItem onClick={handleClick}>Language: English</MenuItem>;
};

export default LanguageChanger;
