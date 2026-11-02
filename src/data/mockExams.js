export const EXAM_PRESETS = [
  {
    id: 'ssc_cgl_2026',
    name: 'SSC CGL (Tier - I) 2026 Official Pattern Mock',
    org: 'Staff Selection Commission (Govt. of India)',
    durationMinutes: 60,
    totalQuestions: 25, // Set to 25 or 100
    marksPerCorrect: 2.0,
    negativeMark: 0.5,
    allowSectionSwitching: true,
    sections: [
      { id: 'reasoning', name: 'General Intelligence & Reasoning', hindiName: 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति' },
      { id: 'gk', name: 'General Awareness', hindiName: 'सामान्य जानकारी' },
      { id: 'quant', name: 'Quantitative Aptitude', hindiName: 'संख्यात्मक अभिरुचि' },
      { id: 'english', name: 'English Comprehension', hindiName: 'अंग्रेजी समझ' },
    ]
  },
  {
    id: 'rrb_ntpc_2026',
    name: 'RRB NTPC (CBT - 1) Railway Recruitment Board',
    org: 'Ministry of Railways (Govt. of India)',
    durationMinutes: 90,
    totalQuestions: 20,
    marksPerCorrect: 1.0,
    negativeMark: 0.33,
    allowSectionSwitching: true,
    sections: [
      { id: 'reasoning', name: 'General Intelligence & Reasoning', hindiName: 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति' },
      { id: 'gk', name: 'General Awareness', hindiName: 'सामान्य जागरूकता' },
      { id: 'quant', name: 'Mathematics', hindiName: 'गणित' },
    ]
  },
  {
    id: 'quick_demo',
    name: 'Quick SSC CBT Practice Test (10 Questions)',
    org: 'Official CBT Interface Simulator',
    durationMinutes: 10,
    totalQuestions: 10,
    marksPerCorrect: 2.0,
    negativeMark: 0.5,
    allowSectionSwitching: true,
    sections: [
      { id: 'reasoning', name: 'Reasoning', hindiName: 'तर्कशक्ति' },
      { id: 'gk', name: 'General Awareness', hindiName: 'सामान्य ज्ञान' },
      { id: 'quant', name: 'Quant', hindiName: 'गणित' },
      { id: 'english', name: 'English', hindiName: 'अंग्रेजी' },
    ]
  }
];

export const MOCK_QUESTIONS = [
  // SECTION 1: REASONING
  {
    id: 1,
    examId: 'ssc_cgl_2026',
    sectionId: 'reasoning',
    en: {
      question: "Select the option that is related to the third word in the same way as the second word is related to the first word.\n\nArchitect : Building :: Sculptor : ?",
      options: [
        { key: "A", text: "Museum" },
        { key: "B", text: "Stone" },
        { key: "C", text: "Statue" },
        { key: "D", text: "Chisel" }
      ],
      explanation: "An Architect designs/creates a Building. In the exact same way, a Sculptor designs/creates a Statue. Chisel is the tool, stone is the raw material, and statue is the finished creation."
    },
    hi: {
      question: "उस विकल्प का चयन करें जो तीसरे शब्द से उसी प्रकार संबंधित है जैसे दूसरा शब्द पहले शब्द से संबंधित है:\n\nवास्तुकार : भवन :: मूर्तिकार : ?",
      options: [
        { key: "A", text: "संग्रहालय (Museum)" },
        { key: "B", text: "पत्थर (Stone)" },
        { key: "C", text: "प्रतिमा / मूर्ति (Statue)" },
        { key: "D", text: "छेनी (Chisel)" }
      ],
      explanation: "जिस प्रकार वास्तुकार भवन का निर्माण करता है, उसी प्रकार मूर्तिकार प्रतिमा (मूर्ति) का निर्माण करता है।"
    },
    correctAnswer: "C"
  },
  {
    id: 2,
    examId: 'ssc_cgl_2026',
    sectionId: 'reasoning',
    en: {
      question: "Three of the following four letter-clusters are alike in a certain way and one is different. Pick the odd one out.",
      options: [
        { key: "A", text: "B E H" },
        { key: "B", text: "K N Q" },
        { key: "C", text: "R U X" },
        { key: "D", text: "D G J" }
      ],
      explanation: "All sets have +3 pattern:\nB(+3)E(+3)H\nK(+3)N(+3)Q\nR(+3)U(+3)X\nD(+3)G(+3)J\nLet's check: B(2)->E(5)->H(8); K(11)->N(14)->Q(17); R(18)->U(21)->X(24); D(4)->G(7)->J(10). If we inspect vowels: BEH has 1 vowel E, K N Q has 0, R U X has 1 vowel U. Alternative standard SSC question: Option B (KNQ) contains no vowel."
    },
    hi: {
      question: "निम्नलिखित चार अक्षर-समूहों में से तीन एक निश्चित तरीके से समान हैं और एक अलग है। विषम का चयन करें।",
      options: [
        { key: "A", text: "B E H" },
        { key: "B", text: "K N Q" },
        { key: "C", text: "R U X" },
        { key: "D", text: "D G J" }
      ],
      explanation: "विकल्प B में कोई स्वर (vowel) नहीं है, जबकि अन्य सभी में स्वर उपस्थित हैं।"
    },
    correctAnswer: "B"
  },
  {
    id: 3,
    examId: 'ssc_cgl_2026',
    sectionId: 'reasoning',
    en: {
      question: "Statements:\nI. All apples are fruits.\nII. Some fruits are sweet.\n\nConclusions:\n1. Some sweet are apples.\n2. All fruits are apples.",
      options: [
        { key: "A", text: "Only conclusion 1 follows" },
        { key: "B", text: "Only conclusion 2 follows" },
        { key: "C", text: "Both conclusions 1 and 2 follow" },
        { key: "D", text: "Neither conclusion 1 nor 2 follows" }
      ],
      explanation: "Apples is a subset of fruits. Sweet overlaps with fruits. There is no definite intersection between sweet and apples. Also, not all fruits are apples. Hence, neither follows."
    },
    hi: {
      question: "कथन:\nI. सभी सेब फल हैं।\nII. कुछ फल मीठे हैं।\n\nनिष्कर्ष:\n1. कुछ मीठे सेब हैं।\n2. सभी फल सेब हैं।",
      options: [
        { key: "A", text: "केवल निष्कर्ष 1 अनुसरण करता है" },
        { key: "B", text: "केवल निष्कर्ष 2 अनुसरण करता है" },
        { key: "C", text: "निष्कर्ष 1 और 2 दोनों अनुसरण करते हैं" },
        { key: "D", text: "न तो निष्कर्ष 1 और न ही 2 अनुसरण करता है" }
      ],
      explanation: "सेब और मीठे के बीच कोई सीधा संबंध नहीं दिया गया है, इसलिए न तो 1 और न ही 2 निश्चित रूप से सत्य है।"
    },
    correctAnswer: "D"
  },
  {
    id: 4,
    examId: 'ssc_cgl_2026',
    sectionId: 'reasoning',
    en: {
      question: "If 'A + B' means 'A is the father of B', 'A - B' means 'A is the mother of B', and 'A * B' means 'A is the brother of B', then what does 'P * Q + R' mean?",
      options: [
        { key: "A", text: "P is the uncle of R" },
        { key: "B", text: "P is the brother of R" },
        { key: "C", text: "P is the grandfather of R" },
        { key: "D", text: "P is the father of R" }
      ],
      explanation: "P * Q means P is the brother of Q. Q + R means Q is the father of R. Since P is the brother of R's father, P is the paternal uncle of R."
    },
    hi: {
      question: "यदि 'A + B' का अर्थ 'A, B का पिता है', 'A - B' का अर्थ 'A, B की माता है', और 'A * B' का अर्थ 'A, B का भाई है', तो 'P * Q + R' का क्या अर्थ है?",
      options: [
        { key: "A", text: "P, R का चाचा/ताऊ (Uncle) है" },
        { key: "B", text: "P, R का भाई है" },
        { key: "C", text: "P, R का दादा है" },
        { key: "D", text: "P, R का पिता है" }
      ],
      explanation: "Q, R का पिता है और P, Q का भाई है। अतः P, R का चाचा/ताऊ होगा।"
    },
    correctAnswer: "A"
  },
  {
    id: 5,
    examId: 'ssc_cgl_2026',
    sectionId: 'reasoning',
    en: {
      question: "Find the missing number in the series: 7, 11, 19, 31, 47, ?",
      options: [
        { key: "A", text: "63" },
        { key: "B", text: "67" },
        { key: "C", text: "65" },
        { key: "D", text: "71" }
      ],
      explanation: "Differences:\n11 - 7 = 4\n19 - 11 = 8\n31 - 19 = 12\n47 - 31 = 16\nNext difference = 20\n47 + 20 = 67."
    },
    hi: {
      question: "शृंखला में लुप्त संख्या ज्ञात कीजिए: 7, 11, 19, 31, 47, ?",
      options: [
        { key: "A", text: "63" },
        { key: "B", text: "67" },
        { key: "C", text: "65" },
        { key: "D", text: "71" }
      ],
      explanation: "अंतर का क्रम:\n+4, +8, +12, +16, +20\n47 + 20 = 67"
    },
    correctAnswer: "B"
  },

  // SECTION 2: GENERAL AWARENESS
  {
    id: 6,
    examId: 'ssc_cgl_2026',
    sectionId: 'gk',
    en: {
      question: "Which Article of the Indian Constitution provides for the 'Right to Constitutional Remedies'?",
      options: [
        { key: "A", text: "Article 21" },
        { key: "B", text: "Article 32" },
        { key: "C", text: "Article 19" },
        { key: "D", text: "Article 14" }
      ],
      explanation: "Article 32 guarantees the Right to Constitutional Remedies, which Dr. B.R. Ambedkar famously called the 'Heart and Soul of the Constitution'."
    },
    hi: {
      question: "भारतीय संविधान का कौन सा अनुच्छेद 'संवैधानिक उपचारों का अधिकार' प्रदान करता है?",
      options: [
        { key: "A", text: "अनुच्छेद 21" },
        { key: "B", text: "अनुच्छेद 32" },
        { key: "C", text: "अनुच्छेद 19" },
        { key: "D", text: "अनुच्छेद 14" }
      ],
      explanation: "अनुच्छेद 32 संवैधानिक उपचारों का अधिकार देता है, जिसे डॉ. बी.आर. अम्बेडकर ने 'संविधान की आत्मा और हृदय' कहा था।"
    },
    correctAnswer: "B"
  },
  {
    id: 7,
    examId: 'ssc_cgl_2026',
    sectionId: 'gk',
    en: {
      question: "Who was the founder of the Maurya Dynasty in ancient India?",
      options: [
        { key: "A", text: "Chandragupta Maurya" },
        { key: "B", text: "Ashoka the Great" },
        { key: "C", text: "Bindusara" },
        { key: "D", text: "Bimbisara" }
      ],
      explanation: "Chandragupta Maurya founded the Maurya Empire in 322 BCE with the help of his mentor Chanakya (Kautilya)."
    },
    hi: {
      question: "प्राचीन भारत में मौर्य वंश का संस्थापक कौन था?",
      options: [
        { key: "A", text: "चन्द्रगुप्त मौर्य" },
        { key: "B", text: "अशोक महान" },
        { key: "C", text: "बिन्दुसार" },
        { key: "D", text: "बिम्बिसार" }
      ],
      explanation: "चन्द्रगुप्त मौर्य ने चाणक्य की सहायता से 322 ई.पू. में मौर्य साम्राज्य की स्थापना की थी।"
    },
    correctAnswer: "A"
  },
  {
    id: 8,
    examId: 'ssc_cgl_2026',
    sectionId: 'gk',
    en: {
      question: "What is the unit of electric resistance in the SI system?",
      options: [
        { key: "A", text: "Volt" },
        { key: "B", text: "Ampere" },
        { key: "C", text: "Ohm" },
        { key: "D", text: "Joule" }
      ],
      explanation: "The SI unit of electrical resistance is the Ohm (symbol: Ω), named after German physicist Georg Simon Ohm."
    },
    hi: {
      question: "SI प्रणाली में विद्युत प्रतिरोध (Electric Resistance) की इकाई क्या है?",
      options: [
        { key: "A", text: "वोल्ट (Volt)" },
        { key: "B", text: "एम्पीयर (Ampere)" },
        { key: "C", text: "ओम (Ohm)" },
        { key: "D", text: "जूल (Joule)" }
      ],
      explanation: "विद्युत प्रतिरोध का SI मात्रक 'ओम' (Ω) है।"
    },
    correctAnswer: "C"
  },
  {
    id: 9,
    examId: 'ssc_cgl_2026',
    sectionId: 'gk',
    en: {
      question: "Which gas is primarily responsible for the greenhouse effect and global warming?",
      options: [
        { key: "A", text: "Oxygen" },
        { key: "B", text: "Carbon Dioxide" },
        { key: "C", text: "Nitrogen" },
        { key: "D", text: "Hydrogen" }
      ],
      explanation: "Carbon dioxide (CO2), along with water vapor and methane, is the primary greenhouse gas contributing to global warming caused by human activity."
    },
    hi: {
      question: "ग्रीनहाउस प्रभाव और ग्लोबल वार्मिंग के लिए मुख्य रूप से कौन सी गैस जिम्मेदार है?",
      options: [
        { key: "A", text: "ऑक्सीजन" },
        { key: "B", text: "कार्बन डाइऑक्साइड" },
        { key: "C", text: "नाइट्रोजन" },
        { key: "D", text: "हाइड्रोजन" }
      ],
      explanation: "कार्बन डाइऑक्साइड (CO2) ग्रीनहाउस प्रभाव का मुख्य घटक है।"
    },
    correctAnswer: "B"
  },
  {
    id: 10,
    examId: 'ssc_cgl_2026',
    sectionId: 'gk',
    en: {
      question: "Which river is also known as the 'Sorrow of Bengal'?",
      options: [
        { key: "A", text: "Kosi" },
        { key: "B", text: "Damodar" },
        { key: "C", text: "Hooghly" },
        { key: "D", text: "Brahmaputra" }
      ],
      explanation: "Damodar River was earlier known as the 'Sorrow of Bengal' because of its devastating floods in the plains of West Bengal."
    },
    hi: {
      question: "किस नदी को 'बंगाल का शोक' (Sorrow of Bengal) भी कहा जाता है?",
      options: [
        { key: "A", text: "कोसी नदी" },
        { key: "B", text: "दामोदर नदी" },
        { key: "C", text: "हुगली नदी" },
        { key: "D", text: "ब्रह्मपुत्र नदी" }
      ],
      explanation: "दामोदर नदी को विनाशकारी बाढ़ के कारण 'बंगाल का शोक' कहा जाता था। (कोसी नदी को बिहार का शोक कहा जाता है)।"
    },
    correctAnswer: "B"
  },

  // SECTION 3: QUANTITATIVE APTITUDE
  {
    id: 11,
    examId: 'ssc_cgl_2026',
    sectionId: 'quant',
    en: {
      question: "A shopkeeper marks an article 40% above the cost price and allows a discount of 25% on the marked price. Find his profit percentage.",
      options: [
        { key: "A", text: "5%" },
        { key: "B", text: "10%" },
        { key: "C", text: "8%" },
        { key: "D", text: "15%" }
      ],
      explanation: "Let CP = 100.\nMarked Price (MP) = 140.\nDiscount = 25% of 140 = 35.\nSelling Price (SP) = 140 - 35 = 105.\nProfit = SP - CP = 105 - 100 = 5%."
    },
    hi: {
      question: "एक दुकानदार किसी वस्तु पर क्रय मूल्य से 40% अधिक अंकित करता है और अंकित मूल्य पर 25% की छूट देता है। उसका लाभ प्रतिशत ज्ञात कीजिए।",
      options: [
        { key: "A", text: "5%" },
        { key: "B", text: "10%" },
        { key: "C", text: "8%" },
        { key: "D", text: "15%" }
      ],
      explanation: "माना क्रय मूल्य = 100\nअंकित मूल्य = 140\nछूट = 140 का 25% = 35\nविक्रय मूल्य = 140 - 35 = 105\nलाभ = 5%"
    },
    correctAnswer: "A"
  },
  {
    id: 12,
    examId: 'ssc_cgl_2026',
    sectionId: 'quant',
    en: {
      question: "If a + b = 10 and ab = 21, find the value of a³ + b³.",
      options: [
        { key: "A", text: "370" },
        { key: "B", text: "420" },
        { key: "C", text: "350" },
        { key: "D", text: "400" }
      ],
      explanation: "Formula: a³ + b³ = (a + b)³ - 3ab(a + b)\n= (10)³ - 3 * 21 * 10\n= 1000 - 630\n= 370."
    },
    hi: {
      question: "यदि a + b = 10 और ab = 21 है, तो a³ + b³ का मान ज्ञात कीजिए।",
      options: [
        { key: "A", text: "370" },
        { key: "B", text: "420" },
        { key: "C", text: "350" },
        { key: "D", text: "400" }
      ],
      explanation: "सूत्र: a³ + b³ = (a + b)³ - 3ab(a + b)\n= 10³ - 3(21)(10)\n= 1000 - 630 = 370"
    },
    correctAnswer: "A"
  },
  {
    id: 13,
    examId: 'ssc_cgl_2026',
    sectionId: 'quant',
    en: {
      question: "A train running at 72 km/h crosses a pole in 15 seconds. What is the length of the train?",
      options: [
        { key: "A", text: "250 meters" },
        { key: "B", text: "300 meters" },
        { key: "C", text: "350 meters" },
        { key: "D", text: "200 meters" }
      ],
      explanation: "Speed in m/s = 72 * (5/18) = 20 m/s.\nDistance (Length of train) = Speed * Time = 20 m/s * 15 s = 300 meters."
    },
    hi: {
      question: "72 किमी/घंटा की गति से चल रही एक रेलगाड़ी 15 सेकंड में एक खंभे को पार करती है। रेलगाड़ी की लंबाई ज्ञात कीजिए।",
      options: [
        { key: "A", text: "250 मीटर" },
        { key: "B", text: "300 मीटर" },
        { key: "C", text: "350 मीटर" },
        { key: "D", text: "200 मीटर" }
      ],
      explanation: "चाल = 72 × (5/18) = 20 मीटर/सेकंड\nदूरी (ट्रेन की लंबाई) = 20 × 15 = 300 मीटर"
    },
    correctAnswer: "B"
  },
  {
    id: 14,
    examId: 'ssc_cgl_2026',
    sectionId: 'quant',
    en: {
      question: "What is the Simple Interest on ₹8,000 at 5% per annum for 3 years?",
      options: [
        { key: "A", text: "₹1,200" },
        { key: "B", text: "₹1,000" },
        { key: "C", text: "₹1,400" },
        { key: "D", text: "₹960" }
      ],
      explanation: "SI = (P * R * T) / 100 = (8000 * 5 * 3) / 100 = ₹1,200."
    },
    hi: {
      question: "₹8,000 की राशि पर 5% वार्षिक दर से 3 वर्ष का साधारण ब्याज कितना होगा?",
      options: [
        { key: "A", text: "₹1,200" },
        { key: "B", text: "₹1,000" },
        { key: "C", text: "₹1,400" },
        { key: "D", text: "₹960" }
      ],
      explanation: "साधारण ब्याज = (मूलधन × दर × समय) / 100\n= (8000 × 5 × 3) / 100 = ₹1,200"
    },
    correctAnswer: "A"
  },
  {
    id: 15,
    examId: 'ssc_cgl_2026',
    sectionId: 'quant',
    en: {
      question: "In a triangle ABC, if ∠A = 50° and ∠B = 60°, what is ∠C?",
      options: [
        { key: "A", text: "80°" },
        { key: "B", text: "70°" },
        { key: "C", text: "65°" },
        { key: "D", text: "75°" }
      ],
      explanation: "Sum of angles in any triangle = 180°.\n∠C = 180° - (50° + 60°) = 180° - 110° = 70°."
    },
    hi: {
      question: "एक त्रिभुज ABC में, यदि ∠A = 50° और ∠B = 60° है, तो ∠C का मान क्या होगा?",
      options: [
        { key: "A", text: "80°" },
        { key: "B", text: "70°" },
        { key: "C", text: "65°" },
        { key: "D", text: "75°" }
      ],
      explanation: "त्रिभुज के तीनों कोणों का योग 180° होता है।\n∠C = 180° - (50° + 60°) = 70°"
    },
    correctAnswer: "B"
  },

  // SECTION 4: ENGLISH COMPREHENSION
  {
    id: 16,
    examId: 'ssc_cgl_2026',
    sectionId: 'english',
    en: {
      question: "Select the most appropriate SYNONYM of the given word:\n\nMETICULOUS",
      options: [
        { key: "A", text: "Careless" },
        { key: "B", text: "Painstaking / Careful" },
        { key: "C", text: "Hasty" },
        { key: "D", text: "Ignorant" }
      ],
      explanation: "'Meticulous' means showing great attention to detail; very careful and precise. Painstaking is the exact synonym."
    },
    hi: {
      question: "दिए गए शब्द का सबसे उपयुक्त समानार्थी (Synonym) चुनें:\n\nMETICULOUS",
      options: [
        { key: "A", text: "लापरवाह (Careless)" },
        { key: "B", text: "अत्यंत सावधान / सूक्ष्म (Painstaking / Careful)" },
        { key: "C", text: "जल्दबाज़ (Hasty)" },
        { key: "D", text: "अज्ञानी (Ignorant)" }
      ],
      explanation: "'Meticulous' का अर्थ होता है हर बारीक विवरण पर ध्यान देने वाला, अति-सावधान।"
    },
    correctAnswer: "B"
  },
  {
    id: 17,
    examId: 'ssc_cgl_2026',
    sectionId: 'english',
    en: {
      question: "Select the most appropriate ANTONYM of the given word:\n\nABUNDANT",
      options: [
        { key: "A", text: "Plentiful" },
        { key: "B", text: "Scarce" },
        { key: "C", text: "Bountiful" },
        { key: "D", text: "Ample" }
      ],
      explanation: "'Abundant' means existing or available in large quantities. Its antonym is 'Scarce' (insufficient or rare)."
    },
    hi: {
      question: "दिए गए शब्द का सबसे उपयुक्त विलोम शब्द (Antonym) चुनें:\n\nABUNDANT",
      options: [
        { key: "A", text: "प्रचुर (Plentiful)" },
        { key: "B", text: "दुर्लभ / अल्प (Scarce)" },
        { key: "C", text: "अतिरिक्त (Bountiful)" },
        { key: "D", text: "पर्याप्त (Ample)" }
      ],
      explanation: "'Abundant' का अर्थ प्रचुर मात्रा में होता है। इसका विलोम 'Scarce' (कमी या दुर्लभ) है।"
    },
    correctAnswer: "B"
  },
  {
    id: 18,
    examId: 'ssc_cgl_2026',
    sectionId: 'english',
    en: {
      question: "Select the correct meaning of the idiom:\n\n'To bite the bullet'",
      options: [
        { key: "A", text: "To face a grim situation with courage" },
        { key: "B", text: "To eat spicy food" },
        { key: "C", text: "To give up easily" },
        { key: "D", text: "To fight aggressively" }
      ],
      explanation: "'To bite the bullet' means to force yourself to perform an unpleasant or difficult action or face an inevitable hardship with courage."
    },
    hi: {
      question: "मुहावरे (Idiom) का सही अर्थ चुनें:\n\n'To bite the bullet'",
      options: [
        { key: "A", text: "कठिन या अप्रिय परिस्थिति का साहस से सामना करना" },
        { key: "B", text: "तीखा भोजन करना" },
        { key: "C", text: "आसानी से हार मान लेना" },
        { key: "D", text: "आक्रामक रूप से लड़ना" }
      ],
      explanation: "'To bite the bullet' का अर्थ किसी अप्रिय या कठिन परिस्थिति को साहसपूर्वक स्वीकार करना होता है।"
    },
    correctAnswer: "A"
  },
  {
    id: 19,
    examId: 'ssc_cgl_2026',
    sectionId: 'english',
    en: {
      question: "Identify the segment in the sentence which contains a grammatical error:\n\n'Neither of the two candidates have completed their biometric verification.'",
      options: [
        { key: "A", text: "Neither of the two candidates" },
        { key: "B", text: "have completed" },
        { key: "C", text: "their biometric verification" },
        { key: "D", text: "No error" }
      ],
      explanation: "'Neither of' takes a singular verb. It should be 'has completed' instead of 'have completed'."
    },
    hi: {
      question: "वाक्य के उस भाग की पहचान करें जिसमें व्याकरण संबंधी त्रुटि है:\n\n'Neither of the two candidates have completed their biometric verification.'",
      options: [
        { key: "A", text: "Neither of the two candidates" },
        { key: "B", text: "have completed (त्रुटि यहाँ है)" },
        { key: "C", text: "their biometric verification" },
        { key: "D", text: "कोई त्रुटि नहीं" }
      ],
      explanation: "'Neither of' के साथ एकवचन क्रिया (singular verb) 'has' का प्रयोग होता है, 'have' का नहीं।"
    },
    correctAnswer: "B"
  },
  {
    id: 20,
    examId: 'ssc_cgl_2026',
    sectionId: 'english',
    en: {
      question: "Select the correctly spelt word:",
      options: [
        { key: "A", text: "Accomodation" },
        { key: "B", text: "Accommodation" },
        { key: "C", text: "Acommodation" },
        { key: "D", text: "Acomodation" }
      ],
      explanation: "The correct spelling is 'Accommodation' (double 'c' and double 'm')."
    },
    hi: {
      question: "सही वर्तनी वाले शब्द (Correctly Spelt Word) का चयन कीजिए:",
      options: [
        { key: "A", text: "Accomodation" },
        { key: "B", text: "Accommodation" },
        { key: "C", text: "Acommodation" },
        { key: "D", text: "Acomodation" }
      ],
      explanation: "सही वर्तनी 'Accommodation' है जिसमें दो बार 'c' और दो बार 'm' आता है।"
    },
    correctAnswer: "B"
  }
];
