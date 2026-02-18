import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

const CHECKLIST_ITEMS = [
  { id: 'fajr_jamat', label: 'ফজর', icon: 'mosque', color: 'text-cyan-500' },
  { id: 'dhuhr_jamat', label: 'যোহর', icon: 'sun', color: 'text-amber-500' },
  { id: 'asr_jamat', label: 'আছর', icon: 'cloudSun', color: 'text-orange-500' },
  { id: 'maghrib_jamat', label: 'মাগরিব', icon: 'sunset', color: 'text-indigo-500' },
  { id: 'isha_jamat', label: 'এশা', icon: 'moon', color: 'text-blue-600' },
  { id: 'tarawih', label: 'তারাবিহ', icon: 'prayingHands', color: 'text-purple-500' },
  { id: 'quran_daily', label: 'কুরআন', icon: 'bookQuran', color: 'text-emerald-500' },
  { id: 'morning_dhikr', label: 'সকাল জিকির', icon: 'sun', color: 'text-yellow-500' },
  { id: 'evening_dhikr', label: 'সন্ধ্যা জিকির', icon: 'moon', color: 'text-indigo-400' },
];

export default function SimpleChecklist() {
  const { state, setActivityValue, getActivityValue } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const currentDay = state.currentDay;

  const handleToggle = (id) => {
    const currentValue = getActivityValue(currentDay, id);
    setActivityValue(currentDay, id, !currentValue);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {CHECKLIST_ITEMS.map((item) => {
        const isCompleted = getActivityValue(currentDay, item.id);

        return (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleToggle(item.id)}
            className={`
              relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200
              ${isCompleted
                ? isDark
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md shadow-emerald-100'
                : isDark
                  ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
              }
            `}
          >
            <div className={`text-2xl mb-2 ${isCompleted ? 'text-inherit' : item.color}`}>
              <Icon name={item.icon} />
            </div>
            <span className="text-sm font-bold">{item.label}</span>

            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 text-emerald-500"
              >
                <Icon name="check" className="text-xs" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
