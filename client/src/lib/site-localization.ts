import { useEffect } from "react";

const TR: Record<string, string> = {
  "Why a transaction needs structure": "Bir işlem neden yapıya ihtiyaç duyar",
  "Important transactions rarely live in one system.": "Önemli işlemler nadiren tek bir sistemde yaşar.",
  "The contract may be in email. The BOM may be in the ERP. Supplier costs may be in spreadsheets. Shipment and payment evidence arrive later. DEĞERIA does not replace these systems—it connects the economic evidence they produce.": "Sözleşme e-postada, BOM ERP'de, tedarikçi maliyetleri elektronik tablolarda olabilir. Sevkiyat ve ödeme kanıtları daha sonra gelir. DEĞERIA bu sistemlerin yerine geçmez; ürettikleri ekonomik kanıtları birbirine bağlar.",
  "The invention": "İnovasyon",
  "We don't replace the systems that run the factory.": "Fabrikayı yöneten sistemlerin yerine geçmiyoruz.",
  "We create the economic transaction representation between them.": "Bu sistemlerin arasında ekonomik işlemin temsilini oluşturuyoruz.",
  "DEĞERIA sits above fragmented enterprise and transaction systems, organizing the evidence into one structured, traceable representation. Existing systems remain systems of record.": "DEĞERIA, parçalı kurumsal ve işlem sistemlerinin üzerinde konumlanır; kanıtları tek, yapılandırılmış ve izlenebilir bir temsilde düzenler. Mevcut sistemler kayıt sistemi olarak kalır.",
  "See how the Passport works": "Pasaportun nasıl çalıştığını görün",
  "What DEĞERIA produces": "DEĞERIA ne üretir",
  "You give DEĞERIA the evidence. Here is what you get back.": "DEĞERIA'ya kanıtları verirsiniz. Karşılığında elde ettiğiniz yapı budur.",
  "Transaction Passport": "İşlem Pasaportu",
  "The structured representation of the transaction — commercial, import, production, export, financial and risk evidence, connected in one record.": "İşlemin yapılandırılmış temsili — ticari, ithalat, üretim, ihracat, finansal ve risk kanıtlarının tek bir kayıtta birbirine bağlanması.",
  "Economic assessment": "Ekonomik değerlendirme",
  "Revenue, cost, margin, working-capital requirement, receivable exposure and FX exposure, calculated deterministically.": "Gelir, maliyet, marj, işletme sermayesi ihtiyacı, alacak riski ve kur riski deterministik olarak hesaplanır.",
  "Evidence and risk view": "Kanıt ve risk görünümü",
  "Evidence provenance, completeness, inconsistencies, missing information, and buyer, supplier and logistics risk.": "Kanıt kaynağı, bütünlük, tutarsızlıklar, eksik bilgiler ile alıcı, tedarikçi ve lojistik riskleri.",
  "Transaction evidence file": "İşlem Kanıt Dosyası",
  "A structured output bringing the transaction, evidence and assessment together — for internal review or, in time, institutional review.": "İşlemi, kanıtları ve değerlendirmeyi bir araya getiren yapılandırılmış çıktı — iç inceleme ve ileride kurumsal inceleme için.",
  "One transaction. Too many fragments.": "Tek işlem. Fazla sayıda parça.",
  "The economic reality of a transaction is distributed across documents, systems and stages. DEĞERIA brings the pieces into one structured representation.": "Bir işlemin ekonomik gerçekliği belgeler, sistemler ve aşamalar arasında dağılmıştır. DEĞERIA bu parçaları tek bir yapılandırılmış temsilde bir araya getirir.",
  "BEFORE": "ÖNCE",
  "AFTER": "SONRA",
  "Economic Evidence Graph": "Ekonomik Kanıt Grafiği",
  "One transaction. One structured representation.": "Tek işlem. Tek yapılandırılmış temsil.",
  "Every important number has a story.": "Her önemli sayının bir hikâyesi vardır.",
  "Trace a value backwards through the evidence that supports it. Nothing important should appear as a black box.": "Bir değeri, onu destekleyen kanıtlara kadar geriye doğru izleyin. Hiçbir önemli bilgi kara kutu olarak görünmemelidir.",
  "Evidence provenance": "Kanıt kaynağı ve izlenebilirliği",
  "From documents to economic understanding.": "Belgelerden ekonomik anlayışa.",
  "Move through the transaction graph. Each node reveals its source, event, value, timestamp, status and relationship.": "İşlem grafiğinde ilerleyin. Her düğüm kaynağını, olayını, değerini, zaman damgasını, durumunu ve ilişkisini gösterir.",
  "The economic graph": "Ekonomik grafik",
  "Before commitment": "Taahhüt öncesi",
  "See the transaction before it becomes a problem.": "İşlemi sorun hâline gelmeden önce görün.",
  "Change assumptions and see the economic consequences before scarce working capital is committed.": "Varsayımları değiştirin ve kıt işletme sermayesi tahsis edilmeden önce ekonomik sonuçları görün.",
  "Payment term": "Ödeme vadesi",
  "Supplier cost +5%": "Tedarikçi maliyeti +%5",
  "Freight +20%": "Navlun +%20",
  "Calculating...": "Hesaplanıyor...",
  "No change": "Değişiklik yok",
  "DEĞERIA ASSESSMENT": "DEĞERIA DEĞERLENDİRMESİ",
  "PROJECTED MARGIN": "ÖNGÖRÜLEN MARJ",
  "Primary drivers detected in the current model.": "Mevcut modelde belirlenen temel etkenler.",
  "Possible action": "Olası aksiyon",
  "Proceed to evidence review": "Kanıt incelemesine geçin",
  "Decision support only. Final commercial, financial and institutional decisions remain with authorized parties.": "Yalnızca karar desteğidir. Nihai ticari, finansal ve kurumsal kararlar yetkili taraflara aittir.",
  "Readiness for the next step": "Bir sonraki adım için hazırlık",
  "Ready for review is not the same as approved.": "İncelemeye hazır olmak onaylanmış olmakla aynı değildir.",
  "DEĞERIA prepares evidence and readiness. Financeability readiness is not a credit rating, financing decision, or loan approval. Insurance readiness is not insurance underwriting or an insurance approval. Banks, insurers and authorized institutions make their own decisions.": "DEĞERIA kanıtları ve hazırlık durumunu oluşturur. Finansmana uygunluk hazırlığı kredi notu, finansman kararı veya kredi onayı değildir. Sigorta hazırlığı sigorta underwriting'i veya sigorta onayı değildir. Bankalar, sigortacılar ve yetkili kurumlar kendi kararlarını verir.",
  "Designed for institutional integration": "Kurumsal entegrasyon için tasarlandı",
  "READY FOR INSTITUTIONAL REVIEW": "KURUMSAL İNCELEMEYE HAZIR",
  "Insurance readiness": "Sigorta hazırlığı",
  "Make risk visible before asking someone else to carry it.": "Riski başkasının üstlenmesini istemeden önce görünür hâle getirin.",
  "Structure the transaction context, evidence index and known gaps for an informed review. Insurance readiness is not insurance underwriting or an insurance approval.": "Bilgilendirilmiş bir inceleme için işlem bağlamını, kanıt endeksini ve bilinen eksikleri yapılandırın. Sigorta hazırlığı sigorta underwriting'i veya sigorta onayı değildir.",
  "Build the transaction file": "İşlem dosyasını oluşturun",
  "Institutional evidence output": "Kurumsal kanıt çıktısı",
  "One transaction. One evidence file.": "Tek işlem. Tek kanıt dosyası.",
  "This demonstration is labelled a Transaction Evidence File. \"Verified Export Asset File\" will be used only after verification standards are established.": "Bu gösterim İşlem Kanıt Dosyası olarak etiketlenmiştir. \"Doğrulanmış İhracat Varlık Dosyası\" yalnızca doğrulama standartları oluşturulduktan sonra kullanılacaktır.",
  "After the transaction": "İşlemden sonra",
  "The transaction does not end when the shipment leaves.": "İşlem sevkiyat çıktığında sona ermez.",
  "DEĞERIA remembers what actually happened. That is the beginning of a durable decision memory.": "DEĞERIA gerçekte ne olduğunu hatırlar. Bu, kalıcı bir karar hafızasının başlangıcıdır.",
  "Decision memory": "Karar hafızası",
  "What did you know? What did you decide? What happened?": "Ne biliyordunuz? Ne kararı verdiniz? Ne oldu?",
  "A transaction becomes more valuable when its assumptions, human decisions and actual outcomes remain connected.": "Bir işlem; varsayımları, insan kararları ve gerçek sonuçları birbirine bağlı kaldığında daha değerli hâle gelir.",
  "Technology principle": "Teknoloji ilkesi",
  "AI interprets.": "Yapay zekâ yorumlar.",
  "Systems calculate.": "Sistemler hesaplar.",
  "Humans decide.": "İnsanlar karar verir.",
  "DEĞERIA is not primarily a decision engine. It is transaction representation and evidence infrastructure; decision intelligence is one capability built on top of that foundation.": "DEĞERIA öncelikle bir karar motoru değildir. İşlem temsili ve kanıt altyapısıdır; karar zekâsı bu temelin üzerine kurulan yeteneklerden biridir.",
  "Not another ERP": "Bir başka ERP değil",
  "Keep your ERP. Keep your bank. Keep your insurer.": "ERP'nizi koruyun. Bankanızı koruyun. Sigortacınızı koruyun.",
  "DEĞERIA is designed as an economic transaction representation and evidence layer—not a replacement for the systems that already run the business.": "DEĞERIA, işletmeyi zaten yöneten sistemlerin yerine geçmek için değil; ekonomik işlem temsili ve kanıt katmanı olarak tasarlanmıştır.",
  "Who it is for": "Kimler için",
  "Built for the people who carry the economic decision.": "Ekonomik kararı taşıyan kişiler için tasarlandı.",
  "One shared transaction language across the manufacturer, the institution and the systems around them.": "Üretici, kurum ve çevresindeki sistemler arasında ortak bir işlem dili.",
  "Understand the economics of important transactions before committing scarce working capital.": "Kıt işletme sermayesini taahhüt etmeden önce önemli işlemlerin ekonomisini anlayın.",
  "Receive structured, evidence-linked transaction information for institutional review.": "Kurumsal inceleme için yapılandırılmış ve kanıta bağlı işlem bilgileri alın.",
  "Connect existing systems and evidence without replacing the manufacturer's core infrastructure.": "Üreticinin temel altyapısını değiştirmeden mevcut sistemleri ve kanıtları birbirine bağlayın.",
  "Explore the pathway": "Yolu keşfedin",
  "Research": "Araştırma",
  "Build the evidence around the infrastructure.": "Altyapının etrafında kanıtı inşa edin.",
  "Explore research": "Araştırmayı keşfedin",
  "The product journey": "Ürün yolculuğu",
  "From fragmented evidence to a recorded outcome.": "Parçalı kanıttan kaydedilmiş sonuca.",
  "Start with the real thing": "Gerçek işlemle başlayın",
  "Bring us one real transaction.": "Bize gerçek bir işlem getirin.",
  "We are validating DEĞERIA with Turkish manufacturers. Bring one significant import-to-production-to-export transaction and we will reconstruct the evidence, economics and readiness structure with you.": "DEĞERIA'yı Türkiye'deki üreticilerle doğruluyoruz. Önemli bir ithalat-üretim-ihracat işlemi getirin; kanıtları, ekonomiyi ve hazırlık yapısını sizinle birlikte yeniden oluşturalım.",
  "Build a Transaction Passport": "İşlem Pasaportu oluşturun",
  "NO ERP REPLACEMENT REQUIRED": "ERP DEĞİŞİKLİĞİ GEREKMEZ",
  "NO SENSITIVE DOCUMENTS ON FIRST CONTACT": "İLK TEMASTA HASSAS BELGE GEREKMEZ",
  "DEMO MODE AVAILABLE": "DEMO MODU MEVCUT",
};

const AR: Record<string, string> = {
  "Why a transaction needs structure": "لماذا تحتاج المعاملة إلى هيكل",
  "Important transactions rarely live in one system.": "نادراً ما توجد المعاملات المهمة داخل نظام واحد.",
  "The contract may be in email. The BOM may be in the ERP. Supplier costs may be in spreadsheets. Shipment and payment evidence arrive later. DEĞERIA does not replace these systems—it connects the economic evidence they produce.": "قد يكون العقد في البريد الإلكتروني، وقائمة المواد في نظام ERP، وتكاليف الموردين في جداول البيانات. تصل أدلة الشحن والدفع لاحقاً. لا تستبدل DEĞERIA هذه الأنظمة، بل تربط الأدلة الاقتصادية التي تنتجها.",
  "The invention": "الابتكار",
  "We don't replace the systems that run the factory.": "نحن لا نستبدل الأنظمة التي تدير المصنع.",
  "We create the economic transaction representation between them.": "بل ننشئ تمثيلاً اقتصادياً للمعاملة بينها.",
  "DEĞERIA sits above fragmented enterprise and transaction systems, organizing the evidence into one structured, traceable representation. Existing systems remain systems of record.": "تعمل DEĞERIA فوق أنظمة المؤسسة والمعاملات المتفرقة، وتنظم الأدلة في تمثيل واحد منظم وقابل للتتبع. وتبقى الأنظمة الحالية أنظمة السجل.",
  "See how the Passport works": "شاهد كيف يعمل الجواز",
  "What DEĞERIA produces": "ما الذي تنتجه DEĞERIA",
  "You give DEĞERIA the evidence. Here is what you get back.": "تقدم إلى DEĞERIA الأدلة، وتحصل في المقابل على ما يلي.",
  "Transaction Passport": "جواز المعاملة",
  "The structured representation of the transaction — commercial, import, production, export, financial and risk evidence, connected in one record.": "تمثيل منظم للمعاملة — الأدلة التجارية والاستيراد والإنتاج والتصدير والمالية والمخاطر مترابطة في سجل واحد.",
  "Economic assessment": "التقييم الاقتصادي",
  "Revenue, cost, margin, working-capital requirement, receivable exposure and FX exposure, calculated deterministically.": "يتم حساب الإيرادات والتكلفة والهامش واحتياجات رأس المال العامل والتعرض للذمم المدينة ومخاطر سعر الصرف بشكل حتمي.",
  "Evidence and risk view": "عرض الأدلة والمخاطر",
  "Evidence provenance, completeness, inconsistencies, missing information, and buyer, supplier and logistics risk.": "مصدر الأدلة واكتمالها والتناقضات والمعلومات الناقصة ومخاطر المشتري والمورد والخدمات اللوجستية.",
  "Transaction evidence file": "ملف أدلة المعاملة",
  "A structured output bringing the transaction, evidence and assessment together — for internal review or, in time, institutional review.": "مخرج منظم يجمع المعاملة والأدلة والتقييم — للمراجعة الداخلية أو للمراجعة المؤسسية مستقبلاً.",
  "One transaction. Too many fragments.": "معاملة واحدة. أجزاء كثيرة جداً.",
  "The economic reality of a transaction is distributed across documents, systems and stages. DEĞERIA brings the pieces into one structured representation.": "الواقع الاقتصادي للمعاملة موزع بين الوثائق والأنظمة والمراحل. تجمع DEĞERIA هذه الأجزاء في تمثيل منظم واحد.",
  "BEFORE": "قبل",
  "AFTER": "بعد",
  "Economic Evidence Graph": "رسم الأدلة الاقتصادية",
  "One transaction. One structured representation.": "معاملة واحدة. تمثيل منظم واحد.",
  "Every important number has a story.": "كل رقم مهم له قصة.",
  "Trace a value backwards through the evidence that supports it. Nothing important should appear as a black box.": "تتبع القيمة عكسياً عبر الأدلة التي تدعمها. لا ينبغي أن يظهر أي شيء مهم كصندوق أسود.",
  "Evidence provenance": "مصدر الأدلة وقابليتها للتتبع",
  "From documents to economic understanding.": "من الوثائق إلى الفهم الاقتصادي.",
  "Move through the transaction graph. Each node reveals its source, event, value, timestamp, status and relationship.": "تحرك عبر رسم المعاملة. تكشف كل عقدة مصدرها وحدثها وقيمتها وطابعها الزمني وحالتها وعلاقتها.",
  "The economic graph": "الرسم الاقتصادي",
  "Before commitment": "قبل الالتزام",
  "See the transaction before it becomes a problem.": "شاهد المعاملة قبل أن تصبح مشكلة.",
  "Change assumptions and see the economic consequences before scarce working capital is committed.": "غيّر الافتراضات وشاهد النتائج الاقتصادية قبل تخصيص رأس المال العامل المحدود.",
  "Payment term": "مدة السداد",
  "Supplier cost +5%": "تكلفة المورد +5%",
  "Freight +20%": "الشحن +20%",
  "Calculating...": "جارٍ الحساب...",
  "No change": "لا تغيير",
  "DEĞERIA ASSESSMENT": "تقييم DEĞERIA",
  "PROJECTED MARGIN": "الهامش المتوقع",
  "Primary drivers detected in the current model.": "تم اكتشاف العوامل الرئيسية في النموذج الحالي.",
  "Possible action": "إجراء محتمل",
  "Proceed to evidence review": "الانتقال إلى مراجعة الأدلة",
  "Decision support only. Final commercial, financial and institutional decisions remain with authorized parties.": "للدعم في اتخاذ القرار فقط. تبقى القرارات التجارية والمالية والمؤسسية النهائية لدى الأطراف المخولة.",
  "Readiness for the next step": "الجاهزية للخطوة التالية",
  "Ready for review is not the same as approved.": "الجاهزية للمراجعة لا تعني الموافقة.",
  "DEĞERIA prepares evidence and readiness. Financeability readiness is not a credit rating, financing decision, or loan approval. Insurance readiness is not insurance underwriting or an insurance approval. Banks, insurers and authorized institutions make their own decisions.": "تجهز DEĞERIA الأدلة والجاهزية. الجاهزية للتمويل ليست تصنيفاً ائتمانياً أو قرار تمويل أو موافقة على قرض. والجاهزية للتأمين ليست اكتتاباً تأمينياً أو موافقة تأمينية. تتخذ البنوك وشركات التأمين والمؤسسات المخولة قراراتها الخاصة.",
  "Designed for institutional integration": "مصمم للتكامل المؤسسي",
  "READY FOR INSTITUTIONAL REVIEW": "جاهز للمراجعة المؤسسية",
  "Insurance readiness": "الجاهزية للتأمين",
  "Make risk visible before asking someone else to carry it.": "اجعل المخاطر مرئية قبل أن تطلب من طرف آخر تحملها.",
  "Structure the transaction context, evidence index and known gaps for an informed review. Insurance readiness is not insurance underwriting or an insurance approval.": "نظم سياق المعاملة ومؤشر الأدلة والفجوات المعروفة لمراجعة مستنيرة. الجاهزية للتأمين ليست اكتتاباً تأمينياً أو موافقة تأمينية.",
  "Build the transaction file": "أنشئ ملف المعاملة",
  "Institutional evidence output": "مخرج الأدلة المؤسسية",
  "One transaction. One evidence file.": "معاملة واحدة. ملف أدلة واحد.",
  "This demonstration is labelled a Transaction Evidence File. \"Verified Export Asset File\" will be used only after verification standards are established.": "تم تصنيف هذا العرض على أنه ملف أدلة للمعاملة. ولن يُستخدم مصطلح \"ملف أصل تصدير موثق\" إلا بعد وضع معايير التحقق.",
  "After the transaction": "بعد المعاملة",
  "The transaction does not end when the shipment leaves.": "لا تنتهي المعاملة عند مغادرة الشحنة.",
  "DEĞERIA remembers what actually happened. That is the beginning of a durable decision memory.": "تتذكر DEĞERIA ما حدث فعلياً. وهذه بداية ذاكرة قرار مستدامة.",
  "Decision memory": "ذاكرة القرار",
  "What did you know? What did you decide? What happened?": "ماذا كنت تعرف؟ ماذا قررت؟ ماذا حدث؟",
  "A transaction becomes more valuable when its assumptions, human decisions and actual outcomes remain connected.": "تصبح المعاملة أكثر قيمة عندما تظل افتراضاتها وقرارات البشر ونتائجها الفعلية مترابطة.",
  "Technology principle": "مبدأ التقنية",
  "AI interprets.": "الذكاء الاصطناعي يفسر.",
  "Systems calculate.": "الأنظمة تحسب.",
  "Humans decide.": "البشر يقررون.",
  "DEĞERIA is not primarily a decision engine. It is transaction representation and evidence infrastructure; decision intelligence is one capability built on top of that foundation.": "DEĞERIA ليست في الأساس محرك قرار. إنها بنية لتمثيل المعاملة والأدلة؛ وذكاء القرار إحدى القدرات المبنية فوق هذا الأساس.",
  "Not another ERP": "ليست ERP أخرى",
  "Keep your ERP. Keep your bank. Keep your insurer.": "احتفظ بنظام ERP الخاص بك. واحتفظ ببنكك. واحتفظ بشركة التأمين الخاصة بك.",
  "DEĞERIA is designed as an economic transaction representation and evidence layer—not a replacement for the systems that already run the business.": "صُممت DEĞERIA كطبقة لتمثيل المعاملات الاقتصادية والأدلة، وليست بديلاً عن الأنظمة التي تدير الأعمال بالفعل.",
  "Who it is for": "لمن صُممت",
  "Built for the people who carry the economic decision.": "صُممت لمن يتحملون القرار الاقتصادي.",
  "One shared transaction language across the manufacturer, the institution and the systems around them.": "لغة معاملات مشتركة بين المصنع والمؤسسة والأنظمة المحيطة بهما.",
  "Understand the economics of important transactions before committing scarce working capital.": "افهم اقتصاديات المعاملات المهمة قبل الالتزام برأس المال العامل المحدود.",
  "Receive structured, evidence-linked transaction information for institutional review.": "احصل على معلومات معاملات منظمة ومرتبطة بالأدلة للمراجعة المؤسسية.",
  "Connect existing systems and evidence without replacing the manufacturer's core infrastructure.": "اربط الأنظمة والأدلة الحالية دون استبدال البنية الأساسية للمصنع.",
  "Explore the pathway": "استكشف المسار",
  "Build the evidence around the infrastructure.": "ابنِ الأدلة حول البنية التحتية.",
  "Explore research": "استكشف البحث",
  "The product journey": "رحلة المنتج",
  "From fragmented evidence to a recorded outcome.": "من الأدلة المتفرقة إلى نتيجة مسجلة.",
  "Start with the real thing": "ابدأ بالمعاملة الحقيقية",
  "Bring us one real transaction.": "أحضر لنا معاملة حقيقية واحدة.",
  "We are validating DEĞERIA with Turkish manufacturers. Bring one significant import-to-production-to-export transaction and we will reconstruct the evidence, economics and readiness structure with you.": "نحن نتحقق من DEĞERIA مع المصنعين الأتراك. أحضر معاملة مهمة من الاستيراد إلى الإنتاج إلى التصدير، وسنعيد بناء الأدلة والاقتصاد وهيكل الجاهزية معك.",
  "Build a Transaction Passport": "أنشئ جواز معاملة",
  "NO ERP REPLACEMENT REQUIRED": "لا حاجة لاستبدال ERP",
  "NO SENSITIVE DOCUMENTS ON FIRST CONTACT": "لا مستندات حساسة في الاتصال الأول",
  "DEMO MODE AVAILABLE": "وضع العرض متاح",
};

function locale(): "en" | "tr" | "ar" {
  const part = window.location.pathname.split("/")[1];
  return part === "tr" || part === "ar" ? part : "en";
}

function translateText(root: Node, dictionary: Record<string, string>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);
  nodes.forEach(textNode => {
    const parent = textNode.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"].includes(parent.tagName)) return;
    const raw = textNode.nodeValue ?? "";
    const trimmed = raw.trim();
    if (!trimmed) return;
    const translated = dictionary[trimmed];
    if (translated) textNode.nodeValue = raw.replace(trimmed, translated);
  });
}

export function useSiteLocalization() {
  useEffect(() => {
    const current = locale();
    if (current === "en") return;
    const dictionary = current === "tr" ? TR : AR;
    let scheduled = false;
    const apply = () => {
      scheduled = false;
      translateText(document.body, dictionary);
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(apply);
    };
    apply();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
}
