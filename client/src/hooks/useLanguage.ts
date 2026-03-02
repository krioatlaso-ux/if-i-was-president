// ============================================================
// useLanguage Hook
// Dil yönetimi ve çeviri desteği
// ============================================================

import { useTranslation } from "react-i18next";
import { useCallback } from "react";

export function useLanguage() {
  const { i18n, t } = useTranslation();

  const changeLanguage = useCallback(
    (lang: "tr" | "en") => {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    },
    [i18n]
  );

  const currentLanguage = (i18n.language || "tr") as "tr" | "en";

  return {
    t,
    currentLanguage,
    changeLanguage,
    availableLanguages: ["tr", "en"] as const,
  };
}
