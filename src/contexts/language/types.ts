
export type Language = 'en' | 'fr' | 'ar';
export type Theme = 'dark' | 'light';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
}

export interface TranslationsType {
  [key: string]: {
    [key: string]: string;
  };
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}
