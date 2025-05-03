
import { useEffect } from "react";
import { PolicyLayout } from "@/components/layout/PolicyLayout";
import { useLanguage } from "@/contexts/language";

const PrivacyPolicy = () => {
  const { t, language } = useLanguage();

  // Define content for each language
  const content = {
    en: {
      title: "Privacy Policy",
      sections: [
        {
          title: "1. Information We Collect",
          content: "We collect information you provide directly to us when you create an account, participate in our community, or contact our support team. This may include your username, email address, IP address, and any other information you choose to provide."
        },
        {
          title: "2. How We Use Your Information",
          content: "We use your information to provide, maintain, and improve our services, communicate with you, and ensure a safe gaming environment. We may also use your information to comply with legal obligations and enforce our terms of service."
        },
        {
          title: "3. Data Security",
          content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, modification, disclosure, or destruction."
        },
        {
          title: "4. Third-Party Services",
          content: "Our service may contain links to third-party websites or services that are not owned or controlled by KindreD Role Play. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services."
        },
        {
          title: "5. Children's Privacy",
          content: "Our Service is not directed to anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete such information from our servers immediately."
        },
        {
          title: "6. Changes to This Privacy Policy",
          content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date at the top of this Policy."
        },
        {
          title: "7. Contact Us",
          content: "If you have any questions about this Privacy Policy, please contact us at: support@kindredrp.com"
        }
      ],
      lastUpdated: "Last Updated: May 1, 2025"
    },
    fr: {
      title: "Politique de Confidentialité",
      sections: [
        {
          title: "1. Informations que Nous Collectons",
          content: "Nous collectons les informations que vous nous fournissez directement lorsque vous créez un compte, participez à notre communauté ou contactez notre équipe d'assistance. Cela peut inclure votre nom d'utilisateur, adresse e-mail, adresse IP et toute autre information que vous choisissez de fournir."
        },
        {
          title: "2. Comment Nous Utilisons Vos Informations",
          content: "Nous utilisons vos informations pour fournir, maintenir et améliorer nos services, communiquer avec vous et assurer un environnement de jeu sûr. Nous pouvons également utiliser vos informations pour nous conformer aux obligations légales et faire respecter nos conditions d'utilisation."
        },
        {
          title: "3. Sécurité des Données",
          content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés."
        },
        {
          title: "4. Services Tiers",
          content: "Notre service peut contenir des liens vers des sites Web ou des services tiers qui ne sont pas détenus ou contrôlés par KindreD Role Play. Nous n'avons aucun contrôle et n'assumons aucune responsabilité quant au contenu, aux politiques de confidentialité ou aux pratiques des sites Web ou services tiers."
        },
        {
          title: "5. Confidentialité des Enfants",
          content: "Notre service n'est pas destiné aux personnes de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnellement identifiables auprès d'enfants de moins de 13 ans. Si nous découvrons qu'un enfant de moins de 13 ans nous a fourni des informations personnelles, nous supprimerons immédiatement ces informations de nos serveurs."
        },
        {
          title: "6. Modifications de Cette Politique de Confidentialité",
          content: "Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page et en mettant à jour la date de 'Dernière mise à jour' en haut de cette politique."
        },
        {
          title: "7. Contactez-Nous",
          content: "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à : support@kindredrp.com"
        }
      ],
      lastUpdated: "Dernière mise à jour : 1 mai 2025"
    },
    ar: {
      title: "سياسة الخصوصية",
      sections: [
        {
          title: "١. المعلومات التي نجمعها",
          content: "نحن نجمع المعلومات التي تقدمها لنا مباشرة عند إنشاء حساب، أو المشاركة في مجتمعنا، أو الاتصال بفريق الدعم لدينا. قد يشمل ذلك اسم المستخدم، وعنوان البريد الإلكتروني، وعنوان IP، وأي معلومات أخرى تختار تقديمها."
        },
        {
          title: "٢. كيف نستخدم معلوماتك",
          content: "نستخدم معلوماتك لتوفير خدماتنا وصيانتها وتحسينها، والتواصل معك، وضمان بيئة ألعاب آمنة. قد نستخدم أيضًا معلوماتك للامتثال للالتزامات القانونية وفرض شروط الخدمة الخاصة بنا."
        },
        {
          title: "٣. أمن البيانات",
          content: "نحن ننفذ تدابير تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية ضد الوصول غير المصرح به، أو التعديل، أو الإفصاح، أو التدمير."
        },
        {
          title: "٤. خدمات الطرف الثالث",
          content: "قد تحتوي خدمتنا على روابط لمواقع ويب أو خدمات تابعة لجهات خارجية غير مملوكة أو مُتحكم بها من قبل كيندرد رول بلاي. ليس لدينا أي سيطرة ولا نتحمل أي مسؤولية عن المحتوى أو سياسات الخصوصية أو ممارسات أي مواقع ويب أو خدمات تابعة لجهات خارجية."
        },
        {
          title: "٥. خصوصية الأطفال",
          content: "خدمتنا غير موجهة لأي شخص دون سن 13 عامًا. نحن لا نجمع عن قصد معلومات تعريف شخصية من الأطفال دون سن 13 عامًا. إذا اكتشفنا أن طفلاً دون سن 13 عامًا قد زودنا بمعلومات شخصية، فسنحذف هذه المعلومات من خوادمنا على الفور."
        },
        {
          title: "٦. التغييرات على سياسة الخصوصية هذه",
          content: "قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. سنخطرك بأي تغييرات من خلال نشر سياسة الخصوصية الجديدة على هذه الصفحة وتحديث تاريخ 'آخر تحديث' في أعلى هذه السياسة."
        },
        {
          title: "٧. اتصل بنا",
          content: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على: support@kindredrp.com"
        }
      ],
      lastUpdated: "آخر تحديث: ١ مايو ٢٠٢٥"
    }
  };

  // Choose content based on current language
  const currentContent = language === 'fr' ? content.fr : language === 'ar' ? content.ar : content.en;

  return (
    <PolicyLayout title={t('privacyPolicy')}>
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

export default PrivacyPolicy;
