
import React, { createContext, useContext } from "react";
import { LanguageContextType, LanguageProviderProps } from "./types";
import { useLanguageProvider } from "./useLanguageProvider";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const languageValues = useLanguageProvider();

  return (
    <LanguageContext.Provider value={languageValues}>
      <div dir={languageValues.direction} className={languageValues.language === "ar" ? "rtl font-ar" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
