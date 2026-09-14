const fs = require('fs');

const lines = fs.readFileSync('server.ts', 'utf8').split('\n');

const newFunc = `// Upgraded Domain Fallback Engine with intelligent cross-questioning, intent detection, and 6-section simplified answers
function generateDomainFallbackResponse(
  query: string,
  language: string,
  conversationMessages: any[] = []
): {
  content: string;
  structured: any;
  referencedStandards: { code: string; title: string; scheme: string; mandatory: boolean }[];
  isFallback: boolean;
} {
  const isHi = language === 'hi';
  const q = query.toLowerCase().trim();

  // Extract previous context (last 6 turns)
  const historyText = (conversationMessages || [])
    .slice(-6)
    .map((m: any) => m.content || '')
    .join(' ')
    .toLowerCase();
  const fullContext = historyText + ' ' + q;

  // Track product entities from conversation history if available
  const contextProduct =
    /kettle|केतली/i.test(historyText) ? 'electric_kettle' :
    /pressure cooker|कुकर/i.test(historyText) ? 'pressure_cooker' :
    /water|पानी|bottle|14543/i.test(historyText) ? 'water' :
    /keyboard|कीबोर्ड|mouse|13252/i.test(historyText) ? 'keyboard' :
    /battery|बैटर|cell|16046/i.test(historyText) ? 'battery' :
    /helmet|हेलमेट|4151/i.test(historyText) ? 'helmet' :
    /toy|खिलौना|9873/i.test(historyText) ? 'toy' :
    /steel|स्टील|tmt|1786/i.test(historyText) ? 'steel' :
    /cement|सीमेंट|1489|269/i.test(historyText) ? 'cement' :
    /shoe|जूता|footwear|15844|15298/i.test(historyText) ? 'footwear' :
    /solar|सोलर|14286/i.test(historyText) ? 'solar' :
    /gold|सोना|jewel|huid|hallmark/i.test(historyText) ? 'gold' :
    /cable|केबल|wire|694/i.test(historyText) ? 'cable' :
    /led|bulb|बल्ब|16102/i.test(historyText) ? 'led' : null;

  // ==========================================
  // SCENARIO 9 & TOPIC SWITCH DETECTION FIRST
  // ==========================================
  const isHuidQuery = /huid|hallmark|gold.*check|jewel.*check|हॉलमार्क|सोना.*चेक/i.test(q);
  const isLicenceExpiredQuery = /(licence|license|cml).*expire|expired.*licence|renew.*licence|लाइसेंस.*समाप्त|लाइसेंस.*रिन्यू/i.test(q);

  // If user changed topic to HUID verification
  if (isHuidQuery) {
    const structured = {
      type: 'final_answer' as const,
      shortAnswer: isHi
        ? 'सोने के आभूषणों पर लेजर-उत्कीर्णित 6-अंकों वाले अल्फ़ान्यूमेरिक HUID (Hallmark Unique Identification) कोड को आप सीधे "BIS Care App" या manakonline.in पोर्टल से सत्यापित कर सकते हैं।'
        : 'You can verify the 6-digit alphanumeric Hallmark Unique Identification (HUID) code laser-engraved on gold jewellery directly using the official "BIS Care App" or on manakonline.in.',
      why: isHi
        ? 'यह कोड सोने की शुद्धता (जैसे 22K 916), ज्वैलर का नाम और मान्यता प्राप्त हॉलमार्किंग सेंटर (AHC) की प्रामाणिकता की तुरंत पुष्टि करता है।'
        : 'HUID guarantees purity (e.g. 22K916), jeweller registration authenticity, and hallmarking centre identification, protecting consumers against carat adulteration.',
      whatThisMeansForYou: isHi
        ? 'उपभोक्ता के रूप में आप किसी भी गहने को खरीदने से पहले ऐप में 6 अक्षरों का HUID डालकर तुरंत देख सकते हैं कि सोना असली है या नकली।'
        : 'As a consumer, simply type the 6-digit code into the BIS Care app before purchasing to verify purity, article type, and jeweller credentials instantly.',
      whatNext: isHi
        ? [
            'गूगल प्ले स्टोर या एप्पल ऐप स्टोर से आधिकारिक "BIS Care App" डाउनलोड करें।',
            'ऐप खोलें और "Verify HUID" (एचयूआईडी सत्यापन) विकल्प पर टैप करें।',
            'गहने पर अंकित 6-अंकों का अल्फ़ान्यूमेरिक कोड (जैसे A1B2C3) दर्ज करें और विवरण देखें।',
          ]
        : [
            'Download the official "BIS Care App" from Google Play Store or Apple App Store.',
            'Open the app and tap on the "Verify HUID" feature on the home dashboard.',
            'Enter the 6-character alphanumeric code engraved on your jewellery item (e.g., A1B2C3) to see full hallmarking details.',
          ],
      evidence: {
        standardCode: 'IS 1417:2016',
        standardTitle: 'Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking',
        scheme: 'Hallmarking Scheme',
        isMandatory: true,
        orderOrClause: 'Consumer Affairs Mandatory Hallmarking Quality Control Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'यह क्यों लागू होता है?' : 'Why Does This Apply?',
          content: isHi
            ? 'भारत सरकार के उपभोक्ता मामले विभाग ने अधिसूचित जिलों में बिना 6-डिजिट HUID के सोने के आभूषणों की बिक्री को पूर्णतः प्रतिबंधित कर दिया है।'
            : 'The Department of Consumer Affairs mandates hallmarking across notified districts to eliminate sub-standard gold karatage and protect consumer investment.',
          badge: 'Mandatory',
        },
        {
          title: isHi ? 'बीआईएस केयर ऐप सत्यापन प्रक्रिया' : 'BIS Care App Verification Steps',
          content: isHi
            ? 'सत्यापन के बाद ऐप में ज्वैलर का पंजीकरण नंबर, हॉलमार्किंग केंद्र (AHC) का नाम, हॉलमार्किंग की तारीख और शुद्धता (14K/18K/20K/22K/23K/24K) प्रदर्शित होती है।'
            : 'Upon entering the code, the portal displays the registered jeweller name, hallmarking centre ID, date of hallmarking, and exact purity grade.',
        },
      ],
      sessionContext: {
        product: 'Gold Jewellery',
        standardCode: 'IS 1417',
        scheme: 'Hallmarking',
        topic: 'huid_verification',
      },
      relatedOptions: [
        { label: isHi ? 'HUID सत्यापन खोलें' : 'Verify HUID Portal', action: 'verify_huid' as const },
        { label: isHi ? 'हॉलमार्किंग योजना देखें' : 'View Hallmarking Scheme', action: 'view_scheme' as const, target: 'Hallmarking (Gold & Silver)' },
        { label: isHi ? 'नजदीकी AHC केंद्र खोजें' : 'Find AHC Centre', action: 'find_lab' as const },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Another Question', action: 'ask_query' as const },
      ],
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: extractReferencedStandards('IS 1417 Hallmarking HUID'),
      isFallback: true,
    };
  }

  // If user asked about expired licence
  if (isLicenceExpiredQuery) {
    const structured = {
      type: 'final_answer' as const,
      shortAnswer: isHi
        ? 'यदि आपका बीआईएस सीएम/एल (CM/L) लाइसेंस समाप्त हो गया है, तो आप manakonline.in पर फॉर्म-X (Form X) के माध्यम से नवीनीकरण (Renewal) आवेदन तुरंत जमा कर सकते हैं।'
        : 'If your BIS CM/L license has expired, you can apply for renewal through Form X on manakonline.in within the prescribed grace period by paying the renewal fee and applicable late fees.',
      why: isHi
        ? 'बीआईएस (अनुरूपता मूल्यांकन) विनियम के अनुसार वैधता समाप्त होने के बाद फैक्ट्री में बिना नवीनीकृत लाइसेंस के ISI मार्क का उपयोग करना कानूनन दंडनीय है।'
        : 'Under BIS (Conformity Assessment) Regulations, manufacturing or dispatching goods bearing the ISI mark after license expiry is a punishable legal offense.',
      whatThisMeansForYou: isHi
        ? 'यदि समाप्ति को 90 दिन से कम हुए हैं, तो आप विलंब शुल्क (Late Fee) के साथ नवीनीकरण करवा सकते हैं। 90 दिन बीतने पर लाइसेंस निरस्त (Expired/Cancelled) माना जाता है और नया आवेदन करना पड़ सकता है।'
        : 'If your license expired within the last 90 days, you can apply for renewal with late fees. Beyond 90 days, the license is deemed cancelled and you may have to submit a fresh application.',
      whatNext: isHi
        ? [
            'manakonline.in पर अपने निर्माता क्रेडेंशियल्स से लॉग इन करें।',
            'लाइसेंस प्रबंधन अनुभाग में जाकर "Renewal of License (Form X)" चुनें।',
            'उत्पादन और मार्किंग शुल्क का विवरण भरें तथा विलंब शुल्क के साथ ऑनलाइन चालान का भुगतान करें।',
            'अपने क्षेत्रीय बीआईएस शाखा कार्यालय (Branch Office) को ईमेल भेजकर नवीनीकरण की स्थिति ट्रैक करें।',
          ]
        : [
            'Log into manakonline.in using your manufacturing credentials.',
            'Navigate to "License Management" and select "Renewal of License (Form X)".',
            'Submit updated production return details and pay the annual minimum marking fee plus late surcharge.',
            'Track processing and contact your regional BIS Branch Office to ensure endorsement before stock dispatch.',
          ],
      evidence: {
        standardCode: 'BIS Act 2016 / Regulations',
        standardTitle: 'BIS (Conformity Assessment) Regulations 2018 - Regulation 8 (Renewal of License)',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'Regulation 8 & Schedule II',
      },
      detailsAccordion: [
        {
          title: isHi ? 'नवीनीकरण शुल्क और विलंब शुल्क' : 'Renewal Fee & Grace Period Breakdown',
          content: isHi
            ? 'वैधता समाप्त होने से 30 दिन पहले सामान्य नवीनीकरण शुल्क ₹1,000 + वार्षिक मार्किंग फीस होती है। समाप्ति के बाद प्रति माह ₹5,000 तक विलंब शुल्क देय होता है।'
            : 'Standard renewal fee is ₹1,000 + minimum marking fee if applied 30 days prior to expiry. Post-expiry submissions attract late penalty surcharges under Schedule II.',
        },
      ],
      sessionContext: {
        topic: 'licence_renewal',
      },
      relatedOptions: [
        { label: isHi ? 'लाइसेंस सत्यापन जांचें' : 'Verify License Status', action: 'verify_license' as const },
        { label: isHi ? 'शुल्क कैलकुलेटर' : 'Fee Calculator', action: 'view_scheme' as const, target: 'fee-calculator' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Another Question', action: 'ask_query' as const },
      ],
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: [],
      isFallback: true,
    };
  }

  // If user asked "what is IS 13252?"
  if (/is\s*13252/i.test(q)) {
    const structured = {
      type: 'final_answer' as const,
      shortAnswer: isHi
        ? 'IS 13252 (Part 1):2010 सूचना प्रौद्योगिकी उपकरणों (IT Equipment) के लिए भारत का राष्ट्रीय सुरक्षा मानक है।'
        : 'IS 13252 (Part 1):2010 is the Indian National Safety Standard for Information Technology Equipment (equivalent to IEC 60950-1).',
      why: isHi
        ? 'इलेक्ट्रॉनिक्स एवं सूचना प्रौद्योगिकी मंत्रालय (MeitY) के अनिवार्य पंजीकरण आदेश (CRO) के तहत यह लैपटॉप, कीबोर्ड, प्रिंटर, पॉवर एडाप्टर और मोबाइल फोन के लिए अनिवार्य है।'
        : 'Mandated by MeitY under the Compulsory Registration Scheme (CRS) to protect users against electric shocks, fire risks, and thermal hazards.',
      whatThisMeansForYou: isHi
        ? 'निर्माता या आयातक के लिए: इसके लिए किसी फैक्ट्री ऑडिट की आवश्यकता नहीं होती। केवल बीआईएस-मान्यता प्राप्त भारतीय लैब से सुरक्षा टेस्ट रिपोर्ट लेकर crsbis.in पर आर-नंबर (R-Number) प्राप्त करना होता है।'
        : 'For manufacturers/importers: No factory inspection is needed. You only need sample safety testing in an accredited Indian lab to register your R-Number on crsbis.in.',
      whatNext: isHi
        ? [
            'उत्पाद के 1-2 सैंपल बीआईएस मान्यता प्राप्त लैब में भेजें।',
            'IS 13252 (Part 1) के तहत पास टेस्ट रिपोर्ट प्राप्त करें।',
            'crsbis.in पोर्टल पर आर-नंबर के लिए ऑनलाइन पंजीकरण करें।',
          ]
        : [
            'Send 1–2 test samples of your IT equipment to a BIS-recognized testing lab in India.',
            'Obtain a passing safety test report under IS 13252 (Part 1).',
            'Register on crsbis.in with the test report to obtain your official BIS R-Number.',
          ],
      evidence: {
        standardCode: 'IS 13252 (Part 1):2010 / IEC 60950-1',
        standardTitle: 'Information Technology Equipment - Safety (General Requirements)',
        scheme: 'Scheme II (CRS - Compulsory Registration)',
        isMandatory: true,
        orderOrClause: 'MeitY Compulsory Registration Order (CRO)',
      },
      detailsAccordion: [
        {
          title: isHi ? 'मानक का दायरा एवं कवर किए गए उत्पाद' : 'Scope & Covered IT Products',
          content: isHi
            ? 'वायरलेस/वायर्ड कीबोर्ड, माउस, लैपटॉप, नोटबुक, प्रिंटर, स्कैनर, पावर एडेप्टर, पीओएस टर्मिनल और यूपीएस प्रणाली।'
            : 'Keyboards, mouse devices, notebook computers, printers, copiers, visual display units, barcode scanners, and power adapters.',
        },
        {
          title: isHi ? 'प्रमुख सुरक्षा परीक्षण' : 'Key Safety Test Parameters',
          content: isHi
            ? 'इलेक्ट्रिकल इंसुलेशन प्रतिरोध, डाइइलेक्ट्रिक वोल्टेज विथस्टैंड, लीकेज करंट, अग्निरोधक आवरण और तापमान वृद्धि परीक्षण।'
            : 'Electrical insulation resistance, dielectric withstand voltage, touch current, abnormal operation test, and fire enclosure flammability.',
        },
      ],
      sessionContext: {
        product: 'IT Equipment',
        standardCode: 'IS 13252',
        scheme: 'Scheme II (CRS)',
        topic: 'standard_inquiry',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 13252)' : 'View Standard (IS 13252)', action: 'view_standard' as const, target: 'IS 13252' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'CRS Scheme Details', action: 'view_scheme' as const, target: 'Scheme II (CRS)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' as const },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' as const },
      ],
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: extractReferencedStandards('IS 13252 IT Equipment'),
      isFallback: true,
    };
  }

  // =========================================================================
  // SCENARIO 20: CONVERSATIONAL MEMORY FOR FOLLOW-UPS ("what about testing?", "what is the fee?")
  // =========================================================================
  const isTestingFollowup = /(what about|how about|tell me about|how to do)?\s*(testing|test|lab|प्रयोगशाला|परीक्षण)/i.test(q);
  const isFeeFollowup = /(what about|how about|tell me about|what is)?\s*(fee|cost|charges|rate|price|शुल्क|खर्चा|लागत)/i.test(q);

  if ((isTestingFollowup || isFeeFollowup) && contextProduct) {
    if (contextProduct === 'electric_kettle') {
      if (isTestingFollowup) {
        const structured = {
          type: 'final_answer' as const,
          shortAnswer: isHi
            ? 'इलेक्ट्रिक केतली (Electric Kettle) के लिए परीक्षण IS 302-2-15 और IS 302-1 के तहत अनिवार्य रूप से किया जाता है।'
            : 'For electric kettles, mandatory safety testing is conducted in accordance with IS 302-2-15 and general electrical appliance safety standard IS 302-1.',
          why: isHi
            ? 'केतली पानी गर्म करने के लिए उच्च वोल्टेज पर काम करती है, इसलिए बिजली के झटके और ड्राई-बॉयलिंग आग के जोखिम से सुरक्षा आवश्यक है।'
            : 'Because kettles combine water heating with 230V mains power, dry-boil cutoff, insulation resistance, and earth continuity must be verified.',
          whatThisMeansForYou: isHi
            ? 'आपकी फैक्ट्री में हाई-वोल्टेज ब्रेकडाउन टेस्टर, अर्थ बॉन्डिंग टेस्टर और लीकेज करंट मीटर होना चाहिए। शुरुआती लाइसेंस ग्रांट के लिए बीआईएस-मान्यता प्राप्त लैब से टाइप टेस्ट कराया जाता है।'
            : 'You need an in-house HV tester, earth resistance meter, and leakage current tester for daily batch inspection, plus independent NABL testing.',
          whatNext: isHi
            ? [
            'अपनी फैक्ट्री लैब में हाई वोल्टेज और इंसुलेशन प्रतिरोध मीटर कैलिब्रेट करें।',
            'केतली के 2 उत्पादन नमूने बीआईएस मान्यता प्राप्त लैब में स्वतंत्र परीक्षण हेतु भेजें।',
            'पास टेस्ट रिपोर्ट को अपने मानकई-ऑनलाइन आवेदन के साथ संलग्न करें।',
          ]
            : [
            'Equip your assembly plant with an earth bonding tester and high-voltage breakdown unit.',
            'Send 2 factory samples to a BIS-recognized testing laboratory for type-test clearance.',
            'Submit the passing test report with your Scheme of Inspection & Testing (SIT) on manakonline.in.',
          ],
          evidence: {
            standardCode: 'IS 302-2-15:2009',
            standardTitle: 'Safety of Household and Similar Electrical Appliances - Electric Kettles',
            scheme: 'Scheme I (ISI Mark)',
            isMandatory: true,
            orderOrClause: 'Electrical Appliances (Quality Control) Order',
          },
          detailsAccordion: [
            {
              title: isHi ? 'प्रमुख आवश्यक परीक्षण' : 'Key Mandatory Tests for Electric Kettles',
              content: isHi
                ? '1. लीकेज करंट और इलेक्ट्रिक स्ट्रेंथ\n2. थर्मल कट-आउट और ऑटोमैटिक शट-ऑफ टेस्ट\n3. अर्थिंग निरंतरता (<0.1 ohm)\n4. नमी प्रतिरोध और ओवरफ्लो टेस्ट'
                : '1. Leakage Current & Electric Breakdown at working temp\n2. Dry-boil thermal cutoff operation\n3. Earthing continuity (< 0.1 Ω)\n4. Cord anchor strain & moisture resistance',
            },
          ],
          sessionContext: {
            product: 'Electric Kettle',
            standardCode: 'IS 302-2-15',
            scheme: 'Scheme I (ISI Mark)',
            topic: 'testing',
          },
          relatedOptions: [
            { label: isHi ? 'इलेक्ट्रिकल लैब खोजें' : 'Find Electrical Labs', action: 'find_lab' as const },
            { label: isHi ? 'मानक देखें (IS 302-2-15)' : 'View IS 302-2-15', action: 'view_standard' as const, target: 'IS 302-2-15' },
            { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' as const },
          ],
        };
        return {
          content: formatStructuredToMarkdown(structured),
          structured,
          referencedStandards: extractReferencedStandards('IS 302-2-15 Electric Kettle testing'),
          isFallback: true,
        };
      }
      if (isFeeFollowup) {
        const structured = {
          type: 'final_answer' as const,
          shortAnswer: isHi
            ? 'इलेक्ट्रिक केतली के बीआईएस लाइसेंस के लिए आवेदन शुल्क ₹1,000, फैक्ट्री ऑडिट शुल्क ₹7,000/दिन, और वार्षिक न्यूनतम मार्किंग फीस लगभग ₹47,000 होती है। सूक्ष्म उद्यमों (Micro) को 50% छूट मिलती है।'
            : 'For an electric kettle ISI license, application fee is ₹1,000, factory audit fee is ₹7,000/man-day, and the minimum annual marking fee is approx ₹47,000. Micro enterprises with Udyam receive an automatic 50% discount.',
          why: isHi
            ? 'बीआईएस विनियम के तहत सभी विनिर्माताओं के लिए पारदर्शी सरकारी शुल्क तालिका तय की गई है।'
            : 'Official fee structure fixed under BIS (Conformity Assessment) Regulations 2018 with MSME concessions.',
          whatThisMeansForYou: isHi
            ? 'यदि आपके पास वैध उद्यम पंजीकरण है, तो न्यूनतम मार्किंग फीस ₹47,000 से घटकर केवल ₹23,500 रह जाएगी। महिला उद्यमियों को अतिरिक्त 10% छूट मिलती है।'
            : 'With an active Udyam certificate, your annual recurring marking fee is slashed from ₹47,000 to ₹23,500. Independent lab testing costs ₹15,000–₹25,000 one-time.',
          whatNext: isHi
            ? [
            'udyamregistration.gov.in से अपना मुफ्त उद्यम प्रमाणपत्र डाउनलोड करें।',
            'manakonline.in पर आवेदन शुल्क ₹1,000 का ऑनलाइन भुगतान करें।',
            'लाइसेंस जारी होने पर रियायती मार्किंग फीस चालान जमा करें।',
          ]
            : [
            'Download your valid Udyam Registration Certificate.',
            'Pay ₹1,000 application fee during online Form-V submission.',
            'Pay the concessional marking fee upon grant of your CM/L license.',
          ],
          evidence: {
            standardCode: 'IS 302-2-15:2009',
            standardTitle: 'Fee Schedule for Household Electrical Appliances',
            scheme: 'Scheme I (ISI Mark)',
            isMandatory: true,
            orderOrClause: 'BIS Fee Schedule & MSME Concession Circular',
          },
          detailsAccordion: [
            {
              title: isHi ? 'शुल्क का पूरा विवरण (MSME बनाम अन्य)' : 'Complete Cost Breakdown (MSME vs Large)',
              content: isHi
                ? '• आवेदन शुल्क: ₹1,000\n• ऑडिट शुल्क: ₹7,000\n• लैब टेस्टिंग शुल्क: ₹15,000 - ₹25,000\n• न्यूनतम मार्किंग शुल्क (सामान्य): ₹47,000/वर्ष\n• सूक्ष्म उद्यम (Micro 50% छूट): ₹23,500/वर्ष'
                : '• Application Fee: ₹1,000\n• Factory Audit Fee: ₹7,000 per man-day\n• Independent Lab Test: ₹15,000–₹25,000\n• Annual Minimum Marking Fee (Standard): ₹47,000\n• Micro Unit (50% Concession): ₹23,500',
            },
          ],
          sessionContext: {
            product: 'Electric Kettle',
            standardCode: 'IS 302-2-15',
            scheme: 'Scheme I (ISI Mark)',
            topic: 'fees',
          },
          relatedOptions: [
            { label: isHi ? 'शुल्क कैलकुलेटर' : 'Fee Calculator', action: 'view_scheme' as const, target: 'fee-calculator' },
            { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Steps', action: 'view_scheme' as const, target: 'Scheme I (ISI Mark)' },
            { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' as const },
          ],
        };
        return {
          content: formatStructuredToMarkdown(structured),
          structured,
          referencedStandards: extractReferencedStandards('IS 302-2-15 fee'),
          isFallback: true,
        };
      }
    }
  }

  // =========================================================================
  // SCENARIO 2 & SCENARIO 18: COMPLETE QUESTION / SPECIFIC PRODUCT QUERIES
  // (ELECTRIC KETTLE, PRESSURE COOKER, PACKAGED WATER, WIRELESS KEYBOARD, ETC.)
  // =========================================================================
  const isKettle = /electric kettle|kettle|केतली|302-2-15/i.test(fullContext);
  const isPressureCooker = /pressure cooker|cooker|प्रेशर कुकर|कुकर|2347/i.test(fullContext);

  // SCENARIO 2 & 18: Electric Kettle
  if (isKettle) {
    const structured = {
      type: 'final_answer' as const,
      shortAnswer: isHi
        ? 'हाँ, भारत में घरेलू इलेक्ट्रिक केतली (Electric Kettle) के लिए बीआईएस का ISI मार्क (Scheme I) कानूनन अनिवार्य है।'
        : 'Yes, domestic electric kettles strictly require mandatory BIS ISI Mark certification under Scheme I before manufacturing, importing, or selling in India.',
      why: isHi
        ? 'उपभोक्ता सुरक्षा के लिए विद्युत उपकरण (गुणवत्ता नियंत्रण) आदेश के तहत मानक IS 302-2-15 अनिवार्य किया गया है ताकि बिजली के झटके और आग के खतरे से बचा जा सके।'
        : 'Mandated under the Electrical Appliances Quality Control Order (QCO) under standard IS 302-2-15 to ensure shock safety, thermal protection, and dry-boil cutoff.',
      whatThisMeansForYou: isHi
        ? 'आपको अपनी फैक्ट्री में बुनियादी टेस्टिंग लैब (जैसे इंसुलेशन व अर्थ टेस्टर) लगानी होगी और बीआईएस अधिकारी के फैक्ट्री निरीक्षण के बाद ISI लाइसेंस (CM/L) मिलेगा। सूक्ष्म उद्यमों (Micro) को 50% मार्किंग फीस छूट मिलती है।'
        : 'You must set up basic in-house test equipment (dielectric tester, earth continuity tester) at your factory. A BIS inspecting officer conducts an audit before issuing the CM/L license. Micro units receive a 50% rebate on marking fees.',
      whatNext: isHi
        ? [
            'सुनिश्चित करें कि आपकी केतली का डिजाइन और कंपोनेंट्स (थर्मोस्टेट, एलिमेंट) IS 302-2-15 के अनुरूप हैं।',
            'manakonline.in पर फॉर्म-V भरकर विनिर्माण इकाई के विवरण के साथ ऑनलाइन आवेदन करें।',
            'बीआईएस फैक्ट्री निरीक्षण पूरा करवाएं और स्वतंत्र लैब सैंपल टेस्ट पास करके CM/L लाइसेंस प्राप्त करें।',
          ]
        : [
            'Ensure kettle design and heating components adhere strictly to IS 302-2-15:2009.',
            'Submit your online application (Form-V) on manakonline.in with factory layout and testing facility list.',
            'Clear the BIS factory audit and independent lab sample testing to receive your official ISI CM/L license.',
          ],
      evidence: {
        standardCode: 'IS 302-2-15:2009',
        standardTitle: 'Safety of Household and Similar Electrical Appliances - Particular Requirements for Electric Kettles',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'Electrical Appliances (Quality Control) Order enforced by DPIIT',
      },
      detailsAccordion: [
        {
          title: isHi ? 'यह क्यों लागू होता है?' : 'Why Does This Apply?',
          content: isHi
            ? 'घरेलू बिजली के उपकरणों में शॉर्ट सर्किट, लीकेज करंट और पानी के साथ बिजली के संपर्क के गंभीर खतरों को रोकने के लिए सरकार ने इसे अनिवार्य गुणवत्ता सूची में शामिल किया है।'
            : 'Enforced by the Ministry of Commerce & Industry (DPIIT) to protect domestic consumers from electrocution, overheating, and fire risks in household appliances.',
          badge: 'Mandatory QCO',
        },
        {
          title: isHi ? 'संबंधित बीआईएस क्लॉज एवं सुरक्षा मानक' : 'Relevant BIS Clauses & Construction Rules',
          content: isHi
            ? 'क्लॉज 8: लाइव पार्ट्स से सुरक्षा, क्लॉज 13: लीकेज करंट और इलेक्ट्रिक स्ट्रेंथ, क्लॉज 19: असामान्य संचालन (ड्राय बॉयल कटऑफ), क्लॉज 27: अर्थिंग प्रावधान।'
            : 'Clause 8: Protection against electric shock; Clause 13: Leakage current & dielectric strength; Clause 19: Abnormal operation (dry-boil cutoff test); Clause 27: Earthing continuity.',
        },
        {
          title: isHi ? 'अनिवार्य इन-हाउस परीक्षण उपकरण' : 'Essential Factory In-House Testing Equipment',
          content: isHi
            ? '1. हाई वोल्टेज ब्रेकडाउन टेस्टर (1.5 kV)\n2. इंसुलेशन रेजिस्टेंस टेस्टर (500V Megger)\n3. अर्थ निरंतरता परीक्षक\n4. पावर इनपुट एवं लीकेज करंट टेस्ट बेंच'
            : '1. High Voltage Breakdown Tester (1.5 kV AC)\n2. Insulation Resistance Tester (500V DC)\n3. Earth Continuity Tester with calibrated micro-ohmmeter\n4. Power input wattmeter and leakage current test bench',
        },
      ],
      sessionContext: {
        product: 'Electric Kettle',
        standardCode: 'IS 302-2-15',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 302-2-15)' : 'View Standard (IS 302-2-15)', action: 'view_standard' as const, target: 'IS 302-2-15' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme' as const, target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'इलेक्ट्रिकल लैब खोजें' : 'Find Testing Lab', action: 'find_lab' as const },
        { label: isHi ? 'फॉलो-अप पूछें' : 'Ask a Follow-up', action: 'ask_query' as const },
      ],
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: extractReferencedStandards('IS 302-2-15 Electric Kettle'),
      isFallback: true,
    };
  }

  // Pressure Cooker (e.g. "I make iron pressure cooker what standard")
  if (isPressureCooker) {
    const structured = {
      type: 'final_answer' as const,
      shortAnswer: isHi
        ? 'घरेलू प्रेशर कुकर (एल्यूमीनियम, स्टेनलेस स्टील या कच्चा लोहा/आयरन) के लिए बीआईएस मानक IS 2347:2017 के तहत ISI मार्क अनिवार्य है।'
        : 'Domestic pressure cookers (aluminium, stainless steel, or composite cast iron) require mandatory BIS ISI Mark certification under IS 2347:2017.',
      why: isHi
        ? 'प्रेशर कुकर में उच्च वाष्प दबाव (Steam Pressure) बनता है। विस्फोट और दुर्घटनाओं को रोकने के लिए उपभोक्ता मामले मंत्रालय ने इसके लिए सख्त गुणवत्ता आदेश (QCO) जारी किया है।'
        : 'High internal steam pressure poses explosion hazards. Mandated under the Domestic Pressure Cooker Quality Control Order to guarantee safety relief valve functioning.',
      whatThisMeansForYou: isHi
        ? 'हर कुकर पर सुरक्षा वाल्व (Safety Valve) और फ्यूजिबल प्लग का अनिवार्य हाइड्रोस्टैटिक परीक्षण होना चाहिए। बिना ISI मार्क के कुकर बेचना गैरकानूनी है।'
        : 'Every unit must undergo hydrostatic pressure testing and safety valve burst proofing. Selling non-ISI pressure cookers is a non-bailable legal violation in India.',
      whatNext: isHi
        ? [
            'कुकर बॉडी और सुरक्षा वाल्व को IS 2347 के प्रेशर रेटिंग विनिर्देशों के अनुसार निर्मित करें।',
            'फैक्ट्री में इन-हाउस हाइड्रोलिक प्रेशर टेस्टिंग रिग स्थापित करें।',
            'manakonline.in पर आवेदन जमा कर बीआईएस फैक्ट्री ऑडिट पूरा करें।',
          ]
        : [
            'Ensure body thickness, fusible safety plugs, and vent weights conform to IS 2347:2017.',
            'Install an in-house hydraulic pressure testing tank and burst pressure testing rig.',
            'Apply online via manakonline.in under Scheme I to receive your ISI license.',
          ],
      evidence: {
        standardCode: 'IS 2347:2017',
        standardTitle: 'Domestic Pressure Cookers - Specification',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'Domestic Pressure Cooker (Quality Control) Order enforced by DPIIT',
      },
      detailsAccordion: [
        {
          title: isHi ? 'संबंधित बीआईएस क्लॉज एवं सुरक्षा परीक्षण' : 'Relevant BIS Clauses & Safety Tests',
          content: isHi
            ? 'क्लॉज 8.1: प्रूफ प्रेशर टेस्ट (नियमित कार्य दबाव का 2 गुना), क्लॉज 8.2: बस्टिंग प्रेशर टेस्ट, क्लॉज 8.3: ऑपरेटिंग प्रेशर और सेफ्टी वॉल्व रिलीज टेस्ट।'
            : 'Clause 8.1: Proof pressure test at 2x operating pressure; Clause 8.2: Bursting pressure safety margin test; Clause 8.3: Operating pressure release & fusible alloy fuse test.',
        },
      ],
      sessionContext: {
        product: 'Pressure Cooker',
        standardCode: 'IS 2347',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 2347)' : 'View Standard (IS 2347)', action: 'view_standard' as const, target: 'IS 2347' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme' as const, target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' as const },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' as const },
      ],
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: extractReferencedStandards('IS 2347 Pressure Cooker'),
      isFallback: true,
    };
  }

  // SCENARIO 8: Wireless Keyboard (Complete query)
  const isKeyboard = /keyboard|कीबोर्ड|mouse|माउस|it equipment|laptop|computer/i.test(fullContext);
  if (isKeyboard && !/which|what product/i.test(q)) {
    const structured = {
      type: 'final_answer' as const,
      shortAnswer: isHi
        ? 'हाँ, वायरलेस कीबोर्ड के लिए बीआईएस की अनिवार्य पंजीकरण योजना (Scheme II - CRS) के तहत R-Number लेना अनिवार्य है।'
        : 'Yes, wireless keyboards require mandatory BIS registration under Scheme II (CRS) under standard IS 13252 (Part 1):2010 before sale or import into India.',
      why: isHi
        ? 'इलेक्ट्रॉनिक्स एवं सूचना प्रौद्योगिकी मंत्रालय (MeitY) के अनिवार्य पंजीकरण आदेश (CRO) के तहत उपभोक्ता सुरक्षा और विद्युत आग से बचाव के लिए यह अनिवार्य है।'
        : 'MeitY mandates standard IS 13252 (Part 1) to protect users from electrical shock, overheating, radio interference, and battery fire hazards.',
      whatThisMeansForYou: isHi
        ? 'आपके लिए बहुत आसान: इसके लिए किसी फैक्ट्री ऑडिट (निरीक्षण) की जरूरत नहीं होती! केवल भारतीय मान्यता प्राप्त लैब से टेस्ट कराकर crsbis.in पर आर-नंबर मिल जाता है।'
        : 'Good news: No factory audit is needed! You only need to send sample pieces to an accredited Indian lab and upload the report to crsbis.in to receive your R-Registration number.',
      whatNext: isHi
        ? [
            'वायरलेस कीबोर्ड का 1-2 सैंपल बीआईएस मान्यता प्राप्त लैब में टेस्टिंग के लिए भेजें।',
            'IS 13252 (Part 1) के तहत पास टेस्ट रिपोर्ट प्राप्त करें।',
            'crsbis.in पोर्टल पर ऑनलाइन आवेदन कर अपना आर-नंबर (R-Number) प्राप्त करें।',
          ]
        : [
            'Send 1–2 production samples of the wireless keyboard to a BIS-recognized testing lab in India.',
            'Obtain a passing safety test report under IS 13252 (Part 1).',
            'Apply online at crsbis.in with the test report to receive your official BIS R-Registration Number.',
          ],
      evidence: {
        standardCode: 'IS 13252 (Part 1):2010 / IEC 60950-1',
        standardTitle: 'Information Technology Equipment - Safety (General Requirements)',
        scheme: 'Scheme II (CRS - Compulsory Registration)',
        isMandatory: true,
        orderOrClause: 'MeitY Compulsory Registration Order (CRO)',
      },
      detailsAccordion: [
        {
          title: isHi ? 'यह क्यों लागू होता है?' : 'Why Does This Apply?',
          content: isHi
            ? 'मेइटी (MeitY) की अधिसूचना के अनुसार भारत में बेचे जाने वाले सभी वायरलेस एवं यूएसबी इनपुट डिवाइस को सुरक्षा मानकों पर खरा उतरना होता है।'
            : 'Notified under the MeitY Electronics & IT Goods Compulsory Registration Order. Unregistered units cannot clear customs or be listed on e-commerce platforms.',
        },
        {
          title: isHi ? 'आवश्यक लैब परीक्षण' : 'Accredited Lab Test Scope',
          content: isHi
            ? 'इंसुलेशन प्रतिरोध, डाइइलेक्ट्रिक विथस्टैंड वोल्टेज, ओवरहीटिंग और आरएफ सुरक्षा परीक्षण।'
            : 'Insulation resistance, dielectric voltage breakdown, power supply current consumption, thermal temperature rise, and plastic fire resistance.',
        },
      ],
      sessionContext: {
        product: 'Wireless Keyboard',
        standardCode: 'IS 13252',
        scheme: 'Scheme II (CRS)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 13252)' : 'View Standard (IS 13252)', action: 'view_standard' as const, target: 'IS 13252' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'CRS Process Steps', action: 'view_scheme' as const, target: 'Scheme II (CRS)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' as const },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' as const },
      ],
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: extractReferencedStandards('IS 13252 Wireless Keyboard'),
      isFallback: true,
    };
  }

  // =========================================================================
  // SCENARIO 4: "I manufacture a machine" (Ask single best question, not generic survey)
  // =========================================================================
  if (/machine|मशीन/i.test(q) && !/water pump|motor|pump|1786|compressor/i.test(fullContext)) {
    const structured = {
      type: 'clarification' as const,
      question: isHi
        ? 'सही बीआईएस मानक बताने के लिए मुझे एक जानकारी चाहिए: आप किस प्रकार की मशीन का निर्माण करते हैं?'
        : 'To identify the right BIS requirement, I need one detail: What specific type of machine do you manufacture?',
      contextHint: isHi
        ? 'मशीनरी के प्रकार के अनुसार अलग-अलग मानक लागू होते हैं (जैसे वाटर पंप एवं मोटर्स के लिए IS 9079/8472, जबकि खाद्य मशीनरी के लिए अलग QCO हैं)।'
        : 'Different machinery types follow different QCOs (e.g., water pumps and electric motors under IS 9079/IS 12615 vs. food processing equipment).',
      quickReplies: isHi
        ? ['वाटर पंप एवं इलेक्ट्रिक मोटर', 'खाद्य प्रसंस्करण मशीनरी', 'औद्योगिक मशीन टूल्स', 'कंप्रेसर एवं क्रेन', 'अन्य मशीनरी']
        : ['Water Pumps & Motors', 'Food Processing Machinery', 'Industrial Machine Tools', 'Compressors & Cranes', 'Other Machinery'],
      canSkip: true,
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: [],
      isFallback: true,
    };
  }

  // =========================================================================
  // SCENARIO 7: "I manufacture electronics in India" (Ask single best question to identify product)
  // =========================================================================
  if (/electronics|इलेक्ट्रॉनिक्स/i.test(q) && !isKeyboard && !/battery|led|charger|laptop/i.test(fullContext)) {
    const structured = {
      type: 'clarification' as const,
      question: isHi
        ? 'इलेक्ट्रॉनिक्स के लिए सही मानक बताने के लिए: आप किस विशिष्ट इलेक्ट्रॉनिक उत्पाद या उपकरण का निर्माण करते हैं?'
        : 'To guide you on the exact BIS requirement: What specific electronic product or device do you manufacture?',
      contextHint: isHi
        ? 'इलेक्ट्रॉनिक्स में वायरलेस इनपुट डिवाइस, पावर बैंक, मोबाइल चार्जर और एलईडी लैंप प्रत्येक के लिए अलग-अलग मानक हैं।'
        : 'Under Scheme II (CRS), wireless keyboards, power banks, adapters, and LED lamps each follow distinct technical standards.',
      quickReplies: isHi
        ? ['वायरलेस कीबोर्ड / माउस', 'पावर बैंक / लिथियम बैटरी', 'मोबाइल चार्जर / एडेप्टर', 'एलईडी बल्ब / लैंप', 'स्मार्ट वॉच / वियरेबल्स', 'अन्य उपकरण']
        : ['Wireless Keyboard / Mouse', 'Power Bank / Battery', 'Mobile Charger / Adapter', 'LED Lamp / Bulb', 'Smart Watch / Wearables', 'Other Device'],
      canSkip: true,
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: [],
      isFallback: true,
    };
  }

  // =========================================================================
  // SCENARIO 1 & SCENARIO 3 & SCENARIO 10 & 17: AMBIGUOUS / BROAD / VAGUE QUERIES
  // e.g. "Is BIS certification required?", "I want BIS certification", "Which standard?", "bis", "help"
  // =========================================================================
  const isAmbiguousOrBroad =
    /^(is bis required|is bis certification required|which standard|what standard|i want bis|i want bis certification|bis certification|how to get bis|can you guide|help|bis|certification|प्रमाणन|मानक|बीआईएस जरूरी है क्या)/i.test(q) ||
    q === 'bis' || q === 'standard' || q === 'help' || q.split(' ').length <= 2;

  if (isAmbiguousOrBroad && !contextProduct) {
    let questionText = isHi
      ? 'हाँ, बीआईएस की आवश्यकता उत्पाद पर निर्भर करती है। आप किस उत्पाद के बारे में जानना चाहते हैं?'
      : 'Yes, BIS requirements depend directly on the product. What product are you asking about?';

    if (/which standard|what standard/i.test(q)) {
      questionText = isHi
        ? 'आप किस उत्पाद या सेवा के लिए मानक जानना चाहते हैं?'
        : 'Which product or service do you need the standard for?';
    }

    const structured = {
      type: 'clarification' as const,
      question: questionText,
      contextHint: isHi
        ? 'भारत में 700+ से अधिक उत्पादों के लिए बीआईएस प्रमाणन अनिवार्य (QCO) है, जबकि अन्य के लिए स्वैच्छिक है।'
        : 'Over 700+ products are under mandatory Quality Control Orders (QCO), while others fall under voluntary standards.',
      quickReplies: isHi
        ? ['इलेक्ट्रिकल उपकरण (केतली, पंखे, प्रेस)', 'इलेक्ट्रॉनिक्स एवं आईटी (कीबोर्ड, चार्जर)', 'खाद्य एवं पेयजल (बोतलबंद पानी)', 'स्टील एवं निर्माण सामग्री', 'खिलौने एवं जूते', 'अन्य उत्पाद']
        : ['Electrical Appliances', 'Electronics & IT', 'Food & Drinking Water', 'Steel & Construction', 'Toys & Footwear', 'Other Product'],
      canSkip: true,
    };
    return {
      content: formatStructuredToMarkdown(structured),
      structured,
      referencedStandards: [],
      isFallback: true,
    };
  }

  // =========================================================================
  // OTHER COMMON PRODUCTS (PACKAGED WATER, BATTERIES, HELMETS, TOYS, STEEL, CEMENT, SHOES, SOLAR, CABLES, LED, FEES)
  // =========================================================================
  const isWater = /water|पानी|bottle|14543|mineral/i.test(fullContext);
  const isBattery = /battery|बैटर|cell|power bank|lithium|16046/i.test(fullContext);
  const isHelmet = /helmet|हेलमेट|headgear|4151|two wheeler/i.test(fullContext);
  const isToy = /toy|खिलौना|doll|9873|child/i.test(fullContext);
  const isSteel = /steel|स्टील|tmt|rebar|सरिया|1786|fe 500/i.test(fullContext);
  const isCement = /cement|सीमेंट|concrete|1489|269/i.test(fullContext);
  const isShoe = /shoe|जूता|footwear|leather|15844|15298|boot/i.test(fullContext);
  const isSolar = /solar|सोलर|pv|14286|photovoltaic/i.test(fullContext);
  const isCable = /cable|केबल|wire|तार|copper|694/i.test(fullContext);
  const isLed = /led|bulb|बल्ब|lamp|16102|light/i.test(fullContext);
  const isFee = /fee|शुल्क|cost|लागत|concession|छूट|rebate|msme|udyam/i.test(fullContext);

  let structured: any = null;

  if (isWater) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, पैकेज्ड पेयजल (Packaged Drinking Water) के लिए बीआईएस का ISI मार्क कानूनन अनिवार्य है।'
        : 'Yes, packaged drinking water strictly requires a mandatory BIS ISI Mark before any commercial sale or bottling.',
      why: isHi
        ? 'पेयजल सीधे जनस्वास्थ्य से जुड़ा है। खाद्य सुरक्षा एवं मानक प्राधिकरण (FSSAI) और स्वास्थ्य मंत्रालय ने इसके लिए IS 14543:2024 को अनिवार्य किया है।'
        : 'Water directly affects public health. The Ministry of Health & FSSAI mandate that all bottled drinking water must conform to IS 14543:2024.',
      whatThisMeansForYou: isHi
        ? 'आपको अपने बॉटलिंग प्लांट में एक हाइजीनिक क्लीनरूम और इन-हाउस माइक्रोबायोलॉजिकल/केमिकल लैब स्थापित करनी होगी। लाइसेंस मिलने से पहले बीआईएस अधिकारी फैक्ट्री का निरीक्षण करेंगे।'
        : 'You must set up a cleanroom filling area and an in-house microbiological/chemical testing lab at your facility. A BIS officer will inspect your factory before granting the ISI license.',
      whatNext: isHi
        ? [
            'फैक्ट्री में इन-हाउस लैब उपकरण (ऑटोक्लेव, इनक्यूबेटर) और रिवर्स ऑस्मोसिस प्लांट स्थापित करें।',
            'manakonline.in पर फॉर्म-V भरकर फैक्ट्री लेआउट के साथ ऑनलाइन आवेदन जमा करें।',
            'बीआईएस अधिकारी के फैक्ट्री ऑडिट में सहयोग करें और सैंपल लैब टेस्ट पास करें।',
          ]
        : [
            'Set up an in-house microbiological and chemical testing lab with clean bottling machinery.',
            'Submit Form-V online on manakonline.in with factory layout and testing equipment details.',
            'Undergo factory audit by a BIS inspecting officer and clear independent test samples.',
          ],
      evidence: {
        standardCode: 'IS 14543:2024',
        standardTitle: 'Packaged Drinking Water (Other than Natural Mineral Water)',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'FSSAI & BIS Mandatory Certification Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'अनिवार्य माइक्रोबायोलॉजिकल पैरामीटर्स' : 'Microbiological Safety Requirements',
          content: isHi
            ? 'ई-कोलाई, कोलीफॉर्म, स्यूडामोनास और फंगल स्पोर्स का शून्य स्तर अनिवार्य है।'
            : 'Zero tolerance for E. coli, coliform bacteria, Faecal Streptococci, and Pseudomonas aeruginosa per 250ml sample.',
        },
      ],
      sessionContext: {
        product: 'Packaged Drinking Water',
        standardCode: 'IS 14543',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 14543)' : 'View Standard (IS 14543)', action: 'view_standard', target: 'IS 14543' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isHelmet) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, दोपहिया वाहन चालकों के लिए सुरक्षा हेलमेट पर असली बीआईएस ISI मार्क होना कानूनन अनिवार्य है।'
        : 'Yes, protective helmets for two-wheeler riders must carry a genuine BIS ISI mark. Selling non-ISI helmets is illegal in India.',
      why: isHi
        ? 'सड़क परिवहन एवं राजमार्ग मंत्रालय (MoRTH) के आदेश के अनुसार यह सवारियों को सिर की गंभीर चोटों से बचाने के लिए अनिवार्य है।'
        : 'The Ministry of Road Transport and Highways (MoRTH) mandates IS 4151:2020 to ensure shock absorption, chin-strap strength, and rider road safety.',
      whatThisMeansForYou: isHi
        ? 'आपको प्रभाव अवशोषण (ड्रॉप टेस्ट) और स्ट्रैप तनन उपकरण लगाना होगा। सूक्ष्म उद्यमों (Micro Enterprises) को वार्षिक मार्किंग फीस में 50% की छूट मिलती है।'
        : 'You need in-house impact drop-test equipment and strap tensile rigs. Micro enterprises receive a 50% rebate on annual marking fees with Udyam.',
      whatNext: isHi
        ? [
            'हेलमेट डिजाइन और शैल सामग्री को IS 4151 मानकों के अनुरूप तैयार करें।',
            'manakonline.in पर अपने विनिर्माण परिसर के दस्तावेजों के साथ आवेदन करें।',
            'बीआईएस निरीक्षण पूरा करें और अपना सीएम/एल (CM/L) लाइसेंस नंबर प्राप्त करें।',
          ]
        : [
            'Ensure helmet design and shell materials meet IS 4151:2020 impact absorption standards.',
            'Apply online on manakonline.in with manufacturing premises and test equipment documents.',
            'Complete BIS factory inspection and receive your CM/L license number.',
          ],
      evidence: {
        standardCode: 'IS 4151:2020',
        standardTitle: 'Protective Helmets for Two-Wheeler Riders',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'MoRTH Two-Wheeler Helmet Quality Control Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'प्रमुख यांत्रिक परीक्षण' : 'Key Mechanical Tests under IS 4151',
          content: isHi
            ? 'इम्पैक्ट ड्रॉप टेस्ट, चिन स्ट्रैप रिटेंशन टेस्ट, और विज़र लाइट ट्रांसमिशन टेस्ट।'
            : 'Shock absorption impact drop test at ambient, heat, and cold temperatures; retention system dynamic extension test.',
        },
      ],
      sessionContext: {
        product: 'Two-Wheeler Helmet',
        standardCode: 'IS 4151',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 4151)' : 'View Standard (IS 4151)', action: 'view_standard', target: 'IS 4151' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isBattery) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, लिथियम-आयन बैटरी, सेल और पावर बैंक के लिए बीआईएस की CRS पंजीकरण योजना अनिवार्य है।'
        : 'Yes, portable Lithium-ion cells, batteries, and power banks must have BIS CRS registration before sale or import.',
      why: isHi
        ? 'इलेक्ट्रॉनिक्स मंत्रालय (MeitY) के आदेशानुसार ओवरचार्जिंग, शॉर्ट सर्किट और बैटरी फटने के खतरों को रोकने के लिए यह सुरक्षा अनिवार्य की गई है।'
        : 'MeitY mandates standard IS 16046 (Part 2) to prevent thermal runaway, short circuits, and fire hazards in portable consumer electronics.',
      whatThisMeansForYou: isHi
        ? 'फैक्ट्री ऑडिट की आवश्यकता नहीं है। केवल मान्यता प्राप्त लैब में बैटरी पैक टेस्ट कराकर टेस्ट रिपोर्ट crsbis.in पर अपलोड करनी होती है।'
        : 'No factory audit is needed. You only need to test battery samples in a BIS-recognized lab and upload the test report to crsbis.in.',
      whatNext: isHi
        ? [
            'जांच लें कि आपके द्वारा उपयोग किए जा रहे कच्चे लिथियम सेल स्वयं बीआईएस प्रमाणित हों।',
            'मान्यता प्राप्त भारतीय टेस्टिंग लैब में बैटरी पैक के सैंपल जमा करें।',
            'पास टेस्ट रिपोर्ट को crsbis.in पर अपलोड कर अपना आर-नंबर (R-Number) प्राप्त करें।',
          ]
        : [
            'Ensure the raw lithium cells used are themselves BIS certified under IS 16046.',
            'Submit battery pack samples to an accredited Indian test laboratory.',
            'Upload the passing test report to crsbis.in to obtain your R-Number.',
          ],
      evidence: {
        standardCode: 'IS 16046 (Part 2):2018 / IEC 62133-2',
        standardTitle: 'Secondary Cells and Batteries containing Alkaline/Non-Acid Electrolytes (Lithium Systems)',
        scheme: 'Scheme II (CRS - Compulsory Registration)',
        isMandatory: true,
        orderOrClause: 'MeitY Electronics & IT Goods (Compulsory Registration) Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'बैटरी सुरक्षा परीक्षण' : 'Lithium Safety Testing Parameters',
          content: isHi
            ? 'शॉर्ट सर्किट, फ्री फॉल ड्रॉप, थर्मल एब्यूज (130°C), क्रश टेस्ट और ओवरचार्ज सुरक्षा परीक्षण।'
            : 'Continuous charging, external short circuit, free fall drop, thermal abuse at 130°C, and crush test.',
        },
      ],
      sessionContext: {
        product: 'Lithium Battery',
        standardCode: 'IS 16046',
        scheme: 'Scheme II (CRS)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 16046)' : 'View Standard (IS 16046)', action: 'view_standard', target: 'IS 16046' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme II (CRS)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isToy) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, भारत में सभी प्रकार के बच्चों के खिलौनों (इलेक्ट्रिक एवं नॉन-इलेक्ट्रिक) के लिए बीआईएस ISI मार्क अनिवार्य है।'
        : 'Yes, all children’s toys (both electric and non-electric) require mandatory BIS ISI Mark certification under the Toys QCO.',
      why: isHi
        ? 'उद्योग एवं आंतरिक व्यापार संवर्धन विभाग (DPIIT) ने बच्चों को नुकीले किनारों, जहरीले रसायनों और दम घुटने के खतरों से बचाने के लिए इसे अनिवार्य किया है।'
        : 'DPIIT enforces strict physical, mechanical, and chemical safety under IS 9873 to protect children from toxic heavy metals, choking, and sharp edges.',
      whatThisMeansForYou: isHi
        ? 'फैक्ट्री ऑडिट और इन-हाउस टेस्टिंग अनिवार्य है। सूक्ष्म इकाइयों (Micro units) को मार्किंग फीस में 50% की छूट दी जाती है।'
        : 'A factory audit is required. Micro enterprises with valid Udyam registration receive a 50% concession on annual marking fees.',
      whatNext: isHi
        ? [
            'खिलौनों के मॉडल को सामग्री (प्लास्टिक, लकड़ी, प्लश, इलेक्ट्रॉनिक) के अनुसार वर्गीकृत करें।',
            'manakonline.in पर फॉर्म-V भरकर ऑनलाइन आवेदन जमा करें।',
            'बीआईएस निरीक्षण करवाएं और सैंपल टेस्टिंग पास कर ISI मार्क प्राप्त करें।',
          ]
        : [
            'Classify your toy models by material and series (plush, plastic, electric, wooden).',
            'Submit your online application on manakonline.in under Scheme I.',
            'Undergo factory inspection and clear third-party sample testing to receive your ISI license.',
          ],
      evidence: {
        standardCode: 'IS 9873 (Parts 1-9) / IS 15644',
        standardTitle: 'Safety of Toys (Mechanical, Physical, Flammability & Chemical Safety)',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'DPIIT Toys (Quality Control) Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'खिलौना सुरक्षा भाग' : 'Toy Safety Sub-Standards',
          content: isHi
            ? 'IS 9873 Part 1 (यांत्रिक एवं भौतिक), Part 2 (ज्वलनशीलता), Part 3 (8 भारी धातुओं का रासायनिक विश्लेषण)।'
            : 'IS 9873-1: Mechanical hazards; IS 9873-2: Flammability; IS 9873-3: Migration of 8 toxic heavy metals (Lead, Cadmium, etc.).',
        },
      ],
      sessionContext: {
        product: 'Toys',
        standardCode: 'IS 9873',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 9873)' : 'View Standard (IS 9873)', action: 'view_standard', target: 'IS 9873' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isSteel) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, निर्माण कार्य में प्रयुक्त होने वाले टीएमटी स्टील सरिए (Fe 500, Fe 550D) के लिए बीआईएस ISI मार्क अनिवार्य है।'
        : 'Yes, high-strength TMT deformed steel bars (Fe 500, Fe 550D) require mandatory BIS ISI Mark certification by law.',
      why: isHi
        ? 'इस्पात मंत्रालय के गुणवत्ता नियंत्रण आदेश के तहत भवनों एवं पुलों की मजबूती और भूकंप प्रतिरोधक क्षमता सुनिश्चित करने के लिए यह अनिवार्य है।'
        : 'Mandated under Ministry of Steel Quality Control Order to guarantee structural yield strength, ductility, and earthquake safety.',
      whatThisMeansForYou: isHi
        ? 'फैक्ट्री में इन-हाउस केमिकल स्पेक्ट्रोमीटर और यूनिवर्सल टेस्टिंग मशीन (UTM) होना अनिवार्य है।'
        : 'The plant must have an in-house direct-reading optical emission spectrometer and a calibrated Universal Testing Machine (UTM).',
      whatNext: isHi
        ? [
            'फैक्ट्री में अनिवार्य तनन एवं रासायनिक परीक्षण उपकरण स्थापित करें।',
            'manakonline.in पर अपना आवेदन सबमिट करें।',
            'बीआईएस तकनीकी ऑडिट और सैंपल परीक्षण पास करें।',
          ]
        : [
            'Equip your rolling mill with a calibrated UTM and chemical spectrometer.',
            'Submit your application through the manakonline.in portal.',
            'Pass the comprehensive BIS factory audit and sample verification.',
          ],
      evidence: {
        standardCode: 'IS 1786:2008',
        standardTitle: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'Ministry of Steel (Quality Control) Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'आवश्यक यांत्रिक एवं रासायनिक सीमाएं' : 'Mechanical & Chemical Limits',
          content: isHi
            ? 'Fe 500D: न्यूनतम 500 N/mm² यील्ड स्ट्रेंथ, 16% न्यूनतम एलॉन्गेशन, अधिकतम 0.040% सल्फर और फॉस्फोरस।'
            : 'Fe 500D: 500 N/mm² minimum yield stress, 16% elongation, max 0.040% S & P, bend and rebend tests without fractures.',
        },
      ],
      sessionContext: {
        product: 'TMT Steel',
        standardCode: 'IS 1786',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 1786)' : 'View Standard (IS 1786)', action: 'view_standard', target: 'IS 1786' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isCement) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, पोर्टलैंड सीमेंट (PPC, OPC) के सभी प्रकारों के लिए बीआईएस ISI मार्क कानूनन अनिवार्य है।'
        : 'Yes, all varieties of Portland cement (PPC, OPC) require strictly mandatory BIS ISI Mark certification.',
      why: isHi
        ? 'सीमेंट गुणवत्ता नियंत्रण आदेश के तहत राष्ट्रीय अवसंरचना की दीर्घकालिक सुरक्षा और कंप्रेसिव स्ट्रेंथ सुनिश्चित करने के लिए यह अनिवार्य है।'
        : 'Enforced under the Cement Quality Control Order to guarantee the compressive strength and durability of public infrastructure.',
      whatThisMeansForYou: isHi
        ? 'फैक्ट्री में 28-दिवसीय क्योरिंग टैंक, ब्लेन उपकरण और पूर्ण भौतिक/रासायनिक लैब होना जरूरी है।'
        : 'Requires dedicated chemical and physical testing labs with 28-day curing tanks and calibrated compressive testing machines.',
      whatNext: isHi
        ? [
            'संयंत्र में पूर्ण इन-हाउस परीक्षण प्रयोगशाला स्थापित करें।',
            'manakonline.in पर अपना आवेदन जमा करें।',
            'बीआईएस निरीक्षण करवाएं और 28-दिन के सैंपल टेस्ट क्लीयरेंस की प्रतीक्षा करें।',
          ]
        : [
            'Establish an in-house chemical and physical testing laboratory.',
            'Submit application via manakonline.in.',
            'Facilitate BIS factory inspection and wait for 28-day compressive sample testing.',
          ],
      evidence: {
        standardCode: 'IS 1489:2015 / IS 269:2015',
        standardTitle: 'Portland Pozzolana Cement / Ordinary Portland Cement',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'Cement (Quality Control) Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'सीमेंट परीक्षण पैरामीटर्स' : 'Cement Test Parameters',
          content: isHi
            ? 'प्रारंभिक एवं अंतिम सेटिंग समय, कंप्रेसिव स्ट्रेंथ (3, 7 और 28 दिन) और साउंडनेस टेस्ट।'
            : 'Initial setting time (> 30 min), final setting time (< 600 min), 28-day compressive strength, and Le-Chatelier soundness.',
        },
      ],
      sessionContext: {
        product: 'Cement',
        standardCode: 'IS 1489',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 1489)' : 'View Standard (IS 1489)', action: 'view_standard', target: 'IS 1489' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isShoe) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, चमड़े के जूते और सुरक्षा जूतों के लिए बीआईएस प्रमाणन अनिवार्य है।'
        : 'Yes, leather footwear and safety shoes require mandatory BIS ISI Mark certification under the Footwear QCO.',
      why: isHi
        ? 'घटिया और असुरक्षित जूतों की बिक्री रोकने और गुणवत्ता सुधारने के लिए DPIIT ने इसे अनिवार्य किया है।'
        : 'Mandated by DPIIT Footwear Quality Control Order to protect consumers and ensure durability and sole adhesion strength.',
      whatThisMeansForYou: isHi
        ? 'सूक्ष्म एवं लघु उत्पादकों को विशेष समय-सीमा और वार्षिक शुल्क में 50% की छूट प्राप्त है।'
        : 'Micro enterprises have relaxed implementation timelines and a 50% rebate on annual marking fees.',
      whatNext: isHi
        ? [
            'जूतों के सोल बॉन्डिंग और फ्लेक्सिंग स्ट्रेंथ की जांच करें।',
            'manakonline.in पर ऑनलाइन आवेदन दर्ज करें।',
            'फैक्ट्री ऑडिट पूरा कर ISI लाइसेंस प्राप्त करें।',
          ]
        : [
            'Verify sole bonding and flexing endurance at in-house or accredited lab.',
            'Submit online application on manakonline.in.',
            'Complete factory inspection and obtain ISI license.',
          ],
      evidence: {
        standardCode: 'IS 15844:2010',
        standardTitle: 'Leather Safety and Everyday Footwear Standards',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'DPIIT Footwear (Quality Control) Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'जूता परीक्षण आवश्यकताएं' : 'Footwear Safety Tests',
          content: isHi
            ? 'अपर एवं सोल बॉन्डिंग स्ट्रेंथ, फ्लेक्सिंग रेजिस्टेंस और टो-कैप इम्पैक्ट सुरक्षा परीक्षण।'
            : 'Upper-to-sole adhesion peel test, vamp flexing endurance, slip resistance, and steel toe-cap 200 Joules impact resistance.',
        },
      ],
      sessionContext: {
        product: 'Footwear',
        standardCode: 'IS 15844',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 15844)' : 'View Standard (IS 15844)', action: 'view_standard', target: 'IS 15844' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isSolar) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, सोलर पीवी मॉड्यूल्स और इनवर्टर के लिए बीआईएस CRS पंजीकरण अनिवार्य है।'
        : 'Yes, terrestrial solar PV modules and inverters must have BIS CRS registration under MNRE guidelines.',
      why: isHi
        ? 'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE) ने भारतीय जलवायु में 25 वर्षों तक सुरक्षित बिजली उत्पादन सुनिश्चित करने के लिए यह अनिवार्य किया है।'
        : 'Mandated under MNRE Solar Photovoltaics Order to guarantee 25-year reliability, hail resistance, and electrical safety.',
      whatThisMeansForYou: isHi
        ? 'फैक्ट्री ऑडिट की आवश्यकता नहीं है। केवल मान्यता प्राप्त सोलर लैब से टेस्ट कराकर crsbis.in पर पंजीकरण कराना होता है।'
        : 'No factory audit is required. You only need type-testing reports from an accredited solar lab uploaded to crsbis.in.',
      whatNext: isHi
        ? [
            'मान्यता प्राप्त सोलर टेस्ट लैब में मॉड्यूल्स के सैंपल जमा करें।',
            'IS 14286 और IS/IEC 61730 के तहत पास रिपोर्ट प्राप्त करें।',
            'crsbis.in पर रजिस्टर कर अपना आर-नंबर (R-Number) प्राप्त करें।',
          ]
        : [
            'Submit solar module samples to an MNRE/BIS-recognized test facility.',
            'Receive compliant test report under IS 14286 & IS/IEC 61730.',
            'Register on crsbis.in to obtain your official R-Number.',
          ],
      evidence: {
        standardCode: 'IS 14286:2010 / IEC 61215',
        standardTitle: 'Crystalline Silicon Terrestrial Photovoltaic (PV) Modules',
        scheme: 'Scheme II (CRS - Compulsory Registration)',
        isMandatory: true,
        orderOrClause: 'MNRE Solar Photovoltaic Systems Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'सोलर मॉड्यूल परीक्षण' : 'Solar PV Test Sequence',
          content: isHi
            ? 'थर्मल साइकिलिंग, डैम्प-हीट टेस्ट (85°C/85% RH 1000 घंटे), ओलावृष्टि (हेल) प्रभाव और मैकेनिकल लोड टेस्ट।'
            : 'Thermal cycling test (-40°C to +85°C), damp-heat 1000h test, mechanical snow/wind load test, and hailstone impact test.',
        },
      ],
      sessionContext: {
        product: 'Solar PV Modules',
        standardCode: 'IS 14286',
        scheme: 'Scheme II (CRS)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 14286)' : 'View Standard (IS 14286)', action: 'view_standard', target: 'IS 14286' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme II (CRS)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isCable) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, पीवीसी इंसुलेटेड घरेलू तारों एवं इलेक्ट्रिक केबल्स के लिए बीआईएस ISI मार्क अनिवार्य है।'
        : 'Yes, PVC insulated domestic wires and cables require mandatory BIS ISI Mark certification.',
      why: isHi
        ? 'इलेक्ट्रिकल तार गुणवत्ता नियंत्रण आदेश के तहत घरों और इमारतों में शॉर्ट-सर्किट और आग की घटनाओं से सुरक्षा के लिए यह आवश्यक है।'
        : 'Enforced under Electrical Wires QCO to protect buildings and residents from short-circuit electrical fires.',
      whatThisMeansForYou: isHi
        ? 'फैक्ट्री में कंडक्टर रेजिस्टेंस, इंसुलेशन मोटाई और स्पार्क टेस्टिंग उपकरण होना अनिवार्य है।'
        : 'Requires in-house conductor resistance bridges, insulation thickness micrometers, and spark testers.',
      whatNext: isHi
        ? [
            'संयंत्र में कंडक्टर प्रतिरोध और स्पार्क टेस्टर स्थापित करें।',
            'manakonline.in पर ऑनलाइन आवेदन दर्ज करें।',
            'बीआईएस फैक्ट्री निरीक्षण करवाएं और सैंपल क्लीयरेंस प्राप्त करें।',
          ]
        : [
            'Equip plant with conductor resistance and high-voltage spark testing rigs.',
            'Apply online through manakonline.in.',
            'Pass BIS factory inspection and sample test verification.',
          ],
      evidence: {
        standardCode: 'IS 694:2010',
        standardTitle: 'PVC Insulated Cables for Working Voltages up to and including 1100 V',
        scheme: 'Scheme I (ISI Mark)',
        isMandatory: true,
        orderOrClause: 'Electrical Wires & Cables Quality Control Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'केबल परीक्षण विनिर्देश' : 'Cable Testing Scope under IS 694',
          content: isHi
            ? 'कंडक्टर प्रतिरोध (20°C), इंसुलेशन तनन सामर्थ्य, थर्मल एजिंग और 3kV स्पार्क टेस्ट।'
            : 'Conductor resistance at 20°C, insulation tensile strength and elongation at break, loss of mass test, and 3kV spark testing.',
        },
      ],
      sessionContext: {
        product: 'PVC Cables',
        standardCode: 'IS 694',
        scheme: 'Scheme I (ISI Mark)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 694)' : 'View Standard (IS 694)', action: 'view_standard', target: 'IS 694' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isLed) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'हाँ, सामान्य प्रकाश व्यवस्था के लिए सेल्फ-बैलास्टेड एलईडी लैंप और बल्ब के लिए बीआईएस CRS पंजीकरण अनिवार्य है।'
        : 'Yes, self-ballasted LED lamps and bulbs require mandatory BIS CRS registration before sale in India.',
      why: isHi
        ? 'इलेक्ट्रॉनिक्स मंत्रालय (MeitY) के आदेशानुसार फोटोबायोलॉजिकल सुरक्षा और बिजली की बचत के लिए यह अनिवार्य है।'
        : 'Covered under MeitY Compulsory Registration Scheme to ensure electrical safety, thermal stability, and high energy efficiency.',
      whatThisMeansForYou: isHi
        ? 'फैक्ट्री निरीक्षण की आवश्यकता नहीं है। केवल लैब से टेस्ट कराकर crsbis.in पर आर-नंबर प्राप्त करना होता है।'
        : 'No factory audit is needed. You only need safety and photobiological test reports from a recognized lab.',
      whatNext: isHi
        ? [
            'एलईडी बल्ब के सैंपल मान्यता प्राप्त टेस्टिंग लैब में भेजें।',
            'IS 16102 (Part 1) के तहत पास टेस्ट रिपोर्ट प्राप्त करें।',
            'crsbis.in पर टेस्ट रिपोर्ट अपलोड कर अपना आर-नंबर प्राप्त करें।',
          ]
        : [
            'Send LED lamp samples to a BIS-recognized test laboratory.',
            'Obtain compliant test report under IS 16102 (Part 1).',
            'Upload report to crsbis.in to receive your official R-Number.',
          ],
      evidence: {
        standardCode: 'IS 16102 (Part 1):2012',
        standardTitle: 'Self-Ballasted LED Lamps for General Lighting Services - Safety Requirements',
        scheme: 'Scheme II (CRS - Compulsory Registration)',
        isMandatory: true,
        orderOrClause: 'MeitY Electronics Goods Order',
      },
      detailsAccordion: [
        {
          title: isHi ? 'एलईडी सुरक्षा परीक्षण' : 'LED Safety Parameters',
          content: isHi
            ? 'कैप टॉर्क टेस्ट, इंसुलेशन प्रतिरोध, डाइइलेक्ट्रिक वोल्टेज और असामान्य हीटिंग प्रतिरोध।'
            : 'Lamp cap torque resistance, insulation resistance, fault condition test, and resistance to heat and fire.',
        },
      ],
      sessionContext: {
        product: 'LED Lamps',
        standardCode: 'IS 16102',
        scheme: 'Scheme II (CRS)',
        topic: 'certification',
      },
      relatedOptions: [
        { label: isHi ? 'मानक देखें (IS 16102)' : 'View Standard (IS 16102)', action: 'view_standard', target: 'IS 16102' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme II (CRS)' },
        { label: isHi ? 'टेस्टिंग लैब खोजें' : 'Find Testing Lab', action: 'find_lab' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else if (isFee) {
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'बीआईएस एमएसएमई उद्यमों को विशेष रियायत देता है: सूक्ष्म (Micro) इकाइयों को न्यूनतम मार्किंग फीस में 50% और लघु (Small) इकाइयों को 20% की छूट मिलती है।'
        : 'BIS offers significant financial concessions: Micro enterprises receive a 50% discount on annual marking fees, and Small enterprises receive a 20% discount.',
      why: isHi
        ? 'ताकि छोटे उद्यमियों, महिलाओं और स्टार्टअप्स पर गुणवत्ता प्रमाणन का अतिरिक्त आर्थिक बोझ न पड़े और "मेक इन इंडिया" को प्रोत्साहन मिले।'
        : 'To encourage Indian startups, women entrepreneurs, and MSMEs to adopt world-class quality standards without heavy upfront costs.',
      whatThisMeansForYou: isHi
        ? 'यदि आपके पास वैध उद्यम पंजीकरण (Udyam Certificate) है, तो आपके वार्षिक लाइसेंस शुल्क में आधी बचत होगी। महिला उद्यमियों को अतिरिक्त 10% विशेष छूट मिलती है।'
        : 'With a valid Udyam Registration Certificate, your recurring annual licensing costs are cut by up to half. Women and SC/ST entrepreneurs receive an additional 10% concession.',
      whatNext: isHi
        ? [
            'udyamregistration.gov.in से अपना निःशुल्क उद्यम प्रमाणपत्र डाउनलोड करें।',
            'manakonline.in पर आवेदन करते समय उद्यम प्रमाणपत्र अपलोड करें।',
            'आपके चालान में 50% की छूट स्वतः लागू हो जाएगी।',
          ]
        : [
            'Obtain your free Udyam Registration Certificate from udyamregistration.gov.in.',
            'Upload the Udyam certificate when submitting your application on manakonline.in.',
            'The 50% marking fee concession will be calculated automatically on your invoice.',
          ],
      evidence: {
        standardCode: 'BIS (Conformity Assessment) Regulations',
        standardTitle: 'Fee Schedule and MSME Concession Circulars',
        scheme: 'Scheme I & Scheme II',
        isMandatory: false,
        orderOrClause: 'BIS Gazette Notification on Concessional Fee Structure',
      },
      detailsAccordion: [
        {
          title: isHi ? 'एमएसएमई रियायत नियम' : 'MSME Concession Provisions',
          content: isHi
            ? 'सूक्ष्म उद्यम (निवेश < ₹1 करोड़, टर्नओवर < ₹5 करोड़) 50% छूट के पात्र हैं। स्टार्टअप्स (DPIIT मान्यता प्राप्त) को भी विशेष लाभ मिलते हैं।'
            : 'Micro enterprises (investment < ₹1 Cr, turnover < ₹5 Cr) receive 50% rebate on annual marking fee. DPIIT recognized startups receive identical benefits.',
        },
      ],
      sessionContext: {
        topic: 'msme_fees',
      },
      relatedOptions: [
        { label: isHi ? 'लाइसेंस शुल्क कैलकुलेटर' : 'Fee Calculator', action: 'view_scheme', target: 'fee-calculator' },
        { label: isHi ? 'प्रमाणन प्रक्रिया' : 'Certification Process', action: 'view_scheme', target: 'Scheme I (ISI Mark)' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  } else {
    // Adhere strictly to TRUST AND ACCURACY
    structured = {
      type: 'final_answer',
      shortAnswer: isHi
        ? 'मुझे अभी इस विशिष्ट उत्पाद के लिए पर्याप्त प्रामाणिक बीआईएस जानकारी की पुष्टि नहीं हो पाई है।'
        : "I don't have enough reliable BIS information to confirm this specific product's certification requirements yet.",
      why: isHi
        ? 'भारतीय मानक ब्यूरो (BIS) समय-समय पर नए मानक एवं गुणवत्ता नियंत्रण आदेश (QCO) जारी करता है, इसलिए बिना आधिकारिक पुष्टि के अनुमान नहीं लगाना चाहिए।'
        : 'The Bureau of Indian Standards continually notifies new standards and QCOs across ministries, and compliance status must never be assumed or guessed.',
      whatThisMeansForYou: isHi
        ? 'किसी अनधिकृत सलाह पर भरोसा करने के बजाय आधिकारिक मानक पोर्टल manakonline.in पर सर्च करें या बीआईएस क्षेत्रीय कार्यालय से पुष्टि करें।'
        : 'Do not rely on guesses for legal compliance. Check the official Manakonline database or consult your regional BIS branch office.',
      whatNext: isHi
        ? [
            'manakonline.in पर अपने उत्पाद का सटीक नाम या एचएस कोड (HS Code) सर्च करें।',
            'जांचें कि क्या संबंधित मंत्रालय ने इस उत्पाद पर कोई गुणवत्ता नियंत्रण आदेश (QCO) जारी किया है।',
            'लिखित पुष्टि के लिए नजदीकी बीआईएस शाखा कार्यालय से संपर्क करें।',
          ]
        : [
            'Search the exact product name or HS Code directly on manakonline.in.',
            'Check if a Quality Control Order (QCO) has been published for your category.',
            'Contact your nearest BIS Branch Office for formal written confirmation.',
          ],
      evidence: {
        standardCode: '',
        standardTitle: 'Bureau of Indian Standards Repository',
        scheme: 'BIS Conformity Assessment',
        isMandatory: false,
        orderOrClause: 'Subject to Departmental Notifications',
      },
      detailsAccordion: [
        {
          title: isHi ? 'आधिकारिक स्रोत सत्यापन' : 'Authoritative Verification Process',
          content: isHi
            ? 'बीआईएस पोर्टल "Standards Publishing" अनुभाग में नए मानकों के मसौदे और गजट नोटिफिकेशन प्रकाशित करता है।'
            : 'Always refer to e-BIS and Manakonline official portals for authenticated conformity orders.',
        },
      ],
      relatedOptions: [
        { label: isHi ? 'भारतीय मानक खोजें' : 'Search Indian Standards', action: 'view_standard' },
        { label: isHi ? 'प्रमाणन योजनाएं' : 'Certification Schemes', action: 'view_scheme' },
        { label: isHi ? 'अन्य प्रश्न पूछें' : 'Ask Follow-up', action: 'ask_query' },
      ],
    };
  }

  const markdownContent = formatStructuredToMarkdown(structured);
  const referencedStandards = extractReferencedStandards(
    \`\${structured.evidence?.standardCode || ''} \${structured.shortAnswer || ''} \${q}\`
  );

  return {
    content: markdownContent,
    structured,
    referencedStandards,
    isFallback: true,
  };
}`;

// Replace lines 2181 to 2862 (indices 2180 to 2862)
lines.splice(2180, 2862 - 2180, newFunc);
fs.writeFileSync('server.ts', lines.join('\n'), 'utf8');
console.log('Successfully updated server.ts!');
