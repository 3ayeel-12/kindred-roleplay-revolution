
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'ar';
export type Theme = 'dark' | 'light';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
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
    'darkMode': 'Dark Mode',
    'lightMode': 'Light Mode',
    'language': 'Language',
    'toggleTheme': 'Toggle Theme',
    'selectLanguage': 'Select Language',
    // Add more translations as needed
  },
  fr: {
    'home': 'Accueil',
    'about': 'À Propos',
    'howToPlay': 'Comment Jouer',
    'features': 'Fonctionnalités',
    'community': 'Communauté',
    'startPlaying': 'Commencer à Jouer',
    'darkMode': 'Mode Sombre',
    'lightMode': 'Mode Clair',
    'language': 'Langue',
    'toggleTheme': 'Changer de Thème',
    'selectLanguage': 'Choisir la Langue',
    // Add more translations as needed
  },
  ar: {
    'home': 'الرئيسية',
    'about': 'حول',
    'howToPlay': 'كيفية اللعب',
    'features': 'الميزات',
    'community': 'المجتمع',
    'startPlaying': 'ابدأ اللعب',
    'darkMode': 'الوضع الداكن',
    'lightMode': 'الوضع الفاتح',
    'language': 'اللغة',
    'toggleTheme': 'تبديل السمة',
    'selectLanguage': 'اختر اللغة',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check for saved preferences in localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light-mode', savedTheme === 'light');
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Simple translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
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
