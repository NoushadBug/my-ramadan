import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';
import { SORTED_ACTIVITIES_LIST } from '../../data/activities';

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {SORTED_ACTIVITIES_LIST.map((item) => {
        const isCompleted = getActivityValue(currentDay, item.id);
        const iconColor = item.category?.color || '#10B981';

        return (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleToggle(item.id)}
            className={`
              relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 min-h-[110px]
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
            <div className="text-2xl mb-2" style={{ color: isCompleted ? 'inherit' : iconColor }}>
              <Icon name={item.icon} />
            </div>
            <span className="text-xs sm:text-sm font-bold text-center leading-tight line-clamp-2" title={item.name}>
              {item.name}
            </span>

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
