import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const languages = [
  { code: "en", label: "English (US)" },
  { code: "ko", label: "Korean" },
  { code: "ja", label: "Japanese" },
  { code: "fr", label: "Français (France)" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español (España)" },
  { code: "pt", label: "Português (Brasil)" },
];

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en"); 

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
