import React, { createContext, useContext, useState } from "react";

// Create Language Context
const LanguageContext = createContext();

// Supported Languages
export const languages = [
    { code: "en-US", label: "English (US)" },
    { code: "ko", label: "한국어 (Korean)" },
    { code: "ja", label: "日本語 (Japanese)" },
    { code: "fr-FR", label: "Français (France)" },
    { code: "de-DE", label: "Deutsch (German)" },
    { code: "es-ES", label: "Español (España)" },
    { code: "pt-BR", label: "Português (Brasil)" },
];

// Language Context Provider
export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState("en"); 

    return (
        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, languages }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
