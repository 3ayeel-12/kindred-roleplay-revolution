
import { PolicyLayout } from "@/components/layout/PolicyLayout";
import { useLanguage } from "@/contexts/language";

const Terms = () => {
  const { t, language } = useLanguage();

  // Define content for each language
  const content = {
    en: {
      title: "Terms of Service",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using KindreD Role Play, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services."
        },
        {
          title: "2. Description of Service",
          content: "KindreD Role Play provides a multiplayer gaming environment based on the SA-MP platform. Our service includes community forums, in-game activities, and related content."
        },
        {
          title: "3. User Accounts",
          content: "You are responsible for safeguarding your account and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security."
        },
        {
          title: "4. User Conduct",
          content: "You agree not to engage in any activity that interferes with or disrupts the services (or the servers and networks connected to our services). This includes attempting to gain unauthorized access to any part of the services or using our services for any fraudulent or illegal purpose."
        },
        {
          title: "5. In-Game Behavior",
          content: "As a community-focused roleplay server, we expect all players to maintain a respectful environment. Harassment, discrimination, excessive profanity, or any behavior that negatively impacts other players' experience is prohibited and may result in immediate account suspension."
        },
        {
          title: "6. Content Guidelines",
          content: "Users may not upload, share, or create content that is illegal, obscene, defamatory, threatening, harassing, or otherwise objectionable. We reserve the right to remove any content that violates these guidelines."
        },
        {
          title: "7. Intellectual Property",
          content: "All content included on the website and within the game, such as text, graphics, logos, images, and software, is the property of KindreD Role Play or its content suppliers and protected by international copyright laws."
        },
        {
          title: "8. Termination of Service",
          content: "We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms."
        },
        {
          title: "9. Changes to Terms",
          content: "We reserve the right to modify these terms at any time. By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms."
        },
        {
          title: "10. Contact Us",
          content: "If you have any questions about these Terms, please contact us at support@kindredrp.com."
        }
      ],
      lastUpdated: "Last Updated: May 1, 2025"
    },
    fr: {
      title: "Conditions d'Utilisation",
      sections: [
        {
          title: "1. Acceptation des Conditions",
          content: "En accédant ou en utilisant KindreD Role Play, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord avec une partie des conditions, vous ne pouvez pas accéder à nos services."
        },
        {
          title: "2. Description du Service",
          content: "KindreD Role Play fournit un environnement de jeu multijoueur basé sur la plateforme SA-MP. Notre service comprend des forums communautaires, des activités en jeu et du contenu connexe."
        },
        {
          title: "3. Comptes Utilisateurs",
          content: "Vous êtes responsable de la protection de votre compte et de toutes les activités qui se déroulent sous votre compte. Vous devez nous informer immédiatement de toute utilisation non autorisée de votre compte ou de toute autre violation de sécurité."
        },
        {
          title: "4. Conduite de l'Utilisateur",
          content: "Vous acceptez de ne pas vous engager dans une activité qui interfère avec ou perturbe les services (ou les serveurs et réseaux connectés à nos services). Cela inclut les tentatives d'accès non autorisé à une partie des services ou l'utilisation de nos services à des fins frauduleuses ou illégales."
        },
        {
          title: "5. Comportement en Jeu",
          content: "En tant que serveur de roleplay axé sur la communauté, nous attendons de tous les joueurs qu'ils maintiennent un environnement respectueux. Le harcèlement, la discrimination, la grossièreté excessive ou tout comportement qui affecte négativement l'expérience des autres joueurs est interdit et peut entraîner la suspension immédiate du compte."
        },
        {
          title: "6. Directives de Contenu",
          content: "Les utilisateurs ne peuvent pas télécharger, partager ou créer du contenu illégal, obscène, diffamatoire, menaçant, harcelant ou autrement répréhensible. Nous nous réservons le droit de supprimer tout contenu qui viole ces directives."
        },
        {
          title: "7. Propriété Intellectuelle",
          content: "Tout le contenu inclus sur le site Web et dans le jeu, comme le texte, les graphiques, les logos, les images et les logiciels, est la propriété de KindreD Role Play ou de ses fournisseurs de contenu et est protégé par les lois internationales sur le droit d'auteur."
        },
        {
          title: "8. Résiliation du Service",
          content: "Nous pouvons mettre fin ou suspendre l'accès à notre service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous violez les Conditions."
        },
        {
          title: "9. Modifications des Conditions",
          content: "Nous nous réservons le droit de modifier ces conditions à tout moment. En continuant à accéder ou à utiliser nos services après que les révisions soient entrées en vigueur, vous acceptez d'être lié par les conditions révisées."
        },
        {
          title: "10. Contactez-Nous",
          content: "Si vous avez des questions concernant ces Conditions, veuillez nous contacter à support@kindredrp.com."
        }
      ],
      lastUpdated: "Dernière mise à jour : 1 mai 2025"
    },
    ar: {
      title: "شروط الخدمة",
      sections: [
        {
          title: "١. قبول الشروط",
          content: "من خلال الوصول إلى أو استخدام كيندرد رول بلاي، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على أي جزء من الشروط، فقد لا يُسمح لك بالوصول إلى خدماتنا."
        },
        {
          title: "٢. وصف الخدمة",
          content: "توفر كيندرد رول بلاي بيئة ألعاب متعددة اللاعبين تعتمد على منصة SA-MP. تشمل خدمتنا منتديات المجتمع، والأنشطة داخل اللعبة، والمحتوى ذي الصلة."
        },
        {
          title: "٣. حسابات المستخدمين",
          content: "أنت مسؤول عن حماية حسابك وعن جميع الأنشطة التي تتم تحت حسابك. يجب عليك إخطارنا فورًا بأي استخدام غير مصرح به لحسابك أو أي خرق آخر للأمان."
        },
        {
          title: "٤. سلوك المستخدم",
          content: "أنت توافق على عدم المشاركة في أي نشاط يتداخل مع أو يعطل الخدمات (أو الخوادم والشبكات المتصلة بخدماتنا). وهذا يشمل محاولة الوصول غير المصرح به إلى أي جزء من الخدمات أو استخدام خدماتنا لأي غرض احتيالي أو غير قانوني."
        },
        {
          title: "٥. السلوك داخل اللعبة",
          content: "باعتبارنا خادمًا للعب الأدوار يركز على المجتمع، نتوقع من جميع اللاعبين الحفاظ على بيئة محترمة. يُحظر المضايقة أو التمييز أو الإفراط في استخدام اللغة النابية أو أي سلوك يؤثر سلبًا على تجربة اللاعبين الآخرين وقد يؤدي إلى تعليق الحساب فورًا."
        },
        {
          title: "٦. إرشادات المحتوى",
          content: "لا يجوز للمستخدمين تحميل أو مشاركة أو إنشاء محتوى غير قانوني أو فاحش أو تشهيري أو تهديدي أو مضايق أو مرفوض بطريقة أخرى. نحتفظ بالحق في إزالة أي محتوى ينتهك هذه الإرشادات."
        },
        {
          title: "٧. الملكية الفكرية",
          content: "جميع المحتويات المدرجة في الموقع وداخل اللعبة، مثل النصوص والرسومات والشعارات والصور والبرامج، هي ملك لـ كيندرد رول بلاي أو موردي المحتوى الخاصين بها ومحمية بموجب قوانين حقوق النشر الدولية."
        },
        {
          title: "٨. إنهاء الخدمة",
          content: "يجوز لنا إنهاء أو تعليق الوصول إلى خدمتنا على الفور، دون إشعار مسبق أو مسؤولية، لأي سبب من الأسباب، بما في ذلك على سبيل المثال لا الحصر إذا خرقت الشروط."
        },
        {
          title: "٩. تغييرات على الشروط",
          content: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. من خلال الاستمرار في الوصول إلى خدماتنا أو استخدامها بعد أن تصبح أي مراجعات سارية المفعول، فإنك توافق على الالتزام بالشروط المعدلة."
        },
        {
          title: "١٠. اتصل بنا",
          content: "إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على support@kindredrp.com."
        }
      ],
      lastUpdated: "آخر تحديث: ١ مايو ٢٠٢٥"
    }
  };

  // Choose content based on current language
  const currentContent = language === 'fr' ? content.fr : language === 'ar' ? content.ar : content.en;

  return (
    <PolicyLayout title={t('termsOfService')}>
      {currentContent.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-display font-semibold mb-3 text-kindred-highlight">{section.title}</h2>
          <p className="text-kindred-light leading-relaxed">{section.content}</p>
        </div>
      ))}
      <div className="mt-10 text-sm text-kindred-light/70 border-t border-kindred-primary/20 pt-4">
        {currentContent.lastUpdated}
      </div>
    </PolicyLayout>
  );
};

export default Terms;
