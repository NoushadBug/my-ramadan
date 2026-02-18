export const QURAN_PARAH = [
  { parah: 1, name: 'পারা-১', arabic: 'আলিফ লাম মীম সাদা', verses: 148 },
  { parah: 2, name: 'পারা-২', arabic: 'হা মীম সাজদাহ', verses: 111 },
  { parah: 3, name: 'পারা-৩', arabic: 'তিলকুন ওয়াল কুরাইশ', verses: 104 },
  { parah: 4, name: 'পারা-৪', arabic: 'লাইলাহুম আন আমরু', verses: 176 },
  { parah: 5, name: 'পারা-৫', arabic: 'ওয়া ইযাহাজ্জুন', verses: 120 },
  { parah: 6, name: 'পারা-৬', arabic: 'হা-মীম আইন', verses: 129 },
  { parah: 7, name: 'পারা-৭', arabic: 'ওয়া মান আক্রামা', verses: 151 },
  { parah: 8, name: 'পারা-৮', arabic: 'ওয়া ইযলুল্লাহ', verses: 103 },
  { parah: 9, name: 'পারা-৯', arabic: 'আইন', verses: 88 },
  { parah: 10, name: 'পারা-১০', arabic: 'নুন ওয়ান নাহল', verses: 109 },
  { parah: 11, name: 'পারা-১১', arabic: 'ওয়াস সাহাবাহ', verses: 123 },
  { parah: 12, name: 'পারা-১২', arabic: 'ফাতাহিয়াহ', verses: 111 },
  { parah: 13, name: 'পারা-১৩', arabic: 'আল্লাহু লা ইলাহা', verses: 103 },
  { parah: 14, name: 'পারা-১৪', arabic: 'রুকুন ইযাল্লাহ', verses: 113 },
  { parah: 15, name: 'পারা-১৫', arabic: 'সুবহানাল্লাহ', verses: 99 },
  { parah: 16, name: 'পারা-১৬', arabic: 'কালিমাতুল্লাহ', verses: 105 },
  { parah: 17, name: 'পারা-১৭', arabic: 'ওয়াস সলসালাত', verses: 108 },
  { parah: 18, name: 'পারা-১৮', arabic: 'কাল আসমাউন ওয়াল আরদ', verses: 110 },
  { parah: 19, name: 'পারা-১৯', arabic: 'ফালাকুন নাজ', verses: 99 },
  { parah: 20, name: 'পারা-২০', arabic: 'ওয়া আউলা দ্বীন', verses: 135 },
  { parah: 21, name: 'পারা-২১', arabic: 'আর রাহমান', verses: 101 },
  { parah: 22, name: 'পারা-২২', arabic: 'ইয়া আইয়ুহান নাস', verses: 115 },
  { parah: 23, name: 'পারা-২৩', arabic: 'আম্মা ইয়াদাইন', verses: 98 },
  { parah: 24, name: 'পারা-২৪', arabic: 'ওয়া ইয়াস আল', verses: 111 },
  { parah: 25, name: 'পারা-২৫', arabic: 'ইন্না আনযালনাহু', verses: 105 },
  { parah: 26, name: 'পারা-২৬', arabic: 'হা-মীম তাআ সীন', verses: 118 },
  { parah: 27, name: 'পারা-২৭', arabic: 'কালিমাল্লাহ', verses: 95 },
  { parah: 28, name: 'পারা-২৮', arabic: 'ওয়া মালায়িকাতুহু', verses: 135 },
  { parah: 29, name: 'পারা-২৯', arabic: 'আলিফ লাম মীম তাআ সীন', verses: 109 },
  { parah: 30, name: 'পারা-৩০', arabic: 'গারিবুল্লাহ', verses: 51 }
];

export const QURAN_TRACKER = {
  id: 'quran_tracker',
  name: 'কুরআন পড়ার হিসাব',
  nameEn: 'Quran Reading Tracker',
  categoryId: 'quran',
  description: 'প্রতিদিন কতটুকু কুরআন পড়েছি তার ট্র্যাকিং',
  icon: 'bookQuran',
  color: '#8B5CF6',
  
  features: {
    dailyPages: true,        // Track pages read today
    parahCompletion: true,    // Track parah completion
    totalRead: true,         // Total pages read in Ramadan
    continueFrom: true,      // Continue from last position
    targetSetting: true      // Set daily target
  },
  
  defaultTarget: 1,          // Default 1 page per day
  targetUnit: 'পারা/দিন'
};

export const getParahName = (parahNumber) => {
  const parah = QURAN_PARAH.find(p => p.parah === parahNumber);
  return parah ? parah.name : `পারা-${parahNumber}`;
};

export const getParahArabic = (parahNumber) => {
  const parah = QURAN_PARAH.find(p => p.parah === parahNumber);
  return parah ? parah.arabic : '';
};

export const getTotalParahs = () => QURAN_PARAH.length;

export const getTotalVerses = () => QURAN_PARAH.reduce((sum, p) => sum + p.verses, 0);

export const calculateParahProgress = (pagesRead, parahNumber) => {
  const parah = QURAN_PARAH.find(p => p.parah === parahNumber);
  if (!parah) return 0;
  return Math.round((pagesRead / parah.verses) * 100);
};

export const getRecommendedDailyTarget = () => {
  const remainingParahs = 30;
  const remainingDays = 30;
  return Math.ceil(remainingParahs / remainingDays);
};

export const QURAN_TRACKING_STORAGE_KEY = 'quran-tracking-data';

export const getInitialQuranTracker = () => ({
  dailyTarget: 1,
  lastReadDate: null,
  currentParah: 1,
  currentPage: 0,
  totalPagesRead: 0,
  completedParahs: [],
  dailyLog: {},
  history: []
});

export const formatQuranProgress = (tracker) => {
  const totalPagesRead = tracker.totalPagesRead || 0;
  const totalVerses = getTotalVerses();
  const percentage = Math.round((totalPagesRead / totalVerses) * 100);
  
  const completedParahs = tracker.completedParahs?.length || 0;
  const currentParah = tracker.currentParah || 1;
  const currentPage = tracker.currentPage || 0;
  
  return {
    totalPagesRead,
    totalVerses,
    percentage,
    completedParahs,
    remainingParahs: 30 - completedParahs,
    currentParah,
    currentPage,
    parahProgress: calculateParahProgress(currentPage, currentParah),
    target: tracker.dailyTarget || 1
  };
};
