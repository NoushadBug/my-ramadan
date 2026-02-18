export const CATEGORIES = {
  QURAN: {
    id: 'quran',
    name: 'কুরআন ও তিলাওয়াত',
    nameEn: 'Quran & Tilawat',
    color: '#8B5CF6',
    icon: 'bookQuran',
    description: 'কুরআন তিলাওয়াত ও তাফসির'
  },
  PRAYER: {
    id: 'prayer',
    name: 'নামাজ ও নফল সালাত',
    nameEn: 'Prayers & Nafl',
    color: '#06B6D4',
    icon: 'mosque',
    description: 'ফরজ, সুন্নত ও নফল নামাজ'
  },
  DHIKR: {
    id: 'dhikr',
    name: 'জিকির ও দোয়া',
    nameEn: 'Dhikr & Dua',
    color: '#F59E0B',
    icon: 'handsPraying',
    description: 'আল্লাহর জিকির ও দোয়া'
  },
  CHARITY: {
    id: 'charity',
    name: 'দান ও সামাজিক কাজ',
    nameEn: 'Charity & Social',
    color: '#10B981',
    icon: 'handHoldingHeart',
    description: 'সদকা ও সামাজিক সেবা'
  },
  SPIRITUAL: {
    id: 'spiritual',
    name: 'আত্মশুদ্ধি ও আচরণ',
    nameEn: 'Spiritual Growth',
    color: '#EC4899',
    icon: 'brain',
    description: 'আত্মিক উন্নতি ও সৎ আচরণ'
  },
  REFLECTION: {
    id: 'reflection',
    name: 'আত্মচিন্তা',
    nameEn: 'Self Reflection',
    color: '#6366F1',
    icon: 'spa',
    description: 'প্রতিদিনের আত্মচিন্তা ও রিফ্লেকশন'
  }
};

export const INPUT_TYPES = {
  BOOLEAN: 'boolean',      // Simple checkbox
  COUNTER: 'counter',      // Number counter (e.g., istighfar count)
  SCALE: 'scale',         // 1-5 scale (e.g., anger management)
  TEXT: 'text',           // Free text reflection
  NUMBER: 'number'        // Number input (e.g., sadqa amount)
};

export const RAMADAN_ACTIVITIES = {
  // 📖 কুরআন ও সংশ্লিষ্ট
  [CATEGORIES.QURAN.id]: [
    {
      id: 'quran_daily',
      name: 'কুরআন তিলাওয়াত প্রতিদিন',
      nameEn: 'Daily Quran Reading',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'প্রতিদিন কুরআন তিলাওয়াত করেছি',
      tip: 'কমপক্ষে ১০ আয়াত পড়ুন'
    },
    {
      id: 'quran_meaning',
      name: 'কুরআনের অর্থ বোঝা',
      nameEn: 'Understand Quran Meaning',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'তাফসির বা অনুবাদ পড়ে অর্থ বুঝেছি',
      tip: 'অনুবাদ সহ পড়ুন'
    },
    {
      id: 'tafsir_read',
      name: 'তাফসির পড়া',
      nameEn: 'Read Tafsir',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'কোনো আয়াতের তাফসির পড়েছি',
      tip: 'ইবনে কাসির তাফসির অথবা বাংলা তাফসির পড়ুন'
    },
    {
      id: 'memorize_verse',
      name: 'নতুন আয়াত মুখস্থ',
      nameEn: 'Memorize New Verse',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'নতুন কোনো আয়াত মুখস্থ করেছি',
      tip: '১-২ আয়াত মুখস্থ করুন'
    },
    {
      id: 'surah_mulk',
      name: 'সূরা মুলক পড়া',
      nameEn: 'Read Surah Al-Mulk',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সূরা মুলক পড়েছি (সকালে)',
      tip: 'সকালে পড়লে গুনাহ থেকে মুক্তি পাওয়া যায়'
    },
    {
      id: 'surah_yasin',
      name: 'সূরা ইয়াসিন পড়া',
      nameEn: 'Read Surah Yasin',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সূরা ইয়াসিন পড়েছি (সন্ধ্যায়)',
      tip: 'সন্ধ্যায় পড়লে বেশি ফজিলত'
    },
    {
      id: 'surah_baqarah_end',
      name: 'সূরা বাকারার শেষ ২ আয়াত',
      nameEn: 'Last 2 Verses of Surah Baqarah',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'সূরা বাকারার শেষ ২ আয়াত পড়েছি',
      tip: 'রাতে ঘুমানোর আগে পড়ুন'
    },
    {
      id: 'quran_khatam',
      name: 'কুরআন খতম',
      nameEn: 'Quran Khatam',
      inputType: INPUT_TYPES.COUNTER,
      weight: 50,
      min: 0,
      max: 1,
      description: 'এই রমজানে কুরআন খতম সম্পন্ন',
      tip: '৩০ দিনে ৩০ পারা পড়ুন'
    }
  ],

  // 🕌 নামাজ ও নফল সালাত
  [CATEGORIES.PRAYER.id]: [
    {
      id: 'fajr_jamat',
      name: 'ফজর জামাতে',
      nameEn: 'Fajr in Congregation',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'ফজরের নামাজ জামাতে আদায় করেছি',
      tip: 'জামাতে নামাজ পড়লে ২৭ গুণ বেশি সওয়াব'
    },
    {
      id: 'dhuhr_jamat',
      name: 'যোহর জামাতে',
      nameEn: 'Dhuhr in Congregation',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'যোহরের নামাজ জামাতে আদায় করেছি'
    },
    {
      id: 'asr_jamat',
      name: 'আছর জামাতে',
      nameEn: 'Asr in Congregation',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'আছরের নামাজ জামাতে আদায় করেছি'
    },
    {
      id: 'maghrib_jamat',
      name: 'মাগরিব জামাতে',
      nameEn: 'Maghrib in Congregation',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'মাগরিবের নামাজ জামাতে আদায় করেছি'
    },
    {
      id: 'isha_jamat',
      name: 'এশা জামাতে',
      nameEn: 'Isha in Congregation',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'এশার নামাজ জামাতে আদায় করেছি'
    },
    {
      id: 'tarawih',
      name: 'তারাবিহ নামাজ',
      nameEn: 'Tarawih Prayer',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'তারাবিহ নামাজ আদায় করেছি',
      tip: 'প্রতি রমজানে তারাবিহ পড়া সুন্নতে মুয়াক্কাদা'
    },
    {
      id: 'tahajjud',
      name: 'তাহাজ্জুদ / কিয়ামুল লাইল',
      nameEn: 'Tahajjud / Qiyamul Lail',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 25,
      description: 'তাহাজ্জুদ নামাজ পড়েছি',
      tip: 'ফজরের আগে জেগে পড়ুন'
    },
    {
      id: 'chasht',
      name: 'চাশতের নামাজ',
      nameEn: 'Chasht Prayer',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'চাশতের নামাজ পড়েছি'
    },
    {
      id: 'awawin',
      name: 'আওয়াবীন নামাজ',
      nameEn: 'Awabin Prayer',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'মাগরিব ও এশার মাঝে আওয়াবীন পড়েছি'
    },
    {
      id: 'salatut_tasbih',
      name: 'সালাতুত তাসবিহ',
      nameEn: 'Salatut Tasbih',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'সালাতুত তাসবিহ পড়েছি'
    },
    {
      id: 'itikaf',
      name: 'ইতিকাফ',
      nameEn: 'Itikaf',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 50,
      description: 'মসজিদে ইতিকাফে ছিলাম',
      onlyLast10: true,
      tip: 'শুধুমাত্র শেষ ১০ দিনে প্রযোজ্য'
    }
  ],

  // 🤲 জিকির ও দোয়া
  [CATEGORIES.DHIKR.id]: [
    {
      id: 'morning_dhikr',
      name: 'সকালের মাসনুন জিকির',
      nameEn: 'Morning Dhikr',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সকালে মাসনুন জিকির করেছি',
      tip: 'ফজরের পর থেকে সূর্য উঠার আগে'
    },
    {
      id: 'evening_dhikr',
      name: 'সন্ধ্যার মাসনুন জিকির',
      nameEn: 'Evening Dhikr',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সন্ধ্যায় মাসনুন জিকির করেছি',
      tip: 'আসরের পর থেকে মাগরিবের আগে'
    },
    {
      id: 'istighfar',
      name: 'ইস্তেগফার',
      nameEn: 'Istighfar',
      inputType: INPUT_TYPES.COUNTER,
      weight: 1, // per count
      min: 0,
      max: 500,
      unit: 'বার',
      description: 'ইস্তেগফার পড়েছি',
      tip: 'দিনে কমপক্ষে ৭০ বার পড়ুন'
    },
    {
      id: 'durud',
      name: 'দরুদ শরীফ',
      nameEn: 'Durud Shareef',
      inputType: INPUT_TYPES.COUNTER,
      weight: 1, // per count
      min: 0,
      max: 500,
      unit: 'বার',
      description: 'দরুদ শরীফ পড়েছি',
      tip: 'দিনে কমপক্ষে ১০ বার পড়ুন'
    },
    {
      id: 'subhanallah',
      name: 'সুবহানাল্লাহ',
      nameEn: 'Subhanallah',
      inputType: INPUT_TYPES.COUNTER,
      weight: 0.5,
      min: 0,
      max: 500,
      unit: 'বার',
      description: 'সুবহানাল্লাহ বলেছি',
      tip: 'দিনে ৩৩ বার করুন'
    },
    {
      id: 'alhamdolillah',
      name: 'আলহামদুলিল্লাহ',
      nameEn: 'Alhamdolillah',
      inputType: INPUT_TYPES.COUNTER,
      weight: 0.5,
      min: 0,
      max: 500,
      unit: 'বার',
      description: 'আলহামদুলিল্লাহ বলেছি',
      tip: 'প্রতিটি নেয়মতের জন্য শুকরিয়া আদায় করুন'
    },
    {
      id: 'allahu_akbar',
      name: 'আল্লাহু আকবার',
      nameEn: 'Allahu Akbar',
      inputType: INPUT_TYPES.COUNTER,
      weight: 0.5,
      min: 0,
      max: 500,
      unit: 'বার',
      description: 'আল্লাহু আকবার বলেছি',
      tip: 'তাকবীরে তাহরীমা থেকে শুরু করুন'
    },
    {
      id: 'la_ilaha',
      name: 'লা ইলাহা ইল্লাল্লাহ',
      nameEn: 'La Ilaha Illallah',
      inputType: INPUT_TYPES.COUNTER,
      weight: 2,
      min: 0,
      max: 100,
      unit: 'বার',
      description: 'লা ইলাহা ইল্লাল্লাহ জিকির করেছি',
      tip: 'এই কালিমা পড়লে জাহান্নাম থেকে মুক্তি পাওয়া যায়'
    },
    {
      id: 'laylatul_qadr_dua',
      name: 'লাইলাতুল কদরের দোয়া',
      nameEn: 'Lailatul Qadr Special Dua',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 30,
      onlyLast10: true,
      description: 'লাইলাতুল কদরের বিশেষ দোয়া পড়েছি',
      tip: 'শেষ ১০ দিনে বেশি করে পড়ুন'
    },
    {
      id: 'iftar_dua',
      name: 'ইফতারের দোয়া',
      nameEn: 'Iftar Dua',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'ইফতারের সময় দোয়া পড়েছি',
      tip: 'প্রতি ইফতারে এই দোয়া পড়ুন'
    },
    {
      id: 'personal_dua',
      name: 'ব্যক্তিগত দোয়া',
      nameEn: 'Personal Dua',
      inputType: INPUT_TYPES.TEXT,
      weight: 15,
      description: 'নিজের জন্য ও পরিবারের জন্য দোয়া করেছি',
      tip: 'হৃদয় থেকে দোয়া করুন'
    }
  ],

  // 💞 দান ও সামাজিক কাজ
  [CATEGORIES.CHARITY.id]: [
    {
      id: 'sadqa',
      name: 'সদকা',
      nameEn: 'Sadqa (Charity)',
      inputType: INPUT_TYPES.NUMBER,
      weight: 1, // per taka
      min: 0,
      max: 1000000,
      unit: 'টাকা',
      description: 'সদকা দিয়েছি',
      tip: 'কমপক্ষে ১০ টাকা সদকা করুন'
    },
    {
      id: 'iftar_provided',
      name: 'গরিবকে ইফতার করানো',
      nameEn: 'Provided Iftar to Poor',
      inputType: INPUT_TYPES.COUNTER,
      weight: 20, // per person
      min: 0,
      max: 100,
      unit: 'জন',
      description: 'কাউকে ইফতার করিয়েছি',
      tip: 'একজনের ইফতার করালে সেই ব্যক্তির রোজার সওয়াব পান'
    },
    {
      id: 'fitrana_ready',
      name: 'ফিতরা প্রস্তুত',
      nameEn: 'Fitrana Prepared',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'ফিতরার টাকা বের করে রেখেছি',
      tip: 'শেষ দিকে বের করুন'
    },
    {
      id: 'zakat_ready',
      name: 'জাকাত হিসাব',
      nameEn: 'Zakat Calculation Ready',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 25,
      description: 'জাকাতের হিসাব প্রস্তুত করেছি',
      tip: 'রমজানে জাকাত দেওয়া উত্তম'
    },
    {
      id: 'family_support',
      name: 'পরিবারের সহায়তা',
      nameEn: 'Family Support',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'পরিবারের কাজে সাহায্য করেছি',
      tip: 'রোজা রেখে পরিবারের দায়িত্ব পালন করুন'
    },
    {
      id: 'secret_charity',
      name: 'গোপনে দান',
      nameEn: 'Secret Charity',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'গোপনে কাউকে সাহায্য করেছি',
      tip: 'বাম হাত জানে না ডান হাত কী করছে'
    },
    {
      id: 'family_checkin',
      name: 'আত্মীয়ের খোঁজ নেওয়া',
      nameEn: 'Check on Relatives',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'আত্মীয়-স্বজনের খোঁজ নিয়েছি',
      tip: 'ফোনে হলেও খোঁজ নিন'
    }
  ],

  // 🧠 আত্মশুদ্ধি ও আচরণ
  [CATEGORIES.SPIRITUAL.id]: [
    {
      id: 'no_lie',
      name: 'মিথ্যা থেকে বিরত',
      nameEn: 'No Lying',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'আজ মিথ্যা বলিনি',
      tip: 'সত্য বলা ঈমানের পরিচয়'
    },
    {
      id: 'no_gossip',
      name: 'গিবত/চাপালাশনি থেকে বিরত',
      nameEn: 'No Gossip',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'আজ কারো গিবত করিনি',
      tip: 'গিবত করলে রোজার সওয়াব নষ্ট হয়'
    },
    {
      id: 'anger_control',
      name: 'রাগ নিয়ন্ত্রণ',
      nameEn: 'Anger Management',
      inputType: INPUT_TYPES.SCALE,
      min: 1,
      max: 5,
      weight: 10, // per level
      description: 'রাগ কতটা নিয়ন্ত্রণ করতে পেরেছি',
      tip: '১ = রাগ হয়েছে, ৫ = পুরো নিয়ন্ত্রণে'
    },
    {
      id: 'eye_protection',
      name: 'চোখের হেফাজত',
      nameEn: 'Eye Privacy',
      inputType: INPUT_TYPES.SCALE,
      min: 1,
      max: 5,
      weight: 10,
      description: 'চোখ হেফাজত করেছি',
      tip: '১ = হারাম দেখেছি, ৫ = পুরো নিয়ন্ত্রণে'
    },
    {
      id: 'social_media_reduction',
      name: 'সোশ্যাল মিডিয়া কম ব্যবহার',
      nameEn: 'Less Social Media',
      inputType: INPUT_TYPES.SCALE,
      min: 1,
      max: 5,
      weight: 5,
      description: 'সোশ্যাল মিডিয়া কম ব্যবহার করেছি',
      tip: '১ = অনেক বেশি, ৫ = কম ব্যবহার'
    },
    {
      id: 'patience',
      name: 'ধৈর্য ধরেছি',
      nameEn: 'Patience',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'কষ্ট সহ্য করে ধৈর্য ধরেছি',
      tip: 'রোজার কষ্ট সবরের একটি পরীক্ষা'
    },
    {
      id: 'forgiveness',
      name: 'ক্ষমা করেছি',
      nameEn: 'Forgiveness',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'কারো উপর রাগ থাকলে ক্ষমা করেছি',
      tip: 'আল্লাহ তাআলা ক্ষমাকারীদের ভালোবাসেন'
    }
  ],

  // 📌 Reflection
  [CATEGORIES.REFLECTION.id]: [
    {
      id: 'daily_reflection',
      name: 'প্রতিদিনের রিফ্লেকশন',
      nameEn: 'Daily Reflection',
      inputType: INPUT_TYPES.TEXT,
      weight: 20,
      description: 'আজকের দিন সম্পর্কে চিন্তা করেছি',
      prompt: 'আজ কোন ইবাদত ভালো লাগলো? কোনটা কঠিন লাগলো? কী শিখলাম?',
      tip: '৩-৫ বাক্যে লিখুন'
    },
    {
      id: 'gratitude',
      name: 'শুকরিয়া আদায়',
      nameEn: 'Gratitude',
      inputType: INPUT_TYPES.TEXT,
      weight: 15,
      description: 'আল্লাহর শুকরিয়া আদায় করেছি',
      prompt: 'আজ কোন নিয়ামতের জন্য শুকরিয়া আদায় করব?',
      tip: 'কৃতজ্ঞতা মন ভরিয়ে দেয়'
    },
    {
      id: 'self_critique',
      name: 'আত্মসমালোচনা',
      nameEn: 'Self Critique',
      inputType: INPUT_TYPES.TEXT,
      weight: 15,
      description: 'নিজের ভুল-ত্রুটি চিনতে পেরেছি',
      prompt: 'আজ কোন ভুল করেছি? কীভাবে ঠিক করব?',
      tip: 'নিজেকে ভালোভাবে চিনুন'
    }
  ]
};

export const getAllActivities = () => {
  const activities = [];
  Object.entries(RAMADAN_ACTIVITIES).forEach(([categoryId, items]) => {
    items.forEach(item => {
      activities.push({
        ...item,
        categoryId,
        category: CATEGORIES[categoryId.toUpperCase()]
      });
    });
  });
  return activities;
};

export const getActivityById = (id) => {
  const all = getAllActivities();
  return all.find(a => a.id === id);
};

export const getCategoryActivities = (categoryId) => {
  return RAMADAN_ACTIVITIES[categoryId] || [];
};

export const getLast10DaysActivities = () => {
  const all = getAllActivities();
  return all.filter(a => a.onlyLast10);
};

export const getDefaultValue = (inputType) => {
  switch (inputType) {
    case INPUT_TYPES.BOOLEAN:
      return false;
    case INPUT_TYPES.COUNTER:
    case INPUT_TYPES.NUMBER:
      return 0;
    case INPUT_TYPES.SCALE:
      return 3;
    case INPUT_TYPES.TEXT:
      return '';
    default:
      return false;
  }
};

export const calculateScore = (activity, value) => {
  if (!value) return 0;
  
  switch (activity.inputType) {
    case INPUT_TYPES.BOOLEAN:
      return value ? activity.weight : 0;
    case INPUT_TYPES.COUNTER:
    case INPUT_TYPES.NUMBER:
      return (value * activity.weight);
    case INPUT_TYPES.SCALE:
      return (value * activity.weight);
    case INPUT_TYPES.TEXT:
      return value && value.length > 10 ? activity.weight : 0;
    default:
      return 0;
  }
};
