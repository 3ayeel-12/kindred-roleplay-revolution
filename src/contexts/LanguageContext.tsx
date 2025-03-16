
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
    'watchTrailer': 'Watch Trailer',
    'server': 'Server',
    'online': 'Online',
    'offline': 'Offline',
    'lastUpdated': 'Last Updated',
    'players': 'Players',
    'roleplay': 'Roleplay',
    'sanAndreas': 'San Andreas',
    'onlinePlayers': 'Online Players',
    'playerDistribution': 'Player Distribution in Morocco',
    'arabicFrench': 'Arabic / French',
    'regions': 'Distribution of players across different regions of Morocco',
    'casablanca': 'Casablanca',
    'rabat': 'Rabat',
    'marrakech': 'Marrakech',
    'fes': 'Fes',
    'tangier': 'Tangier',
    'aboutUs': 'About Us',
    'kindredCommunity': 'Kindred Community',
    'roleplayAndChill': 'Roleplay & Chill',
    'stepIntoWorld': 'Step into a world where roleplay meets ultimate relaxation! Whether you\'re on PC or mobile (Tqasar Tele), you\'re always part of an immersive SA-MP experience—no stress, just pure fun and community vibes.',
    'whyJoinUs': 'Why Join Us?',
    'fairPlay': 'Fair Play, No Abuse – Balanced & enjoyable gameplay',
    'eliteAdmins': 'Elite Admins – Supportive, active, and always here for you',
    'legendaryPlayers': 'Legendary Players – A strong community of skilled roleplayers',
    'roleplayActivities': 'Roleplay & Activities',
    'noPlayToWin': 'No "Play to Win"—it\'s all about the experience',
    'epicWeeklyEvents': 'Epic Weekly Events to keep the fun rolling',
    'arenaSystem': 'One-of-a-Kind Arena Battles every two days—no issues, just action',
    'joinToday': 'Join Today!',
    'experienceSamp': 'Experience SA-MP like never before with our vibrant community!',
    'joinServer': 'Join Server',
    'howToPlayTitle': 'How To Start Playing',
    'howToPlayDesc': 'A simple 4-step guide to install SA-MP on both PC and Mobile',
    'mobile': 'Mobile',
    'installOnAndroid': 'Install On Android',
    'downloadLauncher': 'Download SA-MP Mobile Launcher',
    'searchLauncher': 'Search for "SA-MP Launcher" in Play Store',
    'installGta': 'Install GTA: San Andreas APK + Data',
    'findLegalCopy': 'Find a legal copy or use your existing one',
    'openLauncher': 'Open the SA-MP Launcher',
    'enterServerIp': 'Enter server IP: 91.121.237.128:1958',
    'connectPlay': 'Connect & Play',
    'customizeName': 'Customize your name, hit Join, and start roleplaying!',
    'downloadLauncherBtn': 'Download Launcher',
    'pc': 'PC',
    'installOnPc': 'Install On PC',
    'downloadInstallGta': 'Download & Install GTA: San Andreas',
    'originalGame': 'Make sure you have the original game, not the Definitive Edition!',
    'downloadSampClient': 'Download SA-MP Client',
    'getSampFrom': 'Get it from sa-mp.com',
    'installSamp': 'Install SA-MP',
    'installDirectory': 'Install in your GTA: San Andreas directory',
    'launchSamp': 'Launch SA-MP',
    'addServerIp': 'Add our server IP: 91.121.237.128:1958 and start playing!',
    'downloadSamp': 'Download SA-MP',
    'readyToPlay': 'Now you\'re ready to dive into SA-MP and start your roleplay journey!',
    'createAutopark': 'Create Your Autopark',
    'findStyle': 'Find Your Own Style',
    'getAhead': 'Get Ahead Of The Residents',
    'improveSkills': 'Improve Skills And More Than $10.000',
    'becomeGangster': 'Become A Gangster',
    'workHard': 'Work Hard On The Dark Side Of SAMP',
    'manageBusiness': 'Manage A Business',
    'produceSupplies': 'Produce Different Supplies',
    'playNow': 'Play Right Now Using The Promo Code',
    'promoCode': 'KINDRED2023',
    'get': 'Get',
    'joinOurCommunity': 'Join Our Community',
    'followers': 'followers',
    'members': 'members',
    'likes': 'likes',
    'subscribeNewsletter': 'Subscribe To Our Newsletter',
    'stayUpdated': 'Stay updated with the latest events, updates, and community highlights from the KindreD Role Play servers.',
    'emailAddress': 'Your email address',
    'subscribe': 'Subscribe',
    'helpReferences': 'Help / References',
    'languageNote': 'En-US and all other languages are welcome in-game, but on the sites we\'ll stick to English, French and Arabic',
    'languages': 'Languages',
    'allRightsReserved': 'All rights reserved',
    'message': 'Message',
    'send': 'Send',
    'supportRequest': 'Support request submitted',
    'getBackToYou': 'We\'ll get back to you as soon as possible.',
    // Additions for creating legendary moments text in hero
    'kindredCommunityTitle': 'KINDRED COMMUNITY',
    'sampRoleplayAndChill': 'SA-MP ROLEPLAY & CHILL',
    'creatingLegendaryMoments': 'CREATING LEGENDARY ROLEPLAY MOMENTS WITH OUR COMMUNITY',
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
    'watchTrailer': 'Regarder la Bande-Annonce',
    'server': 'Serveur',
    'online': 'En Ligne',
    'offline': 'Hors Ligne',
    'lastUpdated': 'Dernière Mise à Jour',
    'players': 'Joueurs',
    'roleplay': 'Roleplay',
    'sanAndreas': 'San Andreas',
    'onlinePlayers': 'Joueurs en Ligne',
    'playerDistribution': 'Répartition des Joueurs au Maroc',
    'arabicFrench': 'Arabe / Français',
    'regions': 'Répartition des joueurs à travers différentes régions du Maroc',
    'casablanca': 'Casablanca',
    'rabat': 'Rabat',
    'marrakech': 'Marrakech',
    'fes': 'Fès',
    'tangier': 'Tanger',
    'aboutUs': 'À Propos de Nous',
    'kindredCommunity': 'Communauté Kindred',
    'roleplayAndChill': 'Roleplay & Chill',
    'stepIntoWorld': 'Entrez dans un monde où le roleplay rencontre une détente ultime ! Que vous soyez sur PC ou mobile (Tqasar Tele), vous faites toujours partie d\'une expérience SA-MP immersive—pas de stress, juste du fun et une ambiance communautaire unique.',
    'whyJoinUs': 'Pourquoi nous rejoindre ?',
    'fairPlay': 'Jeu équitable, sans abus – Expérience équilibrée et agréable',
    'eliteAdmins': 'Admins d\'élite – Actifs, professionnels et toujours présents',
    'legendaryPlayers': 'Joueurs légendaires – Une communauté forte et expérimentée',
    'roleplayActivities': 'Activités et Roleplay',
    'noPlayToWin': 'Pas de "Play to Win"—juste du vrai roleplay',
    'epicWeeklyEvents': 'Événements hebdomadaires épiques pour plus de fun',
    'arenaSystem': 'Système d\'arène unique tous les deux jours—aucun problème, juste de l\'action',
    'joinToday': 'Rejoignez-nous dès aujourd\'hui !',
    'experienceSamp': 'Vivez SA-MP comme jamais auparavant avec notre communauté dynamique !',
    'joinServer': 'Rejoindre le Serveur',
    'howToPlayTitle': 'Comment Commencer à Jouer',
    'howToPlayDesc': 'Un guide simple en 4 étapes pour installer SA-MP sur PC et Mobile',
    'mobile': 'Mobile',
    'installOnAndroid': 'Installation sur Android',
    'downloadLauncher': 'Télécharger le lanceur SA-MP Mobile',
    'searchLauncher': 'Recherchez "SA-MP Launcher" dans le Play Store',
    'installGta': 'Installer GTA: San Andreas APK + Données',
    'findLegalCopy': 'Trouvez une copie légale ou utilisez celle que vous avez',
    'openLauncher': 'Ouvrez le lanceur SA-MP',
    'enterServerIp': 'Entrez l\'IP du serveur: 91.121.237.128:1958',
    'connectPlay': 'Connectez-vous et jouez',
    'customizeName': 'Personnalisez votre nom, appuyez sur Rejoindre, et commencez à jouer !',
    'downloadLauncherBtn': 'Télécharger le Lanceur',
    'pc': 'PC',
    'installOnPc': 'Installation sur PC',
    'downloadInstallGta': 'Télécharger et installer GTA: San Andreas',
    'originalGame': 'Assurez-vous d\'avoir le jeu original, pas l\'Édition Définitive !',
    'downloadSampClient': 'Télécharger le client SA-MP',
    'getSampFrom': 'Obtenez-le sur sa-mp.com',
    'installSamp': 'Installer SA-MP',
    'installDirectory': 'Installez-le dans votre répertoire GTA: San Andreas',
    'launchSamp': 'Lancez SA-MP',
    'addServerIp': 'Ajoutez notre IP de serveur: 91.121.237.128:1958 et commencez à jouer !',
    'downloadSamp': 'Télécharger SA-MP',
    'readyToPlay': 'Maintenant vous êtes prêt à plonger dans SA-MP et commencer votre aventure de roleplay !',
    'createAutopark': 'Créez Votre Parc Auto',
    'findStyle': 'Trouvez Votre Propre Style',
    'getAhead': 'Surpassez les Résidents',
    'improveSkills': 'Améliorez vos Compétences et Gagnez Plus de 10 000 $',
    'becomeGangster': 'Devenez un Gangster',
    'workHard': 'Travaillez Dur dans le Côté Sombre de SAMP',
    'manageBusiness': 'Gérez une Entreprise',
    'produceSupplies': 'Produisez Différentes Fournitures',
    'playNow': 'Jouez Maintenant avec le Code Promo',
    'promoCode': 'KINDRED2023',
    'get': 'Obtenez',
    'joinOurCommunity': 'Rejoignez Notre Communauté',
    'followers': 'abonnés',
    'members': 'membres',
    'likes': 'j\'aimes',
    'subscribeNewsletter': 'Abonnez-vous à Notre Newsletter',
    'stayUpdated': 'Restez informé des derniers événements, mises à jour et temps forts de la communauté KindreD Role Play.',
    'emailAddress': 'Votre adresse email',
    'subscribe': 'S\'abonner',
    'helpReferences': 'Aide / Références',
    'languageNote': 'Toutes les langues sont acceptées dans le jeu, mais sur les sites nous utiliserons l\'anglais, le français et l\'arabe',
    'languages': 'Langues',
    'allRightsReserved': 'Tous droits réservés',
    'message': 'Message',
    'send': 'Envoyer',
    'supportRequest': 'Demande de support envoyée',
    'getBackToYou': 'Nous vous répondrons dès que possible.',
    // Additions for hero section
    'kindredCommunityTitle': 'COMMUNAUTÉ KINDRED',
    'sampRoleplayAndChill': 'SA-MP ROLEPLAY & CHILL',
    'creatingLegendaryMoments': 'CRÉER DES MOMENTS LÉGENDAIRES DE ROLEPLAY AVEC NOTRE COMMUNAUTÉ',
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
    'watchTrailer': 'شاهد العرض الترويجي',
    'server': 'خادم',
    'online': 'متصل',
    'offline': 'غير متصل',
    'lastUpdated': 'آخر تحديث',
    'players': 'اللاعبون',
    'roleplay': 'لعب الأدوار',
    'sanAndreas': 'سان أندرياس',
    'onlinePlayers': 'اللاعبون المتصلون',
    'playerDistribution': 'توزيع اللاعبين في المغرب',
    'arabicFrench': 'العربية / الفرنسية',
    'regions': 'توزيع اللاعبين عبر مناطق مختلفة من المغرب',
    'casablanca': 'الدار البيضاء',
    'rabat': 'الرباط',
    'marrakech': 'مراكش',
    'fes': 'فاس',
    'tangier': 'طنجة',
    'aboutUs': 'من نحن',
    'kindredCommunity': 'مجتمع Kindred',
    'roleplayAndChill': 'لعب أدوار & استرخاء',
    'stepIntoWorld': 'ادخل إلى عالم حيث يلتقي لعب الأدوار بالاسترخاء التام! سواء كنت على الكمبيوتر أو الهاتف (Tqasar Tele)، فأنت دائمًا جزء من تجربة SA-MP غامرة—لا ضغط، فقط متعة خالصة وأجواء مجتمعية رائعة.',
    'whyJoinUs': 'لماذا تنضم إلينا؟',
    'fairPlay': 'لعب عادل، لا استغلال – تجربة متوازنة وممتعة',
    'eliteAdmins': 'إدارة محترفة – مشرفون نشطون وداعمون دائمًا',
    'legendaryPlayers': 'لاعبون أسطوريون – مجتمع قوي من محترفي لعب الأدوار',
    'roleplayActivities': 'لعب الأدوار والأنشطة',
    'noPlayToWin': 'لا للعب من أجل الفوز—الأهم هو التجربة الممتعة',
    'epicWeeklyEvents': 'فعاليات أسبوعية ملحمية لإبقاء المتعة مستمرة',
    'arenaSystem': 'نظام حلبات فريد كل يومين—بدون مشاكل، فقط إثارة',
    'joinToday': 'انضم اليوم!',
    'experienceSamp': 'عيش تجربة SA-MP كما لم تفعل من قبل مع مجتمعنا النابض بالحياة!',
    'joinServer': 'انضم إلى الخادم',
    'howToPlayTitle': 'كيفية بدء اللعب',
    'howToPlayDesc': 'دليل بسيط من 4 خطوات لتثبيت SA-MP على كل من الكمبيوتر والهاتف',
    'mobile': 'الموبايل',
    'installOnAndroid': 'التثبيت على أندرويد',
    'downloadLauncher': 'قم بتحميل مشغل SA-MP للهواتف',
    'searchLauncher': 'ابحث عن "SA-MP Launcher" في متجر Play',
    'installGta': 'قم بتثبيت GTA: San Andreas APK + البيانات',
    'findLegalCopy': 'استخدم نسخة قانونية أو الحالية لديك',
    'openLauncher': 'افتح مشغل SA-MP',
    'enterServerIp': 'أدخل عنوان الخادم: 91.121.237.128:1958',
    'connectPlay': 'اتصل وابدأ اللعب',
    'customizeName': 'خصص اسمك، اضغط "انضم"، وابدأ لعب الأدوار!',
    'downloadLauncherBtn': 'تحميل المشغل',
    'pc': 'الكمبيوتر',
    'installOnPc': 'التثبيت على الكمبيوتر',
    'downloadInstallGta': 'قم بتحميل وتثبيت GTA: San Andreas',
    'originalGame': 'تأكد من أنك تمتلك النسخة الأصلية، وليس الإصدار المحسن!',
    'downloadSampClient': 'قم بتنزيل SA-MP Client',
    'getSampFrom': 'احصل عليه من sa-mp.com',
    'installSamp': 'قم بتثبيت SA-MP',
    'installDirectory': 'قم بتثبيته في مجلد GTA: San Andreas الخاص بك',
    'launchSamp': 'افتح SA-MP',
    'addServerIp': 'أضف عنوان الخادم: 91.121.237.128:1958 وابدأ اللعب!',
    'downloadSamp': 'تحميل SA-MP',
    'readyToPlay': 'الآن أنت جاهز للغوص في SA-MP وبدء رحلتك في لعب الأدوار!',
    'createAutopark': 'أنشئ موقف السيارات الخاص بك',
    'findStyle': 'اصنع أسلوبك الخاص',
    'getAhead': 'تفوق على السكان',
    'improveSkills': 'طور مهاراتك واربح أكثر من $10,000',
    'becomeGangster': 'كن رجل عصابات',
    'workHard': 'اعمل بجد في العالم السفلي لـ SA-MP',
    'manageBusiness': 'قم بإدارة عملك الخاص',
    'produceSupplies': 'انتج موارد مختلفة',
    'playNow': 'العب الآن باستخدام كود الترويج',
    'promoCode': 'KINDRED2023',
    'get': 'احصل على',
    'joinOurCommunity': 'انضم إلى مجتمعنا',
    'followers': 'متابعًا',
    'members': 'عضوًا',
    'likes': 'إعجابًا',
    'subscribeNewsletter': 'اشترك في نشرتنا الإخبارية',
    'stayUpdated': 'ابق على اطلاع بأحدث الفعاليات والتحديثات وأهم أخبار مجتمع KindreD Role Play.',
    'emailAddress': 'عنوان بريدك الإلكتروني',
    'subscribe': 'اشترك',
    'helpReferences': 'المساعدة / المراجع',
    'languageNote': 'اللعبة تدعم جميع اللغات داخلها، لكن على المواقع سنستخدم الإنجليزية، الفرنسية، والعربية فقط',
    'languages': 'اللغات',
    'allRightsReserved': 'جميع الحقوق محفوظة',
    'message': 'الرسالة',
    'send': 'إرسال',
    'supportRequest': 'تم إرسال طلب الدعم',
    'getBackToYou': 'سنرد عليك في أقرب وقت ممكن.',
    // Additions for hero section
    'kindredCommunityTitle': 'مجتمع KINDRED',
    'sampRoleplayAndChill': 'SA-MP لعب الأدوار والاسترخاء',
    'creatingLegendaryMoments': 'خلق لحظات لعب أدوار أسطورية مع مجتمعنا',
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
