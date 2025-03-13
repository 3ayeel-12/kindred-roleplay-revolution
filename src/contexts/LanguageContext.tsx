
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Simple translation object
const translations = {
  en: {
    'home': 'Home',
    'about': 'About',
    'howToPlay': 'How to Play',
    'features': 'Features',
    'community': 'Community',
    'startPlaying': 'Start Playing',
    // Add more translations as needed
  },
  fr: {
    'home': 'Accueil',
    'about': 'À Propos',
    'howToPlay': 'Comment Jouer',
    'features': 'Fonctionnalités',
    'community': 'Communauté',
    'startPlaying': 'Commencer à Jouer',
    // Add more translations as needed
  },
  ar: {
    'home': 'الرئيسية',
    'about': 'حول',
    'howToPlay': 'كيفية اللعب',
    'features': 'الميزات',
    'community': 'المجتمع',
    'startPlaying': 'ابدأ اللعب',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  // Simple translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'rtl' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
