
import { PolicyLayout } from "@/components/layout/PolicyLayout";
import { useLanguage } from "@/contexts/language";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const { t, language } = useLanguage();

  // Define FAQ content for each language
  const content = {
    en: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "What is KindreD Role Play?",
          answer: "KindreD Role Play is a SA-MP (San Andreas Multiplayer) community focused on creating an immersive roleplay experience. Our server offers a unique blend of roleplay, activities, and community events in the world of San Andreas."
        },
        {
          question: "How do I join the server?",
          answer: "You can join our server by installing SA-MP on your PC or mobile device and connecting to our server using the IP address: 91.121.237.128:1958. Check our 'How To Play' section for detailed installation instructions."
        },
        {
          question: "Is KindreD Role Play free to play?",
          answer: "Yes, KindreD Role Play is completely free to play. We focus on creating a fair environment without any 'pay-to-win' mechanics."
        },
        {
          question: "What languages are supported?",
          answer: "Our in-game community supports multiple languages, with a focus on English, French, and Arabic to accommodate our diverse player base from around the world, especially Morocco and MENA regions."
        },
        {
          question: "Are there rules I need to follow?",
          answer: "Yes, we have community guidelines that focus on fair play, respectful interaction, and maintaining the roleplay atmosphere. Our admin team enforces these rules to ensure everyone has an enjoyable experience."
        },
        {
          question: "How can I report issues or get help?",
          answer: "You can contact our support team through the 'Technical Support' feature on our website, join our Discord server for community support, or reach out to an admin in-game."
        },
        {
          question: "What kind of activities can I do in KindreD RP?",
          answer: "You can engage in various roleplay scenarios, manage businesses, build your auto collection, participate in our unique arena battles, and join weekly community events. The possibilities are extensive!"
        },
        {
          question: "Can I play on mobile?",
          answer: "Yes! KindreD RP is accessible on mobile devices using the SA-MP Mobile Launcher. Check our 'How To Play' section for detailed instructions on setting up the game on your Android device."
        }
      ]
    },
    fr: {
      title: "Foire Aux Questions",
      faqs: [
        {
          question: "Qu'est-ce que KindreD Role Play ?",
          answer: "KindreD Role Play est une communauté SA-MP (San Andreas Multiplayer) axée sur la création d'une expérience de jeu de rôle immersive. Notre serveur offre un mélange unique de roleplay, d'activités et d'événements communautaires dans le monde de San Andreas."
        },
        {
          question: "Comment rejoindre le serveur ?",
          answer: "Vous pouvez rejoindre notre serveur en installant SA-MP sur votre PC ou appareil mobile et en vous connectant à notre serveur en utilisant l'adresse IP : 91.121.237.128:1958. Consultez notre section 'Comment Jouer' pour des instructions d'installation détaillées."
        },
        {
          question: "KindreD Role Play est-il gratuit ?",
          answer: "Oui, KindreD Role Play est entièrement gratuit. Nous nous concentrons sur la création d'un environnement équitable sans aucun mécanisme 'pay-to-win'."
        },
        {
          question: "Quelles langues sont prises en charge ?",
          answer: "Notre communauté en jeu prend en charge plusieurs langues, avec un accent sur l'anglais, le français et l'arabe pour accommoder notre base de joueurs diversifiée du monde entier, en particulier des régions du Maroc et MENA."
        },
        {
          question: "Y a-t-il des règles à suivre ?",
          answer: "Oui, nous avons des directives communautaires qui se concentrent sur le fair-play, l'interaction respectueuse et le maintien de l'atmosphère de roleplay. Notre équipe d'administrateurs applique ces règles pour garantir que tout le monde ait une expérience agréable."
        },
        {
          question: "Comment puis-je signaler des problèmes ou obtenir de l'aide ?",
          answer: "Vous pouvez contacter notre équipe d'assistance via la fonction 'Support Technique' sur notre site Web, rejoindre notre serveur Discord pour le soutien communautaire, ou contacter un administrateur en jeu."
        },
        {
          question: "Quels types d'activités puis-je faire dans KindreD RP ?",
          answer: "Vous pouvez participer à divers scénarios de roleplay, gérer des entreprises, constituer votre collection automobile, participer à nos batailles d'arène uniques et rejoindre des événements communautaires hebdomadaires. Les possibilités sont vastes !"
        },
        {
          question: "Puis-je jouer sur mobile ?",
          answer: "Oui ! KindreD RP est accessible sur les appareils mobiles en utilisant le SA-MP Mobile Launcher. Consultez notre section 'Comment Jouer' pour des instructions détaillées sur la configuration du jeu sur votre appareil Android."
        }
      ]
    },
    ar: {
      title: "الأسئلة الشائعة",
      faqs: [
        {
          question: "ما هو كيندرد رول بلاي؟",
          answer: "كيندرد رول بلاي هو مجتمع SA-MP (سان أندرياس مالتيبلاير) يركز على إنشاء تجربة لعب أدوار غامرة. يقدم خادمنا مزيجًا فريدًا من لعب الأدوار والأنشطة وفعاليات المجتمع في عالم سان أندرياس."
        },
        {
          question: "كيف يمكنني الانضمام إلى السيرفر؟",
          answer: "يمكنك الانضمام إلى سيرفرنا عن طريق تثبيت SA-MP على جهاز الكمبيوتر أو الجهاز المحمول والاتصال بالسيرفر باستخدام عنوان IP: 91.121.237.128:1958. راجع قسم 'كيفية اللعب' للحصول على تعليمات التثبيت المفصلة."
        },
        {
          question: "هل كيندرد رول بلاي مجاني للعب؟",
          answer: "نعم، كيندرد رول بلاي مجاني تمامًا للعب. نركز على خلق بيئة عادلة بدون أي آليات 'ادفع لتفوز'."
        },
        {
          question: "ما هي اللغات المدعومة؟",
          answer: "يدعم مجتمعنا داخل اللعبة لغات متعددة، مع التركيز على الإنجليزية والفرنسية والعربية لاستيعاب قاعدة لاعبينا المتنوعة من جميع أنحاء العالم، وخاصة المغرب ومناطق الشرق الأوسط وشمال أفريقيا."
        },
        {
          question: "هل هناك قواعد يجب علي اتباعها؟",
          answer: "نعم، لدينا إرشادات مجتمعية تركز على اللعب النظيف، والتفاعل المحترم، والحفاظ على أجواء لعب الأدوار. يقوم فريق الإدارة لدينا بتطبيق هذه القواعد لضمان حصول الجميع على تجربة ممتعة."
        },
        {
          question: "كيف يمكنني الإبلاغ عن المشكلات أو الحصول على المساعدة؟",
          answer: "يمكنك الاتصال بفريق الدعم لدينا من خلال ميزة 'الدعم الفني' على موقعنا الإلكتروني، أو الانضمام إلى سيرفر Discord للحصول على دعم المجتمع، أو التواصل مع مسؤول في اللعبة."
        },
        {
          question: "ما نوع الأنشطة التي يمكنني القيام بها في كيندرد رول بلاي؟",
          answer: "يمكنك المشاركة في سيناريوهات لعب الأدوار المختلفة، وإدارة الأعمال التجارية، وبناء مجموعة السيارات الخاصة بك، والمشاركة في معارك الساحة الفريدة، والانضمام إلى فعاليات المجتمع الأسبوعية. الاحتمالات واسعة!"
        },
        {
          question: "هل يمكنني اللعب على الجوال؟",
          answer: "نعم! يمكن الوصول إلى كيندرد رول بلاي على الأجهزة المحمولة باستخدام مشغل SA-MP المحمول. راجع قسم 'كيفية اللعب' للحصول على تعليمات مفصلة حول إعداد اللعبة على جهاز Android الخاص بك."
        }
      ]
    }
  };

  // Choose content based on current language
  const currentContent = language === 'fr' ? content.fr : language === 'ar' ? content.ar : content.en;

  return (
    <PolicyLayout title={currentContent.title}>
      <p className={cn(
        "text-kindred-light mb-8",
        language === 'ar' ? "font-[Tajawal]" : ""
      )}>
        {language === 'ar' 
          ? "مرحباً بك في صفحة الأسئلة الشائعة لـ كيندرد رول بلاي. هنا ستجد إجابات للأسئلة الأكثر شيوعاً حول مجتمعنا وكيفية بدء اللعب."
          : language === 'fr'
          ? "Bienvenue sur la page FAQ de KindreD Role Play. Vous trouverez ici des réponses aux questions les plus fréquemment posées concernant notre communauté et comment commencer à jouer."
          : "Welcome to the KindreD Role Play FAQ page. Here you'll find answers to the most commonly asked questions about our community and how to get started."}
      </p>
      
      <Accordion type="single" collapsible className="w-full">
        {currentContent.faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-kindred-primary/20">
            <AccordionTrigger className={cn(
              "text-kindred-accent hover:text-kindred-highlight", 
              language === 'ar' ? "font-[Tajawal]" : "",
              language === 'ar' ? "justify-end" : ""
            )}>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className={cn(
              "text-kindred-light", 
              language === 'ar' ? "font-[Tajawal] text-right" : ""
            )}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PolicyLayout>
  );
};

export default FAQ;
