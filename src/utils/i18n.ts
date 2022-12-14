import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ["config", "notification", "passgen", "promotion", "settings"],
    preload: ["en", "es"],
    fallbackLng: "en",
    debug: false,
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
