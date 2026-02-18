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
  // 🕌 নামাজ ও নফল সালাত
  [CATEGORIES.PRAYER.id]: [
    {
      id: 'jamat_salah',
      name: 'জামাতের সাথে (আওয়াল ওয়াক্তে) সালাত',
      nameEn: 'Salah with Jamat',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'জামাতের সাথে (আওয়াল ওয়াক্তে) সালাত আদায় করেছি',
      icon: 'mosque'
    },
    {
      id: 'sunnah_prayers',
      name: 'বারো রাকাত সুন্নত সালাত',
      nameEn: '12 Rakat Sunnah',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'বারো রাকাত সুন্নত সালাত আদায় করেছি',
      icon: 'prayingHands'
    },
    {
      id: 'chasht',
      name: 'চাশতের সালাত',
      nameEn: 'Chasht Prayer',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'চাশতের সালাত আদায় করেছি',
      icon: 'sun'
    },
    {
      id: 'tarawih',
      name: 'তারাবীহর সালাত',
      nameEn: 'Tarawih Prayer',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'তারাবীহর সালাত আদায় করেছি',
      icon: 'mosque'
    },
    {
      id: 'tarawih_2',
      name: 'তারাবীহ',
      nameEn: 'Tarawih',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'তারাবীহ আদায় করেছি',
      icon: 'mosque'
    }
  ],

  // 📖 কুরআন ও তিলাওয়াত
  [CATEGORIES.QURAN.id]: [
    {
      id: 'quran_daily',
      name: 'কুরআন তিলাওয়াত',
      nameEn: 'Quran Recitation',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'কুরআন তিলাওয়াত করেছি',
      icon: 'bookQuran'
    },
    {
      id: 'memorize',
      name: 'দু\'আ/সূরা/আয়াত মুখস্থ করা',
      nameEn: 'Memorize Dua/Surah/Ayat',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'নতুন দু\'আ/সূরা/আয়াত মুখস্থ করেছি',
      icon: 'brain'
    },
    {
      id: 'surah_mulk',
      name: 'সূরা মূলক',
      nameEn: 'Surah Mulk',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সূরা মূলক তিলাওয়াত করেছি',
      icon: 'book'
    },
    {
      id: 'surah_baqarah',
      name: 'সূরা বাকারার শেষ দুই আয়াত',
      nameEn: 'Last 2 Ayat of Baqarah',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সূরা বাকারার শেষ দুই আয়াত তিলাওয়াত করেছি',
      icon: 'book'
    },
    {
      id: 'surah_najm',
      name: 'সূরা নজম',
      nameEn: 'Surah Najm',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সূরা নজম তিলাওয়াত করেছি',
      icon: 'star'
    }
  ],

  // 🤲 জিকির ও দোয়া
  [CATEGORIES.DHIKR.id]: [
    {
      id: 'post_fard_dhikr',
      name: 'ফরজ সালাতের পর যিকির',
      nameEn: 'Dhikr after Fard',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'ফরজ সালাতের পর যিকির করেছি',
      icon: 'handsPraying'
    },
    {
      id: 'morning_dhikr',
      name: 'সকাল যিকির',
      nameEn: 'Morning Dhikr',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সকালের যিকির করেছি',
      icon: 'sun'
    },
    {
      id: 'masnoon_dhikr',
      name: 'দৈনন্দিন মাসনূন যিকির',
      nameEn: 'Daily Masnoon Dhikr',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'দৈনন্দিন মাসনূন যিকির করেছি',
      icon: 'bookOpen'
    },
    {
      id: 'evening_dhikr',
      name: 'সন্ধ্যা যিকির',
      nameEn: 'Evening Dhikr',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'সন্ধ্যার যিকির করেছি',
      icon: 'moon'
    }
  ],

  // 💞 দান ও সামাজিক কাজ
  [CATEGORIES.CHARITY.id]: [
    {
      id: 'dawah',
      name: 'দাওয়াহ',
      nameEn: 'Dawah',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 20,
      description: 'দাওয়াহর কাজ করেছি',
      icon: 'bullhorn'
    },
    {
      id: 'family_help',
      name: 'পরিবারের কাজে সাহায্য করা',
      nameEn: 'Help Family',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'পরিবারের কাজে সাহায্য করেছি',
      icon: 'handHoldingHeart'
    },
    {
      id: 'charity',
      name: 'দান/সদকা করা',
      nameEn: 'Charity/Sadqa',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'দান বা সদকা করেছি',
      icon: 'handHoldingHeart'
    }
  ],

  // 🧠 আত্মশুদ্ধি ও আচরণ (Using Spiritual/Reflection categories for miscellaneous)
  [CATEGORIES.SPIRITUAL.id]: [
    {
      id: 'learn_new',
      name: 'নতুন কিছু শিখা',
      nameEn: 'Learn Something New',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 15,
      description: 'ইসলামী নতুন কিছু শিখেছি',
      icon: 'lightbulb'
    },
    {
      id: 'daily_sunnah',
      name: 'দৈনন্দিন সুন্নাহ',
      nameEn: 'Daily Sunnah',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'দৈনন্দিন একটি সুন্নাহ পালন করেছি',
      icon: 'star'
    },
    {
      id: 'wudu_sleep',
      name: 'ঘুমানোর আগে ওজু করে ঘুমানো',
      nameEn: 'Sleep with Wudu',
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'ঘুমানোর আগে ওজু করেছি',
      icon: 'water'
    }
  ]
};

// Helper to construct the sorted list based on IDs
const getActivity = (id) => {
  for (const catId in RAMADAN_ACTIVITIES) {
    const found = RAMADAN_ACTIVITIES[catId].find(a => a.id === id);
    if (found) return { ...found, categoryId: catId, category: CATEGORIES[catId.toUpperCase()] };
  }
  return null;
};

export const SORTED_ACTIVITIES_LIST = [
  getActivity('jamat_salah'),
  getActivity('sunnah_prayers'),
  getActivity('post_fard_dhikr'),
  getActivity('morning_dhikr'),
  getActivity('chasht'),
  getActivity('quran_daily'),
  getActivity('memorize'),
  getActivity('dawah'),
  getActivity('learn_new'),
  getActivity('family_help'),
  getActivity('daily_sunnah'),
  getActivity('masnoon_dhikr'),
  getActivity('evening_dhikr'),
  getActivity('tarawih'),
  getActivity('surah_mulk'),
  getActivity('surah_baqarah'),
  getActivity('surah_najm'),
  getActivity('wudu_sleep'),
  getActivity('tarawih_2'),
  getActivity('charity')
].filter(Boolean); // Filter out nulls just in case

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
