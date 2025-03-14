
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'ar';
export type Theme = 'dark' | 'light';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Enhanced translation object with more keys
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
    'techSupport': 'Technical Support',
    'contactUs': 'Contact Us',
    'welcomeMessage': 'Welcome to KindreD - A New Gaming Experience',
    'exploreWorld': 'Explore a Magical World of Adventures',
    'joinCommunity': 'Join Our Community Today',
    'learnMore': 'Learn More',
    'notFound': 'Page Not Found',
    'backToHome': 'Back to Home',
    'privacyPolicy': 'Privacy Policy',
    'termsOfService': 'Terms of Service',
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
    'techSupport': 'Support Technique',
    'contactUs': 'Contactez-Nous',
    'welcomeMessage': 'Bienvenue à KindreD - Une Nouvelle Expérience de Jeu',
    'exploreWorld': 'Explorez un Monde Magique d\'Aventures',
    'joinCommunity': 'Rejoignez Notre Communauté Aujourd\'hui',
    'learnMore': 'En Savoir Plus',
    'notFound': 'Page Non Trouvée',
    'backToHome': 'Retour à l\'Accueil',
    'privacyPolicy': 'Politique de Confidentialité',
    'termsOfService': 'Conditions d\'Utilisation',
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
    'techSupport': 'الدعم الفني',
    'contactUs': 'اتصل بنا',
    'welcomeMessage': 'مرحبًا بك في كيندرد - تجربة ألعاب جديدة',
    'exploreWorld': 'استكشف عالمًا سحريًا من المغامرات',
    'joinCommunity': 'انضم إلى مجتمعنا اليوم',
    'learnMore': 'معرفة المزيد',
    'notFound': 'الصفحة غير موجودة',
    'backToHome': 'العودة إلى الرئيسية',
    'privacyPolicy': 'سياسة الخصوصية',
    'termsOfService': 'شروط الخدمة',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  // Load preferences on mount
  useEffect(() => {
    // Check for saved preferences in localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setDirection(savedLanguage === 'ar' ? 'rtl' : 'ltr');
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light-mode', savedTheme === 'light');
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('language', language);
    setDirection(language === 'ar' ? 'rtl' : 'ltr');
    
    // Apply RTL/LTR to document
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Apply Arabic font if needed
    if (language === 'ar') {
      document.documentElement.classList.add('font-ar');
    } else {
      document.documentElement.classList.remove('font-ar');
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Translation function with fallback
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, theme, toggleTheme, t, direction }}>
      <div dir={direction} className={language === 'ar' ? 'rtl font-ar' : ''}>
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
