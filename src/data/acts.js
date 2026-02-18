export const DEFAULT_ACTS = [
  { id: 'fajr', name: 'ফজরের নামাজ', icon: 'cloudSun' },
  { id: 'sehri', name: 'সাহরি', icon: 'utensils' },
  { id: 'quran', name: 'কুরআন তিলাওয়াত', icon: 'bookQuran' },
  { id: 'tarawih', name: 'তারাবীহ', icon: 'mosque' },
  { id: 'tahajjud', name: 'তাহাজ্জুদ', icon: 'moon' },
  { id: 'dhikr', name: 'জিকির/দোআ', icon: 'handsPraying' },
  { id: 'charity', name: 'দান-সদকা', icon: 'handHoldingHeart' },
  { id: 'iftar', name: 'ইফতার', icon: 'sunset' },
];

export const getEmptyActs = (actIds) => {
  const acts = {};
  actIds.forEach(id => {
    acts[id] = false;
  });
  return acts;
};

export const getDefaultActIds = () => DEFAULT_ACTS.map(act => act.id);
